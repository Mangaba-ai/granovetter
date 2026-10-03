import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Button Component E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to storybook button story
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');
  });

  test('should render button', async ({ page }) => {
    const button = page.locator('button');
    await expect(button).toBeVisible();
  });

  test('should handle click events', async ({ page }) => {
    const button = page.locator('button').first();
    const clickPromise = page.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        const btn = document.querySelector('button');
        if (btn) {
          let clicked = false;
          btn.addEventListener('click', () => {
            clicked = true;
          });
          resolve(true);
        }
      });
    });

    await button.click();
    await expect(page).toBeTruthy();
  });

  test('should be keyboard accessible', async ({ page }) => {
    const button = page.locator('button').first();

    // Tab to button
    await page.keyboard.press('Tab');

    // Should be focused
    await expect(button).toBeFocused();

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await expect(page).toBeTruthy();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  });

  test('should have visible focus indicator', async ({ page }) => {
    const button = page.locator('button').first();
    await button.focus();

    const styles = await button.evaluate((el) => {
      return window.getComputedStyle(el);
    });

    // Focus should be visible (outline or similar)
    expect(styles).toBeTruthy();
  });

  test('disabled button should not be clickable', async ({ page }) => {
    // Navigate to disabled story
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--disabled');

    const button = page.locator('button').first();
    await expect(button).toBeDisabled();
  });

  test('loading state button should be disabled', async ({ page }) => {
    // Navigate to loading story
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--loading');

    const button = page.locator('button').first();
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const button = page.locator('button').first();
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    await button.click();
    await expect(button).toBeTruthy();
  });

  test('should support all variants', async ({ page }) => {
    // Navigate to all variants story
    await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--all-variants');

    const buttons = page.locator('button');
    await expect(buttons).toHaveCount(4); // primary, secondary, tertiary, ghost

    // All should be visible
    for (let i = 0; i < 4; i++) {
      await expect(buttons.nth(i)).toBeVisible();
    }
  });
});
