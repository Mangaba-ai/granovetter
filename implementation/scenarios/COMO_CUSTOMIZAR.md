# Como Customizar Cenários para Sua Organização

Adapte a simulação Granovetter com dados reais da sua empresa.

---

## 📋 Passo 1: Coletar Dados de Sua Organização

Faça essas perguntas com sua liderança:

### Tamanho & Composição
- [ ] Quantas pessoas na empresa?
- [ ] Quantas por departamento? (Eng, Ops, Sales, etc)
- [ ] Quantas posições de liderança?
- [ ] Distribuição geográfica?

### Contexto Organizacional
- [ ] Qual é a cultura atual? (3-4 palavras)
- [ ] Qual é o clima? (Como as pessoas se sentem?)
- [ ] Qual é o maior risk de mudança para sua org?
- [ ] Qual é a maior oportunidade?

### Contexto Externo
- [ ] Qual é o estado do mercado? (aquecido, frio, competitivo?)
- [ ] Qual é a pressão por retenção de talento?
- [ ] Qual é o impacto de competidores remotos?
- [ ] Qual é a pressão regulatória?

### Grupos Principais
Para cada grupo, pergunte:
- Nome do grupo?
- % da população?
- Principais valores?
- Risk profile? (low/medium/high)
- Como eles falam sobre trabalho remoto?

---

## 📝 Passo 2: Criar Seu Cenário JSON

Use este template:

```json
{
  "name": "Sua Empresa — Transição Remota",
  "description": "Descrição da decisão que vocês estão considerando",
  "context": "Situação atual da organização",
  "decision_date": "Data da decisão"
}
```

### Exemplo Prático

```json
{
  "name": "TechCorp Brasil — 100% Remoto",
  "description": "Migrar de presencial para 100% remoto em 3 meses. Inclui redesenho de processos operacionais, treinamento de liderança, e comunicação com clientes.",
  "context": "Pós-pandemia. Mercado competitivo. Perdemos 3 eng sênior pro remoto.",
  "decision_date": "2026-09-28"
}
```

Salve como: `scenarios/sua_empresa.json`

---

## 👥 Passo 3: Definir Grupos Organizacionais

Crie um arquivo: `data/sua_empresa_org.json`

### Template

```json
{
  "organization": "Sua Empresa",
  "size": 350,
  "founded": 2010,
  "industry": "Seu setor",
  "context": "Situação atual",
  "external_context": "Pressões externas",
  "culture": "Descrição da cultura",
  "groups": [
    {
      "name": "Maria, VP de Eng",
      "group": "Leadership",
      "population_percentage": 5,
      "values": ["technical_excellence", "impact"],
      "risk_profile": "medium",
      "typical_narrative": "Como ela fala sobre remoto?"
    },
    {
      "name": "João, Eng Sênior",
      "group": "Engineering",
      "population_percentage": 12,
      "values": ["autonomy", "growth"],
      "risk_profile": "high",
      "typical_narrative": "Qual é a perspectiva dele?"
    }
    // ... mais grupos
  ]
}
```

### Dicas para Cada Campo

**name:** Nomes reais ou genéricos funcionam. Use um nome + título.

**group:** Categoria (Engineering, Sales, Operations, etc). Agrupe pessoas similares.

**population_percentage:** Soma total deve ser ~100.

**values:** 3-4 valores principais que DIRIGEM decisões:
- Não use: "integridade", "inovação" (genérico demais)
- Use: "autonomy", "stability", "relationships", "growth", "control"

**risk_profile:**
- "low" = avesso a risco, prefere status quo
- "medium" = balanceado
- "high" = embraces change, early adopter

**typical_narrative:** Como REALMENTE essa pessoa fala sobre mudança?
- Não use: "Apoio a decisão da empresa"
- Use: "Remoto funciona pra gente? Como vamos fazer reunião com clientes?"

---

## 🎯 Passo 4: Rodar Simulação com Seus Dados

```bash
# Copy o template
cp data/org_profile.json data/sua_empresa_org.json
cp scenarios/remote_work.json scenarios/sua_empresa.json

# Edite ambos com dados reais

# Rodar com seu cenário
cd ~/Downloads/granovetter
python -c "
from granovetter import Simulation

sim = Simulation.from_file(
    scenario='scenarios/sua_empresa.json',
    org_data='data/sua_empresa_org.json'
)

analysis = sim.run(rounds=3, verbose=True)
analysis.print_report()
sim.save_results()
"
```

---

## 📊 Passo 5: Interpretar Resultados

Após rodar, você terá:

### Saída no Terminal
```
📈 SUMMARY
─────────────────────────────────────────
  Adoption Likelihood: XX%
  Group Fragmentation: XX%
  
👥 ADOPTION BY GROUP
─────────────────────────────────────────
  [Seus grupos com %]
  
⚠️  EMERGING RISKS
─────────────────────────────────────────
  [Riscos específicos sua org]
```

### Output JSON
Arquivo: `output/simulation_TIMESTAMP.json`

Contém dados brutos para análise adicional.

---

## 🔍 Passo 6: Validar contra Dados Reais

Se possível:

1. Rode simulação com seus grupos
2. Faça survey real com mesmas pessoas
3. Compare:
   - % adoção simulado vs. real
   - Grupos que resistem (simulado) vs. real
   - Sentimentos/preocupações

**Meta:** 85%+ de correspondência

Se <85%, refine seus grupos/narrativas e rode novamente.

---

## 💡 Exemplos de Customização

### Exemplo 1: StartUp (50 pessoas)

```json
{
  "groups": [
    {
      "name": "CEO Founder",
      "group": "Leadership",
      "population_percentage": 2,
      "values": ["survival", "growth", "control"],
      "risk_profile": "high",
      "typical_narrative": "Remoto pode nos salvar em custo, mas preciso saber quem tá trabalhando"
    },
    {
      "name": "Eng Team",
      "group": "Engineering",
      "population_percentage": 60,
      "values": ["autonomy", "growth", "technical_excellence"],
      "risk_profile": "high",
      "typical_narrative": "Remoto é ótimo pra foco, sem interrupções"
    },
    {
      "name": "Operations/Admin",
      "group": "Operations",
      "population_percentage": 38,
      "values": ["stability", "routine", "security"],
      "risk_profile": "low",
      "typical_narrative": "Como funciona remoto pra nós? Somos skeleton crew..."
    }
  ]
}
```

### Exemplo 2: Enterprise (1000 pessoas)

```json
{
  "groups": [
    {
      "name": "C-Suite",
      "group": "Leadership",
      "population_percentage": 1,
      "values": ["brand", "control", "revenue"],
      "risk_profile": "low",
      "typical_narrative": "Cultura presencial é nossa identidade"
    },
    {
      "name": "Middle Management",
      "group": "Management",
      "population_percentage": 15,
      "values": ["visibility", "team_cohesion", "control"],
      "risk_profile": "low",
      "typical_narrative": "Como vou saber se estão trabalhando?"
    },
    {
      "name": "Individual Contributors",
      "group": "Engineering",
      "population_percentage": 50,
      "values": ["autonomy", "focus", "flexibility"],
      "risk_profile": "high",
      "typical_narrative": "Remoto é premium pra gente"
    },
    {
      "name": "Support/Operations",
      "group": "Operations",
      "population_percentage": 20,
      "values": ["stability", "hierarchy", "routine"],
      "risk_profile": "low",
      "typical_narrative": "Precisamos estar presentes"
    },
    {
      "name": "Sales",
      "group": "Sales",
      "population_percentage": 14,
      "values": ["relationships", "results", "flexibility"],
      "risk_profile": "medium",
      "typical_narrative": "Já trabalhamos remotamente... mas clientes?"
    }
  ]
}
```

---

## 🚀 Passo 7: Usar Resultados para Planejar

Após customizar e rodar:

1. **Se adoção é baixa (<50%):**
   - Identifique grupos de resistência
   - Trabalhe intervenções específicas para eles
   - Consider estender timeline

2. **Se fragmentação é alta (>40%):**
   - Diferenças grandes entre grupos
   - Precisam de messaging customizado
   - Não é "one-size-fits-all"

3. **Se riscos críticos surgem:**
   - Foque mitigação em risco #1
   - Use recursos lá primeiro
   - Valide piloto antes de full rollout

---

## 📝 Checklist Customização

- [ ] Coletei dados de minha organização
- [ ] Criei `scenarios/sua_empresa.json`
- [ ] Criei `data/sua_empresa_org.json`
- [ ] Rodei simulação com meus dados
- [ ] Interpretei resultados
- [ ] Comparei com sentimentos reais na org
- [ ] Refinei grupos/narrativas se necessário
- [ ] Tenho % adoção por grupo
- [ ] Identifiquei riscos específicos minha org
- [ ] Estou pronto pra FASE 0

---

## 💬 Perguntas Comuns

**P: Minha org não tem grupos tão claros**  
R: Crie grupos por similaridade de perspectiva, não só departamento. Pode ser cross-functional.

**P: Como estimar % da população?**  
R: Conte cabeças reais. Se tem 100 eng e 20 ops, então eng=83%, ops=17%.

**P: Minha org é muito pequena (< 20 pessoas)**  
R: Ainda funciona! Crie grupos por pessoa ou dupla.

**P: E se não tiver survey real para validar?**  
R: Pergunte a líderes "qual é o sentimento real?" sobre remoto. Quase sempre acertam.

---

## 📞 Próximo Passo

Rodou com seus dados? Ótimo!

1. Use resultados para customizar PLANO_ACAO.md
2. Comece FASE_0_PREPARACAO.md
3. Configure tracking em `PROGRESS_TRACKER.csv`

---

**Versão:** 1.0  
**Última atualização:** 2026-09-28
