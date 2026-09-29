# Quick Start Guide

## Prerequisites

- Python 3.9+
- Ollama running locally (or edit `.env` for OpenAI API key)
- 5 minutes

## 1. Install Dependencies

```bash
cd syntheia
pip install -r requirements.txt
```

## 2. Start Ollama (if not running)

```bash
# In a separate terminal
ollama serve
```

Ensure you have a model:
```bash
ollama pull qwen2.5-7b
```

Or use a different model—edit `.env` to change `LLM_MODEL`.

## 3. Run Example Simulation

```bash
python main.py
```

You'll see:
1. **Round 1**: Individual reactions from each agent
2. **Round 2-3**: Social dynamics and group pressure
3. **Analysis**: Adoption likelihood, risks, recommendations

Results are saved to `output/simulation_*.json`

## 4. Examine Results

Open `output/simulation_*.json` to see detailed round-by-round responses.

## 5. Create Your Own Scenario

### A. Create Scenario File
`scenarios/my_decision.json`:
```json
{
  "name": "My Decision",
  "description": "What decision are we testing?",
  "context": "What's happening now?"
}
```

### B. Create Organization Profile
`data/my_org.json`:
```json
{
  "organization": "My Company",
  "size": 200,
  "groups": [
    {
      "name": "John, CTO",
      "group": "Leadership",
      "population_percentage": 10,
      "values": ["innovation", "stability"],
      "risk_profile": "medium",
      "typical_narrative": "We need to balance growth with security."
    },
    {
      "name": "Sarah, Engineer",
      "group": "Engineering",
      "population_percentage": 50,
      "values": ["autonomy", "growth"],
      "risk_profile": "high",
      "typical_narrative": "Let's try new tech!"
    }
  ]
}
```

### C. Run Your Simulation

```python
from syntheia import Simulation

sim = Simulation.from_file(
    scenario="scenarios/my_decision.json",
    org_data="data/my_org.json"
)

analysis = sim.run(rounds=3, verbose=True)
analysis.print_report()
sim.save_results()
```

## Example Output

```
📈 SUMMARY
─────────────────────────────────────────
  Adoption Likelihood: 62.5%
  Resistance Likelihood: 37.5%
  Group Fragmentation: 32.1%

👥 ADOPTION BY GROUP
─────────────────────────────────────────
  Leadership           ████████░░░░░░░░░░░░ 40.0%
  Engineering          █████████████████░░░ 85.0%
  Operations           ██████░░░░░░░░░░░░░░ 30.0%

⚠️  EMERGING RISKS
─────────────────────────────────────────
  • Fragmentation Risk: Groups diverge significantly
  • Leadership Concern: Executive resistance could cascade
```

## Tips

- **For accuracy**: Fill in real group profiles from your org
- **For validation**: Compare simulated results vs. real surveys
- **For iteration**: Tweak profiles, re-run, converge on realistic model

## Troubleshooting

**"Cannot connect to Ollama"**
- Make sure `ollama serve` is running
- Check `.env` `LLM_BASE_URL` (default: http://localhost:11434)

**"Model not found"**
```bash
ollama pull qwen2.5-7b
# Or use a different model
ollama list
```

**Want faster responses?**
Use a smaller model:
```bash
ollama pull qwen2.5-3b
# Edit .env: LLM_MODEL=qwen2.5-3b
```

**Want more detailed analysis?**
Edit `.env`: `SIMULATION_ROUNDS=5` (more rounds = more nuance)

---

**Next**: Read [Theory Guide](docs/theory.md) and [Data Format](docs/data_format.md)
