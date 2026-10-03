import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export const STORYBOOK = process.env.STORYBOOK_URL ?? 'http://localhost:6006';

export async function openStory(page: Page, id: string) {
  await page.goto(`${STORYBOOK}/iframe.html?id=${id}&viewMode=story`);
  await page.locator('#storybook-root > *').first().waitFor();
  return page.locator('#storybook-root');
}

// WCAG 2.2 A/AA + contraste AAA (7:1)
export async function axeViolations(page: Page) {
  const r = await new AxeBuilder({ page })
    .include('#storybook-root')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .withRules(['color-contrast-enhanced'])
    .analyze();
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}
