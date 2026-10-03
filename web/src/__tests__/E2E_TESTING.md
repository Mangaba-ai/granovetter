# Testes E2E

Os testes rodam contra o Storybook com Playwright e `@axe-core/playwright`.

```bash
npm run e2e              # sobe o Storybook na 6006 (ou reaproveita) e testa em 5 navegadores
npm run e2e -- --project=chromium   # só Chrome
npm run e2e:ui           # modo interativo
```

Na primeira vez: `npx playwright install`.

## Estrutura

- `helpers.ts`: `openStory(page, id)` abre `iframe.html?id=<id>&viewMode=story` e espera o componente; `axeViolations(page)` roda o axe com WCAG 2.2 A/AA + contraste AAA.
- `accessibility.spec.ts`: axe e contraste 7:1 em 20 histórias, teclado, foco, toque, celular, zoom, movimento reduzido.
- `button.spec.ts`: comportamento do botão (clique, Enter, desabilitado, carregando).

O id de uma história vem do título: `Molecules/FormGroup` + `WithError` → `molecules-formgroup--with-error`.
