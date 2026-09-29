# FASE 0: Preparação (Semanas -8 a -6)

Resolva bloqueadores críticos antes de comunicar publicamente.

---

## 🎯 Objetivo

Construir apoio executivo, resolver problemas operacionais, validar viabilidade técnica.

**Se falhar AGORA:** Go-live fracassa.  
**Se for bem:** Resto da transição fica 80% mais fácil.

---

## 📅 Timeline (6 Semanas)

```
SEMANA -8 (HOJE)
  │
  ├─ DOMINGO: Comitê de Mudança primeira reunião
  ├─ SEGUNDA: Avaliar infraestrutura TI
  ├─ TERÇA: Mapear processos Ops
  ├─ QUARTA: Apresentar a executivos (aprovação orçamento)
  └─ SEXTA: Comunicar plano interno (confidencial)
  
SEMANA -7 (AÇÃO PARALELA)
  │
  ├─ TI: Testes de VPN, bandwidth, segurança
  ├─ Ops: Documentar processos críticos
  ├─ People: Recrutar Campeões de Mudança
  └─ Exec: Alinhamento de mensagem

SEMANA -6 (FINALIZE)
  │
  ├─ TI: 99.9% uptime validado
  ├─ Ops: 70% dos processos redesenhados
  ├─ People: Campeões confirmados
  └─ Exec: Go/No-go decision
```

---

## ✅ CHECKLIST AÇÃO IMEDIATA (Esta Semana)

### Domingo: Primeira Reunião Comitê

- [ ] Agendar Comitê (CEO, VP Eng, VP Ops, Head People, VP Sales, CTO)
- [ ] Data: Próxima terça-feira 10h (1 hora)
- [ ] Assunto: "Go/No-go: Transição Remota"
- [ ] Material: Compartilhe PLANO_ACAO.md + este documento

**Agenda:**
1. Rationale (5 min)
2. Risco crítico (Ops) (10 min)
3. Orçamento + ROI (5 min)
4. Timeline (3 min)
5. Q&A + decisão (2 min)

**Decisão esperada:** GO → Começa semana -8

---

### Segunda: Avaliar Infraestrutura TI

**Owner:** CTO + Head of Security  
**Duração:** 4 horas  
**Entrega:** Relatório "TI Readiness"

#### Checklist Técnico

- [ ] **VPN**
  - [ ] Capacidade atual: quantos usuários simultâneos?
  - [ ] Necessário para 350? Sim/Não?
  - [ ] Upgrade needed? Custo? Timeline?

- [ ] **Banda/Latência**
  - [ ] Upload/download atual (speedtest)
  - [ ] Suficiente para Zoom + Slack + desenvolvimento?
  - [ ] Plan B (mobile hotspot)?

- [ ] **Segurança**
  - [ ] MFA habilitado? (Sim/Não)
  - [ ] DLP (data loss prevention)? (Sim/Não)
  - [ ] Compliance (LGPD/ISO)? (Sim/Não)
  - [ ] Patches atualizados? (Sim/Não)

- [ ] **Ferramentas de Colaboração**
  - [ ] Slack: Habilitado? (Sim/Não)
  - [ ] Notion/Docs: Qual usar?
  - [ ] Zoom/Meet: Licenças suficientes?
  - [ ] IDE Cloud (VSCode.dev ou similar)?

- [ ] **Backup & Disaster Recovery**
  - [ ] RTO (recovery time objective): < 1 hora?
  - [ ] RPO (recovery point objective): < 15 min?

**Output esperado:**
```
✅ READY → Procede
⚠️  NEEDS UPGRADE → Orçamento + 4 semanas
🛑 BLOCKER → Adia transição
```

---

### Terça: Mapear Processos Operacionais

**Owner:** Ops Manager + COO  
**Duração:** Full day (8 horas)  
**Entrega:** Mapa de processos Ops

#### Mapeamento Detalhado

Listar TODOS os processos:

```
CRÍTICOS (não podem falhar):
  [ ] Processamento de pedidos
  [ ] Faturamento
  [ ] Suporte ao cliente
  [ ] Compliance/legais
  [ ] Pagamentos fornecedores

IMPORTANTES (afetam 10+% da organização):
  [ ] Onboarding
  [ ] Admissional
  [ ] Contratos
  [ ] RH (férias, benefícios)

NICE-TO-HAVE (podem mudar):
  [ ] Eventos
  [ ] Comunicações
  [ ] Reuniões all-hands
```

**Para cada um, responda:**

1. Funciona 100% remoto hoje? (Sim/Não/Parcial)
2. Se não, por quê? (Presencialidade, assinatura física, etc?)
3. Como redesenhar remoto?
4. Risco se falhar?
5. Investimento needed?

**Exemplo: Processamento de Pedidos**
```
Processo: Cliente chama → Ordem escrita → Faturamento → Envio

Funciona remoto? Sim, 90% (apenas assinatura é presencial)

Redesenho: DocuSign digital (R$ 5K/ano)

Risco: Se assinatura falhar, pedido atrasa 24h

Investimento: R$ 5K + 1 dia treinamento
```

**Output esperado:**
- Spreadsheet com todos processos mapeados
- Priorização (crítico vs importante vs nice)
- Orçamento total para redesenho
- Timeline realista

---

### Quarta: Apresentar a Executivos

**Owner:** CEO  
**Público:** C-suite + board (se houver)  
**Duração:** 60 min  
**Formato:** Apresentação + decisão

#### Deck Executivo (10 slides)

1. **Slide 1: A Oportunidade**
   - Mercado mudou (78% das startups tech são remotas)
   - Retenção: perdemos 3 eng sênior em 6 meses
   - Competitividade: precisamos evoluir

2. **Slide 2: Rationale Financeiro**
   - Economia: R$ 500K/ano (imóvel)
   - Retenção: Valor de 5 eng @ R$ 100K = R$ 500K
   - Total benefício: R$ 1M/ano

3. **Slide 3: Timeline**
   - Fases: Prep (6 sem) → Adoption (4 sem) → Consolidation (8 sem)
   - Go/No-go milestones

4. **Slide 4: Risco Crítico**
   - Ops não consegue adaptar
   - Gestão falha em liderar remoto
   - Churn cliente

5. **Slide 5: Mitigação**
   - Ops redesign (piloto, não big bang)
   - Treinamento liderança (R$ 25K)
   - CSM dedicado para clientes

6. **Slide 6: Orçamento**
   - Total: R$ 189.8K
   - ROI: Payback 2.3 meses
   - Contingência: Sim

7. **Slide 7: Comunicação**
   - Sequência: Comitê → Exec → Org
   - Tone: Transparente, não amedrontador

8. **Slide 8: Ganhos Não-Financeiros**
   - Employer brand (remoto é premium agora)
   - Melhor work-life balance → menos burnout
   - Acesso a talento global

9. **Slide 9: Decisão Necessária**
   - Orçamento: Aprovam R$ 189.8K?
   - Timeline: Começam agora?
   - Suporte: Executivos "all-in"?

10. **Slide 10: Próximos 7 Dias**
    - Segunda (hoje): Comitê reunião
    - Terça: Aprovação orçamento?
    - Sexta: Town Hall confidencial para liderança

**Pergunta esperada #1:**  
*"E se fracassar?"*

Resposta:  
"Voltamos. Mas primeiro testamos: Ops tem 4 semanas hybrid como piloto. Se não funcionar, não vai full remoto."

**Pergunta esperada #2:**  
*"Quanto custa exatamente?"*

Resposta (template):
```
R$ 189.8K dividido em:
  • Infraestrutura TI: R$ 45K
  • Redesenho processos: R$ 30K
  • Treinamento: R$ 41K
  • Retiros/cultura: R$ 30K
  • Contingência: R$ 21.8K

ROI: R$ 1M benefício / R$ 189.8K = 5.3x em ano 1
Payback: 2.3 meses
```

**Decisão esperada:** 
```
☑ APROVADO
☑ TIMELINE: Semana -8 (now)
☑ ORÇAMENTO: Released
☑ SUPORTE: Full
```

---

### Sexta: Comunicação Confidencial Liderança

**Owner:** CEO  
**Público:** VP level + gestores sênior  
**Formato:** Email + Zoom opcional  
**Tone:** Confiança, urgência moderada

**Email:**

```
Subject: CONFIDENCIAL: Iniciativa estratégica remoto

Caros líderes,

Continuando nossa conversa de terça, aprovamos:

✅ Transição para 100% remoto em 3 meses
✅ Orçamento: R$ 189.8K
✅ Começa: Segunda (Semana -8)

CONFIDENCIAL até próxima semana (anúncio público).

Vocês têm papel crítico:
1. Eng: Recrutar Campeões de Mudança (semana que vem)
2. Ops: Iniciar redesenho de processos (começa segunda)
3. People: Comunicação inicial (quinta)
4. Sales: Preparar clientes (quinta)

Perguntas? Zoom quinta 15h (opcional).

Abraço,
[CEO]
```

**Se alguém disser "não":  
Ouça completamente. Pode ser feedback valioso.**

```
"Não porque TI não está pronto"
→ Escalada: Reunião CTO + CEO segunda

"Não porque Ops vai quebrar"
→ Escalada: COO + Ops Manager reconhecer desafio

"Não por X"
→ Ackn owledge + Problem solve
```

**If issue é real:** Adia 4 semanas (não cancela).  
**Se é medo:** Dá treinamento + suporte.

---

## 📊 Métricas de Sucesso (Fim de Fase 0)

**Go/No-go Criteria:**

| Critério | Target | Status |
|----------|--------|--------|
| TI Readiness | ✅ | [ ] |
| Ops Processes Mapped | ✅ | [ ] |
| Exec Alignment | ✅ | [ ] |
| Orçamento Aprovado | R$ 189.8K | [ ] |
| Comitê Designado | 6 pessoas | [ ] |
| Campeões Identificados | 15-20 | [ ] |

**Decision Point: Sexta-feira (Fim Semana -8)**

```
Se TODOS os critérios = ✅
  → PROCEDE para Fase 1 (Adoção Rápida)

Se ALGUM critério = ❌
  → ADIA 2-4 semanas, resolve bloqueador
```

---

## 🎁 Deliverables Fase 0

Ao final, você terá:

1. ✅ TI Readiness Report (Go/No-go)
2. ✅ Ops Process Map (todos os críticos)
3. ✅ Orçamento aprovado + desembolso autorizado
4. ✅ Comitê de Mudança nomeado
5. ✅ Campeões de Mudança identificados (15-20)
6. ✅ Comunicação confidencial executada
7. ✅ Plano semana -5 confirmado

---

## ⚠️ Armadilhas Comuns

**"Vamos pular TI readiness check"**  
❌ Não. Falha técnica semana 1 mata toda a iniciativa.

**"Ops vai se adaptar, não precisa redesenho"**  
❌ Não. 100% dos processos presenciais quebram remoto.

**"Fazemos isso em 2 semanas"**  
❌ Não. 6 semanas é aggressive já.

**"Não aprovamos orçamento, vamos cheaper"**  
❌ Não. Falta R$ 50K = falha em algum lugar.

---

## 🚀 Próximo: Fase 1

Se tudo passou: Leia `FASE_1_ADOCAO_RAPIDA.md`

---

**Versão:** 1.0  
**Última atualização:** 2026-09-28  
**Status:** Pronto para usar
