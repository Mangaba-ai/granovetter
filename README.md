# syn-be-clone

Espelho local estático de https://syn.be/index-en (baixado em 01/10/2026).

## Rodar

```bash
python3 -m http.server 8765
```

Abrir http://localhost:8765/index-en.html (EN) ou http://localhost:8765/ (PT).

## Conteúdo

- `index-en.html` — versão em inglês
- `index.html` — versão em português
- `mobile.html`, `fontes.html` — páginas auxiliares
- `assets/css`, `assets/js`, `assets/media` — CSS, JS (Lottie etc.) e mídia originais

Externos que continuam remotos: Google Fonts, embeds do YouTube e Substack.
Rotas `/sequence/*` e `/images/*` citadas no JS dão 404 também no site original (código morto).
