# Data Format Guide

## Scenario File (JSON)

```json
{
  "name": "Descriptive scenario name",
  "description": "Full description of the decision, context, and constraints",
  "context": "What's happening in the org now",
  "decision_date": "ISO date (YYYY-MM-DD)"
}
```

Example: `scenarios/remote_work.json`

## Organization Profile (JSON)

```json
{
  "organization": "Company Name",
  "size": 300,
  "industry": "Tech",
  "context": "Current state: hybrid, losing talent, etc",
  "external_context": "Market conditions, competitive pressure",
  "culture": "Description of culture",
  "groups": [
    {
      "name": "Persona Name (e.g., 'Junior Engineers')",
      "group": "Category (e.g., 'Technical')",
      "population_percentage": 25,
      "values": ["list", "of", "core", "values"],
      "risk_profile": "low|medium|high",
      "typical_narrative": "How this group typically talks about work"
    }
  ]
}
```

### Group Structure

**Fields**:

- `name`: Individual persona name (e.g., "Carlos, Senior PM")
- `group`: Group category (e.g., "Product Management")
- `population_percentage`: % of org this represents
- `values`: List of core values (max 4-5)
  - Examples: autonomy, stability, growth, relationships, control
- `risk_profile`: low/medium/high
  - "low" = risk-averse, prefers stability
  - "medium" = balanced view
  - "high" = comfortable with change, early adopter
- `typical_narrative`: How this group usually frames issues (2-3 sentences)

### Example Group

```json
{
  "name": "Maria, Sales Manager",
  "group": "Sales",
  "population_percentage": 22,
  "values": ["relationships", "flexibility", "autonomy", "results"],
  "risk_profile": "medium",
  "typical_narrative": "We work from client sites anyway. Remote is fine for us, but we worry about losing office relationships and company culture."
}
```

## Output Format

Results are saved to `output/simulation_YYYYMMDD_HHMMSS.json`:

```json
{
  "metadata": {
    "scenario": "Scenario name",
    "agents": 6,
    "rounds": 3,
    "timestamp": "2026-09-28T14:30:00"
  },
  "scenario": {
    "description": "...",
    "org_context": "...",
    "external_context": "..."
  },
  "round_results": [
    {
      "round": 1,
      "stage": "individual",
      "results": [
        {
          "agent": "Person name",
          "group": "Group category",
          "response": "Their response",
          "stance": {
            "adoption_likelihood": 0.75,
            "resistance_strength": 0.25,
            "conformism": 0.3,
            "anxiety_level": 0.2
          }
        }
      ]
    }
  ],
  "analysis": {
    "summary": {
      "total_adoption_likelihood": 0.62,
      "total_resistance_likelihood": 0.38,
      "conformism_score": 0.45,
      "anxiety_score": 0.52,
      "group_fragmentation": 0.35
    },
    "adoption_by_group": {
      "Leadership": 0.45,
      "Junior Engineers": 0.82
    },
    "emerging_risks": {
      "fragmentation_risk": "..."
    },
    "scenario_probabilities": {
      "fast_adoption": 0.25,
      "slow_adoption_friction": 0.6,
      "polarization": 0.15
    }
  }
}
```

## Tips for Better Data

1. **Make profiles diverse**: Include 5-8 distinct groups, not just seniority levels
   - Include different functions (Engineering, Sales, Ops)
   - Include different backgrounds and experiences
   - Include people at different life stages

2. **Be honest about narratives**: These should reflect what you *actually* hear people say
   - Listen to actual conversations
   - Capture skepticism, concerns, hopes
   - Avoid corporate-speak

3. **Calibrate risk profiles**: 
   - "low" = would need strong case to change
   - "medium" = open to change if justified
   - "high" = energized by change

4. **Ground values in behavior**:
   - Don't list generic values like "integrity"
   - Use values that *drive decisions*: autonomy, stability, relationships, growth, control

5. **Scenario should be specific**:
   - Not: "Should we change?"
   - Yes: "Should we move from office to 100% remote in 3 months? Trade-offs include cost savings but potential culture impact"
