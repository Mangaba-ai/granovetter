# Granovetter — Behavioral Simulation Lab

Simulador de dinâmica social e tipping points organizacionais usando IA generativa.
Baseado na literatura de Mark Granovetter sobre limiares sociais e cascatas comportamentais.

Teste decisões antes de implementar. Identifique tipping points e riscos emergentes.

```
ENTRADA (Dados)  →  AGENTES SINTÉTICOS  →  SIMULAÇÃO (N rounds)  →  ANÁLISE PROBABILÍSTICA
```

## 🎯 Features

- ✅ Agentes sintéticos baseados em perfis reais
- ✅ Dinâmica de grupo (Round 1: individual → Round 2+: social)
- ✅ Análise de padrões, riscos e probabilidades
- ✅ Suporte a LLM local (Ollama) ou API
- ✅ Visualização de resultados
- ✅ Expandível para N grupos e cenários

## 🚀 Quick Start

```bash
# 1. Instalar deps
pip install -r requirements.txt

# 2. Rodar simulação de exemplo
python main.py

# 3. Ver resultados em output/simulation_*.json
```

## 📁 Estrutura

```
granovetter/
├── main.py                 # Entry point
├── requirements.txt
├── granovetter/
│   ├── __init__.py
│   ├── agent.py           # Classe SyntheticAgent
│   ├── simulation.py      # Orquestração
│   ├── llm.py            # Interface LLM (Ollama/OpenAI)
│   ├── analysis.py       # Análise de resultados
│   └── utils.py          # Helpers
├── scenarios/             # Cenários de decisão
│   └── remote_work.json
├── data/                  # Dados de entrada
│   └── org_profile.json
└── output/                # Resultados
    └── simulation_*.json
```

## 📊 Exemplo

```python
from granovetter.simulation import Simulation
from granovetter.agent import SyntheticAgent

# Carregar cenário e perfis
simulation = Simulation.from_file(
    scenario="scenarios/remote_work.json",
    org_data="data/org_profile.json"
)

# Rodar 3 rounds de simulação
results = simulation.run(rounds=3, verbose=True)

# Análise
print(results.summary())
print(results.scenarios())
print(results.risks())
```

## 🔧 Configuração

Edite `.env` para LLM:

```
LLM_PROVIDER=ollama  # ou openai, anthropic
LLM_MODEL=qwen2.5-7b
LLM_BASE_URL=http://localhost:11434
```

## 📖 Leitura

- [Agents as Behavioral Models](./docs/theory.md)
- [Data Format Guide](./docs/data_format.md)
- [Architecture](./ARCHITECTURE.md)
