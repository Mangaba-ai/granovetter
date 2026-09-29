from typing import Optional, Dict, List
from dataclasses import dataclass, field
from .llm import LLMClient


@dataclass
class AgentProfile:
    """Profile of a synthetic agent"""
    name: str
    group: str  # e.g., "Leadership", "Individual Contributors"
    values: List[str]  # e.g., ["stability", "growth"]
    risk_profile: str  # low, medium, high
    population_percentage: float
    typical_narrative: str


@dataclass
class AgentResponse:
    """Response from agent in a round"""
    round_number: int
    stage: str  # "individual", "social_pressure", "group_confrontation"
    response: str
    confidence: Optional[float] = None
    emotional_tone: Optional[str] = None


class SyntheticAgent:
    """Simulates a human agent in organizational decision-making"""

    def __init__(self, profile: AgentProfile, llm: LLMClient):
        self.profile = profile
        self.llm = llm
        self.memory: List[AgentResponse] = []
        self.current_stance = None

    def react_individually(self, scenario: str) -> AgentResponse:
        """
        Round 1: Individual reaction before social influence
        Agent responds authentically based on profile
        """

        system_prompt = f"""You are {self.profile.name}, a member of "{self.profile.group}" in an organization.

Profile:
- Core values: {", ".join(self.profile.values)}
- Risk tolerance: {self.profile.risk_profile}
- Typical perspective: "{self.profile.typical_narrative}"

Instructions:
You are responding to a decision BEFORE you know what others think.
Be authentic. Show your initial honest reaction.
Keep response concise (2-3 sentences max).
Avoid corporate jargon."""

        user_prompt = f"""Scenario: {scenario}

What is your honest, individual reaction to this decision?"""

        response_text = self.llm.generate(user_prompt, system_prompt)

        response = AgentResponse(
            round_number=len(self.memory) + 1,
            stage="individual",
            response=response_text
        )

        self.memory.append(response)
        self.current_stance = response_text

        return response

    def confront_social_pressure(self, group_consensus: str, opposing_view: str) -> AgentResponse:
        """
        Round 2+: Agent confronts social pressure and opposing narratives
        """

        system_prompt = f"""You are {self.profile.name}, {self.profile.group}.
Your values: {", ".join(self.profile.values)}
Risk profile: {self.profile.risk_profile}

Your initial stance: "{self.current_stance}"

You are now exposed to what others in the organization think."""

        user_prompt = f"""
Group Consensus: "{group_consensus}"

Opposing View: "{opposing_view}"

Do you hold your position, change your mind, or find middle ground?
Explain your reasoning (2-3 sentences).
Be honest about social pressure you feel."""

        response_text = self.llm.generate(user_prompt, system_prompt)

        response = AgentResponse(
            round_number=len(self.memory) + 1,
            stage="social_pressure",
            response=response_text
        )

        self.memory.append(response)
        self.current_stance = response_text

        return response

    def extract_stance_vector(self) -> Dict[str, float]:
        """
        Extract quantitative stance from current response
        Useful for clustering and pattern analysis
        """

        current = self.current_stance.lower()

        stance_vector = {
            "adoption_likelihood": self._score_adoption(current),
            "resistance_strength": self._score_resistance(current),
            "conformism": self._score_conformism(current),
            "anxiety_level": self._score_anxiety(current),
        }

        return stance_vector

    def _score_adoption(self, text: str) -> float:
        """Score likelihood of adoption (0-1)"""
        positive = ["good idea", "agree", "support", "necessary", "excited", "benefit"]
        negative = ["bad", "disagree", "against", "problematic", "concerned"]

        pos_count = sum(1 for word in positive if word in text)
        neg_count = sum(1 for word in negative if word in text)

        if pos_count + neg_count == 0:
            return 0.5

        return min(1.0, pos_count / (pos_count + neg_count))

    def _score_resistance(self, text: str) -> float:
        """Score likelihood of resistance (0-1)"""
        return 1.0 - self._score_adoption(text)

    def _score_conformism(self, text: str) -> float:
        """Score tendency to conform to group (0-1)"""
        conforming = ["everyone", "group thinks", "majority", "most people", "go along"]

        conf_count = sum(1 for word in conforming if word in text)
        return min(1.0, conf_count * 0.25)

    def _score_anxiety(self, text: str) -> float:
        """Score anxiety/uncertainty level (0-1)"""
        anxious = ["unsure", "worried", "concerned", "risk", "fear", "uncertain", "unclear"]

        anx_count = sum(1 for word in anxious if word in text)
        return min(1.0, anx_count * 0.2)

    def __repr__(self) -> str:
        return f"Agent({self.profile.name}, {self.profile.group})"
