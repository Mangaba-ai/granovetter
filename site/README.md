# Site do Granovetter

Site institucional do Granovetter, laboratório de simulação e inferência comportamental.
HTML/CSS/JS estático, sem build.

## Rodar local

```bash
npx -y serve -l 8765 site
```

- `index.html`: português
- `index-en.html`: inglês
- `mobile.html`: versão mobile (português)
- `fontes.html`: bibliografia e arcabouço teórico (`granovetter_arcabouco_teorico.md`)

## Publicar

```bash
cd site && npx vercel --prod
```

## Notas

- O formulário de contato envia pelo FormSubmit para dheiver.santos@mangaba.ia.br. No primeiro envio o FormSubmit manda um e-mail de ativação, que precisa ser confirmado uma vez.
- O vídeo da intro (`assets/media/granovetter-intro.mp4`) é convertido em ASCII no canvas; foi gerado por script (cascata de limiares numa rede).
- A simulação de exemplo citada no site vem de `scenarios/remote_work.json` e usa organização fictícia.
