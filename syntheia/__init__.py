"""
Syntheia — Behavioral Simulation Lab
"""

__version__ = "0.1.0"

from .agent import SyntheticAgent
from .simulation import Simulation
from .llm import LLMClient

__all__ = ["SyntheticAgent", "Simulation", "LLMClient"]
