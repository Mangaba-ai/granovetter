import os
import requests
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

class LLMClient:
    """Interface with LLM (Ollama, OpenAI, etc)"""

    def __init__(self, provider: Optional[str] = None, model: Optional[str] = None):
        self.provider = provider or os.getenv("LLM_PROVIDER", "ollama")
        self.model = model or os.getenv("LLM_MODEL", "qwen2.5-7b")
        self.base_url = os.getenv("LLM_BASE_URL", "http://localhost:11434")
        self.temperature = float(os.getenv("LLM_TEMPERATURE", 0.7))
        self.max_tokens = int(os.getenv("LLM_MAX_TOKENS", 500))

    def generate(self, prompt: str, system: Optional[str] = None) -> str:
        """Generate response from LLM"""

        if self.provider == "ollama":
            return self._ollama_generate(prompt, system)
        else:
            raise ValueError(f"Unknown provider: {self.provider}")

    def _ollama_generate(self, prompt: str, system: Optional[str] = None) -> str:
        """Call Ollama API"""
        try:
            url = f"{self.base_url}/api/generate"

            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                "temperature": self.temperature,
                "num_predict": self.max_tokens,
            }

            if system:
                payload["system"] = system

            response = requests.post(url, json=payload, timeout=60)
            response.raise_for_status()

            result = response.json()
            return result.get("response", "").strip()

        except requests.exceptions.ConnectionError:
            raise RuntimeError(
                f"Cannot connect to Ollama at {self.base_url}. "
                "Make sure Ollama is running: `ollama serve`"
            )
        except Exception as e:
            raise RuntimeError(f"LLM error: {e}")

    def health_check(self) -> bool:
        """Check if LLM is available"""
        try:
            response = requests.get(
                f"{self.base_url}/api/tags",
                timeout=5
            )
            return response.status_code == 200
        except:
            return False
