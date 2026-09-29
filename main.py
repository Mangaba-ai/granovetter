#!/usr/bin/env python3
"""
Granovetter — Behavioral Simulation Lab
Entry point for running a simulation
Based on Mark Granovetter's work on social thresholds and tipping points
"""

import os
import sys
from granovetter import Simulation
from granovetter.llm import LLMClient
from granovetter.utils import print_banner


def main():
    """Run simulation"""

    print_banner("GRANOVETTER — Behavioral Simulation Lab v0.1.0")

    # Check LLM health
    print("🔍 Checking LLM connectivity...")
    llm = LLMClient()

    if not llm.health_check():
        print(f"❌ ERROR: Cannot connect to Ollama at {llm.base_url}")
        print("\nMake sure Ollama is running:")
        print(f"  ollama serve")
        print(f"\nThen ensure model {llm.model} is available:")
        print(f"  ollama pull {llm.model}")
        sys.exit(1)

    print(f"✅ Connected to {llm.provider.upper()}")
    print(f"   Model: {llm.model}\n")

    # Load simulation
    print("📂 Loading scenario and organization data...")

    scenario_file = "scenarios/remote_work.json"
    org_data_file = "data/org_profile.json"

    if not os.path.exists(scenario_file):
        print(f"❌ Scenario file not found: {scenario_file}")
        sys.exit(1)

    if not os.path.exists(org_data_file):
        print(f"❌ Organization data file not found: {org_data_file}")
        sys.exit(1)

    simulation = Simulation.from_file(scenario_file, org_data_file)
    print(f"✅ Loaded {len(simulation.agents)} agent profiles\n")

    # Run simulation
    print("🎬 Running simulation...")
    analysis = simulation.run(rounds=3, verbose=True)

    # Print analysis
    analysis.print_report()

    # Save results
    print("💾 Saving results...")
    output_file = simulation.save_results()
    print(f"✅ Results saved to: {output_file}\n")

    return 0


if __name__ == "__main__":
    sys.exit(main())
