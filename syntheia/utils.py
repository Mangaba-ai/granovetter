import json
from typing import Dict, Any


def load_json(filepath: str) -> Dict[str, Any]:
    """Load JSON file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(data: Dict[str, Any], filepath: str):
    """Save data as JSON"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def print_banner(text: str):
    """Print formatted banner"""
    width = max(len(text) + 4, 60)
    print(f"\n{'='*width}")
    print(f"  {text}")
    print(f"{'='*width}\n")


def print_section(title: str):
    """Print section divider"""
    print(f"\n{'─'*60}")
    print(f"  {title}")
    print(f"{'─'*60}\n")
