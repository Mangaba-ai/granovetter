# syn-be-clone

Espelho local estático de https://syn.be/index-en (baixado em 01/10/2026).

## Rodar

```bash
npx -y serve -l 8765 .
```

Abrir http://localhost:8765/index-en (EN) ou http://localhost:8765/ (PT).
No painel do Claude Code o servidor se chama `syn-be` (em `~/Downloads/.claude/launch.json`).
Lá, `python3 -m http.server` dá 404 em tudo (o Python do Xcode não tem acesso a ~/Downloads); use `serve`.

## Conteúdo

- `index-en.html` — versão em inglês
- `index.html` — versão em português
- `mobile.html`, `fontes.html` — páginas auxiliares
- `assets/css`, `assets/js`, `assets/media` — CSS, JS (Lottie etc.) e mídia originais

Externos que continuam remotos: Google Fonts, embeds do YouTube e Substack.
Rotas `/sequence/*` e `/images/*` citadas no JS dão 404 também no site original (código morto).
