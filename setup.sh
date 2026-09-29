#!/bin/bash
# Setup script for Syntheia

set -e

echo "🚀 Setting up Syntheia - Behavioral Simulation Lab"
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
echo "✅ Python $PYTHON_VERSION found"

# Create venv
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
echo "✅ Virtual environment activated"

# Install deps
echo "📦 Installing dependencies..."
pip install -q -r requirements.txt
echo "✅ Dependencies installed"

# Check Ollama
echo ""
echo "🔍 Checking Ollama..."
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "✅ Ollama is running"
else
    echo "⚠️  Ollama is not running at http://localhost:11434"
    echo "   Start it with: ollama serve"
    echo "   Then pull a model: ollama pull qwen2.5-7b"
fi

# Create output dir
mkdir -p output

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start Ollama: ollama serve"
echo "  2. Run simulation: python main.py"
echo "  3. Or read QUICKSTART.md for more options"
