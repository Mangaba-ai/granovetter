# Acessibilidade — Design System Granovetter

O que está **verificado por teste automatizado** (`npm run e2e`, 56 testes × 5 navegadores):

| Critério | Como é verificado |
|---|---|
| WCAG 2.2 A e AA | axe-core em 20 histórias do Storybook, sem nenhuma violação |
| Contraste de texto **7:1 (AAA, 1.4.6)** | medição de todo texto visível em 20 histórias |
| Teclado | Tab chega aos botões e links; Espaço marca checkbox; setas mudam o rádio; sem armadilha de foco |
| Foco visível | contorno de 3 px nos botões |
| Alvo de toque 44×44 px (AAA, 2.5.5) | botão `md` (padrão) e `lg`. O `sm` tem 36 px: atende o AA de 24 px, **não** o AAA |
| Celular 375 px | painel sem rolagem horizontal na página (o mapa de calor rola dentro do cartão) |
| Zoom 200% | botão visível e clicável |
| Movimento reduzido | `prefers-reduced-motion` desliga animações e transições |
| Gráficos | Radar, grafo e mapa de calor têm nome acessível |

**Não verificado:** leitores de tela reais (VoiceOver, NVDA), conformidade AAA completa (só contraste e alvo de toque foram testados), modo escuro.

## Regras para novos componentes

- Texto sobre cor: use os tokens `--color-on-accent` (preto sobre laranja/verde), `--color-success-text`, `--color-warning-text`, `--color-error` e `--color-error-strong`. Não use branco sobre laranja ou verde (2,8:1 e 2,0:1).
- Azul em texto ou fundo de texto: `--color-primary-700` ou mais escuro (o 600 dá 6,96:1).
- Texto auxiliar: `--color-neutral-700`; placeholder: `--color-neutral-600`.
- Toda nova história do Storybook deve entrar na lista `STORIES` de `src/__tests__/e2e/accessibility.spec.ts`.
- No Safari o Tab só percorre campos; os testes usam Option+Tab no WebKit.
