# Architecture — Granovetter

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│              SYNTHEIA SYSTEM FLOW                        │
└─────────────────────────────────────────────────────────┘

INPUT LAYER
  └─ Scenario (JSON)       → Decision to test
  └─ Org Profile (JSON)    → Groups + behaviors

AGENT LAYER
  └─ SyntheticAgent        → LLM-backed personas
  └─ AgentProfile          → Values, narratives
  └─ LLMClient             → Ollama/OpenAI abstraction

SIMULATION LAYER
  └─ Simulation            → Multi-round orchestration
  └─ Round 1               → Individual reactions
  └─ Round 2+              → Social dynamics

ANALYSIS LAYER
  └─ SimulationAnalysis    → Extract insights
  └─ Quantitative metrics  → Stance vectors, stats
  └─ Qualitative insights  → Risks, scenarios, recs

OUTPUT LAYER
  └─ JSON Report           → Full results
  └─ Terminal Report       → Human-readable summary
```

## File Structure

```
granovetter/
├── granovetter/              # Core library
│   ├── __init__.py
│   ├── agent.py          # SyntheticAgent class
│   ├── simulation.py      # Simulation orchestration
│   ├── analysis.py        # Results analysis
│   ├── llm.py            # LLM interface
│   └── utils.py          # Helpers
│
├── data/                  # Organization profiles
│   └── org_profile.json
│
├── scenarios/             # Decision scenarios
│   └── remote_work.json
│
├── examples/              # Example scenarios & scripts
│   ├── create_custom_scenario.py
│   └── README.md
│
├── output/                # Simulation results (generated)
│   └── simulation_*.json
│
├── docs/                  # Documentation
│   ├── theory.md         # Scientific foundations
│   └── data_format.md    # Data schemas
│
├── main.py               # Entry point
├── setup.sh              # Environment setup
├── QUICKSTART.md         # 5-minute guide
├── README.md             # Project overview
├── requirements.txt      # Python dependencies
└── .env                  # Configuration
```

## Class Hierarchy

```
SyntheticAgent
├── profile: AgentProfile
├── llm: LLMClient
├── memory: List[AgentResponse]
├── react_individually(scenario) → AgentResponse
├── confront_social_pressure(consensus, opposition) → AgentResponse
└── extract_stance_vector() → Dict[stance metrics]

AgentProfile
├── name: str
├── group: str
├── values: List[str]
├── risk_profile: str
├── population_percentage: float
└── typical_narrative: str

Simulation
├── config: SimulationConfig
├── llm: LLMClient
├── agents: List[SyntheticAgent]
├── round_results: List[List[Dict]]
├── run(rounds: int) → SimulationAnalysis
└── save_results(output_dir) → filepath

SimulationAnalysis
├── summary() → SimulationSummary
├── adoption_by_group() → Dict[str, float]
├── resistance_clusters() → List[Dict]
├── emerging_risks() → Dict[str, str]
├── scenario_probabilities() → Dict[str, float]
├── recommendations() → List[str]
└── print_report() → None

LLMClient
├── provider: str (ollama|openai|anthropic)
├── model: str
├── generate(prompt, system) → str
└── health_check() → bool
```

## Data Flow

```
main.py
  │
  ├─ Load Scenario JSON
  ├─ Load Org Profile JSON
  │
  └─ Create Simulation
      │
      ├─ Instantiate LLMClient
      ├─ Create SyntheticAgent for each group
      │
      └─ run(rounds=3)
          │
          ├─ ROUND 1: Individual Reactions
          │   ├─ For each agent:
          │   │   ├─ Call llm.generate(prompt)
          │   │   ├─ Parse response
          │   │   └─ Extract stance vector
          │   └─ Store round_results[0]
          │
          ├─ ROUND 2: Social Pressure
          │   ├─ Synthesize consensus from Round 1
          │   ├─ Synthesize opposition from Round 1
          │   ├─ For each agent:
          │   │   ├─ Call llm.generate(prompt with consensus)
          │   │   └─ Extract stance vector
          │   └─ Store round_results[1]
          │
          ├─ ROUND 3+: Group Dynamics
          │   └─ (Repeat ROUND 2 pattern)
          │
          └─ Create SimulationAnalysis
              ├─ Compute summary statistics
              ├─ Analyze adoption by group
              ├─ Identify risks
              ├─ Estimate scenarios
              └─ Generate recommendations
                  │
                  └─ save_results()
                      └─ output/simulation_*.json
```

## LLM Integration Points

### LLMClient Interface

```python
llm = LLMClient(provider="ollama", model="qwen2.5-7b")

# Generate response
response = llm.generate(
    prompt="...",
    system="You are ..."
)

# Health check
is_healthy = llm.health_check()
```

### Prompt Structure

Each agent gets:

1. **System Prompt** (defines persona)
   - Name, role, values, risk profile
   - Typical perspective
   
2. **User Prompt** (context for this round)
   - Scenario / group sentiment / opposing view
   - Question to answer

3. **LLM Response** (agent stance)
   - Natural language answer
   - Parsed into stance vector

### Example System Prompt

```
You are Alice, a Junior Engineer at TechCorp.
Your core values: autonomy, growth, work-life-balance
Your risk profile: high (you're comfortable with change)
Your typical perspective: "Remote work is great! I get flexibility and no commute."

Instructions:
- You're responding BEFORE you know what others think
- Be authentic. Show your real reaction.
- Keep response concise (2-3 sentences)
- Avoid corporate jargon.
```

### Example User Prompt

```
Scenario: The company is planning to migrate to 100% remote work in 3 months.
What is your honest, individual reaction to this decision?
```

## Configuration

Edit `.env`:

```bash
# LLM
LLM_PROVIDER=ollama
LLM_MODEL=qwen2.5-7b
LLM_BASE_URL=http://localhost:11434
LLM_TEMPERATURE=0.7
LLM_MAX_TOKENS=500

# Simulation
SIMULATION_ROUNDS=3
SIMULATION_VERBOSE=true

# Output
OUTPUT_DIR=output
OUTPUT_FORMAT=json
```

## Extensibility

### Add New LLM Provider

```python
# granovetter/llm.py
def _openai_generate(self, prompt, system):
    # Implement OpenAI API call
    pass
```

### Add New Analysis Metric

```python
# granovetter/analysis.py
def polarization_score(self) -> float:
    # Calculate polarization metric
    pass
```

### Add New Scenario Type

```bash
# Create new scenario file
scenarios/my_scenario.json

# Create new org profile
data/my_org.json

# Run it
python main.py
```

## Performance Characteristics

- **Round 1 (Individual)**: ~3-5 seconds per agent
- **Rounds 2+ (Social)**: ~4-6 seconds per agent per round
- **Analysis**: <1 second
- **Total for 6 agents, 3 rounds**: ~2-3 minutes

Scales linearly with agents and rounds.

## Validation Strategy

To validate Granovetter against real data:

1. Run simulation
2. Collect real survey/feedback
3. Compare metrics:
   - Adoption: simulated % vs. real %
   - Resistance clusters: overlap?
   - Sentiment: match?
4. Iterate on profiles

Target: 80-95% correspondence
