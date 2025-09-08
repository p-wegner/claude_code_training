# Command: /parallel-dev

## Tasks: $ARGUMENTS

Automatically orchestrates parallel development across multiple Claude Code instances.

## Usage:
/parallel-dev "Implement user authentication, fix payment bugs, update API docs"
/parallel-dev "Create React frontend, build Node.js backend, setup database"
/parallel-dev "Add user management, implement search, optimize performance"

## How It Works:
1. **Task Analysis**: Breaks your request into parallel executable tasks
2. **Worktree Creation**: Automatically creates isolated worktrees for each task
3. **Instance Spawning**: Launches Claude Code instances in each worktree
4. **Subagent Assignment**: Assigns specialized subagents to each instance
5. **Progress Monitoring**: Tracks progress across all instances
6. **Result Integration**: Automatically merges results when complete
7. **Cleanup**: Removes worktrees after successful integration

## Example Output:
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