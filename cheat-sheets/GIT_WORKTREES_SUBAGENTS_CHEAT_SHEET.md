# Git Worktrees + Subagents Cheat Sheet

## Quick Reference

### Core Concept
Git Worktrees + Subagents = Parallel Development Workflow

### Key Components
- **Git Worktrees**: Multiple working directories for the same repository
- **Subagents**: Specialized AI agents for focused tasks
- **Slash Commands**: Quick commands for worktree management
- **Hooks**: Automated workflow triggers
- **Statusline**: Real-time monitoring of multiple worktrees

## Git Worktrees Basics

### Create Worktree
```bash
# Basic worktree creation
git worktree add -b feature-name ../worktree-feature-name main

# Create from existing branch
git worktree add ../worktree-existing-branch existing-branch

# Create detached worktree
git worktree add ../worktree-detached HEAD~1
```

### List Worktrees
```bash
# List all worktrees
git worktree list

# List with porcelain output
git worktree list --porcelain
```

### Remove Worktree
```bash
# Remove worktree
git worktree remove ../worktree-feature-name

# Force remove (if worktree is dirty)
git worktree remove --force ../worktree-feature-name

# Remove multiple worktrees
git worktree remove ../worktree-feature1 ../worktree-feature2
```

### Manage Worktrees
```bash
# Switch to worktree
cd ../worktree-feature-name

# Prune stale worktrees
git worktree prune

# Move worktree
git worktree move ../old-path ../new-path

# Lock worktree
git worktree lock ../worktree-feature-name
git worktree unlock ../worktree-feature-name
```

## Subagent Configuration

### Feature Development Subagent
```yaml
---
name: feature-developer
description: "Specialized agent for feature development in isolated worktrees"
tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Task
---

You are a specialized feature development agent working within a git worktree.

## Core Responsibilities
- **Worktree-Isolated Development**: Work exclusively within the assigned worktree
- **Feature Implementation**: Complete feature development from start to finish
- **Testing & Validation**: Run tests and validate changes within the worktree
- **Code Quality**: Ensure code meets standards and best practices
- **Documentation**: Create and update documentation for the feature

## Workflow Process
1. **Initialize Worktree**: Set up the worktree environment
2. **Feature Development**: Implement the assigned feature
3. **Testing**: Run comprehensive tests within the worktree
4. **Integration**: Ensure the feature integrates with main branch
5. **Cleanup**: Prepare worktree for merge or removal
```

### Bug Fix Subagent
```yaml
---
name: bug-fix-developer
description: "Specialized agent for bug fixing in isolated worktrees"
tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Task
---

You are a specialized bug fix agent working within a git worktree.

## Core Responsibilities
- **Bug Investigation**: Analyze and understand bug reports
- **Isolated Testing**: Test bug fixes in isolated environments
- **Root Cause Analysis**: Identify and fix underlying issues
- **Validation**: Ensure fixes don't introduce new issues
- **Documentation**: Document bug fixes and prevention measures

## Workflow Process
1. **Bug Analysis**: Understand the bug and its impact
2. **Worktree Setup**: Create isolated environment for bug fix
3. **Fix Implementation**: Develop and test the fix
4. **Validation**: Ensure fix works and doesn't break other functionality
5. **Integration**: Prepare fix for merge to main branch
```

### Parallel Task Coordinator
```yaml
---
name: parallel-task-coordinator
description: "Coordinates multiple subagents working across different worktrees"
tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Task
---

You are a parallel task coordinator managing multiple subagents working across different git worktrees.

## Core Responsibilities
- **Worktree Management**: Create, manage, and clean up worktrees
- **Task Distribution**: Assign tasks to appropriate subagents
- **Progress Monitoring**: Track progress across all worktrees
- **Conflict Resolution**: Handle dependencies and conflicts between worktrees
- **Result Consolidation**: Combine results from parallel tasks

## Coordination Workflow
1. **Task Analysis**: Break down complex tasks into parallelizable units
2. **Worktree Creation**: Create dedicated worktrees for each task
3. **Agent Assignment**: Assign specialized subagents to each worktree
4. **Parallel Execution**: Monitor and coordinate parallel work
5. **Result Integration**: Combine and validate all results
```

## Slash Commands

### Worktree Management Commands
```markdown
# Command: /worktree-create

## Feature name: $ARGUMENTS

Creates a new git worktree for parallel feature development.

## Usage:
/worktree-create "user-authentication"
/worktree-create "payment-processing"
/worktree-create "api-refactor"

## Actions:
1. Create new git worktree with feature branch
2. Set up worktree-specific configuration
3. Initialize development environment
4. Launch feature-development subagent
5. Configure statusline monitoring
```

```markdown
# Command: /worktree-status

## Filter: $ARGUMENTS

Shows status of all active worktrees and their tasks.

## Usage:
/worktree-status "all"           # Show all worktrees
/worktree-status "active"         # Show only active worktrees
/worktree-status "completed"      # Show completed worktrees
/worktree-status "errors"         # Show worktrees with errors

## Output:
- Worktree names and locations
- Current branch and commit
- Active subagents and their status
- Task progress and completion
- Resource usage and performance
```

```markdown
# Command: /worktree-cleanup

## Criteria: $ARGUMENTS

Cleans up completed or stale worktrees with safety checks.

## Usage:
/worktree-cleanup "completed"         # Clean up completed worktrees
/worktree-cleanup "older-than-7-days" # Clean up worktrees older than 7 days
/worktree-cleanup "merged-branches"   # Clean up worktrees with merged branches
/worktree-cleanup "all"              # Clean up all eligible worktrees

## Actions:
1. Identify worktrees matching criteria
2. Verify tasks are completed
3. Safely remove worktrees
4. Clean up branches if merged
5. Generate cleanup report
```

### Parallel Task Commands
```markdown
# Command: /parallel-task

## Task type: $ARGUMENTS

Launches parallel development tasks across multiple worktrees.

## Usage:
/parallel-task "bug-fixes"
/parallel-task "feature-development"
/parallel-task "code-review"
/parallel-task "testing"

## Actions:
1. Analyze task requirements
2. Create appropriate worktrees
3. Launch specialized subagents
4. Monitor parallel execution
5. Consolidate results
```

```markdown
# Command: /worktree-sync

## Target: $ARGUMENTS

Synchronizes changes across multiple worktrees to maintain consistency.

## Usage:
/worktree-sync "all"           # Sync all worktrees
/worktree-sync "config"        # Sync configuration files
/worktree-sync "dependencies"  # Sync dependency files
/worktree-sync "tests"         # Sync test files

## Actions:
1. Source detection and conflict analysis
2. Safe synchronization across worktrees
3. Validation and reporting
```

## Hook Configuration

### Worktree Creation Hook
```bash
#!/bin/bash
# .claude/hooks/post-worktree-create.sh

input=$(cat)
worktree_path=$(echo "$input" | jq -r '.worktree_path // empty')
feature_name=$(echo "$input" | jq -r '.feature_name // empty')

echo "Setting up worktree: $worktree_path for feature: $feature_name"

# Create worktree-specific configuration
mkdir -p "$worktree_path/.claude"

# Copy base configuration
cp .claude/settings.json "$worktree_path/.claude/"

# Create worktree-specific statusline configuration
cat > "$worktree_path/.claude/settings.json" << EOF
{
  "statusline": {
    "enabled": true,
    "custom_indicators": {
      "feature_dev": "🚀",
      "testing": "🧪",
      "debugging": "🐛"
    },
    "worktree_context": {
      "name": "$feature_name",
      "path": "$worktree_path"
    }
  }
}
EOF

# Initialize worktree with development setup
cd "$worktree_path"

# Install dependencies if needed
if [ -f "package.json" ]; then
    npm install
elif [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

echo "Worktree setup completed for $feature_name"
```

### Task Completion Hook
```bash
#!/bin/bash
# .claude/hooks/post-task-complete.sh

input=$(cat)
worktree_path=$(echo "$input" | jq -r '.worktree_path // empty')
task_name=$(echo "$input" | jq -r '.task_name // empty')
result=$(echo "$input" | jq -r '.result // empty')

echo "Task completed: $task_name in $worktree_path"

# Update worktree status
cd "$worktree_path"

# Create completion report
cat > "TASK_REPORT.md" << EOF
# Task Completion Report

## Task: $task_name
## Result: $result
## Completed: $(date)

## Files Modified:
$(git diff --name-only HEAD~1)

## Next Steps:
- [ ] Review and validate changes
- [ ] Run integration tests
- [ ] Prepare for merge
EOF

# Trigger integration tests if applicable
if [[ "$task_name" == *"test"* ]] || [[ "$task_name" == *"implementation"* ]]; then
    echo "Triggering integration tests..."
    # Launch integration test subagent
fi
```

### Cross-Worktree Sync Hook
```bash
#!/bin/bash
# .claude/hooks/cross-worktree-sync.sh

input=$(cat)
source_worktree=$(echo "$input" | jq -r '.source_worktree // empty')
sync_type=$(echo "$input" | jq -r '.sync_type // empty')

echo "Syncing $sync_type from $source_worktree to other worktrees"

# Get list of active worktrees
worktrees=$(git worktree list | grep -v "(bare)" | awk '{print $1}')

for worktree in $worktrees; do
    if [ "$worktree" != "$source_worktree" ]; then
        echo "Syncing to $worktree"
        
        case "$sync_type" in
            "config")
                cp "$source_worktree/.claude/settings.json" "$worktree/.claude/"
                ;;
            "dependencies")
                if [ -f "$source_worktree/package.json" ]; then
                    cp "$source_worktree/package.json" "$worktree/"
                    cd "$worktree"
                    npm install
                fi
                ;;
        esac
    fi
done

echo "Cross-worktree sync completed"
```

## Statusline Configuration

### Multi-Worktree Statusline
```json
{
  "statusline": {
    "enabled": true,
    "refresh_rate": 1500,
    "multi_worktree": {
      "enabled": true,
      "max_display": 5,
      "show": ["name", "branch", "status", "agent", "progress"],
      "sort_by": "activity",
      "indicators": {
        "active": "🟢",
        "idle": "🟡",
        "completed": "✅",
        "error": "❌",
        "merging": "🔄"
      }
    },
    "parallel_tasks": {
      "enabled": true,
      "show_queue": true,
      "show_active": true,
      "show_completed": true,
      "max_history": 10
    },
    "resource_monitoring": {
      "enabled": true,
      "show_disk_usage": true,
      "show_memory_usage": true,
      "show_cpu_usage": true,
      "alerts": {
        "disk_threshold": 80,
        "memory_threshold": 85,
        "cpu_threshold": 90
      }
    }
  }
}
```

### Worktree-Specific Statusline
```json
{
  "statusline": {
    "enabled": true,
    "worktree_context": {
      "name": "feature-user-auth",
      "type": "feature",
      "priority": "high"
    },
    "custom_indicators": {
      "coding": "💻",
      "testing": "🧪",
      "debugging": "🐛",
      "reviewing": "👀",
      "merging": "🔄",
      "deploying": "🚀"
    },
    "task_tracking": {
      "current_task": "User authentication implementation",
      "progress": 65,
      "subtasks": [
        {"name": "Login endpoint", "status": "completed"},
        {"name": "JWT integration", "status": "in_progress"},
        {"name": "Password reset", "status": "pending"}
      ]
    }
  }
}
```

## Task Integration

### Launching Subagents with Tasks
```python
# Launch feature development subagent
Task(
    description="Implement user authentication feature",
    prompt="Implement a complete user authentication system including login, registration, and password reset functionality. Work in the worktree-user-auth directory and follow the development guidelines.",
    subagent_type="feature-developer"
)

# Launch parallel bug fixes
Task(
    description="Fix critical bugs in parallel",
    prompt="Launch bug-fix subagents to address critical issues. Create separate worktrees for each bug and implement fixes in parallel.",
    subagent_type="parallel-task-coordinator"
)

# Launch code review subagent
Task(
    description="Review code changes",
    prompt="Review the code changes in the specified worktree. Check for code quality, security issues, and best practices.",
    subagent_type="code-reviewer"
)
```

## Best Practices

### Worktree Management
- Use descriptive worktree names
- Keep worktrees organized and clean
- Implement regular cleanup procedures
- Monitor resource usage
- Use proper branch naming conventions

### Subagent Coordination
- Define clear responsibilities for each agent
- Implement proper communication channels
- Handle conflicts and dependencies gracefully
- Monitor agent performance and resource usage
- Implement error handling and recovery

### Performance Optimization
- Limit concurrent worktrees based on system resources
- Use appropriate refresh rates for statusline
- Implement caching for repeated operations
- Monitor and optimize resource usage
- Use lazy loading for complex operations

### Security and Safety
- Implement proper access controls
- Use secure cleanup procedures
- Implement backup and recovery mechanisms
- Monitor for suspicious activity
- Use proper validation and sanitization

## Troubleshooting

### Common Issues

**Worktree Conflicts**
```bash
# Resolve worktree conflicts
git worktree list --porcelain
git worktree repair
git worktree prune
```

**Subagent Communication Failures**
```bash
# Check subagent status
ls -la .claude/agents/
# Verify task configuration
# Check logs for communication errors
```

**Resource Exhaustion**
```bash
# Monitor resource usage
df -h
free -h
# Clean up worktrees
git worktree prune
# Remove unused worktrees
git worktree remove ../worktree-unused
```

**Hook Execution Failures**
```bash
# Check hook permissions
chmod +x .claude/hooks/*.sh
# Test hooks manually
# Check hook logs
```

**Statusline Performance Issues**
```bash
# Optimize statusline configuration
# Reduce refresh rate
# Enable caching
# Monitor resource usage
```

## Production Patterns

### CI/CD Integration
```yaml
# .github/workflows/parallel-development.yml
name: Parallel Development Workflow

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize]

jobs:
  setup-worktrees:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Set up worktrees
        run: |
          git worktree add -b test-integration ../worktree-integration HEAD
          git worktree add -b test-performance ../worktree-performance HEAD
      
      - name: Run parallel tests
        run: |
          cd ../worktree-integration && npm run test:integration &
          cd ../worktree-performance && npm run test:performance &
          wait
```

### Team Collaboration
```json
{
  "team_workflows": {
    "feature_branching": {
      "worktree_per_feature": true,
      "auto_cleanup": true,
      "cleanup_delay": "7d",
      "notification_rules": {
        "on_create": ["team"],
        "on_complete": ["assignee", "reviewer"],
        "on_error": ["team", "lead"]
      }
    },
    "code_review": {
      "dedicated_worktree": true,
      "auto_assign": true,
      "parallel_reviews": true
    }
  }
}
```

## Quick Start Guide

### 1. Basic Setup
```bash
# Initialize repository
git init
git add .
git commit -m "Initial commit"

# Create first worktree
git worktree add -b feature-auth ../worktree-auth main

# Set up Claude Code configuration
mkdir -p .claude
# Add configuration files
```

### 2. Configure Subagents
```bash
# Create subagents directory
mkdir -p .claude/agents

# Create subagent configurations
# Add feature-developer.md
# Add bug-fix-developer.md
# Add parallel-task-coordinator.md
```

### 3. Set Up Hooks
```bash
# Create hooks directory
mkdir -p .claude/hooks

# Create hook scripts
# Add post-worktree-create.sh
# Add post-task-complete.sh
# Add cross-worktree-sync.sh

# Make hooks executable
chmod +x .claude/hooks/*.sh
```

### 4. Configure Statusline
```json
{
  "statusline": {
    "enabled": true,
    "multi_worktree": {
      "enabled": true,
      "max_display": 5
    }
  }
}
```

### 5. Test the Workflow
```bash
# Create a worktree
/worktree-create "test-feature"

# Check status
/worktree-status "all"

# Launch parallel tasks
/parallel-task "testing"

# Clean up when done
/worktree-cleanup "completed"
```

## Resources

### Official Documentation
- [Git Worktrees Documentation](https://git-scm.com/docs/git-worktree)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Hooks Configuration Guide](https://docs.anthropic.com/claude-code/hooks)
- [Statusline Configuration](https://docs.anthropic.com/claude-code/statusline)

### Community Examples
- [Worktree Templates](https://github.com/topics/git-worktree-templates)
- [Subagent Patterns](https://github.com/topics/claude-code-subagents)
- [Hook Examples](https://github.com/topics/claude-code-hooks)
- [Statusline Configurations](https://github.com/topics/claude-code-statusline)

---

**Remember**: Great parallel development workflows require careful planning and monitoring. Start with simple setups and gradually add complexity as needed. Always monitor resource usage and implement proper cleanup procedures.