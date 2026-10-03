# Design System Granovetter — Status

Atualizado em 03/10/2026.

## Entregue

| Fase | Conteúdo |
|---|---|
| 1 | Tokens (`src/styles/tokens.css`), Button, Input |
| 2 | Card, Badge, FormGroup, DataCard, Checkbox, Radio |
| 3 | Header, RiskRadar, SocialGraph, ThresholdHeatmap, Dashboard |
| 4 | Storybook 7 (52 histórias, todos os componentes), Vitest, Playwright, Lighthouse CI configurado |
| 5 | Acessibilidade verificada por teste (ver `src/components/ACCESSIBILITY.md`) |

## Verificação

| Checagem | Resultado |
|---|---|
| `npx tsc --noEmit` | 0 erros |
| `npm run build` | passa |
| `npm test` | 28/28 |
| `npm run e2e` | 280/280 (56 testes × Chrome, Firefox, Safari, Chrome mobile, Safari mobile) |
| Lighthouse | configurado (`.lighthouserc.json`), **ainda não executado** |

## Pendente

- Usar os componentes em páginas reais: hoje só existem no Storybook; a página `/demo` usa os componentes antigos de `src/components/visualizations/`.
- Rodar o Lighthouse sobre uma página real.
- Testar com leitor de tela real.
- Modo escuro (os tokens têm um esboço, sem teste).
