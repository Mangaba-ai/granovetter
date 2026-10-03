# E2E Testing Guide - Design System

Guia completo para testes E2E com Playwright e acessibilidade com Axe.

## Setup

```bash
# Instalar dependências
npm install

# Instalar browsers do Playwright
npx playwright install

# Rodar testes
npm run e2e
```

## Estrutura

```
src/__tests__/
├── setup.ts           # Configuração Vitest
├── components/        # Testes unitários (Vitest)
│   ├── Button.test.tsx
│   ├── Card.test.tsx
│   └── Checkbox.test.tsx
└── e2e/              # Testes E2E (Playwright)
    ├── button.spec.ts
    └── accessibility.spec.ts
```

## Rodando Testes

### Todos os testes

```bash
npm run e2e
```

### Teste específico

```bash
npx playwright test button.spec.ts
```

### Modo interativo (UI)

```bash
npm run e2e:ui
```

Abre interface visual onde pode:
- Ver cada teste
- Pausar na falha
- Re-rodar individual
- Ver screenshots/videos

### Debug mode

```bash
npm run e2e:debug
```

Abre Playwright Inspector com stepping, breakpoints, etc.

## Estrutura de Teste

### Básico

```typescript
import { test, expect } from '@playwright/test';

test('button should render', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const button = page.locator('button');
  await expect(button).toBeVisible();
});
```

### Com Axe Accessibility

```typescript
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('...');
  await injectAxe(page);
  
  const violations = await getViolations(page);
  expect(violations).toHaveLength(0);
});
```

### Keyboard Navigation

```typescript
test('should be keyboard accessible', async ({ page }) => {
  await page.goto('...');
  
  // Tab to elemento
  await page.keyboard.press('Tab');
  await expect(button).toBeFocused();
  
  // Ativar com Enter
  await page.keyboard.press('Enter');
});
```

## Padrões Comuns

### Verificar visibilidade

```typescript
await expect(element).toBeVisible();
await expect(element).toBeHidden();
```

### Verificar estado

```typescript
await expect(button).toBeDisabled();
await expect(button).toHaveAttribute('aria-busy', 'true');
```

### Interagir com elemento

```typescript
await button.click();
await input.fill('texto');
await page.keyboard.press('Enter');
```

### Verificar conteúdo

```typescript
await expect(page.locator('h1')).toHaveText('Título');
await expect(input).toHaveValue('entrada');
```

### Esperar por elemento

```typescript
await page.waitForSelector('button.loaded');
await expect(element).toBeVisible({ timeout: 5000 });
```

## Seletores

### Pelo role (acessível)

```typescript
page.locator('button')
page.locator('[role="button"]')
page.getByRole('button', { name: 'Click me' })
page.getByRole('textbox', { name: /email/i })
```

### Pelo tipo

```typescript
page.locator('input[type="checkbox"]')
page.locator('input[type="email"]')
```

### Pelo texto

```typescript
page.getByText('Submit')
page.getByText(/submit/i)
```

### Combinado

```typescript
page.locator('form >> button:has-text("Send")')
```

## Fixtures

Para reaproveitar setup:

```typescript
type TestFixtures = {
  loggedInPage: Page;
};

const test = base.extend<TestFixtures>({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await use(page);
  },
});

test('dashboard loads after login', async ({ loggedInPage }) => {
  await loggedInPage.goto('/dashboard');
  await expect(loggedInPage).toHaveTitle('Dashboard');
});
```

## Acessibilidade (Axe)

### Injetar Axe

```typescript
import { injectAxe } from 'axe-playwright';

await injectAxe(page);
```

### Verificar violations

```typescript
import { getViolations } from 'axe-playwright';

const violations = await getViolations(page);
expect(violations).toHaveLength(0);
```

### Violations por tipo

```typescript
const violations = await getViolations(page);
const critical = violations.filter(v => v.impact === 'critical');
const serious = violations.filter(v => v.impact === 'serious');
```

### Regras específicas

```typescript
await checkA11y(page, null, {
  rules: {
    'color-contrast': { enabled: true },
    'valid-aria-role': { enabled: true },
  },
});
```

## Teste de Teclado

```typescript
// Tab key
await page.keyboard.press('Tab');
await page.keyboard.press('Shift+Tab'); // Backward

// Enter / Space
await page.keyboard.press('Enter');
await page.keyboard.press('Space');

// Arrows
await page.keyboard.press('ArrowUp');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowLeft');
await page.keyboard.press('ArrowRight');

// Modifiers
await page.keyboard.press('Control+A'); // Select all
await page.keyboard.press('Control+C'); // Copy
await page.keyboard.press('Escape');    // Close
```

## Teste Responsivo

```typescript
// Mobile
await page.setViewportSize({ width: 375, height: 812 });

// Tablet
await page.setViewportSize({ width: 768, height: 1024 });

// Desktop
await page.setViewportSize({ width: 1440, height: 900 });

// Zoom 200%
await page.evaluate(() => {
  document.body.style.zoom = '200%';
});
```

## Teste de Foco

```typescript
// Focus elemento
await button.focus();
await expect(button).toBeFocused();

// Verificar outline
const outline = await button.evaluate((el) => {
  return window.getComputedStyle(el).outline;
});
expect(outline).toBeTruthy();
```

## Screenshot e Video

```typescript
// Screenshot único
await page.screenshot({ path: 'screenshot.png' });

// Screenshot de elemento
await button.screenshot({ path: 'button.png' });

// Vídeo (automático em falhas quando configurado)
```

No `playwright.config.ts`:

```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Run Playwright tests
  run: npx playwright test

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

### Localmente antes de push

```bash
npm run e2e && npm run test && npm run lighthouse
```

## Troubleshooting

### Teste times out

```typescript
// Aumentar timeout
test('slow test', async ({ page }) => {
  // ...
}, { timeout: 30000 }); // 30s
```

### Elemento não encontrado

```typescript
// Esperar disponibilidade
await page.waitForSelector('button', { timeout: 5000 });

// Ou via locator
await page.locator('button').waitFor({ state: 'visible' });
```

### Teste flaky

```typescript
// Retry em CI
fullyParallel: true,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 1 : undefined,
```

### Debugging interativo

```bash
npm run e2e:debug
# Abre inspector
# Step through teste
# Modify selectors em tempo real
```

## Boas Práticas

1. **Use semantic selectors** (role, text) em vez de classes
2. **Test user flows** não implementação
3. **Padrão AAA**: Arrange, Act, Assert
4. **Isolate tests**: sem dependência entre testes
5. **Use fixtures** para setup comum
6. **Mock APIs** quando necessário
7. **Screenshot em falhas** para debug
8. **Accessibility first** com Axe

## Exemplo Completo

```typescript
import { test, expect } from '@playwright/test';
import { injectAxe, getViolations } from 'axe-playwright';

test('Button component full workflow', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:6006/iframe.html?path=/story/atoms-button--primary');

  // Act - Verificar renderização
  const button = page.getByRole('button', { name: /primary/i });
  await expect(button).toBeVisible();

  // Act - Acessibilidade
  await injectAxe(page);
  const violations = await getViolations(page);
  expect(violations).toHaveLength(0);

  // Act - Interação
  await button.focus();
  await expect(button).toBeFocused();

  // Act - Click
  let clicked = false;
  await page.evaluate(() => {
    const btn = document.querySelector('button');
    if (btn) {
      btn.addEventListener('click', () => {
        clicked = true;
      });
    }
  });
  await button.click();

  // Assert
  await expect(button).toBeEnabled();
});
```

## Recursos

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
- [Axe Accessibility](https://www.axe-core.org/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
