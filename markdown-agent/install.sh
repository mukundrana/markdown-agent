#!/bin/bash

# Markdown Agent Setup Script for Mac/Linux
# Run this from inside the markdown-agent folder
# Usage: ./install.sh [--force] [--help] [--status]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
node "$SCRIPT_DIR/install.js" "$@"
