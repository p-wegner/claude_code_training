# Command: /worktree-create

## Feature name: $ARGUMENTS

Creates a new git worktree for parallel feature development with automated setup and subagent deployment.

## Usage
```
/worktree-create "user-authentication"
/worktree-create "payment-processing"
/worktree-create "api-refactor"
```

## Actions Performed
1. **Worktree Creation**: Creates new git worktree with feature branch
2. **Environment Setup**: Sets up development environment and dependencies
3. **Configuration**: Copies and customizes Claude Code settings
4. **Subagent Launch**: Deploys feature-development subagent
5. **Monitoring**: Configures statusline for worktree monitoring

## Workflow Steps
1. Validate feature name and repository state
2. Create worktree directory: `../worktree-[feature-name]`
3. Create feature branch: `feature/[feature-name]`
4. Initialize worktree with development setup
5. Launch feature-development subagent
6. Configure worktree-specific statusline
7. Create development documentation

## Example Output
```
✅ Worktree created successfully
📍 Path: ../worktree-user-authentication
🌿 Branch: feature/user-authentication
🤖 Subagent: feature-developer (active)
📊 Statusline: Configured for monitoring
📝 Documentation: DEVELOPMENT.md created
```

## Requirements
- Clean working directory in main repository
- Sufficient disk space for new worktree
- Git repository initialized with remote

## Error Handling
- Validates feature name format
- Checks for existing worktree conflicts
- Handles git operation failures
- Provides rollback on setup failures

---

# Command: /parallel-task

## Task type: $ARGUMENTS

Launches parallel development tasks across multiple worktrees with coordinated subagent execution.

## Usage
```
/parallel-task "bug-fixes"
/parallel-task "feature-development"
/parallel-task "code-review"
/parallel-task "testing"
```

## Supported Task Types
- **bug-fixes**: Creates worktrees for critical bug fixes
- **feature-development**: Parallel feature implementation
- **code-review**: Distributed code review across worktrees
- **testing**: Parallel testing across different environments
- **documentation**: Multi-worktree documentation updates

## Workflow Process
1. **Task Analysis**: Analyzes repository and identifies parallelizable tasks
2. **Worktree Creation**: Creates dedicated worktrees for each task
3. **Subagent Deployment**: Launches specialized subagents for each worktree
4. **Coordination**: Monitors and coordinates parallel execution
5. **Consolidation**: Gathers results and generates consolidated report

## Example Execution
```
/parallel-task "bug-fixes"

🚀 Launching parallel bug-fix workflow
📋 Analysis: Found 3 critical bugs to fix
🌳 Creating worktrees: bugfix-auth, bugfix-payment, bugfix-api
🤖 Deploying subagents: bug-fix-developer (3 instances)
📊 Monitoring: All worktrees active and progressing
📈 Progress: [67%] - 2/3 tasks completed
📋 Report: Consolidated bug-fix report generated
```

## Configuration Options
```json
{
  "parallel_task": {
    "max_concurrent": 5,
    "timeout_minutes": 120,
    "auto_cleanup": true,
    "notification_rules": {
      "on_start": ["team"],
      "on_complete": ["assignee"],
      "on_error": ["team", "lead"]
    }
  }
}
```

## Monitoring Features
- Real-time progress tracking
- Resource usage monitoring
- Conflict detection and resolution
- Automated error recovery
- Performance metrics collection

---

# Command: /worktree-status

## Filter: $ARGUMENTS

Shows comprehensive status of all active worktrees and their associated tasks.

## Usage
```
/worktree-status "all"           # Show all worktrees
/worktree-status "active"         # Show only active worktrees
/worktree-status "completed"      # Show completed worktrees
/worktree-status "errors"         # Show worktrees with errors
```

## Status Information Displayed
- **Worktree Details**: Name, path, branch, commit hash
- **Task Status**: Current task, progress, subagent status
- **Resource Usage**: Disk space, memory, CPU usage
- **Git Status**: Clean/dirty working directory, unpushed commits
- **Activity Timeline**: Recent actions and events

## Output Format
```
🌳 Active Worktrees: 3
┌─────────────────────────────────────────────────────────────┐
│ 📍 worktree-user-auth    🌿 feature/auth      🟢 Active       │
│ 🤖 feature-developer     📊 75% complete     💻 2h 15m active │
│ 📁 1.2GB used           ✅ 3/5 tests passed   🔄 2 commits     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 📍 worktree-payment     🌿 feature/payment   🟡 Testing     │
│ 🤖 feature-developer     📊 90% complete     🧪 45m active   │
│ 📁 890MB used           ⚠️ 1 test failing    🔄 1 commit     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 📍 worktree-api-docs    🌿 feature/docs       ✅ Completed   │
│ 🤖 documentation-agent  📊 100% complete   📝 1h 30m total  │
│ 📁 456MB used           ✅ All tests passed  📤 Ready for PR │
└─────────────────────────────────────────────────────────────┘

📊 Resource Summary: 2.5GB used, 3 active agents, 67% overall progress
```

## Filtering Options
- **all**: Show all worktrees regardless of status
- **active**: Only show worktrees with active subagents
- **completed**: Show worktrees with completed tasks
- **errors**: Show worktrees with errors or warnings
- **recent**: Show worktrees active in the last 24 hours

## Detailed View Options
- **--detailed**: Show detailed information including file changes
- **--resources**: Show resource usage breakdown
- **--timeline**: Show activity timeline for each worktree
- **--git**: Show detailed git status information

---

# Command: /worktree-cleanup

## Criteria: $ARGUMENTS

Cleans up completed or stale worktrees with safety checks and reporting.

## Usage
```
/worktree-cleanup "completed"         # Clean up completed worktrees
/worktree-cleanup "older-than-7-days" # Clean up worktrees older than 7 days
/worktree-cleanup "merged-branches"   # Clean up worktrees with merged branches
/worktree-cleanup "all"              # Clean up all eligible worktrees
```

## Safety Checks
Before cleanup, the command performs:
- ✅ Task completion verification
- ✅ Uncommitted changes check
- ✅ Branch merge status verification
- ✅ Dependency absence check
- ✅ User confirmation for destructive actions

## Cleanup Process
1. **Analysis**: Identifies worktrees matching criteria
2. **Validation**: Verifies safe cleanup conditions
3. **Backup**: Creates backup of important files
4. **Cleanup**: Removes worktrees and associated branches
5. **Report**: Generates cleanup summary report

## Example Execution
```
/worktree-cleanup "completed"

🔍 Analyzing worktrees for cleanup...
📋 Found 3 completed worktrees eligible for cleanup
✅ Safety checks passed for all worktrees
📦 Creating backup of important files...
🗑️ Cleaning up worktrees:
   - worktree-feature-auth (completed, merged)
   - worktree-bugfix-123 (completed, merged)
   - worktree-docs-update (completed, merged)
📋 Cleanup report generated
✅ Cleanup completed successfully
```

## Cleanup Criteria
- **completed**: Worktrees with 100% task completion
- **older-than-[X]**: Worktrees not modified in X days
- **merged-branches**: Worktrees with branches merged to main
- **inactive**: Worktrees with no activity for 7+ days
- **disk-space**: Worktrees using excessive disk space

## Configuration Options
```json
{
  "cleanup": {
    "auto_backup": true,
    "backup_location": "./worktree-backups",
    "confirm_destructive": true,
    "preserve_patterns": [
      "worktree-*-critical",
      "worktree-*-production"
    ],
    "cleanup_schedule": "0 2 * * *"  # Daily at 2 AM
  }
}
```

---

# Command: /worktree-sync

## Target: $ARGUMENTS

Synchronizes changes across multiple worktrees to maintain consistency.

## Usage
```
/worktree-sync "all"           # Sync all worktrees
/worktree-sync "config"        # Sync configuration files
/worktree-sync "dependencies"  # Sync dependency files
/worktree-sync "tests"         # Sync test files
```

## Sync Types
- **all**: Synchronize all files and configurations
- **config**: Sync Claude Code settings and configurations
- **dependencies**: Sync package.json, requirements.txt, etc.
- **tests**: Sync test files and test configurations
- **documentation**: Sync documentation and README files

## Sync Process
1. **Source Detection**: Identifies the source of changes
2. **Conflict Analysis**: Checks for potential conflicts
3. **Safe Sync**: Applies changes to target worktrees
4. **Validation**: Verifies sync completion
5. **Report**: Generates sync summary

## Example Execution
```
/worktree-sync "config"

🔄 Syncing configuration across worktrees
📋 Found 5 active worktrees
✅ No conflicts detected
📤 Syncing configuration files:
   - worktree-feature-auth ✅
   - worktree-payment ✅
   - worktree-api ✅
   - worktree-docs ✅
   - worktree-tests ✅
📋 Sync completed successfully
```

## Conflict Resolution
When conflicts are detected:
- ⚠️ Pauses sync operation
- 📋 Shows conflict details
- 🤖 Offers resolution options
- ✅ Allows manual intervention
- 📊 Generates conflict report

---

# Command: /worktree-merge

## Worktree: $ARGUMENTS

Merges a completed worktree branch back to main with validation and cleanup.

## Usage
```
/worktree-merge "worktree-user-auth"
/worktree-merge "worktree-payment"
/worktree-merge "all-completed"
```

## Merge Process
1. **Validation**: Validates worktree completion status
2. **Testing**: Runs final tests and validation
3. **Merge**: Merges branch to main with proper strategy
4. **Cleanup**: Removes worktree after successful merge
5. **Report**: Generates merge summary report

## Safety Checks
- ✅ Task completion verification
- ✅ Test suite passing
- ✅ Code quality checks
- ✅ No conflicts with main branch
- ✅ Documentation updated

## Example Execution
```
/worktree-merge "worktree-user-auth"

🔍 Validating worktree for merge...
✅ All tasks completed successfully
✅ All tests passing
✅ Code quality checks passed
✅ No conflicts detected
🔄 Merging feature/user-auth to main...
✅ Merge completed successfully
🗑️ Cleaning up worktree...
📋 Merge report generated
```

## Merge Strategies
- **merge**: Standard merge with commit history
- **squash**: Squash commits into single commit
- **rebase**: Rebase onto main branch
- **interactive**: Interactive rebase with commit editing

---

# Command: /worktree-deploy

## Worktree: $ARGUMENTS

Deploys a worktree to staging or production environment with validation.

## Usage
```
/worktree-deploy "worktree-user-auth" staging
/worktree-deploy "worktree-payment" production
/worktree-deploy "all-completed" staging
```

## Deployment Process
1. **Validation**: Validates deployment readiness
2. **Build**: Builds application for deployment
3. **Test**: Runs deployment-specific tests
4. **Deploy**: Deploys to target environment
5. **Verify**: Verifies successful deployment
6. **Monitor**: Monitors deployment health

## Environment Support
- **staging**: Staging environment deployment
- **production**: Production environment deployment
- **feature**: Feature flag deployment
- **canary**: Canary deployment with gradual rollout

## Example Execution
```
/worktree-deploy "worktree-user-auth" staging

🔍 Validating deployment readiness...
✅ All checks passed
🔨 Building application for staging...
✅ Build completed successfully
🧪 Running deployment tests...
✅ All tests passing
🚀 Deploying to staging environment...
✅ Deployment completed successfully
🔍 Verifying deployment health...
✅ All health checks passing
📊 Deployment monitoring enabled
```

## Post-Deployment Actions
- Health check monitoring
- Error tracking setup
- Performance monitoring
- Rollback preparation
- Notification dispatch