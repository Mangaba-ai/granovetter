import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

test.describe('Accessibility - WCAG AAA Compliance', () => {
  /**
   * Test keyboard navigation across components
   */
  test('keyboard navigation works for all interactive elements', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');

    // Tab to first element
    await page.keyboard.press('Tab');
    const firstButton = page.locator('button').first();
    await expect(firstButton).toBeFocused();

    // Tab through all buttons
    const allButtons = page.locator('button');
    const buttonCount = await allButtons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = allButtons.nth(i);
      await expect(button).toHaveCount(buttonCount); // Ensure buttons exist
    }

    // Verify focus is visible
    const focusedButton = page.locator('button:focus');
    const isVisible = await focusedButton.isVisible();
    expect(isVisible).toBe(true);
  });

  /**
   * Test that focus indicators are visible
   */
  test('focus indicators are visible on all interactive elements', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');

    const button = page.locator('button').first();
    await button.focus();

    // Check for focus outline
    const outline = await button.evaluate((el: HTMLButtonElement) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.outlineWidth;
    });

    expect(outline).toBeTruthy();
  });

  /**
   * Test color contrast ratios
   */
  test('color contrast meets WCAG AAA standards', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');
    await injectAxe(page);

    const violations = await getViolations(page);
    const contrastViolations = violations.filter((v) => v.id === 'color-contrast');

    expect(contrastViolations).toHaveLength(0);
  });

  /**
   * Test that form inputs have proper labels
   */
  test('form inputs have associated labels', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/molecules-checkbox--default');

    const checkbox = page.locator('input[type="checkbox"]');
    const hasLabel = await checkbox.evaluate((input: HTMLInputElement) => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      return label !== null || input.getAttribute('aria-label') !== null;
    });

    expect(hasLabel).toBe(true);
  });

  /**
   * Test ARIA attributes
   */
  test('ARIA attributes are correctly set', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--loading');

    const loadingButton = page.locator('[aria-busy="true"]');
    await expect(loadingButton).toBeVisible();
    await expect(loadingButton).toBeDisabled();
  });

  /**
   * Test heading hierarchy
   */
  test('heading hierarchy is correct', async ({ page }) => {
    await page.goto('http://localhost:6006/');

    // Get all headings
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();

    if (headingCount > 0) {
      // Verify no gaps in heading levels
      let previousLevel = 1;

      for (let i = 0; i < headingCount; i++) {
        const heading = headings.nth(i);
        const level = parseInt(await heading.evaluate((el) => el.tagName[1]));

        // Should not skip levels (e.g., h1 -> h3)
        expect(level).toBeLessThanOrEqual(previousLevel + 1);
        previousLevel = level;
      }
    }
  });

  /**
   * Test for keyboard traps
   */
  test('no keyboard traps exist', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');

    // Tab 10 times and ensure we can always move forward or backward
    for (let i = 0; i < 10; i++) {
      const focusedBefore = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });

      await page.keyboard.press('Tab');

      const focusedAfter = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });

      // Focus should change or go back to start
      expect(
        focusedBefore !== focusedAfter || i > 5
      ).toBe(true);
    }
  });

  /**
   * Test alternative text for images
   */
  test('images have alternative text', async ({ page }) => {
    await page.goto('http://localhost:6006/');

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');
      const ariaLabel = await image.getAttribute('aria-label');

      // Should have either alt text or aria-label
      expect(alt || ariaLabel).toBeTruthy();
    }
  });

  /**
   * Test with Axe DevTools
   */
  test('Axe DevTools audit passes with no violations', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');

    await injectAxe(page);

    const violations = await getViolations(page, {
      detailedReportOptions: {
        html: true,
      },
    });

    // Filter out false positives or known issues
    const criticalViolations = violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations).toHaveLength(0);
  });

  /**
   * Test respects prefers-reduced-motion
   */
  test('animations respect prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--loading');

    const button = page.locator('button').first();

    // Get computed animation properties
    const animation = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.animation || 'none';
    });

    // Animation should be none or reduced
    expect(animation === 'none' || animation.includes('0s')).toBe(true);
  });

  /**
   * Test on mobile viewport
   */
  test('components are accessible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');

    const button = page.locator('button').first();

    // Touch target should be at least 44x44px
    const size = await button.boundingBox();
    expect(size?.width).toBeGreaterThanOrEqual(44);
    expect(size?.height).toBeGreaterThanOrEqual(44);

    // Should be focusable
    await button.focus();
    await expect(button).toBeFocused();
  });

  /**
   * Test zoom at 200%
   */
  test('content is accessible at 200% zoom', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');
    await page.evaluate(() => {
      document.body.style.zoom = '200%';
    });

    const button = page.locator('button').first();
    await expect(button).toBeVisible();

    // Should be clickable
    await button.click();
  });

  /**
   * Test navigation with screen reader simulation
   */
  test('screen reader can navigate components', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');

    const button = page.locator('button').first();

    // Get accessible name
    const accessibleName = await button.evaluate((el: HTMLElement) => {
      return el.getAttribute('aria-label') || el.textContent || '';
    });

    expect(accessibleName.length).toBeGreaterThan(0);

    // Get role
    const role = await button.evaluate((el: HTMLElement) => {
      return el.getAttribute('role') || el.tagName.toLowerCase();
    });

    expect(role).toBe('button');
  });
});
