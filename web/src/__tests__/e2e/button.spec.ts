import { test, expect } from '@playwright/test';
import { openStory } from './helpers';

test.describe('Button', () => {
  test('renderiza e responde a clique e Enter', async ({ page }) => {
    const root = await openStory(page, 'atoms-button--primary');
    const btn = root.getByRole('button');
    await expect(btn).toBeVisible();
    await btn.evaluate((el) => { (window as any).__clicks = 0; el.addEventListener('click', () => (window as any).__clicks++); });
    await btn.click();
    await btn.focus();
    await page.keyboard.press('Enter');
    expect(await page.evaluate(() => (window as any).__clicks)).toBe(2);
  });

  test('desabilitado não recebe clique', async ({ page }) => {
    const root = await openStory(page, 'atoms-button--disabled');
    await expect(root.getByRole('button')).toBeDisabled();
  });

  test('carregando fica desabilitado e anuncia aria-busy', async ({ page }) => {
    const root = await openStory(page, 'atoms-button--loading');
    const btn = root.getByRole('button');
    await expect(btn).toBeDisabled();
    await expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  test('mostra as 4 variantes', async ({ page }) => {
    const root = await openStory(page, 'atoms-button--all-variants');
    await expect(root.getByRole('button')).toHaveCount(4);
  });
});
