# Implementação — Granovetter Action Plan

Kit completo para executar a transição para trabalho remoto em sua organização.

## 📁 Estrutura

```
implementation/
├── README.md                           # Este arquivo
├── templates/                          # Documentos prontos para usar
│   ├── COMUNICACAO_INTERNA.md         # Emails, posts, slides
│   ├── TOWN_HALL_SCRIPT.md            # Roteiro do CEO
│   ├── WORKSHOP_LIDERANCA.md          # Agenda + slides
│   └── CHECKLIST_GRUPOS.md            # Por grupo
├── scripts/                            # Ferramentas de execução
│   ├── monitor_progresso.py            # Dashboard de progresso
│   ├── feedback_survey.py              # Coleta de feedback
│   └── relatorio_semanal.py            # Status automático
├── tracking/                           # Rastreamento
│   └── PROGRESS_TRACKER.csv            # Checklist executável
├── scenarios/                          # Cenários customizados prontos
│   ├── cenario_sua_org.json
│   └── COMO_CUSTOMIZAR.md
└── guides/                             # Guias por fase
    ├── FASE_0_PREPARACAO.md
    ├── FASE_1_ADOCAO_RAPIDA.md
    ├── FASE_2_GO_LIVE.md
    └── FASE_3_CONSOLIDACAO.md
```

## 🚀 Quick Start Implementação

```bash
# 1. Customize para sua organização
cd scenarios/
# Edite cenario_sua_org.json com dados reais

# 2. Rodar simulação com seus dados
cd ../..
python main.py  # ou customize o path

# 3. Iniciar rastreamento
cd implementation/tracking/
# Abra PROGRESS_TRACKER.csv e comece a preencher

# 4. Semana 1: Preparação
cd ../guides/
cat FASE_0_PREPARACAO.md

# 5. Semana -4: Comunicação
cd ../templates/
# Use COMUNICACAO_INTERNA.md
```

## 📋 Como Usar Este Kit

### Para CEO/Executivos
1. Leia: `guides/FASE_0_PREPARACAO.md`
2. Use: `templates/TOWN_HALL_SCRIPT.md`
3. Rastreie: `tracking/PROGRESS_TRACKER.csv`

### Para Gestores de Projeto
1. Leia: Todas as FASES em `guides/`
2. Execute: Checklist em cada guia
3. Monitore: Script `scripts/monitor_progresso.py`

### Para RH/Comunicação
1. Use: `templates/COMUNICACAO_INTERNA.md`
2. Customize: Datas, nomes, contexto
3. Envie: Seguindo cronograma em FASE_0

### Para Engenharia/Liderança Técnica
1. Leia: `guides/FASE_1_ADOCAO_RAPIDA.md`
2. Recrute: Campeões (template em `templates/`)
3. Implemente: Go-live em `guides/FASE_2_GO_LIVE.md`

## 📊 Cronograma

```
HOJE (Semana -8)
  ↓
FASE 0: Preparação (Semanas -8 a -6)
  ├─ [ ] Ler guia FASE_0_PREPARACAO.md
  ├─ [ ] Customizar cenário
  ├─ [ ] Roddar simulação
  └─ [ ] Apresentar a executivos
  
FASE 1: Adoção Rápida (Semanas -5 a -1)
  ├─ [ ] Comunicação inicial
  ├─ [ ] Recrutar Campeões
  ├─ [ ] Workshop Liderança
  └─ [ ] Diálogos com clientes
  
FASE 2: Go-Live (Semanas 0-4)
  ├─ [ ] Semana 0: Eng.
  ├─ [ ] Semana 1: Vendas + Exec
  ├─ [ ] Semana 2: Gestão
  └─ [ ] Semana 3: Ops
  
FASE 3: Consolidação (Semanas 5-12)
  ├─ [ ] Estabilização
  ├─ [ ] Lições aprendidas
  └─ [ ] Comunicação vitória
```

## 🎯 Próximos Passos

1. **Customize seu cenário** (5 min)
   ```bash
   cp scenarios/cenario_sua_org.json scenarios/sua_empresa.json
   # Edite com dados reais
   ```

2. **Rode simulação com seus dados** (2-3 min)
   ```bash
   python main.py  # Com seu cenário
   ```

3. **Configure rastreamento** (5 min)
   ```bash
   cd tracking/
   # Abra PROGRESS_TRACKER.csv
   # Comece a preencher
   ```

4. **Leia Fase 0** (15 min)
   ```bash
   cat guides/FASE_0_PREPARACAO.md
   ```

5. **Comece as reuniões de preparação** (Esta semana)

---

## 📞 Referência Rápida

| Item | Arquivo | Tempo |
|------|---------|-------|
| Entender plano | PLANO_ACAO.md | 30 min |
| Customizar org | scenarios/ | 10 min |
| Rodar simulação | main.py | 5 min |
| Leia Fase | guides/ | 15 min |
| Use template | templates/ | 5 min |
| Configure tracking | tracking/ | 5 min |

**Total para começar: 1 hora**

---

## ✅ Checklist de Preparação

- [ ] Li PLANO_ACAO.md
- [ ] Customizei cenário com dados reais
- [ ] Rodei simulação
- [ ] Comecei preenchendo PROGRESS_TRACKER.csv
- [ ] Agendei first team meeting
- [ ] Designei Comitê de Mudança
- [ ] Aprovei orçamento R$ 189.8K

---

**Versão:** 1.0  
**Última atualização:** 2026-09-28  
**Status:** Pronto para implementação

Qualquer dúvida? Veja `COMO_CUSTOMIZAR.md` em `scenarios/`
