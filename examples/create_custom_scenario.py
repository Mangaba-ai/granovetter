#!/usr/bin/env python3
"""
Example: Create and run a custom scenario
"""

import json
import sys
sys.path.insert(0, '..')

from granovetter import Simulation
from granovetter.llm import LLMClient


def create_scenario():
    """Example: Evaluate a layoff decision"""

    scenario = {
        "name": "Restructuring & Layoffs",
        "description": """
The company is facing revenue shortfall. Leadership proposes:
- 15% headcount reduction
- Focus on profitability over growth
- 6-month transition period
- Severance: 1 month per year + extended health insurance

This affects job security, career development, and team morale.
""",
        "context": "Post-IPO company, slower growth than expected",
        "decision_date": "2026-09-28"
    }

    org_data = {
        "organization": "GrowthCorp",
        "size": 450,
        "industry": "SaaS",
        "context": "Been growing fast (400→450 in 1 year). Now growth slowing.",
        "external_context": "Market cooling, IPO underperformed, competition heating up",
        "culture": "Previously high-growth, very ambitious. Now uncertain.",
        "groups": [
            {
                "name": "CFO & Finance Team",
                "group": "Finance",
                "population_percentage": 5,
                "values": ["profitability", "prudence", "survival"],
                "risk_profile": "low",
                "typical_narrative": "We need to cut costs to survive. This is the only way."
            },
            {
                "name": "Senior Engineering Leaders",
                "group": "Engineering Leadership",
                "population_percentage": 8,
                "values": ["team_care", "technical_excellence", "business_health"],
                "risk_profile": "medium",
                "typical_narrative": "Layoffs hurt, but I understand the business case. I worry about team morale."
            },
            {
                "name": "Senior Individual Contributors",
                "group": "Senior Engineers",
                "population_percentage": 12,
                "values": ["autonomy", "impact", "career_growth"],
                "risk_profile": "medium",
                "typical_narrative": "This changes the culture. Will the company even exist in 3 years? Should I look elsewhere?"
            },
            {
                "name": "Mid-level Engineers",
                "group": "Engineers",
                "population_percentage": 35,
                "values": ["stability", "learning", "team"],
                "risk_profile": "low",
                "typical_narrative": "I have a mortgage. Will I lose my job? What if I do? Scared."
            },
            {
                "name": "Product & Design",
                "group": "Product",
                "population_percentage": 15,
                "values": ["customer_value", "speed", "impact"],
                "risk_profile": "high",
                "typical_narrative": "Layoffs slow us down. This makes us lose to competitors. Bad strategy."
            },
            {
                "name": "Sales & Marketing",
                "group": "Go-to-Market",
                "population_percentage": 25,
                "values": ["revenue", "growth", "competition"],
                "risk_profile": "high",
                "typical_narrative": "We're cutting the wrong people. We need to grow revenue, not shrink. Demoralized."
            }
        ]
    }

    return scenario, org_data


def main():
    """Run the custom scenario"""

    print("\n🎯 Custom Scenario Example: Restructuring Announcement\n")

    # Create data
    scenario, org_data = create_scenario()

    # Save files
    with open("../scenarios/restructuring.json", 'w') as f:
        json.dump(scenario, f, indent=2, ensure_ascii=False)

    with open("../data/growthcorp.json", 'w') as f:
        json.dump(org_data, f, indent=2, ensure_ascii=False)

    print("✅ Scenario files created:")
    print("   - scenarios/restructuring.json")
    print("   - data/growthcorp.json\n")

    # Load and run simulation
    print("🚀 Running simulation...\n")

    try:
        simulation = Simulation.from_file(
            "../scenarios/restructuring.json",
            "../data/growthcorp.json"
        )

        analysis = simulation.run(rounds=3, verbose=True)
        analysis.print_report()

        output_file = simulation.save_results("../output")
        print(f"\n💾 Results saved: {output_file}")

    except RuntimeError as e:
        print(f"❌ Error: {e}")
        print("\nMake sure Ollama is running:")
        print("  ollama serve")
        sys.exit(1)


if __name__ == "__main__":
    main()
