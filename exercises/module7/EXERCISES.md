# Module 7: Advanced Parallel Development with Git Worktrees - Exercises

## Exercise 1: Basic Worktree Setup and Management

### Objective
Set up and manage git worktrees for parallel development, understanding the fundamentals and basic operations.

### Tasks

#### Task 1.1: Create Your First Worktree
Create a git worktree for feature development with proper setup.

**Instructions:**
1. Initialize a git repository if you don't have one
2. Create a new worktree for a feature
3. Verify the worktree was created successfully
4. Explore the worktree structure

**Commands:**
```bash
# Initialize repository (if needed)
git init
git add .
git commit -m "Initial commit"

# Create worktree
git worktree add -b feature-user-auth ../worktree-user-auth main

# List worktrees
git worktree list

# Switch to worktree
cd ../worktree-user-auth

# Check worktree status
git status
git branch --show-current
```

#### Task 1.2: Worktree Configuration
Configure Claude Code settings for the new worktree.

**Instructions:**
1. Create worktree-specific Claude Code configuration
2. Set up statusline for worktree monitoring
3. Create development documentation
4. Test the configuration

**Configuration:**
```json
{
  "output": {
    "style": "structured",
    "format": "markdown"
  },
  "statusline": {
    "enabled": true,
    "custom_indicators": {
      "feature_dev": "🚀",
      "testing": "🧪",
      "debugging": "🐛"
    },
    "worktree_context": {
      "name": "user-authentication",
      "type": "feature"
    }
  }
}
```

#### Task 1.3: Multiple Worktree Management
Create and manage multiple worktrees for different features.

**Instructions:**
1. Create additional worktrees for different features
2. Practice switching between worktrees
3. Monitor worktree status
4. Clean up unused worktrees

**Commands:**
```bash
# Create multiple worktrees
git worktree add -b feature-payment ../worktree-payment main
git worktree add -b feature-api-docs ../worktree-api-docs main

# Work in different worktrees
cd ../worktree-payment
echo "Payment feature implementation" > feature.md

cd ../worktree-api-docs
echo "API documentation update" > docs.md

# List all worktrees
git worktree list

# Remove a worktree
git worktree remove ../worktree-api-docs
```

### Success Criteria
- [ ] Successfully created at least 2 worktrees
- [ ] Configured Claude Code settings for worktrees
- [ ] Switched between worktrees without issues
- [ ] Managed worktree lifecycle (create, list, remove)
- [ ] Understood worktree isolation concept

---

## Exercise 2: Subagent Integration with Worktrees

### Objective
Integrate subagents with worktrees for specialized parallel development tasks.

### Tasks

#### Task 2.1: Create Worktree-Specific Subagents
Create specialized subagents for different worktree types.

**Instructions:**
1. Create a feature development subagent
2. Create a bug fix subagent
3. Create a testing subagent
4. Configure subagent tools and permissions

**Feature Development Subagent:**
```yaml
---
name: feature-developer
description: "Specialized agent for feature development in isolated worktrees"
tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Task
---

You are a specialized feature development agent working within a git worktree.

## Responsibilities
- Implement features in isolated worktree environments
- Ensure code quality and testing standards
- Coordinate with other subagents when needed
- Maintain development documentation

## Workflow
1. Analyze feature requirements
2. Implement feature functionality
3. Write comprehensive tests
4. Update documentation
5. Prepare for integration
```

#### Task 2.2: Launch Subagents in Worktrees
Launch and manage subagents across different worktrees.

**Instructions:**
1. Use the Task tool to launch subagents
2. Monitor subagent activity
3. Coordinate between subagents
4. Handle subagent communication

**Example Task Launch:**
```python
Task(
    description="Implement user authentication feature",
    prompt="Implement a complete user authentication system including login, registration, and password reset functionality. Work in the worktree-user-auth directory and follow the development guidelines.",
    subagent_type="feature-developer"
)
```

#### Task 2.3: Cross-Worktree Coordination
Implement coordination between subagents in different worktrees.

**Instructions:**
1. Create a coordinator subagent
2. Implement communication channels
3. Handle task dependencies
4. Synchronize work across worktrees

**Coordinator Subagent:**
```yaml
---
name: worktree-coordinator
description: "Coordinates multiple subagents working across different worktrees"
tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Task
---

You are a coordinator agent managing multiple subagents across different worktrees.

## Responsibilities
- Distribute tasks to appropriate subagents
- Monitor progress across all worktrees
- Handle conflicts and dependencies
- Consolidate results and reports

## Coordination Workflow
1. Analyze overall task requirements
2. Break down into worktree-specific tasks
3. Launch specialized subagents
4. Monitor and coordinate execution
5. Consolidate and validate results
```

### Success Criteria
- [ ] Created at least 3 different subagent types
- [ ] Successfully launched subagents in worktrees
- [ ] Implemented basic coordination between subagents
- [ ] Handled cross-worktree communication
- [ ] Demonstrated parallel task execution

---

## Exercise 3: Slash Commands for Worktree Management

### Objective
Create and use slash commands for efficient worktree management and task automation.

### Tasks

#### Task 3.1: Basic Worktree Commands
Create slash commands for basic worktree operations.

**Instructions:**
1. Create `/worktree-create` command
2. Create `/worktree-list` command
3. Create `/worktree-switch` command
4. Create `/worktree-remove` command

**Example Command:**
```markdown
# Command: /worktree-create

## Feature name: $ARGUMENTS

Creates a new git worktree for parallel feature development.

## Usage:
/worktree-create "user-authentication"
/worktree-create "payment-processing"

## Actions:
1. Create new git worktree with feature branch
2. Set up worktree-specific configuration
3. Initialize development environment
4. Launch feature-development subagent
5. Configure statusline monitoring
```

#### Task 3.2: Advanced Worktree Commands
Create slash commands for advanced worktree operations.

**Instructions:**
1. Create `/worktree-status` command
2. Create `/worktree-sync` command
3. Create `/worktree-merge` command
4. Create `/worktree-cleanup` command

**Status Command Example:**
```markdown
# Command: /worktree-status

## Filter: $ARGUMENTS

Shows status of all active worktrees and their tasks.

## Usage:
/worktree-status "all"
/worktree-status "active"
/worktree-status "completed"

## Output:
- Worktree names and locations
- Current branch and commit
- Active subagents and their status
- Task progress and completion
- Resource usage and performance
```

#### Task 3.3: Parallel Task Commands
Create slash commands for managing parallel tasks across worktrees.

**Instructions:**
1. Create `/parallel-task` command
2. Create `/task-status` command
3. Create `/task-coordination` command
4. Test parallel task execution

**Parallel Task Command:**
```markdown
# Command: /parallel-task

## Task type: $ARGUMENTS

Launches parallel development tasks across multiple worktrees.

## Usage:
/parallel-task "bug-fixes"
/parallel-task "feature-development"
/parallel-task "code-review"

## Actions:
1. Analyze task requirements
2. Create appropriate worktrees
3. Launch specialized subagents
4. Monitor parallel execution
5. Consolidate results
```

### Success Criteria
- [ ] Created at least 4 basic worktree commands
- [ ] Created at least 4 advanced worktree commands
- [ ] Created parallel task management commands
- [ ] Tested all commands successfully
- [ ] Demonstrated efficient worktree management

---

## Exercise 4: Hook-Based Automation

### Objective
Implement hooks for automated worktree workflows and task management.

### Tasks

#### Task 4.1: Worktree Creation Hooks
Create hooks that trigger when worktrees are created.

**Instructions:**
1. Create `post-worktree-create` hook
2. Implement automatic environment setup
3. Configure worktree-specific settings
4. Launch appropriate subagents

**Hook Example:**
```bash
#!/bin/bash
# .claude/hooks/post-worktree-create.sh

input=$(cat)
worktree_path=$(echo "$input" | jq -r '.worktree_path // empty')
feature_name=$(echo "$input" | jq -r '.feature_name // empty')

echo "Setting up worktree: $worktree_path for feature: $feature_name"

# Create worktree-specific configuration
mkdir -p "$worktree_path/.claude"

# Copy and customize configuration
cp .claude/settings.json "$worktree_path/.claude/"

# Create development documentation
cat > "$worktree_path/DEVELOPMENT.md" << EOF
# Feature Development: $feature_name
- Worktree: $worktree_path
- Created: $(date)
- Status: In Progress
EOF

# Set up development environment
cd "$worktree_path"

# Install dependencies if needed
if [ -f "package.json" ]; then
    npm install
elif [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

echo "Worktree setup completed for $feature_name"
```

#### Task 4.2: Task Completion Hooks
Create hooks that trigger when tasks are completed.

**Instructions:**
1. Create `post-task-complete` hook
2. Implement validation and reporting
3. Trigger follow-up tasks
4. Update worktree status

**Hook Example:**
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

# Trigger integration tests
if [[ "$task_name" == *"test"* ]] || [[ "$task_name" == *"implementation"* ]]; then
    echo "Triggering integration tests..."
    # Launch integration test subagent
fi
```

#### Task 4.3: Cross-Worktree Sync Hooks
Create hooks for synchronizing changes across worktrees.

**Instructions:**
1. Create `cross-worktree-sync` hook
2. Implement conflict detection
3. Handle safe synchronization
4. Monitor sync status

**Hook Example:**
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

### Success Criteria
- [ ] Created worktree creation hooks
- [ ] Created task completion hooks
- [ ] Created cross-worktree sync hooks
- [ ] Tested all hook functionality
- [ ] Demonstrated automated workflow

---

## Exercise 5: Advanced Statusline Configuration

### Objective
Configure advanced statusline for monitoring multiple worktrees and parallel tasks.

### Tasks

#### Task 5.1: Multi-Worktree Statusline
Configure statusline to monitor multiple worktrees.

**Instructions:**
1. Create multi-worktree statusline configuration
2. Configure worktree indicators and colors
3. Set up resource monitoring
4. Test statusline functionality

**Configuration Example:**
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
    }
  }
}
```

#### Task 5.2: Resource Monitoring Statusline
Configure statusline for resource monitoring and alerts.

**Instructions:**
1. Set up disk usage monitoring
2. Configure memory usage tracking
3. Create alert thresholds
4. Test alert functionality

**Resource Monitoring Configuration:**
```json
{
  "statusline": {
    "resource_monitoring": {
      "enabled": true,
      "show_disk_usage": true,
      "show_memory_usage": true,
      "show_cpu_usage": true,
      "alerts": {
        "disk_threshold": 80,
        "memory_threshold": 85,
        "cpu_threshold": 90,
        "worktree_count_threshold": 10
      }
    }
  }
}
```

#### Task 5.3: Interactive Statusline Features
Configure interactive statusline features.

**Instructions:**
1. Set up interactive actions
2. Configure keyboard shortcuts
3. Create notification system
4. Test interactive features

**Interactive Configuration:**
```json
{
  "statusline": {
    "interactive": {
      "enabled": true,
      "actions": {
        "worktree_switch": true,
        "worktree_create": true,
        "worktree_remove": true,
        "task_pause": true,
        "task_resume": true,
        "task_cancel": true,
        "resource_cleanup": true
      },
      "shortcuts": {
        "toggle_worktree_view": "Ctrl+W",
        "toggle_resource_view": "Ctrl+R",
        "toggle_task_view": "Ctrl+T",
        "quick_worktree_switch": "Ctrl+Shift+W"
      }
    }
  }
}
```

### Success Criteria
- [ ] Configured multi-worktree statusline
- [ ] Set up resource monitoring
- [ ] Created interactive statusline features
- [ ] Tested all statusline functionality
- [ ] Demonstrated comprehensive monitoring

---

## Exercise 6: Production Workflow Implementation

### Objective
Implement a complete production-ready parallel development workflow.

### Tasks

#### Task 6.1: Complete Parallel Development Workflow
Implement a complete workflow using all learned concepts.

**Instructions:**
1. Set up multiple worktrees for different task types
2. Configure appropriate subagents for each worktree
3. Set up hooks for automation
4. Configure comprehensive statusline monitoring
5. Implement slash commands for management

**Workflow Components:**
- Feature development worktrees
- Bug fix worktrees
- Testing worktrees
- Documentation worktrees
- Code review worktrees

#### Task 6.2: CI/CD Integration
Integrate the parallel development workflow with CI/CD.

**Instructions:**
1. Create GitHub Actions workflow
2. Set up automated testing
3. Configure deployment pipelines
4. Implement worktree cleanup
5. Set up monitoring and alerts

**CI/CD Example:**
```yaml
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

#### Task 6.3: Team Collaboration Setup
Set up team collaboration features.

**Instructions:**
1. Configure shared worktree patterns
2. Set up conflict resolution workflows
3. Create team communication channels
4. Implement progress sharing
5. Set up documentation workflows

**Team Configuration:**
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

### Success Criteria
- [ ] Implemented complete parallel development workflow
- [ ] Integrated with CI/CD pipeline
- [ ] Set up team collaboration features
- [ ] Tested all components together
- [ ] Demonstrated production-ready system

---

## Exercise Solutions and Verification

### Verification Commands
```bash
# Verify worktree setup
git worktree list
ls -la ../worktree-*/

# Verify subagent functionality
# Check .claude/agents/ directory for subagent configs

# Verify slash commands
# Test each slash command with different arguments

# Verify hooks
# Check .claude/hooks/ directory for hook scripts

# Verify statusline
# Monitor statusline for multi-worktree information
```

### Common Issues and Solutions

**Issue: Worktree conflicts**
**Solution**: Use proper branch management and conflict resolution hooks

**Issue: Subagent communication failures**
**Solution**: Implement proper error handling and retry mechanisms

**Issue: Resource exhaustion**
**Solution**: Configure resource monitoring and automatic cleanup

**Issue: Hook execution failures**
**Solution**: Add comprehensive logging and error recovery

**Issue: Statusline performance issues**
**Solution**: Optimize refresh rates and implement caching

### Next Steps
After completing these exercises, you should be able to:
- Create and manage git worktrees for parallel development
- Integrate subagents with worktree workflows
- Implement comprehensive automation with hooks
- Monitor complex workflows with advanced statusline
- Build production-ready parallel development systems

Continue to real-world projects to apply these concepts in practice.