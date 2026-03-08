#!/usr/bin/env node

/**
 * Markdown Agent Setup Script
 *
 * This script should be run from INSIDE the markdown-agent folder.
 * It copies AI instruction files to the project root (parent directory).
 *
 * Usage:
 *   node markdown-agent/install.js
 *   node markdown-agent/install.js --force     (overwrite existing files)
 *   node markdown-agent/install.js --help
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Get directories
const scriptDir = __dirname;           // markdown-agent folder
const projectRoot = path.dirname(scriptDir);  // parent directory (project root)

// AI Instruction files to copy from markdown-agent to project root
const filesToCopy = [
  // Markdown files for various AI tools
  'CLAUDE.md',      // Claude Code
  'GEMINI.md',      // Google Gemini
  'CODEX.md',       // OpenAI Codex/GPT
  'COPILOT.md',     // GitHub Copilot
  'QWEN.md',        // Alibaba Qwen
  'DEEPSEEK.md',    // DeepSeek
  'MISTRAL.md',     // Mistral AI
  'AIDER.md',       // Aider CLI
  'QODER.md',       // Qoder
  'REPLIT.md',      // Replit AI
  'AMAZONQ.md',     // Amazon Q
  'COHERE.md',      // Cohere
  'OPENCODE.md',    // OpenCode
  'TABNINE.md',     // Tabnine
  'CODEIUM.md',     // Codeium
  'START.md',       // Quick start guide
  'INSTRUCTIONS.md' // General instructions
];

// Rules files (hidden files for IDE-specific tools)
const rulesFiles = [
  { src: '.cursorrules', dest: '.cursorrules' },
  { src: '.windsurfrules', dest: '.windsurfrules' }
];

// Folders to copy
const foldersToCopy = [
  { src: '.github', dest: '.github' }  // For copilot-instructions.md
];

// Parse arguments
const args = process.argv.slice(2);
const forceOverwrite = args.includes('--force') || args.includes('-f');
const showHelpFlag = args.includes('--help') || args.includes('-h');
const showVersion = args.includes('--version') || args.includes('-v');

/**
 * Show help message
 */
function showHelp() {
  log('\n' + '='.repeat(50), 'cyan');
  log('  🤖 Markdown Agent Setup Script', 'bold');
  log('='.repeat(50) + '\n', 'cyan');

  log('Usage: node markdown-agent/install.js [options]\n');
  log('Options:');
  log('  --force, -f     Overwrite existing files');
  log('  --help, -h      Show this help message');
  log('  --version, -v   Show version');
  log('  --status        Check installation status\n');

  log('Supported AI Tools:');
  log('  Claude Code, Gemini, Codex/GPT, GitHub Copilot,');
  log('  Qwen, DeepSeek, Mistral, Aider, Qoder, Replit,');
  log('  Amazon Q, Cohere, OpenCode, Tabnine, Codeium,');
  log('  Cursor, Windsurf\n');

  log('What it does:');
  log('  1. Copies AI instruction files to project root');
  log('  2. Copies IDE rules files (.cursorrules, .windsurfrules)');
  log('  3. Copies .github folder (for Copilot instructions)');
  log('  4. Creates session/ folder if missing');
  log('  5. Updates .gitignore to exclude session files\n');

  log('After running this script:');
  log('  1. Open your project in any AI CLI');
  log('  2. Say "go baby go" to activate the agent');
  log('  3. Open markdown-agent/dashboard.html to view progress\n');
}

/**
 * Show installation status
 */
function showStatus() {
  log('\n📊 Installation Status\n', 'cyan');

  log('Project root: ' + projectRoot, 'blue');
  log('Markdown agent: ' + scriptDir + '\n');

  log('AI Instruction Files:', 'yellow');
  for (const file of filesToCopy) {
    const srcPath = path.join(scriptDir, file);
    const destPath = path.join(projectRoot, file);
    const srcExists = fs.existsSync(srcPath);
    const destExists = fs.existsSync(destPath);

    if (destExists) {
      log(`  ✅ ${file} - installed`, 'green');
    } else if (srcExists) {
      log(`  ⏳ ${file} - ready to install`, 'yellow');
    } else {
      log(`  ❌ ${file} - source file missing`, 'red');
    }
  }

  log('\nIDE Rules Files:', 'yellow');
  for (const rule of rulesFiles) {
    const srcPath = path.join(scriptDir, rule.src);
    const destPath = path.join(projectRoot, rule.dest);
    const srcExists = fs.existsSync(srcPath);
    const destExists = fs.existsSync(destPath);

    if (destExists) {
      log(`  ✅ ${rule.dest} - installed`, 'green');
    } else if (srcExists) {
      log(`  ⏳ ${rule.dest} - ready to install`, 'yellow');
    } else {
      log(`  ❌ ${rule.dest} - source file missing`, 'red');
    }
  }

  log('\nFolders:', 'yellow');
  for (const folder of foldersToCopy) {
    const srcPath = path.join(scriptDir, folder.src);
    const destPath = path.join(projectRoot, folder.dest);
    const srcExists = fs.existsSync(srcPath);
    const destExists = fs.existsSync(destPath);

    if (destExists) {
      log(`  ✅ ${folder.dest}/ - installed`, 'green');
    } else if (srcExists) {
      log(`  ⏳ ${folder.dest}/ - ready to install`, 'yellow');
    } else {
      log(`  ❌ ${folder.dest}/ - source missing`, 'red');
    }
  }

  const sessionDir = path.join(scriptDir, 'session');
  log('\nSession Folder:', 'yellow');
  if (fs.existsSync(sessionDir)) {
    log('  ✅ session/ exists', 'green');
    const dataJs = path.join(sessionDir, 'data.js');
    const configJson = path.join(sessionDir, 'config.json');
    const queueJson = path.join(sessionDir, 'queue.json');
    log(`     ${fs.existsSync(dataJs) ? '✅' : '❌'} data.js`, fs.existsSync(dataJs) ? 'green' : 'red');
    log(`     ${fs.existsSync(configJson) ? '✅' : '❌'} config.json`, fs.existsSync(configJson) ? 'green' : 'red');
    log(`     ${fs.existsSync(queueJson) ? '✅' : '❌'} queue.json`, fs.existsSync(queueJson) ? 'green' : 'red');
  } else {
    log('  ❌ session/ missing', 'red');
  }

  const gitignore = path.join(projectRoot, '.gitignore');
  log('\n.gitignore:', 'yellow');
  if (fs.existsSync(gitignore)) {
    const content = fs.readFileSync(gitignore, 'utf8');
    if (content.includes('markdown-agent/session/')) {
      log('  ✅ session/ is ignored', 'green');
    } else {
      log('  ⚠️  session/ not in .gitignore', 'yellow');
    }
  } else {
    log('  ❌ .gitignore missing', 'red');
  }
  log('');
}

/**
 * Create session folder structure
 */
function createSessionFolder() {
  const sessionDir = path.join(scriptDir, 'session');
  const tasksDir = path.join(sessionDir, 'tasks');

  // Create folders
  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
    log('  ✅ Created session/ folder', 'green');
  }
  if (!fs.existsSync(tasksDir)) {
    fs.mkdirSync(tasksDir, { recursive: true });
    log('  ✅ Created session/tasks/ folder', 'green');
  }

  // Create data.js
  const dataJsPath = path.join(sessionDir, 'data.js');
  if (!fs.existsSync(dataJsPath)) {
    const dataJs = `// session/data.js
// Dashboard data file - Updated by agents during workflow
// Last updated: null

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
    },
    nextTaskId: null
  },
  tasks: {}
};
`;
    fs.writeFileSync(dataJsPath, dataJs);
    log('  ✅ Created session/data.js', 'green');
  } else {
    log('  ⏭️  session/data.js already exists', 'yellow');
  }

  // Create config.json
  const configJsonPath = path.join(sessionDir, 'config.json');
  if (!fs.existsSync(configJsonPath)) {
    const configJson = `{
  "sessionStarted": null,
  "project": {
    "name": "",
    "type": "web-application",
    "language": "javascript",
    "framework": "vanilla",
    "rootPath": "./src"
  },
  "settings": {
    "maxParallelWaves": 3,
    "retryAttempts": 3,
    "defaultWorkflow": "standard",
    "qualityThreshold": 70,
    "securityCheckRequired": true,
    "autoDeploy": false,
    "stopOnFailure": true
  },
  "workflows": {
    "quick": {
      "stages": ["IMPLEMENTATION", "VERIFICATION"],
      "description": "Quick fix workflow for trivial changes"
    },
    "standard": {
      "stages": ["PLANNING", "IMPLEMENTATION", "VERIFICATION", "REVIEW", "SECURITY", "DEPLOY"],
      "description": "Standard development workflow"
    },
    "full": {
      "stages": ["REQUIREMENTS", "PLANNING", "IMPLEMENTATION", "VERIFICATION", "REVIEW", "QUALITY_CHECK", "REFACTOR", "PERFORMANCE", "SECURITY", "DEPLOY"],
      "description": "Full workflow with all stages"
    }
  },
  "complexityRules": {
    "trivial": { "maxLinesChanged": 5, "maxNewFiles": 0 },
    "simple": { "maxLinesChanged": 50, "maxNewFiles": 2 },
    "moderate": { "maxLinesChanged": 200, "maxNewFiles": 5 },
    "complex": { "minLinesChanged": 200, "minNewFiles": 5 }
  }
}
`;
    fs.writeFileSync(configJsonPath, configJson);
    log('  ✅ Created session/config.json', 'green');
  } else {
    log('  ⏭️  session/config.json already exists', 'yellow');
  }

  // Create queue.json
  const queueJsonPath = path.join(sessionDir, 'queue.json');
  if (!fs.existsSync(queueJsonPath)) {
    const queueJson = `{
  "updatedAt": null,
  "tasks": [],
  "statistics": {
    "total": 0,
    "pending": 0,
    "inProgress": 0,
    "completed": 0,
    "failed": 0,
    "cancelled": 0
  },
  "nextTaskId": null
}
`;
    fs.writeFileSync(queueJsonPath, queueJson);
    log('  ✅ Created session/queue.json', 'green');
  } else {
    log('  ⏭️  session/queue.json already exists', 'yellow');
  }
}

/**
 * Update .gitignore
 */
function updateGitignore() {
  const gitignorePath = path.join(projectRoot, '.gitignore');
  const sessionIgnore = '\n# Markdown Agent session files (auto-generated)\nmarkdown-agent/session/\n';

  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf8');
    if (!content.includes('markdown-agent/session/')) {
      fs.appendFileSync(gitignorePath, sessionIgnore);
      log('  ✅ Updated .gitignore', 'green');
    } else {
      log('  ⏭️  .gitignore already has session entry', 'yellow');
    }
  } else {
    fs.writeFileSync(gitignorePath, `# .gitignore${sessionIgnore}`);
    log('  ✅ Created .gitignore', 'green');
  }
}

/**
 * Copy directory recursively
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath) || forceOverwrite) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

/**
 * Main installation function
 */
function install() {
  log('\n' + '='.repeat(50), 'cyan');
  log('  🤖 Markdown Agent Setup', 'bold');
  log('='.repeat(50) + '\n', 'cyan');

  log('Project root: ' + projectRoot, 'blue');
  log('Source: ' + scriptDir + '\n');

  let totalCopied = 0;
  let totalSkipped = 0;

  // Step 1: Copy AI instruction files to project root
  log('Step 1: Copying AI instruction files to project root...', 'yellow');

  for (const file of filesToCopy) {
    const srcPath = path.join(scriptDir, file);
    const destPath = path.join(projectRoot, file);

    if (!fs.existsSync(srcPath)) {
      continue; // Skip if source doesn't exist
    }

    if (fs.existsSync(destPath) && !forceOverwrite) {
      log(`  ⏭️  ${file} already exists`, 'yellow');
      totalSkipped++;
      continue;
    }

    try {
      fs.copyFileSync(srcPath, destPath);
      log(`  ✅ ${file} copied`, 'green');
      totalCopied++;
    } catch (err) {
      log(`  ❌ Failed to copy ${file}: ${err.message}`, 'red');
    }
  }

  // Step 2: Copy rules files (.cursorrules, .windsurfrules)
  log('\nStep 2: Copying IDE rules files...', 'yellow');

  for (const rule of rulesFiles) {
    const srcPath = path.join(scriptDir, rule.src);
    const destPath = path.join(projectRoot, rule.dest);

    if (!fs.existsSync(srcPath)) {
      continue;
    }

    if (fs.existsSync(destPath) && !forceOverwrite) {
      log(`  ⏭️  ${rule.dest} already exists`, 'yellow');
      totalSkipped++;
      continue;
    }

    try {
      fs.copyFileSync(srcPath, destPath);
      log(`  ✅ ${rule.dest} copied`, 'green');
      totalCopied++;
    } catch (err) {
      log(`  ❌ Failed to copy ${rule.dest}: ${err.message}`, 'red');
    }
  }

  // Step 3: Copy folders (.github)
  log('\nStep 3: Copying folders...', 'yellow');

  for (const folder of foldersToCopy) {
    const srcPath = path.join(scriptDir, folder.src);
    const destPath = path.join(projectRoot, folder.dest);

    if (!fs.existsSync(srcPath)) {
      continue;
    }

    try {
      copyDir(srcPath, destPath);
      log(`  ✅ ${folder.dest}/ copied`, 'green');
      totalCopied++;
    } catch (err) {
      log(`  ❌ Failed to copy ${folder.dest}: ${err.message}`, 'red');
    }
  }

  // Step 4: Create session folder
  log('\nStep 4: Setting up session folder...', 'yellow');
  createSessionFolder();

  // Step 5: Update .gitignore
  log('\nStep 5: Updating .gitignore...', 'yellow');
  updateGitignore();

  // Summary
  log('\n' + '='.repeat(50), 'cyan');
  log('  ✅ Setup Complete!', 'green');
  log('='.repeat(50) + '\n', 'cyan');

  log(`📊 Summary: ${totalCopied} files copied, ${totalSkipped} files skipped\n`, 'blue');

  log('📁 Your project structure:', 'blue');
  log(`   ${path.basename(projectRoot)}/`);
  log('   ├── CLAUDE.md        ← Claude Code');
  log('   ├── GEMINI.md        ← Google Gemini');
  log('   ├── CODEX.md         ← OpenAI Codex');
  log('   ├── COPILOT.md       ← GitHub Copilot');
  log('   ├── QWEN.md          ← Alibaba Qwen');
  log('   ├── DEEPSEEK.md      ← DeepSeek');
  log('   ├── MISTRAL.md       ← Mistral AI');
  log('   ├── AIDER.md         ← Aider CLI');
  log('   ├── QODER.md         ← Qoder');
  log('   ├── REPLIT.md        ← Replit AI');
  log('   ├── AMAZONQ.md       ← Amazon Q');
  log('   ├── COHERE.md        ← Cohere');
  log('   ├── OPENCODE.md      ← OpenCode');
  log('   ├── .cursorrules     ← Cursor IDE');
  log('   ├── .windsurfrules   ← Windsurf IDE');
  log('   ├── .github/         ← Copilot instructions');
  log('   └── markdown-agent/');
  log('       ├── agents/');
  log('       ├── templates/');
  log('       └── session/');

  log('\n🚀 Next steps:', 'blue');
  log('   1. Open your project in any AI CLI');
  log('   2. Say "go baby go" to activate the agent');
  log('   3. Describe what you want to build');
  log('   4. Open markdown-agent/dashboard.html to view progress');
  log('');
}

// Run based on arguments
if (showHelpFlag) {
  showHelp();
} else if (showVersion) {
  log('Markdown Agent Setup v1.0.0', 'cyan');
} else if (args.includes('--status')) {
  showStatus();
} else {
  install();
}
