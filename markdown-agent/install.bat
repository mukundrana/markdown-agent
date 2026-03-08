@echo off
REM Markdown Agent Setup Script for Windows
REM Run this from inside the markdown-agent folder
REM Usage: install.bat [--force] [--help] [--status]

node "%~dp0install.js" %*
