"""
Granovetter — Behavioral Simulation Lab
Based on Mark Granovetter's work on social thresholds and tipping points
"""

__version__ = "0.1.0"

from .agent import SyntheticAgent
from .simulation import Simulation
from .llm import LLMClient

__all__ = ["SyntheticAgent", "Simulation", "LLMClient"]
