# Roadmap Frontend — Novidades & Features

**Visão:** Transformar Granovetter em plataforma web SaaS completa  
**Horizonte:** 6 meses (Q4 2026 - Q1 2027)

---

## 🚀 **FASE 1: Consolidação & Refinamento (Mês 1-2)**

### **1.1 Expandir Demo → Dashboard Completo**

#### Page: `/dashboard/simulations`
```
┌─────────────────────────────────────────┐
│ 📊 Minhas Simulações                     │
│                                          │
│ [+ Nova Simulação] [Filtrar] [Sort ▼]   │
│                                          │
│ Simulação            Status    Adoção    │
│ ├─ Remote 2026       ✅ Completa  78%   │
│ ├─ Tech Stack        ⏳ Em progresso 45%│
│ ├─ Merger Corp       ❌ Erro      -     │
│ └─ Culture Shift     📋 Rascunho  0%    │
│                                          │
│ [Abrir] [Duplicar] [Deletar] [+]        │
└─────────────────────────────────────────┘
```

**Features:**
- ✅ CRUD de simulações
- ✅ Status: Rascunho, Em progresso, Completa, Erro
- ✅ Filtro por status/data/grupo
- ✅ Ações: Abrir, Duplicar, Deletar, Exportar
- ✅ Quick stats: últimas 7 dias, média de adoção
- ✅ Pagination (10, 25, 50 por página)

**Tech:** React Query + Tanstack Table

---

#### Page: `/dashboard/results/:id`
```
Resultado da Simulação (view apenas)
├─ Abas:
│  ├─ Overview (resumo)
│  ├─ Network (Social Graph)
│  ├─ Groups (Threshold Heatmap)
│  ├─ Risks (Risk Radar)
│  ├─ Recommendations (IA-generated)
│  └─ Share & Export
```

---

### **1.2 Persona Builder Visual**

#### Page: `/personas/builder`

```
┌──────────────────────────────────────┐
│ 🎭 Construtor de Personas             │
│                                       │
│ [Basic]  [Values]  [Behaviors]  [Gen] │
│                                       │
│ Step 1: Informações Básicas           │
│ ┌─────────────────────────────────┐   │
│ │ Nome: [____________]            │   │
│ │ Título: [____________]          │   │
│ │ Grupo: [Engineering ▼]          │   │
│ │ Tamanho: 1..5..10 [████░░░░░░]  │   │
│ │ Influência: 1..5..10 [███░░░░░░] │   │
│ └─────────────────────────────────┘   │
│                                       │
│ Step 2: Valores (arraste)             │
│ Disponível:      Selecionado:         │
│ ├─ Autonomy      ├─ Autonomy    [×]   │
│ ├─ Stability     ├─ Growth      [×]   │
│ ├─ Growth        │                    │
│ ├─ Relationships │                    │
│ ├─ Innovation    │                    │
│ └─ Status        │                    │
│                                       │
│ [Preview] [Usar em Simulação] [Save]  │
│                                       │
└──────────────────────────────────────┘
```

**Features:**
- ✅ Drag-drop de valores
- ✅ Sliders para tamanho/influência
- ✅ LLM gera narrativa automática
- ✅ Preview ao vivo
- ✅ Salvar como template
- ✅ Usar múltiplas cópias em simulação

**Tech:** React DnD, LLM API

---

### **1.3 Scenario Builder (Wizard)**

#### Page: `/scenarios/create`

```
Passo 1: Informações Básicas
└─ Nome, descrição, organização, data da decisão

Passo 2: Selecionar Grupos
└─ Checklist de grupos existentes ou criar novos

Passo 3: Importar Personas
└─ Template library ou upload CSV

Passo 4: Definir Contexto
└─ Descrição da mudança, pressões externas, oportunidades

Passo 5: Revisão & Run
└─ Preview de dados
└─ [Executar Simulação]
```

**Tech:** React Hook Form, Zod validation

---

## 📈 **FASE 2: Inteligência & Colaboração (Mês 3-4)**

### **2.1 Chat com Simulação (LLM)**

#### Feature: `/dashboard/results/:id/chat`

```
┌────────────────────────────────────┐
│ 💬 Ask Granovetter                  │
│                                     │
│ User: "Qual é o main blocker?"      │
│                                     │
│ Granovetter:                        │
│ "Operations tem 3 razões:           │
│  1. Limiar alto (80%)               │
│  2. Maria (gestor) é resistora      │
│  3. Processo crítico sem digital    │
│                                     │
│  Sugestão: Treinar Maria + DocuSign│
│  Impacto: +40% em 3 semanas"        │
│                                     │
│ User: "E se aumentarmos treinamento?│
│                                     │
│ [Chat history] [Export as PDF]      │
│                                     │
└────────────────────────────────────┘
```

**Queries Suportadas:**
- "Qual é o maior risco?"
- "Como faço para acelerar [grupo]?"
- "E se eu aumentar X em Y%?"
- "Qual é a ordem de rollout recomendada?"
- "Quem são os influenciadores-chave?"

**Tech:** LLM + Prompt Caching + Vector DB

---

### **2.2 Real-Time Collaboration**

#### Feature: Simulação Compartilhada

```
URL: /collab/sim-123abc

Participants:
🟢 Maria (CEO) — watching
🟢 João (COO) — on Ops scenario
🟢 Ana (People) — testing interventions

Live Chat:
Maria: "Ops é blocker"
João: "Já vejo solução aqui"
Ana: "Qual é o impacto no timeline?"

Cada um vê:
- Cursor do outro em tempo real
- Exploração de cenários simultânea
- Chat integrado
- Histórico de decisões
```

**Tech:** Yjs + WebSocket + Zustand

---

### **2.3 Recommendations Engine**

#### Feature: Insights Automáticos

```
Após simulação rodar:

┌──────────────────────────────────────┐
│ 🎯 Recomendações Priorizadas          │
│                                       │
│ 1. INTERVIR IMEDIATAMENTE             │
│    ├─ Treinar Maria (Ops)            │
│    ├─ Impacto: +40% adoção           │
│    ├─ Timeline: 2 semanas            │
│    └─ Custo: $5K                     │
│                                       │
│ 2. PRÓXIMA SEMANA                     │
│    ├─ Town hall com Sales            │
│    └─ Impacto: +15% adoção           │
│                                       │
│ 3. MONITORAR (risco médio)            │
│    └─ Engagement drops               │
│                                       │
│ [Save Plan] [Export to PDF]           │
│                                       │
└──────────────────────────────────────┘
```

**Tech:** LLM + Scoring Algorithm

---

## 🎨 **FASE 3: Experiência & Polimento (Mês 5-6)**

### **3.1 Export Multi-formato**

```
Resultados → [Export ▼]
  ├─ PDF Report (executivo)
  ├─ PowerPoint (apresentável)
  ├─ CSV (análise)
  ├─ JSON (integração)
  └─ Markdown (wiki)
```

**Tech:** pdf-lib, pptx, papaparse

---

### **3.2 Scenarios Side-by-Side (Comparação)**

#### Page: `/compare?sims=123,456,789`

```
Scenario A          Scenario B          Scenario C
────────────────────────────────────────────────────

ADOÇÃO
78%                 85%                 92% ✅
█████████░░         ███████████░        ███████████████

CUSTO
$15K                $40K                $80K
█░░░░░░░░░          ███░░░░░░░░         ██████░░░░░░

TIMELINE
4 semanas           2 semanas           1 semana
████░░░░░░          ██░░░░░░░░          █░░░░░░░░░

CHURN RISK
4%                  2%                  1% ✅
────────────────────────────────────────────────────

RECOMENDADO: C (melhor trade-off)

[Deep Dive A] [Deep Dive B] [Deep Dive C]
```

---

### **3.3 Dark Mode & Theming**

```typescript
// Suportar:
├─ Light (default)
├─ Dark
├─ Mangaba (paleta corporativa)
├─ Custom (por cliente)
```

---

### **3.4 Responsiveness & Mobile**

```
Mobile-first design:
├─ Gráficos responsivos
├─ Touch-friendly sliders
├─ Bottom sheet navigation
├─ Collapsed panels
```

---

## 🔧 **FEATURES TRANSVERSAIS**

### **Authentication & Multi-tenancy**

```
├─ Sign up / Login / SSO (Google, Okta, Azure AD)
├─ Workspaces/Organizations
├─ Role-based access (Admin, Editor, Viewer)
├─ Team invitations
└─ Audit logging
```

**Tech:** NextAuth.js + Prisma

---

### **Database & Persistence**

```
Data Model:
├─ Users
├─ Workspaces/Organizations
├─ Simulations
├─ Scenarios
├─ Personas
├─ Results
└─ Collaborations

DB: PostgreSQL + Prisma ORM
```

---

### **Analytics & Monitoring**

```
Internal Dashboard:
├─ Usage metrics (users, simulations, exports)
├─ Popular scenarios
├─ Avg simulation time
├─ Error rates
└─ User feedback

Tools: PostHog, Sentry, LogRocket
```

---

### **Notifications & Alerts**

```
├─ Simulation completed
├─ Someone joined collaboration
├─ Risk detected in results
├─ Recommendation ready
└─ Share link accessed

Channels: Email, In-app, Push (mobile)
```

---

## 📊 **PRIORIZAÇÃO (Impact vs Effort)**

```
HIGH IMPACT, LOW EFFORT:
  ✅ Dashboard de simulações (Phase 1.1)
  ✅ Chat com simulação (Phase 2.1)
  ✅ Export PDF (Phase 3.1)
  ✅ Comparison view (Phase 3.2)

MEDIUM IMPACT, MEDIUM EFFORT:
  ⏳ Persona builder (Phase 1.2)
  ⏳ Collaboration real-time (Phase 2.2)
  ⏳ Recommendations engine (Phase 2.3)

LOW IMPACT, LOW EFFORT:
  💚 Dark mode (Phase 3.3)
  💚 Mobile polish (Phase 3.4)

DEFER (Nice-to-have):
  ❌ Advanced analytics
  ❌ Custom branding per client
  ❌ API marketplace
```

---

## 🎯 **INDICADORES DE SUCESSO**

### Por Fase:

**Fase 1 (Mês 1-2):**
- ✅ 100+ simulações criadas
- ✅ 50+ personas salvas
- ✅ Churn <5% de usuários trial

**Fase 2 (Mês 3-4):**
- ✅ 80% de simulações usam chat
- ✅ 60% são colaborações (2+ pessoas)
- ✅ 90% seguem recomendações

**Fase 3 (Mês 5-6):**
- ✅ 70% das simulações são exportadas
- ✅ 95% satisfação com UX (NPS >70)
- ✅ 40% de repeat usage (usuário volta)

---

## 💰 **ESTIMATIVA DE TEMPO**

| Feature | Tempo | Prioridade |
|---------|-------|-----------|
| Dashboard | 1 semana | 🔴 Alto |
| Persona Builder | 1.5 semanas | 🔴 Alto |
| Chat com IA | 1.5 semanas | 🟠 Médio |
| Real-time Collab | 2 semanas | 🟠 Médio |
| Export Multi-formato | 1 semana | 🔴 Alto |
| Dark Mode | 2 dias | 🟢 Baixo |
| **TOTAL** | **~10 semanas** | |

---

## 🛣️ **TIMELINE RECOMENDADO**

```
OUT 2026:
  └─ Semana 1-2: Dashboard + Persona Builder
  └─ Semana 3-4: Chat com IA

NOV 2026:
  └─ Semana 1-2: Real-time Collaboration
  └─ Semana 3-4: Export + Comparison

DEZ 2026:
  └─ Semana 1-2: Polimento & Bug fixes
  └─ Semana 3-4: Launch SaaS (Beta)

JAN 2027:
  └─ Dark mode, mobile polish
  └─ Recolher feedback, iterar
```

---

## 🚢 **TECH STACK RECOMENDADO**

```
Frontend:
├─ Next.js 14 (framework)
├─ React 18 (UI)
├─ TypeScript (type safety)
├─ Tailwind CSS (styling)
├─ Zustand (state)
├─ React Query (data fetching)
├─ Zod (validation)
└─ Yjs (collab)

Backend (API):
├─ Next.js API Routes
├─ PostgreSQL (database)
├─ Prisma (ORM)
├─ NextAuth.js (auth)
├─ LLM API (Claude/OpenAI)
└─ Redis (cache)

Deployment:
├─ Vercel (frontend)
├─ AWS/Railway (backend)
├─ Stripe (payments)
└─ SendGrid (email)
```

---

## 📝 **PRÓXIMOS PASSOS IMEDIATOS**

**Semana que vem:**

```
[ ] Setup Backend API (Next.js API Routes)
[ ] Design Database Schema (Prisma)
[ ] Implementar Authentication (NextAuth)
[ ] Criar Dashboard component
[ ] Setup CI/CD (GitHub Actions)
```

---

**Versão:** 1.0  
**Data:** 2026-10-02  
**Status:** Pronto para roadmap
