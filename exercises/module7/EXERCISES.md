# Module 7: Automated Parallel Development Orchestration - Exercises

## Module Overview
This module focuses on building **orchestration systems** that completely hide the complexity of git worktrees and manual instance management. Users express what they want to accomplish, and the orchestrator handles everything automatically.

## Core Philosophy
**Hide Complexity, Reveal Simplicity**

Users should never need to know about worktrees, git commands, or manual instance management. They just say what they want, and the orchestrator makes it happen.

## Exercise 1: Building the Task Analyzer

### Objective
Create a task analyzer subagent that can break down user requests into parallel executable tasks.

### Key Learning
**The orchestrator must understand user intent and automatically determine how to parallelize the work.**

### Tasks

#### Task 1.1: Create Task Analysis Subagent
Create a subagent that analyzes user requests and creates execution plans.

**Instructions:**
1. Create the task-analyzer subagent
2. Implement request parsing logic
3. Add dependency detection capabilities
4. Create resource planning features

**Implementation:**
```yaml
---
name: task-analyzer
description: "Analyzes user requests and creates parallel execution plans"
tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Task
---

You are a task analysis agent that breaks down user requests into parallel executable tasks.

## Analysis Process
1. **Parse User Intent**: Extract specific tasks from user request
2. **Identify Parallel Opportunities**: Find tasks that can run simultaneously
3. **Map Dependencies**: Determine which tasks must wait for others
4. **Resource Assessment**: Estimate worktree and instance requirements
5. **Create Execution Plan**: Generate detailed parallel execution strategy

## Example Analysis
**Input:** "Implement user auth, fix payment bugs, update API docs"

**Output:** JSON execution plan with 3 parallel tasks, dependencies, and resource requirements
```

#### Task 1.2: Test Task Analysis
Test the task analyzer with various user requests.

**Test Cases:**
```bash
# Simple parallel tasks
"Create frontend, build backend, setup database"

# Complex dependencies
"Implement user management, add authentication, create user dashboard, update docs"

# Mixed priorities
"Fix critical payment bug, add user profiles, optimize performance, update API docs"
```

**Success Criteria:**
- [ ] Correctly identifies parallel tasks
- [ ] Accurately maps dependencies
- [ ] Estimates resource requirements
- [ ] Generates executable JSON plans
- [ ] Handles complex user requests

### Exercise 2: Worktree Management Automation

### Objective
Create a worktree manager that handles all worktree operations automatically without user intervention.

### Key Learning
**Worktrees should be created, configured, and managed completely automatically.**

### Tasks

#### Task 2.1: Automated Worktree Creation
Create a worktree manager that creates worktrees based on execution plans.

**Instructions:**
1. Create the worktree-manager subagent
2. Implement automatic worktree creation
3. Add intelligent worktree naming
4. Create automatic configuration setup

**Features to Implement:**
```bash
# Automatic worktree creation from execution plan
# Input: JSON plan with tasks
# Output: Created and configured worktrees

# Example automation
plan='{"tasks": [{"name": "user-auth", "type": "feature"}, {"name": "payment-bugs", "type": "bugfix"}]}'
worktree-manager --plan "$plan"
# Creates: ../worktree-user-auth, ../worktree-payment-bugs
# Configures: Each with task-specific settings
# Returns: Worktree paths and status
```

#### Task 2.2: Intelligent Configuration
Each worktree should be automatically configured for its specific task.

**Configuration Examples:**
```json
// worktree-user-auth/.claude/settings.json
{
  "output": {"style": "structured", "focus": "feature_development"},
  "statusline": {
    "custom_indicators": {"auth": "🔐", "feature": "🚀"},
    "worktree_context": {"name": "user-authentication", "task": "feature"}
  }
}

// worktree-payment-bugs/.claude/settings.json  
{
  "output": {"style": "compact", "focus": "bug_fixing"},
  "statusline": {
    "custom_indicators": {"bug": "🐛", "payment": "💳"},
    "worktree_context": {"name": "payment-bugs", "task": "bugfix"}
  }
}
```

**Success Criteria:**
- [ ] Automatic worktree creation from plans
- [ ] Intelligent task-specific configuration
- [ ] Proper isolation between worktrees
- [ ] Resource monitoring and limits
- [ ] Error handling and rollback

### Exercise 3: Instance Spawning and Management

### Objective
Create an instance spawner that automatically launches and manages Claude Code instances.

### Key Learning
**Claude Code instances should be spawned automatically as background processes.**

### Tasks

#### Task 3.1: Background Instance Spawning
Create a system that launches Claude Code instances in the background.

**Instructions:**
1. Create the instance-spawner subagent
2. Implement background process management
3. Add health monitoring capabilities
4. Create result collection systems

**Implementation Strategy:**
```bash
# Spawn Claude Code instance in background
spawn_instance() {
    local worktree_path="$1"
    local subagent_type="$2"
    local instance_id="$3"
    
    cd "$worktree_path"
    
    # Launch Claude Code in background
    claude-code \
        --subagent "$subagent_type" \
        --instance-id "$instance_id" \
        --task "$task_description" \
        > ".claude/instance-$instance_id.log" 2>&1 &
    
    local pid=$!
    echo "Spawned instance $instance_id with PID $pid"
    
    # Track instance for monitoring
    echo "$pid:$worktree_path:$instance_id" >> ".claude/instances.txt"
}
```

#### Task 3.2: Health Monitoring
Implement monitoring for spawned instances.

**Monitoring Features:**
```bash
# Monitor instance health
monitor_instances() {
    while IFS=: read -r pid worktree instance_id; do
        if ! kill -0 "$pid" 2>/dev/null; then
            echo "Instance $instance_id (PID $pid) is not running"
            # Handle restart or failure
        fi
        
        # Check resource usage
        ps -p "$pid" -o pid,ppid,pcpu,pmem,time,etime
    done < ".claude/instances.txt"
}
```

**Success Criteria:**
- [ ] Automatic background instance spawning
- [ ] Health monitoring and restart capabilities
- [ ] Resource usage tracking
- [ ] Result collection and logging
- [ ] Graceful error handling

### Exercise 4: Building the Main Orchestrator

### Objective
Create the main orchestrator that ties everything together into a seamless user experience.

### Key Learning
**Users should interact with a simple command, not complex orchestration systems.**

### Tasks

#### Task 4.1: Main Orchestration Command
Create the /parallel-dev command that users will actually use.

**Instructions:**
1. Create the parallel-dev slash command
2. Implement the complete orchestration workflow
3. Add progress monitoring and status updates
4. Create user-friendly output formatting

**User Experience Design:**
```bash
# User types:
/parallel-dev "Implement user auth, fix payment bugs, update docs"

# Orchestrator responds:
🚀 **Parallel Development Orchestrator Started**

**Tasks Identified:**
- Task 1: User Authentication (feature-development subagent)
- Task 2: Payment Bug Fixes (bugfix subagent)  
- Task 3: API Documentation (documentation subagent)

**Worktrees Created:**
- ../worktree-user-auth (Instance 1 starting...)
- ../worktree-payment-bugs (Instance 2 starting...)
- ../worktree-api-docs (Instance 3 starting...)

**Progress Monitoring:**
🟢 Task 1: 25% complete - JWT implementation in progress
🟡 Task 2: 10% complete - Investigating payment timeout issues
⏳ Task 3: Waiting for dependencies (Task 1, 2)

**Estimated Completion:** ~45 minutes
```

#### Task 4.2: Status and Control Commands
Create commands for monitoring and controlling the orchestra.

**Commands to Implement:**
```bash
/orchestra-status "summary"     # High-level overview
/orchestra-status "detailed"    # Detailed progress per task
/orchestra-status "resources"    # Resource utilization

/orchestra-control "pause"       # Pause all instances
/orchestra-control "resume"      # Resume paused instances
/orchestra-control "cancel"      # Cancel all orchestration

/merge-results "automatic"      # Smart automatic merging
/cleanup-orchestra "success"     # Clean up successful runs
```

**Success Criteria:**
- [ ] Simple user interface that hides complexity
- [ ] Real-time status monitoring
- [ ] User-friendly progress updates
- [ ] Robust error handling
- [ ] Automatic cleanup and integration

### Exercise 5: Advanced Orchestration Patterns

### Objective
Implement sophisticated orchestration patterns for complex real-world scenarios.

### Key Learning
**Real orchestration needs to handle dependencies, failures, and complex workflows.**

### Tasks

#### Task 5.1: Dependency Management
Implement handling of complex task dependencies.

**Scenario:** Some tasks must wait for others to complete.

**Implementation:**
```bash
# Example dependency graph
{
  "tasks": [
    {"name": "database-schema", "dependencies": []},
    {"name": "api-endpoints", "dependencies": ["database-schema"]},
    {"name": "frontend-components", "dependencies": ["api-endpoints"]},
    {"name": "documentation", "dependencies": ["api-endpoints", "frontend-components"]},
    {"name": "testing", "dependencies": ["api-endpoints", "frontend-components"]}
  ]
}

# Orchestrator should:
# Phase 1: Launch database-schema (no dependencies)
# Phase 2: Launch api-endpoints (waits for database-schema)
# Phase 3: Launch frontend-components (waits for api-endpoints)
# Phase 4: Launch documentation and testing (both wait for dependencies)
```

#### Task 5.2: Error Recovery and Fallbacks
Implement robust error handling and recovery mechanisms.

**Error Scenarios to Handle:**
```bash
# Instance failure detection and restart
# Worktree creation failures and rollback
# Merge conflict resolution
# Resource exhaustion handling
# Network connectivity issues
```

**Recovery Strategies:**
```bash
# Automatic restart for transient failures
# Fallback to sequential execution if parallel fails
# Partial result preservation and recovery
# User notification and manual intervention options
```

#### Task 5.3: Resource Optimization
Implement intelligent resource management.

**Optimization Features:**
```bash
# Dynamic instance scaling based on system resources
# Resource usage monitoring and limits
# Priority-based resource allocation
# Load balancing across multiple instances
# Memory and CPU usage optimization
```

**Success Criteria:**
- [ ] Complex dependency handling
- [ ] Robust error recovery
- [ ] Intelligent resource optimization
- [ ] Performance monitoring and tuning
- [ ] Production-ready reliability

### Exercise 6: Real-World Orchestration Scenarios

### Objective
Apply orchestration patterns to solve real-world development challenges.

### Key Learning
**Orchestration should solve practical problems that developers face every day.**

### Scenarios

#### Scenario 1: Emergency Bug Response Team
**User Request:** `/parallel-dev "Investigate payment timeout, fix database connection, update monitoring"`

**Orchestrator Response:**
```bash
🚨 **Emergency Response Orchestra Started**

**Priority Tasks Launched:**
- Investigation: 🔍 Analyzing logs and reproducing issues
- Bug Fix: 🔧 Developing immediate fixes
- Monitoring: 📊 Setting up alerts and dashboards

**Status:** All instances running in parallel
**ETA:** 15 minutes for initial resolution
```

#### Scenario 2: Feature Development Team
**User Request:** `/parallel-dev "Implement user authentication, create admin dashboard, add user management"`

**Orchestrator Response:**
```bash
🚀 **Feature Development Orchestra Started**

**Tasks Identified:**
- User Authentication: 🟢 80% - JWT implementation complete
- Admin Dashboard: 🟡 45% - React components in progress  
- User Management: 🟠 30% - API endpoints in progress

**Dependencies:** Dashboard and User Management wait for Auth
**Integration:** Automatic merge and testing when all complete
```

#### Scenario 3: Product Launch Preparation
**User Request:** `/parallel-dev "Finalize features, run comprehensive tests, update documentation, prepare deployment"`

**Orchestrator Response:**
```bash
🚀 **Launch Preparation Orchestra Started**

**Complex Workflow:**
- Phase 1: Features → Tests → Documentation → Deployment
- Parallel execution where possible
- Automatic handoffs between phases
- Progress tracking with milestone alerts
- Rollback planning and testing
```

### Success Criteria for Complete Module

#### Technical Proficiency
- [ ] Built complete orchestration system from scratch
- [ ] Implemented automated worktree management
- [ ] Created background instance spawning
- [ ] Built robust error handling and recovery
- [ ] Implemented resource optimization

#### User Experience
- [ ] Simple commands that hide all complexity
- [ ] Real-time status monitoring
- [ ] User-friendly progress updates
- [ ] Automatic cleanup and integration
- [ ] Intuitive error messages and recovery

#### Real-World Application
- [ ] Solved practical development problems
- [ ] Demonstrated significant time savings
- [ ] Showcased production-ready reliability
- [ ] Implemented sophisticated orchestration patterns
- [ ] Created scalable and maintainable systems

### The Ultimate Test

**Can a user with no knowledge of git worktrees or parallel development successfully:**

1. **Express what they want to accomplish** in natural language
2. **Launch complex parallel development** with a single command
3. **Monitor progress** without understanding the underlying complexity
4. **Get integrated results** without manual merging
5. **Have a clean workspace** after completion

If yes, your orchestration system is successful!

## Next Steps

After completing these exercises, you'll have built a sophisticated orchestration system that completely transforms how developers approach parallel development. The complexity is hidden, the user experience is simple, and the productivity gains are dramatic.

Continue to real-world projects and apply these orchestration patterns to solve actual development challenges.