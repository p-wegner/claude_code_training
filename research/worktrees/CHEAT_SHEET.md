# Git Worktree with AI Development - Quick Reference

**Workshop Participant Cheat Sheet**

---

## Essential Commands

### Creating Worktrees
```bash
# Create new branch automatically
git worktree add -b feature/name ../project-feature main

# Use existing branch
git worktree add ../project-hotfix hotfix/branch

# Create detached worktree (for experiments)
git worktree add --detach ../project-experiment HEAD

# Create with specific commit/tag
git worktree add ../project-v1.0 v1.0.0
```

### Listing and Inspecting
```bash
# List all worktrees
git worktree list

# Verbose output
git worktree list --verbose

# Porcelain format (for scripts)
git worktree list --porcelain
```

### Removing Worktrees
```bash
# Remove clean worktree
git worktree remove ../project-feature

# Force remove (unclean worktree)
git worktree remove -f ../project-feature

# After removal, delete branch
git branch -d feature/name
```

### Maintenance
```bash
# Clean up stale metadata
git worktree prune

# Lock worktree (prevent pruning)
git worktree lock ../project-feature --reason "Important work"

# Unlock worktree
git worktree unlock ../project-feature

# Move worktree
git worktree move ../old-path ../new-path

# Repair broken links
git worktree repair
```

---

## Common Workflows

### Emergency Fix Workflow
```bash
# In middle of feature work...
# No need to stash!

git worktree add -b hotfix/urgent ../project-hotfix main
cd ../project-hotfix

# Fix the bug
# ... make changes ...
git add . && git commit -m "Fix urgent bug"

# Return to feature work
cd ../project-feature
# All your uncommitted work is still there!
```

### Parallel AI Development
```bash
# Create worktrees for parallel AI work
git worktree add -b feature/auth ../project-auth main
git worktree add -b feature/api ../project-api main

# Terminal 1: Auth feature
cd ../project-auth
claude-code
> Claude: Build OAuth2 authentication...

# Terminal 2: API feature
cd ../project-api
claude-code
> Claude: Build RESTful API...

# Both AI sessions run in parallel with isolated context
```

### Code Review Workflow
```bash
# Create worktree for PR review
git worktree add -b review/pr-123 ../review-pr-123 origin/pr-123

cd ../review-pr-123
claude-code
> Claude: Review this PR for security and quality

# Make review suggestions as commits
git add . && git commit -m "Review feedback"

# Push review branch
git push origin review/pr-123

# Clean up after merge
git worktree remove ../review-pr-123
```

### Integration Testing
```bash
# Create integration worktree
git worktree add -b integration/test ../integration-test main

cd ../integration-test
# Merge all features
git merge feature/auth
git merge feature/api
git merge feature/ui

# Run integration tests
npm test

# If tests pass, merge to main
cd ../project-main
git merge integration/test
```

---

## AI Tool Integration

### Claude Code
```bash
# Start Claude Code in worktree
cd ../project-feature
claude-code

# Each Claude session maintains independent context
# No interference between worktrees
```

### Aider
```bash
# Start Aider in worktree
cd ../project-feature
aider --model claude-3-5-sonnet

# Supports multiple models for comparison
```

### CCSwarm (Advanced)
```bash
# Initialize project
ccswarm init --name "MyProject" --agents frontend,backend

# Create worktrees
git worktree add ../myproject-frontend feature/frontend
git worktree add ../myproject-backend feature/backend

# Start orchestrator
ccswarm start

# Delegate tasks
ccswarm delegate task "Build UI" --agent frontend
ccswarm delegate task "Build API" --agent backend

# Monitor
ccswarm tui
```

---

## Isolation Strategies

### Full Isolation (Recommended for AI)
```bash
git worktree add -b feature/auth ../project-auth main
cd ../project-auth
npm install  # Separate node_modules
cp .env.example .env.local  # Separate environment
```

### Shared Dependencies (Disk Efficient)
```bash
cd ../project-auth
rm -rf node_modules
ln -s ../../project-main/node_modules ./node_modules
```

### Docker Volume Isolation
```bash
cd ../project-auth
docker run -v $(pwd):/app -v auth-deps:/app/node_modules node:18 npm install
```

---

## Best Practices

### Naming Conventions
```bash
# Good: Clear and descriptive
project-feature-auth-oauth2
project-bugfix-payment-timeout
project-experiment-react-18-upgrade

# Avoid: Unclear names
project-temp
project-test
project-1
```

### Organization Strategies
```bash
# Sibling directories (recommended)
~/project/              # Main
~/project-auth/         # Feature
~/project-hotfix/       # Bug fix

# Dedicated trees directory
~/project/
~/trees/auth/
~/trees/hotfix/

# Feature-specific organization
~/project/
~/features/auth/
~/bugfixes/payment-timeout/
~/experiments/new-approach/
```

### Regular Cleanup
```bash
# List all worktrees
git worktree list

# Remove completed worktrees
git worktree remove ../project-feature
git branch -d feature/name

# Prune stale metadata
git worktree prune
```

---

## Troubleshooting

### "Branch Already Checked Out"
```bash
# Check existing worktrees
git worktree list

# Remove existing worktree if done
git worktree remove ../existing-path

# Create new worktree
git worktree add ../new-path branch-name
```

### Disk Space Issues
```bash
# Use sparse checkout
git sparse-checkout init
git sparse-checkout set src/ tests/

# Share dependencies
rm -rf node_modules
ln -s ../../main/node_modules ./node_modules

# Regular cleanup
git worktree prune
git worktree remove ../old-feature
```

### Broken Worktree Links
```bash
# Repair broken links
git worktree repair

# Clean stale metadata
git worktree prune
```

### Merge Conflicts
```bash
# Create conflict resolution worktree
git worktree add -b resolve-conflict ../resolve-conflict HEAD

cd ../resolve-conflict
# Resolve conflicts (with AI help if desired)
claude-code  # Ask Claude for help

# Test resolution
npm test

# Complete merge
cd ../project-main
git merge resolve-conflict
git worktree remove ../resolve-conflict
```

---

## Quick Reference Card

### Worktree Lifecycle
```
CREATE → USE → COMMIT → MERGE → REMOVE
   ↓                        ↓
  Lock                   Prune
   ↓                        ↓
 Unlock                 Repair
```

### Isolation Layers
```
1. File System (separate directories)
2. Git State (separate HEAD/index)
3. Process (separate AI sessions)
4. Dependencies (separate node_modules)
5. Environment (separate .env files)
6. Configuration (worktree-specific config)
```

### Workshop Progression
```
Module 1: Setup (30 min)
    ↓
Module 2: Fundamentals (60 min)
    ↓
Module 3: AI Integration (90 min)
    ↓
Module 4: Isolation (75 min)
    ↓
Module 5: Multiagent (90 min)
    ↓
Module 6: Advanced (90 min)
    ↓
Module 7: Production (90 min)
```

---

## Essential Aliases

Add to your `~/.gitconfig`:

```bash
# Quick worktree list
[alias]
    wt = worktree
    wtl = worktree list
    wtlv = worktree list --verbose
    wtr = worktree remove
    wta = worktree add
    wtp = worktree prune
```

Usage:
```bash
git wtl     # List worktrees
git wta -b feature/name ../path main  # Add worktree
git wtr ../path  # Remove worktree
git wtp     # Prune stale metadata
```

---

## Resources

### Documentation
- [Git Worktree Docs](https://git-scm.com/docs/git-worktree)
- [Claude Code Docs](https://docs.anthropic.com/claude-code)
- [CCSwarm GitHub](https://github.com/nwiizo/ccswarm)

### Community
- Git mailing list
- Stack Overflow (git-worktree tag)
- GitHub Discussions

### Tools
- Git (2.5+ required)
- Claude Code
- CCSwarm (optional, for advanced orchestration)

---

**Remember**: Git worktrees enable parallel AI development with perfect context isolation. Master them, and you'll dramatically increase your development velocity!

**Workshop Support**: Ask instructors for help with any of these commands or workflows.
