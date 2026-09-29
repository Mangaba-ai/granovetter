# Contributing to Granovetter

Thank you for your interest in contributing! Here's how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/granovetter.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Set up environment: `bash setup.sh`

## Development

### Install dev dependencies
```bash
pip install -r requirements.txt
pip install pytest black isort mypy
```

### Run tests
```bash
pytest tests/
```

### Code style
```bash
black granovetter/ tests/
isort granovetter/ tests/
mypy granovetter/
```

### Add a new scenario
1. Create `scenarios/your_scenario.json`
2. Create `data/your_org.json`
3. Test with: `python main.py`
4. Add to `examples/` if widely useful

### Extend the simulation
- **New LLM provider**: Edit `granovetter/llm.py`
- **New analysis metric**: Edit `granovetter/analysis.py`
- **New agent behavior**: Edit `granovetter/agent.py`

## Pull Requests

1. Update relevant tests
2. Update documentation if behavior changes
3. Reference any related issues
4. Keep commits focused and well-described

## Code of Conduct

- Be respectful and inclusive
- Focus on ideas, not individuals
- Help others learn and grow

## Questions?

Open an issue on GitHub or start a discussion. We're happy to help!

---

**Attribution**: Commits should include:
```
Co-Authored-By: Your Name <your.email@example.com>
```
