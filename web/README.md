# Granovetter Web UI — Inovações de Interface

Visualizações interativas para simulação organizacional.

## 🚀 Quick Start

```bash
cd web
npm install
npm run dev
```

Abra [http://localhost:3000/demo](http://localhost:3000/demo)

## 📦 Componentes

### 1. **SocialGraphAnimator**
Visualiza a rede social em tempo real com animação de propagação de mudança.

- D3.js force-directed graph
- Nós coloridos por adoption%
- Tamanho do nó = influência
- Play/Pause dos rounds

```tsx
import { SocialGraphAnimator } from '@/components/visualizations';

<SocialGraphAnimator
  people={people}
  edges={edges}
  round={1}
  isPlaying={false}
  onRoundChange={(r) => setRound(r)}
/>
```

### 2. **ThresholdHeatmap**
Simula impacto de intervenções em tempo real (what-if).

- Gráfico de barras com adoção atual vs projetada
- Sliders para testar treinamento, mensagens, etc
- Previsão instantânea de resultado
- Indicador de limiar (threshold)

```tsx
import { ThresholdHeatmap } from '@/components/visualizations';

<ThresholdHeatmap
  groups={groups}
  onInterventionChange={(group, value) => {}}
/>
```

### 3. **RiskRadar**
Visualiza riscos e oportunidades em gráfico polar.

- Centro = crítico, extremidade = OK
- Cores por probabilidade/severidade
- Lista de mitigações sugeridas
- Oportunidades em verde

```tsx
import { RiskRadar } from '@/components/visualizations';

<RiskRadar
  risks={risks}
  opportunities={opportunities}
/>
```

## 📁 Estrutura

```
web/
├── src/
│   ├── components/
│   │   └── visualizations/
│   │       ├── SocialGraphAnimator.tsx
│   │       ├── ThresholdHeatmap.tsx
│   │       ├── RiskRadar.tsx
│   │       └── index.ts
│   └── pages/
│       └── demo.tsx
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🎨 Tech Stack

- **Next.js 14** — Framework
- **React 18** — UI
- **D3.js** — Network graph
- **Recharts** — Charts
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling (via inline classes)

## 🛠️ Desenvolvimento

### Adicionar novo componente

1. Criar arquivo em `src/components/visualizations/MyComponent.tsx`
2. Exportar em `src/components/visualizations/index.ts`
3. Usar em `src/pages/demo.tsx`

### Customizar cores

Cores estão hardcoded nos componentes (verde/amarelo/vermelho). Para marca Mangaba:
- Verde: `#10b981` → `#E94A12` (laranja Mangaba)
- Amarelo: `#f59e0b` → `#FFA500`
- Vermelho: `#ef4444` → `#C41E3A`

### Deploy

```bash
# Build
npm run build

# Test production
npm start

# Deploy na Vercel
cd web && npx vercel --prod
```

## 📊 Dados de Exemplo

Ver `src/pages/demo.tsx` para estrutura de dados esperada:

- **People**: `{ id, name, group, adoption (0-100), influence (0-10) }`
- **Edges**: `{ source (id), target (id), strength (0-1) }`
- **Groups**: `{ name, adoption, threshold, risk, influencers }`
- **Risks**: `{ id, name, severity (1-10), probability (0-100), angle (0-360), mitigation }`

## 🔮 Roadmap (v0.2+)

- [ ] Integrar com API do Granovetter
- [ ] Real-time collaboration (Yjs)
- [ ] Export para PDF/PPT
- [ ] Dark mode
- [ ] Mobile responsiveness (melhoria)
- [ ] Chat with simulation (NLP)
- [ ] Timeline interativa

## 📝 Licença

MIT — Veja LICENSE

---

**Versão:** 0.1.0  
**Última atualização:** 2026-10-02  
**Mantido por:** Dheiver Santos
