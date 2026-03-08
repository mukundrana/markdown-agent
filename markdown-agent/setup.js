#!/usr/bin/env node

/**
 * Markdown Agent Setup Script
 * Run this after copying markdown-agent folder to your project
 *
 * Usage: node markdown-agent/setup.js
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

// Files to create at project root
const files = {
  'CLAUDE.md': `# 🤖 Autonomous Agent System

Read \`markdown-agent/CLAUDE.md\` for full instructions.

**Quick Start:**
1. Say "go baby go" to activate
2. Follow the 10-stage workflow
3. Dashboard: \`markdown-agent/dashboard.html\`
`,

  'INSTRUCTIONS.md': `Read \`markdown-agent/INSTRUCTIONS.md\` for full instructions.`
};

// Create session folder structure
const sessionDir = path.join(projectRoot, 'session');
const sessionFiles = {
  'data.js': `// session/data.js
// Dashboard data file - Updated by agents during workflow

window.DASHBOARD_DATA = {
  queue: {
    updatedAt: null,
    tasks: [],
    statistics: {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0
    }
  },
  tasks: {}
};
`,

  'config.json': `{
  "sessionStarted": null,
  "projectName": "",
  "settings": {
    "workflow": "full",
    "complexity": "auto",
    "autoContinue": true
  }
}
`
};

console.log('🚀 Setting up Markdown Agent...\n');

// Create CLAUDE.md at project root
for (const [filename, content] of Object.entries(files)) {
  const filepath = path.join(projectRoot, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, content);
    console.log(`✅ Created ${filename}`);
  } else {
    console.log(`⏭️  ${filename} already exists, skipping`);
  }
}

// Create session folder
if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir, { recursive: true });
  fs.mkdirSync(path.join(sessionDir, 'tasks'), { recursive: true });
  console.log('✅ Created session/ folder');
}

// Create session files
for (const [filename, content] of Object.entries(sessionFiles)) {
  const filepath = path.join(sessionDir, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, content);
    console.log(`✅ Created session/${filename}`);
  } else {
    console.log(`⏭️  session/${filename} already exists, skipping`);
  }
}

console.log('\n✅ Setup complete!');
console.log('\nNext steps:');
console.log('1. Say "go baby go" to activate the agent');
console.log('2. Open markdown-agent/dashboard.html to view progress');
