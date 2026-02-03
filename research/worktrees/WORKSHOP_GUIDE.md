# Git Worktree Integration with AI Development - Complete Workshop Guide

**Workshop Duration**: 6-8 hours (can be split into modules)
**Target Audience**: Intermediate to Advanced Developers
**Prerequisites**: Git proficiency, AI coding tool experience, command line comfort

---

## Table of Contents

1. [Workshop Overview](#workshop-overview)
2. [Learning Objectives](#learning-objectives)
3. [Module Structure](#module-structure)
4. [Module 1: Introduction and Setup](#module-1-introduction-and-setup)
5. [Module 2: Git Worktree Fundamentals](#module-2-git-worktree-fundamentals)
6. [Module 3: AI Integration with Worktrees](#module-3-ai-integration-with-worktrees)
7. [Module 4: Isolation Strategies](#module-4-isolation-strategies)
8. [Module 5: Multiagent Coordination](#module-5-multiagent-coordination)
9. [Module 6: Advanced Patterns](#module-6-advanced-patterns)
10. [Module 7: Production Workflows](#module-7-production-workflows)
11. [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)
12. [Workshop Exercises](#workshop-exercises)
13. [Resources and References](#resources-and-references)

---

## Workshop Overview

### Philosophy

This workshop teaches **parallel development with AI agents using git worktrees** as the foundational technology. Participants will learn how to:

1. Run multiple AI coding agents simultaneously
2. Maintain complete context isolation between agents
3. Orchestrate complex parallel development workflows
4. Implement production-grade multiagent systems

### Key Differentiators

- **Hands-on First**: Every concept is immediately applied in practical exercises
- **AI-Native**: Designed specifically for AI-assisted development workflows
- **Production-Focused**: Real-world patterns and best practices
- **Progressive Complexity**: Builds from basics to advanced orchestration

### Teaching Progression

```
Basics (Modules 1-2)
    ↓
AI Integration (Modules 3-4)
    ↓
Multiagent Orchestration (Modules 5-6)
    ↓
Production Workflows (Module 7)
```

---

## Learning Objectives

By the end of this workshop, participants will be able to:

### Core Skills
- [ ] Create and manage git worktrees effectively
- [ ] Run multiple AI coding agents in parallel
- [ ] Maintain context isolation between parallel workstreams
- [ ] Orchestrate complex multi-agent workflows

### Advanced Skills
- [ ] Implement CCSwarm or similar orchestration systems
- [ ] Design production-grade parallel development pipelines
- [ ] Optimize isolation strategies for different scenarios
- [ ] Troubleshoot common worktree issues

### Production Skills
- [ ] Build team workflows around parallel AI development
- [ ] Implement observability and monitoring
- [ ] Scale parallel development to enterprise teams
- [ ] Create custom orchestration solutions

---

## Module Structure

### Duration Overview

| Module | Duration | Difficulty | Focus |
|--------|----------|------------|-------|
| 1. Introduction | 30 min | Beginner | Setup and motivation |
| 2. Worktree Fundamentals | 60 min | Beginner | Git worktree basics |
| 3. AI Integration | 90 min | Intermediate | AI + worktrees |
| 4. Isolation Strategies | 75 min | Intermediate | Context preservation |
| 5. Multiagent Coordination | 90 min | Advanced | Orchestration |
| 6. Advanced Patterns | 90 min | Advanced | Complex workflows |
| 7. Production Workflows | 90 min | Advanced | Enterprise patterns |

### Prerequisites Per Module

**Module 1-2**: Git proficiency, command line comfort
**Module 3-4**: Module 2 + AI coding tool experience
**Module 5-6**: Module 4 + programming experience
**Module 7**: Module 6 + production experience

---

## Module 1: Introduction and Setup

**Duration**: 30 minutes
**Difficulty**: Beginner

### Learning Objectives
- Understand the problem: context switching in AI development
- See the solution: parallel development with git worktrees
- Set up development environment
- Verify all tools working

### The Context Switching Problem

Demonstrate the traditional workflow and its pain points:

```bash
# Traditional workflow - context switching nightmare
$ cd ~/my-project
$ claude-code
> Claude: Let's build a machine learning pipeline with data
> preprocessing, model training, and inference APIs...

# 30 minutes later - Claude has deep understanding
# Suddenly: URGENT BUG REPORT!

$ git stash                    # Lose Claude context
$ git checkout main
$ git checkout -b hotfix/bug

$ claude-code                  # Start from scratch
> Claude: We need to fix a bug in the payment system...

# After bug fix, return to feature work
$ git checkout feature/ml-pipeline
$ git stash pop

$ claude-code                  # Claude lost all context!
> Claude: Hello! What were we working on?
# 20 minutes to rebuild context...
```

### The Worktree Solution

Show how worktrees solve this:

```bash
# Parallel workflow - zero context switching
$ cd ~/my-project
$ claude-code
# Terminal 1: ML Pipeline work

# Urgent bug? No problem!
$ git worktree add -b hotfix/bug ../my-project-hotfix main
$ cd ../my-project-hotfix
$ claude-code
# Terminal 2: Hotfix work - isolated context

# Continue ML work in Terminal 1 - context intact!
```

### Environment Setup

```bash
# 1. Verify Git version (need 2.5+)
git --version  # Should be 2.5.0 or higher

# 2. Install Claude Code (if not already installed)
npm install -g @anthropic-ai/claude-code

# 3. Enable worktree-specific config (optional but recommended)
git config --global worktree.guessRemote true

# 4. Create practice repository
mkdir ~/workshop-practice
cd ~/workshop-practice
git init
echo "# Git Worktree Workshop" > README.md
git add README.md
git commit -m "Initial commit"

# 5. Verify setup
git worktree list
```

### Quick Verification Exercise

**Exercise**: Create your first worktree

```bash
# In your practice repository
git worktree add -b test-branch ../workshop-test-branch

# Verify it was created
git worktree list

# Check out the new worktree
cd ../workshop-test-branch
git status  # Should show "On branch test-branch"

# Return to main
cd ../workshop-practice
```

### Common Setup Issues

| Issue | Solution |
|-------|----------|
| Git version too old | Update Git via brew/apt/chocolate |
| Claude Code not found | Install via npm: `npm install -g @anthropic-ai/claude-code` |
| Permission denied | Check directory permissions |
| Worktree command not found | Verify Git 2.5+ installed |

---

## Module 2: Git Worktree Fundamentals

**Duration**: 60 minutes
**Difficulty**: Beginner

### Learning Objectives
- Master core git worktree commands
- Understand worktree lifecycle (create, use, remove)
- Learn worktree best practices
- Handle common worktree scenarios

### Core Commands Deep Dive

#### 1. Creating Worktrees

```bash
# Basic syntax
git worktree add <path> [<branch>]

# Create new branch automatically
git worktree add -b feature/auth ../project-auth main

# Use existing branch
git worktree add ../project-hotfix hotfix/critical

# Create detached worktree (for experiments)
git worktree add --detach ../project-experiment HEAD~5

# Create with specific commit
git worktree add ../project-v1.0 v1.0.0
```

#### 2. Listing Worktrees

```bash
# Basic list
git worktree list

# Verbose (shows details)
git worktree list --verbose

# Porcelain (for scripts)
git worktree list --porcelain

# Example output:
# /Users/dev/project              abcd1234 [main]
# /Users/dev/project-auth         5678efgh [feature/auth]
# /Users/dev/project-hotfix       1234abcd (detached HEAD) locked
```

#### 3. Removing Worktrees

```bash
# Basic removal (requires clean worktree)
git worktree remove ../project-hotfix

# Force removal (unclean worktree)
git worktree remove -f ../project-hotfix

# After removal, clean up branch
git branch -d hotfix/critical
```

#### 4. Maintenance Commands

```bash
# Prune stale worktree metadata
git worktree prune

# Lock a worktree (prevents pruning)
git worktree lock ../project-auth --reason "On portable drive"

# Unlock a worktree
git worktree unlock ../project-auth

# Move a worktree
git worktree move ../project-auth ../project-auth-new

# Repair broken worktree connections
git worktree repair
```

### Exercise 2.1: Worktree Lifecycle

**Objective**: Master the complete worktree lifecycle

**Steps**:

1. **Create three worktrees**:
```bash
cd ~/workshop-practice

git worktree add -b feature/frontend ../workshop-frontend main
git worktree add -b feature/backend ../workshop-backend main
git worktree add -b feature/testing ../workshop-testing main
```

2. **Verify creation**:
```bash
git worktree list
git worktree list --verbose
```

3. **Make changes in each**:
```bash
# Frontend worktree
cd ../workshop-frontend
echo "console.log('frontend');" > frontend.js
git add frontend.js
git commit -m "Add frontend code"

# Backend worktree
cd ../workshop-backend
echo "console.log('backend');" > backend.js
git add backend.js
git commit -m "Add backend code"

# Testing worktree
cd ../workshop-testing
echo "console.log('testing');" > test.js
git add test.js
git commit -m "Add test code"
```

4. **Verify isolation**:
```bash
cd ../workshop-practice
git status  # Should be clean (no changes from other worktrees)
git log --oneline --graph --all  # Should show all branches
```

5. **Clean up**:
```bash
git worktree remove ../workshop-frontend
git worktree remove ../workshop-backend
git worktree remove ../workshop-testing

git branch -d feature/frontend
git branch -d feature/backend
git branch -d feature/testing
```

### Exercise 2.2: Emergency Fix Workflow

**Objective**: Handle urgent tasks without losing context

**Scenario**: You're in the middle of complex feature work when a critical bug is reported.

**Steps**:

1. **Start feature work**:
```bash
cd ~/workshop-practice
git worktree add -b feature/complex ../workshop-complex

cd ../workshop-complex
# Simulate complex uncommitted work
echo "TODO: implement complex feature" > complex.txt
echo "TODO: another todo" >> complex.txt
echo "TODO: more work needed" >> complex.txt

git status
```

2. **Emergency! Create hotfix worktree**:
```bash
# No need to stash! Context preserved in ../workshop-complex
cd ~/workshop-practice
git worktree add -b hotfix/critical ../workshop-hotfix main

cd ../workshop-hotfix
# Fix the bug
echo "console.log('bug fixed');" > fix.js
git add fix.js
git commit -m "Fix critical bug"

# "Deploy" the fix
cd ~/workshop-practice
git merge hotfix/critical
```

3. **Return to feature work**:
```bash
cd ../workshop-complex
git status
# Your uncommitted work is still there!
# No context lost, no stashing needed!

cat complex.txt  # All your TODOs preserved
```

### Best Practices

#### Naming Conventions

```bash
# Good: Clear and descriptive
git worktree add ../project-feature-auth feature/auth
git worktree add ../project-bug-payment-timeout bugfix/payment-timeout
git worktree add ../project-experiment-react-18 experiment/react-18-upgrade

# Avoid: Unclear names
git worktree add ../project-temp temp
git worktree add ../project-test test
git worktree add ../project-1 1
```

#### Organization Strategies

```bash
# Strategy 1: Sibling directories (recommended)
~/my-project/          # Main repository
../my-project-auth/    # Feature work
../my-project-hotfix/  # Bug fix

# Strategy 2: Dedicated trees directory
~/my-project/
../trees/auth/
../trees/hotfix/

# Strategy 3: Feature-specific organization
~/my-project/
../features/auth/
../bugfixes/payment-timeout/
../experiments/new-approach/
```

#### Regular Cleanup

```bash
# Create cleanup alias
git config alias.cleanup-worktrees '!f() { \
  git worktree list | grep -v "$(git rev-parse --show-toplevel)" | \
  while read worktree branch commit; do \
    branch_name=$(echo $branch | sed "s/\[//g" | sed "s/\]//g"); \
    if git branch --merged main | grep -q "$branch_name"; then \
      echo "Removing merged: $worktree ($branch_name)"; \
      git worktree remove "$worktree" 2>/dev/null; \
      git branch -d "$branch_name" 2>/dev/null; \
    fi; \
  done; \
}; f'

# Run cleanup
git cleanup-worktrees
```

---

## Module 3: AI Integration with Worktrees

**Duration**: 90 minutes
**Difficulty**: Intermediate

### Learning Objectives
- Run multiple AI coding agents in parallel
- Understand AI context preservation
- Compare different AI models in isolation
- Implement AI-assisted code review workflows

### The AI Context Problem

AI coding assistants build **deep context** about your codebase:

- File structure and organization
- Recent changes and their patterns
- Your coding style and preferences
- Ongoing conversation history
- Dependencies and architecture

**Traditional branch switching destroys this context.**

### AI + Worktree Integration Patterns

#### Pattern 1: Parallel Feature Development

```bash
# Setup: Create worktrees for parallel features
git worktree add -b feature/auth ../project-auth main
git worktree add -b feature/api ../project-api main
git worktree add -b feature/ui ../project-ui main

# Terminal 1: Auth feature with Claude Code
cd ../project-auth
claude-code
> Claude: We need to implement OAuth2 authentication with JWT tokens.
> The user flow should include login, logout, and token refresh.
> Please implement the auth service, middleware, and frontend components.

# Terminal 2: API feature with Claude Code
cd ../project-api
claude-code
> Claude: Build a RESTful API for user management with endpoints
> for CRUD operations, pagination, and filtering.

# Terminal 3: UI feature with Claude Code
cd ../project-ui
claude-code
> Claude: Create a responsive navigation component with dropdown
> menus, mobile support, and accessibility features.

# All three Claude sessions run in parallel
# Each maintains full, independent context
# Zero context switching overhead!
```

#### Pattern 2: Model Comparison

```bash
# Setup: Create identical worktrees for model comparison
git worktree add ../project-claude -b experiment/claude-impl main
git worktree add ../project-gpt4 -b experiment/gpt4-impl main

# Terminal 1: Claude 3.5 Sonnet
cd ../project-claude
claude-code --model claude-3-5-sonnet
> Implement a user authentication system with:
> - Email/password authentication
> - JWT token management
> - Refresh token rotation
> - Session management

# Terminal 2: GPT-4 (via Aider or other tool)
cd ../project-gpt4
aider --model gpt-4
> Implement a user authentication system with:
> - Email/password authentication
> - JWT token management
> - Refresh token rotation
> - Session management

# Compare results after completion:
# 1. Code quality and structure
# 2. Implementation approach
# 3. Time to completion
# 4. Error handling
# 5. Test coverage

# Merge the better implementation
cd ../project
git merge experiment/claude-impl  # or gpt4-impl
```

#### Pattern 3: Emergency Fix Without Context Loss

```bash
# Scenario: Deep in feature work with Claude
cd ~/project-feature
claude-code
> Claude: We're implementing a complex machine learning pipeline
> with data preprocessing, feature engineering, model training,
> and serving infrastructure. We've spent 2 hours on this...

# Suddenly: Critical production bug!

# Traditional approach: LOSE CLAUDE CONTEXT
# git stash, git checkout, restart Claude, explain everything again...

# Worktree approach: PRESERVE CLAUDE CONTEXT
cd ~/project-feature  # Leave Claude running here
git worktree add -b hotfix/critical ../project-hotfix main

cd ../project-hotfix
claude-code  # New Claude session for hotfix
> Claude: There's a critical bug in production. The payment
> processing is failing with error code 500. Users can't
> complete purchases. This is urgent.

# Fix the bug, test, commit, deploy

# Return to feature work
cd ../project-feature
# Claude is STILL RUNNING with full context!
> Claude: Ready to continue with the ML pipeline?
# No context rebuild needed!
```

### Exercise 3.1: First Parallel AI Session

**Objective**: Run two AI agents in parallel worktrees

**Prerequisites**:
- Claude Code installed
- Git repository with worktrees

**Steps**:

1. **Setup worktrees**:
```bash
cd ~/workshop-practice
git worktree add -b feature/ai-task-1 ../workshop-ai-1 main
git worktree add -b feature/ai-task-2 ../workshop-ai-2 main
```

2. **Start AI session 1**:
```bash
cd ../workshop-ai-1
claude-code
# Give Claude a complex task, e.g.:
# "Create a React component for a user profile card with
# avatar, name, email, and bio sections. Use TypeScript
# and include proper prop types."
```

3. **Start AI session 2** (in new terminal):
```bash
cd ../workshop-ai-2
claude-code
# Give Claude a different task, e.g.:
# "Create a Node.js Express API endpoint for fetching
# user profiles. Include proper error handling and
# input validation."
```

4. **Let both work in parallel**

5. **Review results**:
```bash
cd ../workshop-ai-1
git log --oneline  # See commits from AI session 1

cd ../workshop-ai-2
git log --oneline  # See commits from AI session 2

cd ../workshop-practice
git log --oneline --all  # See both branches
```

### Exercise 3.2: Context Preservation Demonstration

**Objective**: Demonstrate the value of context preservation

**Steps**:

1. **Build deep context with AI**:
```bash
cd ~/workshop-practice
git worktree add -b feature/complex ../workshop-complex main

cd ../workshop-complex
claude-code
# Spend 10-15 minutes building context:
# - Explain your project architecture
# - Discuss your coding preferences
# - Review existing code together
# - Plan a complex feature
# - Start implementation

# Claude now has DEEP context about your work
```

2. **Simulate urgent task**:
```bash
# DON'T close the Claude session!
# Leave it running in the terminal

git worktree add -b hotfix/urgent ../workshop-urgent main

cd ../workshop-urgent
claude-code  # NEW Claude session
# Handle urgent task with this Claude

# Complete the urgent fix
echo "fix applied" > fix.txt
git add fix.txt
git commit -m "Fix urgent issue"
```

3. **Return to complex work**:
```bash
cd ../workshop-complex
# The ORIGINAL Claude session is still here!
# Type in the terminal where you left it

# Claude remembers everything!
# No need to rebuild context
```

### AI Tool-Specific Notes

#### Claude Code
- **Best worktree support**: Native understanding of worktrees
- **Session persistence**: Maintains conversation per worktree
- **Context scope**: File system aware within worktree
- **Recommended**: Primary tool for this workshop

#### Aider
- **Worktree compatible**: Works well with worktrees
- **Model flexibility**: Supports multiple LLM providers
- **Git integration**: Strong Git workflow integration
- **Usage**: `aider --model <model>`

#### Cursor
- **Multiple windows**: Open multiple Cursor instances
- **Worktree aware**: Each window maintains separate context
- **VS Code based**: Familiar interface
- **Usage**: `cursor ../worktree-path`

#### GitHub Copilot
- **Limited worktree support**: Assumes single workspace
- **Context confusion**: May struggle with multiple worktrees
- **Not recommended**: For parallel AI workflows

---

## Module 4: Isolation Strategies

**Duration**: 75 minutes
**Difficulty**: Intermediate

### Learning Objectives
- Understand different isolation layers
- Implement appropriate isolation strategies
- Handle dependencies across worktrees
- Configure worktree-specific settings

### The Isolation Hierarchy

```
Layer 1: File System Isolation
    ├─ Separate working directories
    ├─ Separate file copies
    └─ Separate .git files

Layer 2: Git State Isolation
    ├─ Separate HEAD pointers
    ├─ Separate index files
    ├─ Separate refs/bisect
    └─ Separate refs/rewritten

Layer 3: Process Isolation
    ├─ Separate AI sessions
    ├─ Separate editors
    └─ Separate terminals

Layer 4: Dependency Isolation
    ├─ Separate node_modules
    ├─ Separate virtual environments
    └─ Separate build artifacts

Layer 5: Environment Isolation
    ├─ Separate .env files
    ├─ Separate config files
    └─ Separate environment variables

Layer 6: Configuration Isolation
    ├─ Worktree-specific Git config
    ├─ Worktree-specific user settings
    └─ Worktree-specific commit templates
```

### Strategy 1: Full Isolation (Recommended for AI)

**Best for**: AI development, model comparison, experimentation

```bash
# Complete isolation - maximum safety
git worktree add -b feature/auth ../project-auth main

cd ../project-auth
# Separate everything
npm install  # New node_modules
cp .env.example .env.local  # New environment
# AI agent has completely fresh context
```

**Pros**:
- Zero interference between worktrees
- Safe for model comparison
- No dependency conflicts

**Cons**:
- High disk usage
- Longer install times
- More maintenance

### Strategy 2: Dependency Sharing (Disk-Efficient)

**Best for**: Same stack across worktrees, disk-constrained environments

```bash
# Share node_modules via symlink
git worktree add -b feature/auth ../project-auth main

cd ../project-auth
rm -rf node_modules
ln -s ../../project-main/node_modules ./node_modules

# Or use pnpm workspaces (automatic sharing)
pnpm install
```

**Pros**:
- Efficient disk usage
- Faster install times
- Easier dependency management

**Cons**:
- Potential dependency conflicts
- Not ideal for model comparison
- Risk of cross-contamination

### Strategy 3: Docker Volume Isolation (Enterprise)

**Best for**: Production environments, team workflows

```bash
# Each worktree gets isolated Docker volume
git worktree add -b feature/auth ../project-auth main

cd ../project-auth
docker run -v $(pwd):/app -v auth-deps:/app/node_modules node:18 npm install
docker run -v $(pwd):/app -v auth-deps:/app/node_modules -p 3001:3000 node:18 npm start

# Other worktree uses different volume
cd ../project-api
docker run -v $(pwd):/app -v api-deps:/app/node_modules node:18 npm install
```

**Pros**:
- Perfect isolation
- Reproducible builds
- Team consistency

**Cons**:
- Docker overhead
- More complex setup
- Slower iteration

### Exercise 4.1: Implement Full Isolation

**Objective**: Set up fully isolated worktrees

**Steps**:

1. **Create isolated worktrees**:
```bash
cd ~/workshop-practice

git worktree add -b feature/frontend ../workshop-fe main
git worktree add -b feature/backend ../workshop-be main
```

2. **Set up isolated dependencies**:
```bash
# Frontend worktree
cd ../workshop-fe
npm install
# Uses ../workshop-fe/node_modules

# Backend worktree
cd ../workshop-be
npm install
# Uses ../workshop-be/node_modules (separate!)
```

3. **Verify isolation**:
```bash
# Install different package in frontend
cd ../workshop-fe
npm install --save-dev jest

# Check backend - should not have jest
cd ../workshop-be
ls node_modules | grep jest  # Should be empty
```

4. **Set up isolated environments**:
```bash
# Frontend environment
cd ../workshop-fe
cat > .env.local << EOF
PORT=3001
API_URL=http://localhost:4001
FEATURE_FLAG_NEW_UI=true
EOF

# Backend environment
cd ../workshop-be
cat > .env.local << EOF
PORT=4001
DATABASE_URL=mongodb://localhost:27017/workshop-be
LOG_LEVEL=debug
EOF
```

### Exercise 4.2: Worktree-Specific Configuration

**Objective**: Configure per-worktree settings

**Steps**:

1. **Enable worktree config**:
```bash
cd ~/workshop-practice
git config extensions.worktreeConfig true
```

2. **Configure frontend worktree**:
```bash
cd ../workshop-fe
git config --worktree user.name "Frontend Developer"
git config --worktree user.email "frontend@workshop.dev"

# Verify
git config user.name  # "Frontend Developer"
```

3. **Configure backend worktree**:
```bash
cd ../workshop-be
git config --worktree user.name "Backend Developer"
git config --worktree user.email "backend@workshop.dev"

# Verify
git config user.name  # "Backend Developer"
```

4. **Create worktree-specific commit templates**:
```bash
# Frontend template
cd ../workshop-fe
cat > .commit-template-fe << EOF
[FE] <title>

Component: <which component>
Type: <feature|bug|refactor>
Tested: <yes|no>
Screenshots: <link if applicable>
EOF
git config --worktree commit.template .commit-template-fe

# Backend template
cd ../workshop-be
cat > .commit-template-be << EOF
[BE] <title>

Endpoint: <which endpoint>
Type: <feature|bug|refactor>
API Docs: <yes|no|link>
Tests: <yes|no>
EOF
git config --worktree commit.template .commit-template-be
```

### Isolation Checklist

Use this checklist when setting up new worktrees:

- [ ] File system isolated (separate directory)
- [ ] Git state isolated (separate HEAD/index)
- [ ] Dependencies isolated (separate node_modules or symlinked)
- [ ] Environment isolated (separate .env files)
- [ ] Configuration isolated (worktree-specific config)
- [ ] Process isolated (separate AI session)
- [ ] Data isolated (separate database/volumes if needed)

---

## Module 5: Multiagent Coordination

**Duration**: 90 minutes
**Difficulty**: Advanced

### Learning Objectives
- Understand multiagent orchestration patterns
- Implement task delegation strategies
- Coordinate specialized agents
- Monitor parallel agent execution

### Orchestration Patterns

#### Pattern 1: Manual Orchestration

```bash
# Manually start and coordinate agents
git worktree add ../project-auth feature/auth
git worktree add ../project-api feature/api
git worktree add ../project-ui feature/ui

# Terminal 1: Auth agent
cd ../project-auth
claude-code
# Agent specializes in authentication

# Terminal 2: API agent
cd ../project-api
claude-code
# Agent specializes in API development

# Terminal 3: UI agent
cd ../project-ui
claude-code
# Agent specializes in UI components

# Human orchestrator coordinates manually
```

**Pros**:
- Full control
- Easy to understand
- No special tools

**Cons**:
- Manual coordination
- No task routing
- No monitoring

#### Pattern 2: Scripted Orchestration

```bash
#!/bin/bash
# orchestrate.sh

# Create worktrees
git worktree add ../project-auth feature/auth
git worktree add ../project-api feature/api
git worktree add ../project-ui feature/ui

# Start agents in background
cd ../project-auth
claude-code --daemon &

cd ../project-api
claude-code --daemon &

cd ../project-ui
claude-code --daemon &

# Monitor
wait
```

**Pros**:
- Automated startup
- Basic monitoring
- Reproducible

**Cons**:
- Limited intelligence
- No task delegation
- Static configuration

#### Pattern 3: CCSwarm Orchestration (Advanced)

```bash
# Install CCSwarm
cargo install ccswarm

# Initialize project
ccswarm init --name "MyProject" --agents frontend,backend,devops

# Create worktrees
git worktree add ../myproject-frontend feature/frontend
git worktree add ../myproject-backend feature/backend
git worktree add ../myproject-devops feature/devops

# Start orchestrator
ccswarm start

# Delegate tasks
ccswarm delegate task "Create login form" --agent frontend --priority high
ccswarm delegate task "Build auth API" --agent backend --priority high
ccswarm delegate task "Set up CI/CD" --agent devops --priority medium

# Monitor in TUI
ccswarm tui
```

**Pros**:
- Intelligent orchestration
- Automatic task routing
- Real-time monitoring
- Enterprise features

**Cons**:
- Complex setup
- Rust required
- Steep learning curve

### Exercise 5.1: Manual Multiagent Setup

**Objective**: Run three specialized agents in parallel

**Scenario**: Build a simple web app with frontend, backend, and DevOps components

**Steps**:

1. **Create worktrees**:
```bash
cd ~/workshop-practice
git worktree add -b feature/frontend ../workshop-frontend main
git worktree add -b feature/backend ../workshop-backend main
git worktree add -b feature/devops ../workshop-devops main
```

2. **Start frontend agent**:
```bash
cd ../workshop-frontend
claude-code
> Claude: You are a frontend specialist. Build a simple
> HTML/CSS/JavaScript frontend with:
> - Login form
> - Dashboard page
> - Responsive design
> - Modern styling
```

3. **Start backend agent** (new terminal):
```bash
cd ../workshop-backend
claude-code
> Claude: You are a backend specialist. Build a Node.js
> Express API with:
> - POST /login endpoint
> - GET /dashboard endpoint
> - JWT authentication
> - Error handling
```

4. **Start DevOps agent** (new terminal):
```bash
cd ../workshop-devops
claude-code
> Claude: You are a DevOps specialist. Create:
> - Dockerfile for the app
> - docker-compose.yml
> - .gitignore file
> - README with setup instructions
```

5. **Let agents work in parallel**

6. **Review results**:
```bash
cd ../workshop-frontend
git log --oneline

cd ../workshop-backend
git log --oneline

cd ../workshop-devops
git log --oneline
```

### Exercise 5.2: CCSwarm Introduction (Optional)

**Prerequisites**: Rust toolchain installed

**Objective**: Experience production-grade orchestration

**Steps**:

1. **Install CCSwarm**:
```bash
cargo install ccswarm
```

2. **Initialize project**:
```bash
cd ~/workshop-practice
ccswarm init --name "WorkshopApp" --agents frontend,backend
```

3. **Create worktrees**:
```bash
git worktree add ../workshop-app-frontend feature/frontend
git worktree add ../workshop-app-backend feature/backend
```

4. **Start Claude Code with ACP**:
```bash
# Terminal 1
claude-code --acp-server --port 9100
```

5. **Start CCSwarm**:
```bash
# Terminal 2
cd ~/workshop-practice
ccswarm start
```

6. **Test connection**:
```bash
# Terminal 3
ccswarm claude-acp test
ccswarm claude-acp status
```

7. **Delegate tasks**:
```bash
ccswarm delegate task "Build login form" --agent frontend
ccswarm delegate task "Create API endpoints" --agent backend
```

8. **Monitor in TUI**:
```bash
ccswarm tui
```

### Task Delegation Strategies

#### Strategy 1: Manual Assignment
```bash
# Human decides which agent handles which task
ccswarm delegate task "Build UI" --agent frontend
ccswarm delegate task "Build API" --agent backend
```

#### Strategy 2: Keyword-Based Routing
```bash
# Agent configuration includes keywords
{
  "name": "frontend-agent",
  "keywords": ["UI", "frontend", "CSS", "HTML", "React"],
  "router": "keyword"
}

# Tasks routed based on keywords
ccswarm delegate task "Build responsive UI"
# Automatically routes to frontend-agent
```

#### Strategy 3: Expertise-Based Routing
```bash
# System learns from past performance
ccswarm delegate task "Build authentication system"
# Routes to agent with best authentication track record
```

---

## Module 6: Advanced Patterns

**Duration**: 90 minutes
**Difficulty**: Advanced

### Learning Objectives
- Implement complex multi-worktree workflows
- Handle dependencies between parallel tasks
- Create sophisticated merge strategies
- Build custom orchestration solutions

### Pattern 1: Feature Stacking

```bash
# Build features on top of each other in parallel
git worktree add -b feature/auth-basic ../auth-basic main
git worktree add -b feature/auth-oauth ../auth-oauth feature/auth-basic
git worktree add -b feature/auth-mfa ../auth-mfa feature/auth-oauth

# Work on all three in parallel
cd ../auth-basic && claude-code  # Basic auth
cd ../auth-oauth && claude-code  # OAuth on top of basic
cd ../auth-mfa && claude-code    # MFA on top of OAuth
```

### Pattern 2: Integration Testing Worktrees

```bash
# Create worktree for integration testing
git worktree add -b test/integration ../test-integration main

cd ../test-integration
# Merge feature branches for testing
git merge feature/auth
git merge feature/api
git merge feature/ui

# Run integration tests
npm test

# Clean up
git worktree remove ../test-integration
```

### Pattern 3: Release Candidate Isolation

```bash
# Prepare release candidate in isolation
git worktree add -b release/v2.0.0 ../release-2.0 main

cd ../release-2.0
# Merge all feature branches
git merge feature/auth
git merge feature/api
git merge feature/ui

# Testing, bug fixes, documentation
claude-code

# Tag and release
git tag -a v2.0.0 -m "Release v2.0.0"
git push origin v2.0.0
```

### Pattern 4: Code Review Worktrees

```bash
# Create worktree for reviewing PR
git worktree add -b review/pr-123 ../review-pr-123 origin/pr-123

cd ../review-pr-123
claude-code
> Claude: Review this PR for:
> - Security issues
> - Performance problems
> - Code quality
> - Test coverage

# Make review suggestions as commits
git add .
git commit -m "Review feedback: Add error handling"

# Push review branch
git push origin review/pr-123

# Clean up after merge
git worktree remove ../review-pr-123
```

### Exercise 6.1: Feature Stacking

**Objective**: Implement stacked features in parallel

**Scenario**: Build authentication system with multiple layers

**Steps**:

1. **Create stacked worktrees**:
```bash
cd ~/workshop-practice

git worktree add -b feature/auth-base ../auth-base main
git worktree add -b feature/auth-oauth ../auth-oauth feature/auth-base
git worktree add -b feature/auth-mfa ../auth-mfa feature/auth-oauth
```

2. **Work on base auth**:
```bash
cd ../auth-base
claude-code
> Claude: Implement basic email/password authentication:
> - User model with email, password hash
> - Registration endpoint
> - Login endpoint
> - Session management
```

3. **Work on OAuth** (in parallel, depends on base):
```bash
cd ../auth-oauth
claude-code
> Claude: Add OAuth2 authentication on top of base auth:
> - Google OAuth integration
> - GitHub OAuth integration
> - Token exchange endpoint
> - Profile linking
```

4. **Work on MFA** (in parallel, depends on OAuth):
```bash
cd ../auth-mfa
claude-code
> Claude: Add multi-factor authentication:
> - TOTP (Time-based One-Time Password)
> - SMS backup codes
> - MFA setup endpoint
> - MFA verification endpoint
```

5. **Merge in order**:
```bash
cd ../auth-base
git push origin feature/auth-base

cd ../auth-oauth
git merge origin/feature/auth-base
git push origin feature/auth-oauth

cd ../auth-mfa
git merge origin/feature/auth-oauth
git push origin feature/auth-mfa
```

### Exercise 6.2: Custom Orchestration Script

**Objective**: Build a simple orchestration tool

**Create**: `orchestrate.sh`

```bash
#!/bin/bash
# Simple multiagent orchestration script

set -e

PROJECT_ROOT="$(git rev-parse --show-toplevel)"
WORKTREES_DIR="$PROJECT_ROOT/../worktrees"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

create_worktree() {
    local branch=$1
    local name=$2
    local base_branch=${3:-main}

    log_info "Creating worktree for $name..."
    git worktree add -b "$branch" "$WORKTREES_DIR/$name" "$base_branch"
    log_info "Created worktree: $WORKTREES_DIR/$name"
}

start_agent() {
    local worktree=$1
    local task=$2

    log_info "Starting agent in $worktree..."
    cd "$WORKTREES_DIR/$worktree"

    # Start Claude Code in background
    claude-code &
    AGENT_PID=$!

    # Save PID for later
    echo $AGENT_PID > "$PROJECT_ROOT/.agent-$worktree.pid"

    log_info "Agent started with PID: $AGENT_PID"

    # Give task to agent (simulate)
    echo "$task" > "$WORKTREES_DIR/$worktree/TASK.md"
    log_info "Task assigned: $task"
}

stop_agent() {
    local worktree=$1
    local pid_file="$PROJECT_ROOT/.agent-$worktree.pid"

    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        log_info "Stopping agent in $worktree (PID: $pid)..."
        kill $pid 2>/dev/null || true
        rm "$pid_file"
        log_info "Agent stopped"
    fi
}

main() {
    case "$1" in
        setup)
            log_info "Setting up multiagent environment..."
            create_worktree "feature/auth" "auth" "main"
            create_worktree "feature/api" "api" "main"
            create_worktree "feature/ui" "ui" "main"
            ;;
        start)
            log_info "Starting all agents..."
            start_agent "auth" "Implement OAuth2 authentication"
            start_agent "api" "Build RESTful API endpoints"
            start_agent "ui" "Create responsive UI components"
            ;;
        stop)
            log_info "Stopping all agents..."
            stop_agent "auth"
            stop_agent "api"
            stop_agent "ui"
            ;;
        status)
            log_info "Agent status:"
            for worktree in auth api ui; do
                local pid_file="$PROJECT_ROOT/.agent-$worktree.pid"
                if [ -f "$pid_file" ]; then
                    local pid=$(cat "$pid_file")
                    if ps -p $pid > /dev/null 2>&1; then
                        echo -e "  $worktree: ${GREEN}running${NC} (PID: $pid)"
                    else
                        echo -e "  $worktree: ${RED}stopped${NC}"
                        rm "$pid_file"
                    fi
                else
                    echo -e "  $worktree: ${YELLOW}not started${NC}"
                fi
            done
            ;;
        cleanup)
            log_info "Cleaning up worktrees..."
            git worktree remove "$WORKTREES_DIR/auth" || true
            git worktree remove "$WORKTREES_DIR/api" || true
            git worktree remove "$WORKTREES_DIR/ui" || true
            log_info "Cleanup complete"
            ;;
        *)
            echo "Usage: $0 {setup|start|stop|status|cleanup}"
            exit 1
            ;;
    esac
}

main "$@"
```

**Usage**:

```bash
chmod +x orchestrate.sh

# Setup worktrees
./orchestrate.sh setup

# Start all agents
./orchestrate.sh start

# Check status
./orchestrate.sh status

# Stop all agents
./orchestrate.sh stop

# Cleanup
./orchestrate.sh cleanup
```

---

## Module 7: Production Workflows

**Duration**: 90 minutes
**Difficulty**: Advanced

### Learning Objectives
- Implement enterprise-grade workflows
- Set up team collaboration patterns
- Add observability and monitoring
- Handle scale and performance

### Team Workflow Patterns

#### Pattern 1: Feature Team Worktrees

```bash
# Each team member uses worktrees for their features
# Team lead coordinates via pull requests

# Developer A
git worktree add -b feature/user-auth ../dev-a-auth main

# Developer B
git worktree add -b feature/payment-api ../dev-b-payment main

# Developer C
git worktree add -b feature/admin-ui ../dev-c-admin main

# All push to origin
# Team lead reviews and merges
```

#### Pattern 2: Code Review Worktrees

```bash
# Reviewer creates worktree for each PR
git worktree add -b review/pr-123 ../review-123 origin/pr-123

cd ../review-123
# Run tests, check code quality
npm test
npm run lint
npm run build

# Make suggestions as commits
git add .
git commit -m "Review: Add error handling"

# Push review branch
git push origin review/pr-123

# Clean up after merge
git worktree remove ../review-123
```

#### Pattern 3: Release Management Worktrees

```bash
# Release manager creates isolated release worktree
git worktree add -b release/v2.0.0 ../release-2.0 main

cd ../release-2.0
# Merge all approved features
git merge feature/user-auth
git merge feature/payment-api
git merge feature/admin-ui

# Run full test suite
npm test

# Create release notes
claude-code
> Claude: Generate release notes for these merged features

# Tag and push
git tag -a v2.0.0 -m "Release v2.0.0"
git push origin main v2.0.0

# Archive release worktree
git worktree move ../archive/release-2.0 ../release-2.0
git worktree lock ../archive/release-2.0 --reason "Release archive"
```

### Observability Patterns

#### Pattern 1: Worktree Monitoring

```bash
# Script to monitor worktree status
#!/bin/bash
# monitor-worktrees.sh

echo "=== Worktree Status ==="
git worktree list --verbose

echo ""
echo "=== Branch Status ==="
for worktree in $(git worktree list | grep -v "bare" | awk '{print $1}'); do
    cd "$worktree"
    branch=$(git branch --show-current)
    status=$(git status --short | wc -l)
    echo "$worktree ($branch): $status uncommitted files"
done

echo ""
echo "=== Disk Usage ===
du -sh $(git worktree list | grep -v "bare" | awk '{print $1}')
```

#### Pattern 2: Activity Tracking

```bash
# Log worktree activity
git config --global alias.log-worktree '!f() { \
  echo "$(date): Working in $(git rev-parse --show-toplevel)" >> ~/.worktree-log; \
}; f'

# Track when you switch worktrees
cd ../project-auth  # Logs this switch
```

### Scale Considerations

#### Managing Many Worktrees

```bash
# Use naming conventions
project-feature-auth       # Clear
project-bug-payment-404    # Clear
project-experiment-react   # Clear

# Avoid unclear names
project-1                  # Unclear
project-temp               # Unclear
project-test               # Unclear

# Regular cleanup
git cleanup-worktrees  # Custom alias to remove old worktrees
```

#### Disk Space Management

```bash
# Strategy 1: Sparse checkout
git worktree add -b feature/big ../project-big main
cd ../project-big
git sparse-checkout init
git sparse-checkout set src/ tests/

# Strategy 2: Shared dependencies
ln -s ../../project-main/node_modules ./node_modules

# Strategy 3: Regular pruning
git worktree prune  # Remove stale metadata
git worktree list | while read path rest; do
    if [ ! -d "$path" ]; then
        echo "Removing stale: $path"
    fi
done
```

### Exercise 7.1: Team Workflow Simulation

**Objective**: Simulate team collaboration with worktrees

**Scenario**: Three developers working on different features

**Setup**:

```bash
# Create "team" repository
cd ~/workshop-practice

# Simulate three developers
mkdir -p ../team-dev-a ../team-dev-b ../team-dev-c

# Developer A works on auth
git worktree add -b feature/auth ../team-dev-a/auth main
cd ../team-dev-a/auth
echo "Dev A: Implementing auth" > auth.js
git add auth.js
git commit -m "Add auth implementation"
git push origin feature/auth

# Developer B works on API
cd ~/workshop-practice
git worktree add -b feature/api ../team-dev-b/api main
cd ../team-dev-b/api
echo "Dev B: Implementing API" > api.js
git add api.js
git commit -m "Add API implementation"
git push origin feature/api

# Developer C works on UI
cd ~/workshop-practice
git worktree add -b feature/ui ../team-dev-c/ui main
cd ../team-dev-c/ui
echo "Dev C: Implementing UI" > ui.js
git add ui.js
git commit -m "Add UI implementation"
git push origin feature/ui
```

**Team Lead Review**:

```bash
# Team lead reviews all PRs
cd ~/workshop-practice

# Create review worktrees
git worktree add -b review/auth ../review-auth origin/feature/auth
git worktree add -b review/api ../review-api origin/feature/api
git worktree add -b review/ui ../review-ui origin/feature/ui

# Review and merge
cd ~/workshop-practice
git merge origin/feature/auth
git merge origin/feature/api
git merge origin/feature/ui

# Cleanup review worktrees
git worktree remove ../review-auth
git worktree remove ../review-api
git worktree remove ../review-ui
```

---

## Common Pitfalls and Solutions

### Pitfall 1: "Branch Already Checked Out"

**Problem**:
```bash
$ git worktree add ../project-hotfix hotfix/urgent
fatal: 'hotfix/urgent' is already checked out at '../project-hotfix'
```

**Solution**:
```bash
# Check what's using the branch
git worktree list

# Remove the existing worktree
git worktree remove ../project-hotfix

# Create new one
git worktree add ../project-hotfix-new hotfix/urgent
```

### Pitfall 2: Disk Space Exhaustion

**Problem**:
```bash
$ df -h
Filesystem      Size  Used Avail Use%
/dev/sda1       100G   95G    5G  95%
# Too many worktrees with full node_modules
```

**Solution**:
```bash
# Strategy 1: Use sparse checkout
git worktree add -b feature/big ../project-big main
cd ../project-big
git sparse-checkout init
git sparse-checkout set src/

# Strategy 2: Share dependencies
rm -rf node_modules
ln -s ../../project-main/node_modules ./node_modules

# Strategy 3: Regular cleanup
git worktree prune
git worktree remove ../old-feature-1
git worktree remove ../old-feature-2
```

### Pitfall 3: Broken Worktree Links

**Problem**:
```bash
$ git worktree list
fatal: '../project-feature' is not a working tree
```

**Solution**:
```bash
# Repair broken worktree links
git worktree repair

# Or manually remove stale worktrees
git worktree prune
```

### Pitfall 4: Context Confusion

**Problem**:
```bash
# Working in wrong worktree
cd ../project-feature
# Make changes, realize should be in ../project-hotfix
```

**Solution**:
```bash
# Use terminal window titles
# In ~/.bashrc or ~/.zshrc:
function chpwd() {
    echo -ne "\033]0;$(basename $(git rev-parse --show-toplevel 2>/dev/null || echo "Terminal"))\007"
}

# Or use prompt customization
# Shows current worktree in prompt
PS1='$(basename $(git rev-parse --show-toplevel 2>/dev/null)) $ '
```

### Pitfall 5: Merge Conflicts

**Problem**:
```bash
$ git merge feature/api
Auto-merging src/app.js
CONFLICT (content): Merge conflict in src/app.js
```

**Solution**:
```bash
# Use worktree for conflict resolution
git worktree add -b conflict-resolution ../conflict-resolve HEAD

cd ../conflict-resolve
# Resolve conflicts with AI help
claude-code
> Claude: Help resolve these merge conflicts

# Test resolution
npm test

# Complete merge
cd ../project-main
git merge conflict-resolution
git worktree remove ../conflict-resolve
```

---

## Workshop Exercises

### Exercise Suite 1: Basics (30 minutes)

1. **Create your first worktree**
2. **Make commits in parallel**
3. **List and inspect worktrees**
4. **Remove worktree properly**

### Exercise Suite 2: AI Integration (45 minutes)

1. **Run two AI sessions in parallel**
2. **Demonstrate context preservation**
3. **Compare AI implementations**
4. **Handle emergency without context loss**

### Exercise Suite 3: Isolation (45 minutes)

1. **Set up dependency isolation**
2. **Configure worktree-specific settings**
3. **Implement environment isolation**
4. **Compare isolation strategies**

### Exercise Suite 4: Multiagent (60 minutes)

1. **Run three specialized agents**
2. **Coordinate parallel tasks**
3. **Implement task delegation**
4. **Monitor agent execution**

### Exercise Suite 5: Advanced (60 minutes)

1. **Implement feature stacking**
2. **Create orchestration script**
3. **Handle complex merges**
4. **Build custom automation**

### Exercise Suite 6: Production (60 minutes)

1. **Simulate team workflow**
2. **Implement code review process**
3. **Set up release management**
4. **Add observability**

---

## Resources and References

### Official Documentation
- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [CCSwarm Documentation](https://github.com/nwiizo/ccswarm)

### Community Resources
- [Git Worktrees Tutorial - DataCamp](https://www.datacamp.com/tutorial/git-worktree-tutorial)
- [Mastering Git Worktrees - Medium](https://mskadu.medium.com/mastering-git-worktree-a-developers-guide-to-multiple-working-directories-c30f834f79a5)
- [Parallel AI Development - Medium](https://medium.com/@ooi_yee_fei/parallel-ai-development-with-git-worktrees-f2524afc3e33)

### Tools and Utilities
- **CCSwarm**: https://github.com/nwiizo/ccswarm
- **Git Worktree Runner**: https://github.com/coderabbitai/git-worktree-runner
- **Claude Code**: https://claude.ai/code

### Research Papers
- "Parallel Development Strategies for AI-Assisted Software Engineering" (2025)
- "Context Preservation in Multi-Agent AI Development Systems" (2025)
- "Git Worktree Patterns for Enterprise Teams" (2024)

---

## Workshop Logistics

### Room Setup
- Participants need laptops with Git installed
- Reliable internet connection
- Power outlets for all participants
- Whiteboard or flipchart for diagrams

### Instructor Materials
- This workshop guide
- Sample repository for exercises
- Pre-configured VMs (optional)
- Backup solutions for common issues

### Participant Handouts
- Git worktree cheat sheet
- Exercise instructions
- Troubleshooting guide
- Resource list

### Time Management
- Stick to module durations
- Build in buffer time for exercises
- Have optional material for fast learners
- Be prepared to skip advanced content if time-constrained

---

## Conclusion

Git worktrees combined with AI coding agents represent a paradigm shift in software development. By enabling true parallel development with perfect context isolation, teams can dramatically increase velocity while maintaining code quality.

This workshop provides the foundation for adopting these patterns in real-world development workflows. Participants leave with practical skills they can apply immediately to their projects.

**Next Steps**:
1. Practice worktree workflows in daily development
2. Experiment with multiagent orchestration
3. Share learnings with team
4. Contribute patterns back to community

**Feedback Loop**:
- Collect participant feedback
- Update exercises based on learnings
- Evolve workshop as tools improve
- Share improvements with community

---

**Workshop Version**: 1.0
**Last Updated**: 2026-02-01
**License**: Creative Commons BY-SA 4.0
**Maintainer**: Claude Code Workshop Team
