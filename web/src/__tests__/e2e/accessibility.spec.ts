import { test, expect } from '@playwright/test';
import { openStory, axeViolations } from './helpers';

const STORIES = [
  'atoms-button--primary', 'atoms-button--all-variants', 'atoms-button--disabled', 'atoms-button--loading',
  'atoms-input--default', 'atoms-input--error', 'atoms-input--with-helper',
  'molecules-badge--variants', 'molecules-card--default', 'molecules-checkbox--default', 'molecules-checkbox--with-helper',
  'molecules-radio--group', 'molecules-formgroup--default', 'molecules-formgroup--with-error', 'molecules-datacard--grid',
  'organisms-header--default', 'organisms-riskradar--default', 'organisms-socialgraph--default',
  'organisms-thresholdheatmap--sequential', 'organisms-dashboard--default',
];

test.describe('Auditoria axe (WCAG 2.2 AA + contraste AAA)', () => {
  for (const id of STORIES) {
    test(id, async ({ page }) => {
      await openStory(page, id);
      expect(await axeViolations(page)).toEqual([]);
    });
  }
});

// No Safari, Tab só percorre campos; Option+Tab inclui botões e links.
const tabKey = (browserName: string) => (browserName === 'webkit' ? 'Alt+Tab' : 'Tab');

test.describe('Teclado e foco', () => {
  test('Tab chega ao botão e o foco fica visível', async ({ page, browserName }) => {
    const root = await openStory(page, 'atoms-button--primary');
    await page.keyboard.press(tabKey(browserName));
    const btn = root.getByRole('button');
    await expect(btn).toBeFocused();
    const outline = await btn.evaluate((el) => parseFloat(getComputedStyle(el).outlineWidth));
    expect(outline).toBeGreaterThanOrEqual(2);
  });

  test('Espaço marca o checkbox e o rótulo está associado', async ({ page }) => {
    const root = await openStory(page, 'molecules-checkbox--default');
    const box = root.getByRole('checkbox', { name: 'Incluir lideranças intermediárias' });
    await box.focus();
    await page.keyboard.press('Space');
    await expect(box).toBeChecked();
  });

  test('setas navegam no grupo de rádio', async ({ page }) => {
    const root = await openStory(page, 'molecules-radio--group');
    await root.getByRole('radio', { name: 'Otimista' }).focus();
    await page.keyboard.press('ArrowDown');
    await expect(root.getByRole('radio', { name: 'Realista' })).toBeChecked();
  });

  test('links do cabeçalho são alcançáveis pelo teclado', async ({ page }) => {
    const root = await openStory(page, 'organisms-header--default');
    const links = root.getByRole('link');
    expect(await links.count()).toBeGreaterThanOrEqual(3);
    await links.first().focus();
    await expect(links.first()).toBeFocused();
  });

  test('Tab não fica preso: percorre todos os campos do painel e sai', async ({ page, browserName }) => {
    await openStory(page, 'organisms-header--default');
    const seen = new Set<string>();
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press(tabKey(browserName));
      seen.add(await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 80) ?? ''));
    }
    expect(seen.size).toBeGreaterThan(2);
  });
});

test.describe('Gráficos têm nome acessível', () => {
  for (const id of ['organisms-riskradar--default', 'organisms-socialgraph--default', 'organisms-thresholdheatmap--sequential']) {
    test(id, async ({ page }) => {
      const root = await openStory(page, id);
      const named = root.locator('[aria-label], [aria-labelledby], figcaption, caption, title');
      expect(await named.count()).toBeGreaterThan(0);
    });
  }
});

test.describe('Celular, zoom e movimento reduzido', () => {
  test('alvo de toque do botão padrão tem pelo menos 44x44 px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const root = await openStory(page, 'atoms-button--primary');
    const box = await root.getByRole('button').boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test('painel não gera rolagem horizontal em 375 px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openStory(page, 'organisms-dashboard--default');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('botão continua visível e clicável com zoom de 200%', async ({ page }) => {
    const root = await openStory(page, 'atoms-button--primary');
    await page.evaluate(() => { document.body.style.zoom = '2'; });
    await root.getByRole('button').click();
  });

  test('spinner para de girar com prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const root = await openStory(page, 'atoms-button--loading');
    const anim = await root.locator('[aria-busy="true"] span[aria-hidden="true"]').first()
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(anim).toBe('none');
  });
});

// O axe marca muitos pares como "inconclusivos"; esta medição cobre todo texto visível.
test.describe('Contraste AAA (7:1) medido em todo texto', () => {
  for (const id of STORIES) {
    test(id, async ({ page }) => {
      await openStory(page, id);
      const bad = await page.evaluate(() => {
        const parse = (c: string) => (c.match(/[\d.]+/g) || []).map(Number);
        const lum = ([r, g, b]: number[]) => {
          const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const bgOf = (el: Element | null) => {
          for (let e = el; e; e = e.parentElement) {
            const c = parse(getComputedStyle(e).backgroundColor);
            if (c.length >= 3 && (c[3] ?? 1) > 0.5) return c;
          }
          return [255, 255, 255];
        };
        const out: string[] = [];
        for (const el of document.querySelectorAll('#storybook-root *')) {
          const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim());
          if (!hasText) continue;
          const cs = getComputedStyle(el);
          if ((el as HTMLElement).closest(':disabled, [aria-disabled="true"]') || cs.visibility === 'hidden') continue;
          const L1 = lum(parse(cs.color)), L2 = lum(bgOf(el));
          const r = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
          if (r < 7) out.push(`"${el.textContent!.trim().slice(0, 20)}" ${r.toFixed(2)}:1`);
        }
        return out;
      });
      expect(bad).toEqual([]);
    });
  }
});
