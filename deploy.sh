#!/bin/bash

# Deploy script for MkDocs site
# This script will build the site and prepare it for GitHub Pages deployment

set -e

echo "🔨 Building MkDocs site..."

# Clean any existing build
rm -rf site/

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Build the site
echo "🏗️  Building site..."
mkdocs build --clean --strict

echo "✅ Site built successfully!"
echo "📁 Site files are in ./site/ directory"
echo "🚀 Push to main branch to trigger GitHub Pages deployment"

# Optional: serve locally for testing
read -p "🌐 Would you like to serve the site locally for testing? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Starting local server at http://localhost:8000"
    mkdocs serve
fi
