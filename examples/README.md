# Examples

Example scenarios and custom simulations.

## Available Examples

### 1. Remote Work Transition (Default)
Run the default example:
```bash
python main.py
```

This simulates a company transitioning to 100% remote work.

### 2. Restructuring & Layoffs
```bash
cd examples
python create_custom_scenario.py
```

This creates a custom scenario about a company facing restructuring and layoffs. Demonstrates:
- How to define custom groups
- Different risk profiles and values
- Running multiple scenarios

## Creating Your Own Scenario

1. Copy an example scenario file
2. Modify the description and groups
3. Create a Python script to load and run it

Example template:

```python
from granovetter import Simulation

scenario = {
    "name": "Your Decision",
    "description": "What's the decision?",
    "context": "What's the context?"
}

org_data = {
    "organization": "Your Company",
    "size": 200,
    "groups": [
        {
            "name": "Person",
            "group": "Category",
            "population_percentage": 25,
            "values": ["value1", "value2"],
            "risk_profile": "medium",
            "typical_narrative": "How do they usually think?"
        }
    ]
}

sim = Simulation.from_file(scenario, org_data)
analysis = sim.run(rounds=3, verbose=True)
analysis.print_report()
sim.save_results()
```

## Tips

- Use 5-8 distinct groups for best results
- Make sure population percentages sum to ~100
- Be honest about values and narratives
- Run multiple times to test robustness
