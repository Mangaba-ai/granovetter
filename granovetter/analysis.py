from typing import List, Dict, Optional
from dataclasses import dataclass
from collections import defaultdict
from .agent import SyntheticAgent
from .simulation import SimulationConfig


@dataclass
class SimulationSummary:
    """Summary statistics of simulation"""
    total_adoption_likelihood: float
    total_resistance_likelihood: float
    conformism_score: float
    anxiety_score: float
    group_fragmentation: float

    def __repr__(self) -> str:
        return (
            f"Summary(\n"
            f"  Adoption: {self.total_adoption_likelihood:.1%}\n"
            f"  Resistance: {self.total_resistance_likelihood:.1%}\n"
            f"  Conformism: {self.conformism_score:.1%}\n"
            f"  Anxiety: {self.anxiety_score:.1%}\n"
            f"  Fragmentation: {self.group_fragmentation:.1%}\n"
            f")"
        )


class SimulationAnalysis:
    """Analyze results from simulation"""

    def __init__(
        self,
        agents: List[SyntheticAgent],
        round_results: List[List[Dict]],
        config: SimulationConfig
    ):
        self.agents = agents
        self.round_results = round_results
        self.config = config

    def summary(self) -> SimulationSummary:
        """Generate summary statistics"""

        final_round = self.round_results[-1]

        stances = [r['stance'] for r in final_round]

        adoption_scores = [s['adoption_likelihood'] for s in stances]
        resistance_scores = [s['resistance_strength'] for s in stances]
        conformism_scores = [s['conformism'] for s in stances]
        anxiety_scores = [s['anxiety_level'] for s in stances]

        avg_adoption = sum(adoption_scores) / len(adoption_scores)
        avg_resistance = sum(resistance_scores) / len(resistance_scores)
        avg_conformism = sum(conformism_scores) / len(conformism_scores)
        avg_anxiety = sum(anxiety_scores) / len(anxiety_scores)

        # Group fragmentation: std dev of adoption scores
        if len(adoption_scores) > 1:
            variance = sum((x - avg_adoption) ** 2 for x in adoption_scores) / len(adoption_scores)
            fragmentation = (variance ** 0.5) / (avg_adoption + 0.001)  # normalize
            fragmentation = min(1.0, fragmentation)
        else:
            fragmentation = 0.0

        return SimulationSummary(
            total_adoption_likelihood=avg_adoption,
            total_resistance_likelihood=avg_resistance,
            conformism_score=avg_conformism,
            anxiety_score=avg_anxiety,
            group_fragmentation=fragmentation
        )

    def adoption_by_group(self) -> Dict[str, float]:
        """Likelihood of adoption by organizational group"""

        final_round = self.round_results[-1]

        group_scores = defaultdict(list)
        for result in final_round:
            group = result['group']
            score = result['stance']['adoption_likelihood']
            group_scores[group].append(score)

        adoption_by_group = {}
        for group, scores in group_scores.items():
            adoption_by_group[group] = sum(scores) / len(scores)

        return adoption_by_group

    def resistance_clusters(self) -> List[Dict]:
        """Identify clusters of resistance"""

        final_round = self.round_results[-1]

        resisters = [
            {
                "name": r['agent'],
                "group": r['group'],
                "resistance": r['stance']['resistance_strength'],
                "quote": self._extract_resistance_quote(r)
            }
            for r in final_round
            if r['stance']['resistance_strength'] > 0.5
        ]

        return sorted(resisters, key=lambda x: x['resistance'], reverse=True)

    def adoption_drivers(self) -> List[Dict]:
        """Identify drivers of adoption"""

        final_round = self.round_results[-1]

        adopters = [
            {
                "name": r['agent'],
                "group": r['group'],
                "adoption": r['stance']['adoption_likelihood'],
                "quote": self._extract_adoption_quote(r)
            }
            for r in final_round
            if r['stance']['adoption_likelihood'] > 0.6
        ]

        return sorted(adopters, key=lambda x: x['adoption'], reverse=True)

    def emerging_risks(self) -> Dict[str, str]:
        """Identify emerging risks from simulation"""

        summary = self.summary()
        adoption_by_group = self.adoption_by_group()

        risks = {}

        # Risk 1: High anxiety
        if summary.anxiety_score > 0.6:
            risks["anxiety_risk"] = (
                f"High anxiety/uncertainty detected ({summary.anxiety_score:.0%}). "
                "Employees worried about impact, unclear transition path. "
                "→ Action: Clear communication, support resources."
            )

        # Risk 2: Fragmentation
        if summary.group_fragmentation > 0.4:
            risks["fragmentation_risk"] = (
                f"Significant disagreement between groups ({summary.group_fragmentation:.0%}). "
                f"Groups diverge on adoption. "
                "→ Action: Tailor messaging, address group-specific concerns."
            )

        # Risk 3: Leadership resistance
        leadership_adoption = adoption_by_group.get("Leadership", 0.5)
        if leadership_adoption < 0.4:
            risks["leadership_risk"] = (
                f"Leadership resistance detected ({1-leadership_adoption:.0%}). "
                "Undermines change cascade. "
                "→ Action: Executive alignment workshop."
            )

        # Risk 4: High conformism
        if summary.conformism_score > 0.7:
            risks["conformism_risk"] = (
                f"High conformism detected ({summary.conformism_score:.0%}). "
                "Opinions may be performative, not authentic. "
                "→ Action: Anonymous feedback, psychological safety building."
            )

        return risks

    def scenario_probabilities(self) -> Dict[str, float]:
        """Estimate probability of different outcomes"""

        summary = self.summary()
        adoption_by_group = self.adoption_by_group()

        scenarios = {}

        # Scenario 1: Fast adoption
        if summary.total_adoption_likelihood > 0.7:
            scenarios["fast_adoption"] = min(
                summary.total_adoption_likelihood * (1 - summary.anxiety_score * 0.3),
                1.0
            )
        else:
            scenarios["fast_adoption"] = 0.15

        # Scenario 2: Slow adoption with friction
        scenarios["slow_adoption_friction"] = (
            (1 - summary.total_adoption_likelihood) * 0.6 +
            summary.group_fragmentation * 0.3 +
            summary.anxiety_score * 0.1
        )

        # Scenario 3: Polarization
        if summary.group_fragmentation > 0.5:
            scenarios["polarization"] = summary.group_fragmentation * 0.7
        else:
            scenarios["polarization"] = 0.1

        # Normalize to sum to 1.0
        total = sum(scenarios.values())
        scenarios = {k: v/total for k, v in scenarios.items()}

        return scenarios

    def recommendations(self) -> List[str]:
        """Generate recommendations based on analysis"""

        summary = self.summary()
        adoption_by_group = self.adoption_by_group()
        risks = self.emerging_risks()

        recommendations = []

        # Based on adoption likelihood
        if summary.total_adoption_likelihood < 0.4:
            recommendations.append(
                "🔴 Low adoption likelihood. Reconsider decision or pivot approach."
            )
        elif summary.total_adoption_likelihood < 0.6:
            recommendations.append(
                "🟡 Moderate adoption. Requires strong change management and communication."
            )
        else:
            recommendations.append(
                "🟢 High adoption likelihood. Proceed with standard implementation."
            )

        # Group-specific
        for group, adoption in adoption_by_group.items():
            if adoption < 0.4:
                recommendations.append(
                    f"   → {group}: Tailor messaging to address specific concerns."
                )

        # Anxiety management
        if summary.anxiety_score > 0.5:
            recommendations.append(
                "Establish anxiety-reduction program: clear FAQ, town halls, mentoring."
            )

        # Fragmentation
        if summary.group_fragmentation > 0.4:
            recommendations.append(
                "Run cross-group workshops to build alignment and reduce silos."
            )

        return recommendations

    def print_report(self):
        """Print a formatted report"""

        print("\n" + "="*70)
        print("📊 SIMULATION ANALYSIS REPORT")
        print("="*70 + "\n")

        print("📈 SUMMARY")
        print("-"*70)
        summary = self.summary()
        print(f"  Adoption Likelihood: {summary.total_adoption_likelihood:.1%}")
        print(f"  Resistance Likelihood: {summary.total_resistance_likelihood:.1%}")
        print(f"  Conformism Score: {summary.conformism_score:.1%}")
        print(f"  Anxiety Level: {summary.anxiety_score:.1%}")
        print(f"  Group Fragmentation: {summary.group_fragmentation:.1%}\n")

        print("👥 ADOPTION BY GROUP")
        print("-"*70)
        for group, adoption in self.adoption_by_group().items():
            bar = "█" * int(adoption * 20) + "░" * (20 - int(adoption * 20))
            print(f"  {group:25} {bar} {adoption:.1%}")
        print()

        print("⚠️  EMERGING RISKS")
        print("-"*70)
        for risk_type, description in self.emerging_risks().items():
            print(f"  • {description}\n")

        print("🎯 SCENARIOS & PROBABILITIES")
        print("-"*70)
        for scenario, prob in self.scenario_probabilities().items():
            bar = "█" * int(prob * 20) + "░" * (20 - int(prob * 20))
            print(f"  {scenario:30} {bar} {prob:.1%}")
        print()

        print("💡 RECOMMENDATIONS")
        print("-"*70)
        for i, rec in enumerate(self.recommendations(), 1):
            print(f"  {i}. {rec}")

        print("\n" + "="*70 + "\n")

    @staticmethod
    def _extract_adoption_quote(result: Dict) -> str:
        """Extract snippet from response"""
        response = result['response']
        return response[:60] + "..." if len(response) > 60 else response

    @staticmethod
    def _extract_resistance_quote(result: Dict) -> str:
        """Extract snippet from response"""
        response = result['response']
        return response[:60] + "..." if len(response) > 60 else response
