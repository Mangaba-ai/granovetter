import json
import os
from typing import List, Dict, Optional
from dataclasses import dataclass, asdict
from .agent import SyntheticAgent, AgentProfile
from .llm import LLMClient
from .analysis import SimulationAnalysis


@dataclass
class SimulationConfig:
    """Configuration for a simulation"""
    scenario_name: str
    scenario_text: str
    org_context: str
    external_context: str
    num_rounds: int = 3
    verbose: bool = True


class Simulation:
    """Orchestrates multi-agent behavioral simulation"""

    def __init__(self, config: SimulationConfig, llm: Optional[LLMClient] = None):
        self.config = config
        self.llm = llm or LLMClient()
        self.agents: List[SyntheticAgent] = []
        self.round_results: List[List[Dict]] = []
        self.analysis: Optional[SimulationAnalysis] = None

    @classmethod
    def from_file(cls, scenario_file: str, org_data_file: str) -> "Simulation":
        """Load simulation from JSON files"""

        with open(scenario_file, 'r', encoding='utf-8') as f:
            scenario_data = json.load(f)

        with open(org_data_file, 'r', encoding='utf-8') as f:
            org_data = json.load(f)

        config = SimulationConfig(
            scenario_name=scenario_data.get("name", "Unnamed"),
            scenario_text=scenario_data.get("description"),
            org_context=org_data.get("context"),
            external_context=org_data.get("external_context", "")
        )

        sim = cls(config)

        # Create agents from groups
        for group in org_data.get("groups", []):
            profile = AgentProfile(
                name=group.get("name"),
                group=group.get("group"),
                values=group.get("values", []),
                risk_profile=group.get("risk_profile", "medium"),
                population_percentage=group.get("population_percentage", 0),
                typical_narrative=group.get("typical_narrative", "")
            )

            agent = SyntheticAgent(profile, sim.llm)
            sim.agents.append(agent)

        return sim

    def run(self, rounds: Optional[int] = None, verbose: Optional[bool] = None) -> "SimulationAnalysis":
        """Execute the simulation"""

        rounds = rounds or self.config.num_rounds
        verbose = verbose if verbose is not None else self.config.verbose

        if verbose:
            print(f"\n{'='*60}")
            print(f"🎯 SIMULATION: {self.config.scenario_name}")
            print(f"{'='*60}\n")
            print(f"Scenario: {self.config.scenario_text}\n")
            print(f"Agents: {len(self.agents)}")
            print(f"Rounds: {rounds}\n")

        # Round 1: Individual reactions
        if verbose:
            print("📍 Round 1: Individual Reactions")
            print("-" * 60)

        individual_responses = []
        for agent in self.agents:
            if verbose:
                print(f"\n  {agent.profile.name} ({agent.profile.group}):")

            response = agent.react_individually(self.config.scenario_text)
            individual_responses.append({
                "agent": agent.profile.name,
                "group": agent.profile.group,
                "response": response.response,
                "stance": agent.extract_stance_vector()
            })

            if verbose:
                print(f"    → {response.response[:100]}...")

        self.round_results.append(individual_responses)

        # Rounds 2+: Social dynamics
        for round_num in range(2, rounds + 1):
            if verbose:
                print(f"\n📍 Round {round_num}: Social Dynamics")
                print("-" * 60)

            # Synthesize group sentiments
            consensus = self._synthesize_consensus(round_num - 1)
            opposition = self._synthesize_opposition(round_num - 1)

            if verbose:
                print(f"\n  Group Consensus: {consensus[:80]}...")
                print(f"  Opposition: {opposition[:80]}...\n")

            round_responses = []
            for agent in self.agents:
                if verbose:
                    print(f"  {agent.profile.name}:")

                response = agent.confront_social_pressure(consensus, opposition)
                round_responses.append({
                    "agent": agent.profile.name,
                    "group": agent.profile.group,
                    "response": response.response,
                    "stance": agent.extract_stance_vector()
                })

                if verbose:
                    print(f"    → {response.response[:100]}...")

            self.round_results.append(round_responses)

        # Analysis
        if verbose:
            print(f"\n{'='*60}")
            print("📊 Analyzing Results...")
            print(f"{'='*60}\n")

        self.analysis = SimulationAnalysis(
            agents=self.agents,
            round_results=self.round_results,
            config=self.config
        )

        return self.analysis

    def _synthesize_consensus(self, round_idx: int) -> str:
        """Synthesize group consensus from previous round"""

        responses = []
        for result in self.round_results[round_idx]:
            responses.append(f"- {result['agent']}: {result['response']}")

        synthesis_prompt = f"""Summarize the prevailing opinion from these organization members:

{chr(10).join(responses)}

What is the emerging consensus? (1-2 sentences)"""

        return self.llm.generate(synthesis_prompt).strip()

    def _synthesize_opposition(self, round_idx: int) -> str:
        """Synthesize opposing views from previous round"""

        responses = []
        stances = []

        for result in self.round_results[round_idx]:
            responses.append(f"- {result['agent']}: {result['response']}")
            stances.append(result['stance']['adoption_likelihood'])

        # Find most opposed voices
        avg_adoption = sum(stances) / len(stances) if stances else 0.5
        opposed_responses = [
            responses[i] for i, stance in enumerate(stances)
            if (stance < avg_adoption - 0.2)
        ]

        if not opposed_responses:
            return "Some members see risks and uncertainties."

        synthesis_prompt = f"""What concerns or objections are being raised?

{chr(10).join(opposed_responses)}

Summarize the opposition viewpoint (1-2 sentences)"""

        return self.llm.generate(synthesis_prompt).strip()

    def save_results(self, output_dir: str = "output") -> str:
        """Save simulation results to JSON"""

        if not self.analysis:
            raise RuntimeError("Run simulation first")

        os.makedirs(output_dir, exist_ok=True)

        timestamp = self._get_timestamp()
        filename = f"simulation_{timestamp}.json"
        filepath = os.path.join(output_dir, filename)

        results = {
            "metadata": {
                "scenario": self.config.scenario_name,
                "agents": len(self.agents),
                "rounds": self.config.num_rounds,
                "timestamp": timestamp
            },
            "scenario": {
                "description": self.config.scenario_text,
                "org_context": self.config.org_context,
                "external_context": self.config.external_context
            },
            "round_results": self.round_results,
            "analysis": asdict(self.analysis.summary())
        }

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

        return filepath

    @staticmethod
    def _get_timestamp() -> str:
        """Get current timestamp for filename"""
        from datetime import datetime
        return datetime.now().strftime("%Y%m%d_%H%M%S")
