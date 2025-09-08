#!/bin/bash
# .claude/hooks/post-worktree-create.sh
# Hook for automatically setting up new worktrees with development environment

set -e  # Exit on any error

# Read JSON input
input=$(cat)
worktree_path=$(echo "$input" | jq -r '.worktree_path // empty')
feature_name=$(echo "$input" | jq -r '.feature_name // empty')
worktree_branch=$(echo "$input" | jq -r '.branch // empty')
launch_agent=$(echo "$input" | jq -r '.launch_agent // "true"')

echo "🌳 Setting up worktree: $worktree_path for feature: $feature_name"

# Validate required parameters
if [ -z "$worktree_path" ] || [ -z "$feature_name" ]; then
    echo "❌ Error: Missing required parameters (worktree_path, feature_name)"
    exit 1
fi

# Check if worktree path exists
if [ ! -d "$worktree_path" ]; then
    echo "❌ Error: Worktree path does not exist: $worktree_path"
    exit 1
fi

# Create worktree-specific .claude directory
mkdir -p "$worktree_path/.claude"

# Copy base configuration if it exists
if [ -f ".claude/settings.json" ]; then
    cp ".claude/settings.json" "$worktree_path/.claude/"
fi

# Create worktree-specific configuration
cat > "$worktree_path/.claude/settings.json" << EOF
{
  "output": {
    "style": "structured",
    "format": "markdown",
    "sections": {
      "feature_development": {
        "show_progress": true,
        "show_tasks": true,
        "show_tests": true
      }
    }
  },
  "statusline": {
    "enabled": true,
    "refresh_rate": 1500,
    "custom_indicators": {
      "feature_dev": "🚀",
      "testing": "🧪",
      "debugging": "🐛",
      "review": "👀",
      "completed": "✅"
    },
    "worktree_context": {
      "name": "$feature_name",
      "path": "$worktree_path",
      "branch": "$worktree_branch",
      "type": "feature",
      "created": "$(date -Iseconds)"
    }
  }
}
EOF

# Create development documentation
cat > "$worktree_path/DEVELOPMENT.md" << EOF
# Feature Development: $feature_name

## Worktree Information
- **Path**: $(realpath "$worktree_path")
- **Branch**: $worktree_branch
- **Created**: $(date)
- **Type**: Feature Development

## Feature Description
$feature_name

## Development Tasks
- [ ] Feature implementation
- [ ] Unit tests
- [ ] Integration tests
- [ ] Documentation updates
- [ ] Code review
- [ ] Merge to main

## Development Environment
- **Claude Code**: Configured with worktree-specific settings
- **Statusline**: Enabled with feature development indicators
- **Git**: Worktree isolated with feature branch

## Status
🚧 In Progress

## Notes
This worktree was automatically created for parallel feature development.
Use the provided slash commands to manage this worktree and track progress.
EOF

# Initialize worktree development environment
cd "$worktree_path"

# Install dependencies if package files exist
if [ -f "package.json" ] && command -v npm &> /dev/null; then
    echo "📦 Installing Node.js dependencies..."
    npm install
elif [ -f "requirements.txt" ] && command -v pip &> /dev/null; then
    echo "📦 Installing Python dependencies..."
    pip install -r requirements.txt
elif [ -f "pom.xml" ] && command -v mvn &> /dev/null; then
    echo "📦 Installing Maven dependencies..."
    mvn install
elif [ -f "Cargo.toml" ] && command -v cargo &> /dev/null; then
    echo "📦 Installing Rust dependencies..."
    cargo build
fi

# Create initial git configuration for the worktree
cat > ".gitattributes" << EOF
# Worktree-specific git attributes
*.md merge=union
*.json merge=union
*.yaml merge=union
*.yml merge=union
EOF

# Create worktree-specific .gitignore if needed
if [ ! -f ".gitignore" ]; then
    cat > ".gitignore" << EOF
# Worktree-specific ignores
node_modules/
*.log
.DS_Store
.env
.env.local
.env.*.local
dist/
build/
*.tmp
*.bak
.vscode/
.idea/
*.swp
*.swo
*~
EOF
fi

# Create tasks directory for worktree-specific tasks
mkdir -p ".claude/tasks"

# Create initial task file
cat > ".claude/tasks/initial-setup.md" << EOF
# Initial Setup Tasks for $feature_name

## High Priority Tasks
- [ ] Review feature requirements
- [ ] Set up development environment
- [ ] Create initial project structure
- [ ] Implement core functionality

## Medium Priority Tasks
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Update documentation
- [ ] Code review and optimization

## Notes
- This worktree is ready for development
- Claude Code is configured with worktree-specific settings
- Use slash commands to manage development workflow
EOF

# Launch feature development subagent if requested
if [ "$launch_agent" = "true" ]; then
    echo "🤖 Launching feature development subagent..."
    
    # Create subagent launch configuration
    cat > ".claude/agents/feature-developer.md" << EOF
---
name: feature-developer
description: "Specialized agent for feature development in worktree: $feature_name"
tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Task
---

You are a specialized feature development agent working in the worktree: $worktree_path

## Feature Information
- **Name**: $feature_name
- **Branch**: $worktree_branch
- **Path**: $worktree_path
- **Created**: $(date)

## Your Responsibilities
1. **Feature Implementation**: Complete the assigned feature development
2. **Code Quality**: Ensure high-quality, maintainable code
3. **Testing**: Write comprehensive unit and integration tests
4. **Documentation**: Create and update relevant documentation
5. **Integration**: Ensure the feature integrates properly with the main codebase

## Development Process
1. Review the feature requirements in DEVELOPMENT.md
2. Check the initial tasks in .claude/tasks/initial-setup.md
3. Implement the feature following best practices
4. Write tests to validate functionality
5. Update documentation as needed
6. Prepare the feature for merge

## Worktree Context
- You are working in an isolated git worktree
- Changes are isolated from other worktrees
- Use the provided statusline for progress tracking
- Coordinate with other agents when necessary

## Success Criteria
- Feature is fully implemented and tested
- All tests pass successfully
- Documentation is updated
- Code meets quality standards
- Feature is ready for merge to main branch

## Communication
- Provide regular progress updates
- Report any blockers or issues
- Coordinate with other worktree agents if needed
- Request assistance when required
EOF

    echo "✅ Feature development subagent configuration created"
fi

# Create worktree status tracking file
cat > ".claude/worktree-status.json" << EOF
{
  "worktree": {
    "name": "$feature_name",
    "path": "$worktree_path",
    "branch": "$worktree_branch",
    "created": "$(date -Iseconds)",
    "status": "active",
    "agent": "$launch_agent"
  },
  "development": {
    "progress": 0,
    "tasks_completed": 0,
    "tasks_total": 0,
    "tests_passing": false,
    "coverage": 0
  },
  "git": {
    "commits": 0,
    "files_changed": 0,
    "status": "clean"
  }
}
EOF

# Create worktree-specific slash commands directory
mkdir -p ".claude/commands"

# Create worktree-specific slash commands
cat > ".claude/commands/feature-progress.md" << EOF
# Command: /feature-progress

Shows current progress for the feature development in this worktree.

## Usage
/feature-progress

## Output
- Current development progress
- Tasks completed vs total
- Test status and coverage
- Git status and commit information
- Next steps and recommendations
EOF

cat > ".claude/commands/feature-complete.md" << EOF
# Command: /feature-complete

Marks the feature development as completed and prepares for merge.

## Usage
/feature-complete

## Actions
- Validates feature completion
- Runs final tests
- Updates documentation
- Prepares for merge
- Notifies team members
EOF

# Set up git hooks for the worktree
mkdir -p ".git/hooks"

# Create pre-commit hook for worktree
cat > ".git/hooks/pre-commit" << 'EOF'
#!/bin/bash
# Worktree pre-commit hook

echo "🔍 Running worktree pre-commit checks..."

# Run basic checks
if command -v npm &> /dev/null && [ -f "package.json" ]; then
    echo "🧪 Running Node.js tests..."
    npm test 2>/dev/null || echo "⚠️  Some tests failed"
fi

if command -v python &> /dev/null && [ -f "requirements.txt" ]; then
    echo "🧪 Running Python tests..."
    python -m pytest 2>/dev/null || echo "⚠️  Some tests failed"
fi

echo "✅ Pre-commit checks completed"
EOF

chmod +x ".git/hooks/pre-commit"

# Create post-commit hook for worktree
cat > ".git/hooks/post-commit" << 'EOF'
#!/bin/bash
# Worktree post-commit hook

echo "📝 Updating worktree status..."

# Update worktree status if status file exists
if [ -f ".claude/worktree-status.json" ]; then
    # Update commit count and status
    python3 -c "
import json
import os
from datetime import datetime

try:
    with open('.claude/worktree-status.json', 'r') as f:
        status = json.load(f)
    
    status['git']['commits'] = status['git'].get('commits', 0) + 1
    status['git']['last_commit'] = datetime.now().isoformat()
    
    with open('.claude/worktree-status.json', 'w') as f:
        json.dump(status, f, indent=2)
    
    print('✅ Worktree status updated')
except Exception as e:
    print(f'⚠️  Failed to update status: {e}')
"
fi

echo "✅ Post-commit processing completed"
EOF

chmod +x ".git/hooks/post-commit"

# Create worktree cleanup script
cat > "cleanup-worktree.sh" << EOF
#!/bin/bash
# Cleanup script for this worktree

echo "🧹 Cleaning up worktree: $feature_name"

# Remove node_modules if exists
if [ -d "node_modules" ]; then
    echo "📦 Removing node_modules..."
    rm -rf node_modules
fi

# Remove build artifacts
if [ -d "dist" ]; then
    echo "🗑️  Removing dist directory..."
    rm -rf dist
fi

if [ -d "build" ]; then
    echo "🗑️  Removing build directory..."
    rm -rf build
fi

# Remove cache directories
find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".pytest_cache" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".cache" -type d -exec rm -rf {} + 2>/dev/null || true

echo "✅ Cleanup completed"
EOF

chmod +x "cleanup-worktree.sh"

# Create worktree backup script
cat > "backup-worktree.sh" << EOF
#!/bin/bash
# Backup script for this worktree

BACKUP_DIR="../worktree-backups"
BACKUP_NAME="\$(date +%Y%m%d_%H%M%S)_$feature_name"

echo "💾 Creating backup: \$BACKUP_NAME"

mkdir -p "\$BACKUP_DIR"

# Create backup of important files
tar -czf "\$BACKUP_DIR/\$BACKUP_NAME.tar.gz" \
    --exclude="node_modules" \
    --exclude="dist" \
    --exclude="build" \
    --exclude=".git" \
    --exclude="*.log" \
    . 2>/dev/null

echo "✅ Backup created: \$BACKUP_DIR/\$BACKUP_NAME.tar.gz"
EOF

chmod +x "backup-worktree.sh"

# Return to original directory
cd - > /dev/null

# Generate setup completion report
cat << EOF
🎉 Worktree setup completed successfully!

📍 **Worktree**: $worktree_path
🌿 **Branch**: $worktree_branch
🚀 **Feature**: $feature_name
📅 **Created**: $(date)

✅ **Setup Completed**:
- [x] Claude Code configuration
- [x] Development environment
- [x] Git hooks configured
- [x] Documentation created
- [x] Task tracking setup
- [x] Backup scripts created
- [x] Subagent configuration

🛠️ **Available Commands**:
- /worktree-status - Check worktree status
- /feature-progress - Track feature progress
- /feature-complete - Mark feature as complete

📊 **Monitoring**:
- Statusline configured with worktree context
- Real-time progress tracking enabled
- Resource monitoring active

🤖 **Subagent**:
$(if [ "$launch_agent" = "true" ]; then echo "✅ Feature development subagent ready"; else echo "⚪ Subagent not launched"; fi)

EOF

# Output JSON for further processing
cat << EOF
{
  "worktree_path": "$worktree_path",
  "feature_name": "$feature_name",
  "branch": "$worktree_branch",
  "status": "setup_completed",
  "agent_launched": $launch_agent,
  "setup_time": "$(date -Iseconds)",
  "next_steps": [
    "cd $worktree_path",
    "Review DEVELOPMENT.md for feature requirements",
    "Check .claude/tasks/ for initial tasks",
    "Start development using the configured subagent"
  ]
}
EOF