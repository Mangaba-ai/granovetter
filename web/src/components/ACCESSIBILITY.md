# Acessibilidade — Design System Granovetter

O que está **verificado por teste automatizado** (`npm run e2e`, 58 testes × 5 navegadores):

| Critério | Como é verificado |
|---|---|
| WCAG 2.2 A e AA | axe-core em 21 histórias do Storybook, sem nenhuma violação |
| Contraste de texto **7:1 (AAA, 1.4.6)** | medição de todo texto visível em 21 histórias |
| Teclado | Tab chega aos botões e links; Espaço marca checkbox; setas mudam o rádio; sem armadilha de foco |
| Foco visível | contorno de 3 px nos botões |
| Alvo de toque 44×44 px (AAA, 2.5.5) | botão `md` (padrão) e `lg`. O `sm` tem 36 px: atende o AA de 24 px, **não** o AAA |
| Celular 375 px | painel sem rolagem horizontal na página (o mapa de calor rola dentro do cartão) |
| Zoom 200% | botão visível e clicável |
| Movimento reduzido | `prefers-reduced-motion` desliga animações e transições |
| Gráficos | Radar, grafo e mapa de calor têm nome acessível |

**Não verificado:** leitores de tela reais (VoiceOver, NVDA), conformidade AAA completa (só contraste e alvo de toque foram testados), modo escuro.

## Regras para novos componentes (tema futurista)

- O tema é escuro. Fundos: `--bg-void`, `--bg-surface`, `--bg-raised`, `--bg-glass`.
- Texto: `--text-hi` (títulos), `--text-mid` (rótulos), `--text-low` (auxiliar). Todos acima de 7:1 nas três superfícies.
- Neon como cor de texto: `--neon-cyan`, `--neon-violet`, `--neon-lime`, `--neon-orange`, `--neon-amber`. `--neon-magenta` e `--neon-red` ficam abaixo de 7:1 sobre `--bg-raised`: use-os só sobre `--bg-void` ou `--bg-surface`.
- Texto sobre fundo neon (botões, avatar, contador): sempre `--text-on-neon` (quase preto). Elementos com degradê precisam de um `background-color` sólido de fallback, que é o que o teste de contraste mede.
- Toda nova história do Storybook deve entrar na lista `STORIES` de `src/__tests__/e2e/accessibility.spec.ts`.
- No Safari o Tab só percorre campos; os testes usam Option+Tab no WebKit.
