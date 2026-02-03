# Vibe Kanban Research Report

## Agent Research Template

**Agent Name**: Research Agent
**Research Focus**: Vibe-Kanban - Workflow Orchestration Tool for Claude Code Agents
**Date**: 2026-02-02
**Researcher**: Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: Vibe Kanban
- **Repository/URL**: [https://github.com/BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban)
- **Official Website**: [https://www.vibekanban.com/](https://www.vibekanban.com/)
- **Latest Version**: v0.0.166 (as of January 2026)
- **Last Updated**: January 2026
- **License**: Open Source
- **Maintainer**: Bloop AI Limited
- **GitHub Stars**: 14.2k+ (as of January 2026)

### Tool Purpose
- **Primary Goal**: Orchestrate multiple AI coding agents in parallel through a visual Kanban-style dashboard, enabling developers to focus on planning, reviewing, and orchestrating tasks while AI agents handle the coding.
- **Target Users**: Developers and teams using AI coding agents (Claude Code, Gemini CLI, Cursor, Amp, OpenAI Codex, GitHub Copilot, etc.) who need to manage multiple AI agents simultaneously without conflicts.
- **Core Problem Solved**: Eliminates conflicts when running multiple AI coding agents in parallel by using Git worktree isolation, while providing a centralized interface for task management and code review.

---

## 2. CAPABILITY ASSESSMENT

### Core Features

| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| **Git Worktree Isolation** | Each task runs in its own Git worktree with separate branch, preventing file conflicts | High | 5 |
| **Parallel Agent Execution** | Run multiple AI coding agents simultaneously without interference | High | 5 |
| **Visual Kanban Dashboard** | Web-based board interface for managing tasks and tracking agent status | High | 5 |
| **Multi-Agent Support** | Works with Claude Code, Gemini CLI, Cursor CLI, Amp, Codex, Copilot, Qwen Code, Opencode, Factory Droid | High | 5 |
| **Built-in Code Review** | Diff tools for reviewing, editing, and approving agent-generated code | High | 5 |
| **MCP Server Integration** | Exposes MCP server for integration with Claude Desktop and other MCP clients | Medium | 4 |
| **GitHub Integration** | Automatic PR creation, rebase, and merge operations | High | 5 |
| **Task Templates** | Reusable templates for standardizing development processes | Medium | 4 |
| **IDE Extensions** | VS Code extension for monitoring and managing agents from IDE | Medium | 4 |
| **Remote Development** | SSH support for remote server deployment | Low | 3 |
| **Auto-commit** | Optional automatic commits during agent work | Medium | 3 |

### Unique Selling Points

1. **Git Worktree-Based Parallel Execution**: Unlike simple task queues, Vibe Kanban leverages Git worktrees to create truly isolated development environments, allowing multiple AI agents to work on the same codebase simultaneously without any risk of file conflicts.

2. **Coding Agent Agnostic**: Supports a wide range of AI coding agents (Claude Code, Gemini CLI, Cursor CLI, Amp, OpenAI Codex, Qwen Code, Opencode, GitHub Copilot), allowing developers to switch between agents or use multiple agents simultaneously without changing workflows.

3. **From Watching to Orchestrating**: Transforms the developer role from "watching terminal logs" to "planning, reviewing, and orchestrating" - positioning developers as managers of AI coding teams rather than passive observers.

4. **Complete Code Review Workflow**: Built-in diff viewer allows code review before merging, maintaining code quality standards while leveraging AI agents.

5. **Local-First Security**: Runs entirely on the local machine - no code is sent to external servers beyond what's required by the underlying AI agents.

### Limitations

- **Local Execution Only**: Cannot orchestrate agents running on remote machines (though SSH support helps with remote server access)
- **Learning Curve**: Requires understanding of Git worktrees and branching concepts
- **Node.js Dependency**: Requires Node.js 18+ to run the npx CLI
- **New Project**: Relatively new (2024-2025), documentation and community still evolving
- **Setup Complexity**: Initial setup requires authenticating with each coding agent separately
- **No Native Task Dependencies**: Limited support for defining task dependencies or complex workflows
- **Worktree Cleanup**: Worktrees require cleanup (though automatic cleanup is available)

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Intermediate - requires understanding of Git, AI agents, and Kanban concepts
- **Hands-on Potential**: High - participants can set up parallel agents and see results in real-time
- **Demo-readiness**: Yes - visually impressive demo showing multiple agents working simultaneously
- **Setup Time**: 15-20 minutes for workshop setup (npx install + agent authentication)

### Learning Objectives Addressed
- [x] **Multiagent Orchestration**: Teaches parallel agent orchestration through visual Kanban interface
- [x] **Git Worktrees Integration**: Core feature - each task gets isolated worktree
- [x] **Production Workflows**: Real-world applicability for teams managing multiple AI agents
- [x] **Spec-driven Development**: Task templates support specification-driven development patterns
- [ ] **Advanced Multiagent Patterns**: Limited support for complex agent communication patterns

### Recommended Workshop Module
- **Module Placement**: Module 8 - Advanced Multiagent Orchestration
- **Duration**: 45-60 minutes (including hands-on exercise)
- **Prerequisites**:
  - Basic Git knowledge
  - Claude Code CLI installed and authenticated
  - Understanding of Kanban concepts

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: Node.js (>=18), pnpm (>=8), Rust (latest stable) for development
- **Dependencies**:
  - Frontend: React/Next.js
  - Backend: Rust-based server
  - Database: SQLite
  - Git: Required for worktree operations
- **Claude Code Version Required**: Latest (works with any Claude Code version)
- **Platform Support**: Windows, Linux, macOS (cross-platform)

### Integration Complexity
- **Installation Difficulty**: Easy - single `npx vibe-kanban` command
- **Configuration Required**: Moderate - need to authenticate with each coding agent individually
- **Compatibility Issues**:
  - Windows users may need `MCP_HOST=127.0.0.1` when `HOST=0.0.0.0`
  - Requires reverse proxy configuration for custom domains

### Performance Characteristics
- **Resource Usage**: Medium - runs local web server and manages multiple worktrees
- **Execution Speed**: Fast - agents run in parallel with minimal overhead
- **Scalability**: Good - can manage multiple concurrent agents limited by system resources

### Environment Variables
```bash
PORT                        # Server port (auto-assigned if not set)
HOST                        # Backend server host (default: 127.0.0.1)
BACKEND_PORT                # Backend port (default: PORT+1)
FRONTEND_PORT               # Frontend port (default: 3000)
MCP_HOST                    # MCP server host (default: HOST)
MCP_PORT                    # MCP server port (default: BACKEND_PORT)
DISABLE_WORKTREE_CLEANUP    # Disable automatic worktree cleanup
VK_ALLOWED_ORIGINS          # Comma-separated allowed origins for reverse proxy
```

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Parallel Bug Fixing with Multiple Agents
**Difficulty**: Intermediate
**Time**: 25 minutes
**Description**: Participants will set up Vibe Kanban to orchestrate three Claude Code agents working on different bug fixes simultaneously, each in their own isolated worktree.

**Learning Outcomes**:
- [x] Understanding Git worktree isolation
- [x] Creating and managing parallel tasks
- [x] Reviewing agent-generated code diffs
- [x] Merging completed work back to main branch

### Scenario 2: Multi-Agent Feature Development
**Difficulty**: Advanced
**Time**: 40 minutes
**Description**: Participants will orchestrate a complex feature implementation split across multiple agents, using Vibe Kanban's task templates and code review workflow.

**Learning Outcomes**:
- [x] Creating reusable task templates
- [x] Managing complex multi-agent workflows
- [x] Performing code review on AI-generated changes
- [x] Integrating with GitHub for automatic PR creation

### Scenario 3: Agent Comparison Experiment
**Difficulty**: Beginner
**Time**: 20 minutes
**Description**: Participants will set up identical tasks using different AI agents (Claude Code, Gemini CLI) to compare outputs and understand agent-specific behaviors.

**Learning Outcomes**:
- [x] Understanding multi-agent support
- [x] Comparing different AI coding agents
- [x] Evaluating code quality across agents
- [x] Selecting appropriate agents for specific tasks

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category

| Tool | Strengths vs Vibe Kanban | Weaknesses vs Vibe Kanban |
|------|--------------------------|---------------------------|
| **myclaude** | Simpler setup, focuses on Claude only | No parallel execution, no worktree isolation |
| **claude-flow** | Workflow automation, agent chaining | No visual interface, no built-in code review |
| **AutoClaude** | Autonomous planning and execution | Less control, no parallel agent management |
| **Claude Swarm** | Agent-to-agent communication | More complex, steeper learning curve |
| **Archon** | Self-improving agents | Less mature, no visual interface |

### Recommendation Score
- **For Beginners**: 7/10 - Visual interface is helpful, but requires Git and CLI knowledge
- **For Intermediate**: 9/10 - Perfect balance of power and usability
- **For Advanced**: 8/10 - Powerful orchestration, though some advanced patterns require manual implementation

---

## 7. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Usage

```bash
# Install and start Vibe Kanban
npx vibe-kanban

# The server starts and opens in browser at localhost:3000
```

### Code Example 2: Creating a Project with Git Worktree

```typescript
// Project configuration structure
interface ProjectConfig {
  name: string;
  repositoryPath: string;      // Local path to git repository
  branch: string;               // Base branch (e.g., "main")
  codingAgent: CodingAgent;     // Selected agent (Claude Code, etc.)
}

// When a task is created, Vibe Kanban:
// 1. Creates a new Git worktree: git worktree add ../vk-task-123 -b feature/task-123
// 2. Spawns the coding agent in the worktree directory
// 3. Streams agent output to the web interface
// 4. Allows review via built-in diff viewer
// 5. Merges back to main when approved
```

### Code Example 3: Multiagent Coordination

```bash
# Scenario: Three agents working in parallel

# Terminal 1: Vibe Kanban server running
npx vibe-kanban

# Web Interface:
# Task 1: "Fix authentication bug" -> Claude Code Agent
#   - Worktree: ../vk-task-auth-fix
#   - Branch: feature/auth-fix
#   - Status: Running
#
# Task 2: "Add user profile page" -> Claude Code Agent
#   - Worktree: ../vk-task-user-profile
#   - Branch: feature/user-profile
#   - Status: Awaiting Review
#
# Task 3: "Optimize database queries" -> Gemini CLI Agent
#   - Worktree: ../vk-task-db-optimization
#   - Branch: feature/db-optimization
#   - Status: Completed

# All tasks run simultaneously in isolated worktrees
# No file conflicts, easy code review via web interface
```

### Code Example 4: Task Template Configuration

```json
{
  "name": "Bug Fix Template",
  "description": "Standard template for bug fixes",
  "agent": "claude-code",
  "autoCommit": true,
  "createPR": true,
  "specification": "Use the /spec command to analyze the bug first",
  "acceptanceCriteria": [
    "Bug is fixed",
    "Tests added/updated",
    "No regressions"
  ]
}
```

---

## 8. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: First Parallel Agents
**Objective**: Set up Vibe Kanban and run two Claude Code agents in parallel

**Steps**:
1. Install Vibe Kanban: `npx vibe-kanban`
2. Create a new project from an existing git repository
3. Create two tasks:
   - Task 1: "Add error handling to the login function"
   - Task 2: "Add unit tests for the logout function"
4. Start both tasks simultaneously
5. Observe the agents working in parallel
6. Review the code changes using the built-in diff viewer
7. Merge both tasks back to main

**Expected Output**:
- Two Git worktrees created automatically
- Both agents complete tasks simultaneously
- Clean code review experience
- Successful merges with no conflicts

### Exercise 2: Multi-Agent Comparison
**Objective**: Compare outputs from different AI agents on the same task

**Steps**:
1. Create two identical tasks: "Refactor the UserService class"
2. Assign Task 1 to Claude Code
3. Assign Task 2 to Gemini CLI (if available) or another Claude Code instance
4. Start both tasks
5. Compare the generated code in the diff viewer
6. Discuss the differences in approach and code quality

**Expected Output**:
- Understanding of how different agents approach the same problem
- Insights into selecting appropriate agents for specific tasks

### Exercise 3: Complete Feature Workflow
**Objective**: Implement a feature using Vibe Kanban's complete workflow

**Steps**:
1. Create a task template for feature development
2. Create a task: "Implement password reset functionality"
3. Define acceptance criteria in the task description
4. Assign to Claude Code agent
5. Monitor agent progress in real-time
6. Review generated code in diff viewer
7. Make manual adjustments if needed
8. Approve changes and create pull request
9. Merge PR to main branch

**Expected Output**:
- Complete understanding of Vibe Kanban workflow
- Experience with code review and approval process
- Successfully merged feature

---

## 9. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Yes
- **Confidence Level**: High
- **Reasoning**: Vibe Kanban is the leading tool for AI agent orchestration with excellent Git worktree integration, making it perfect for teaching parallel development workflows. Its visual interface, multi-agent support, and code review capabilities provide a complete learning experience for managing AI coding agents.

### Suggested Implementation Approach

1. **Phase 1: Introduction (10 minutes)**
   - Explain the concept of AI agent orchestration
   - Demonstrate Vibe Kanban interface and features
   - Show how Git worktrees enable parallel development

2. **Phase 2: Hands-on Exercise (30 minutes)**
   - Guide participants through installation and setup
   - Create first project and run parallel agents
   - Practice code review workflow

3. **Phase 3: Advanced Patterns (20 minutes)**
   - Task templates for standardization
   - Multi-agent strategies
   - Integration with CI/CD workflows

### Alternative Tools
- **If not this tool, consider**: myclaude (simpler, Claude-only), claude-flow (workflow automation)
- **Reason**: Vibe Kanban offers the most complete package for visual orchestration with Git worktree integration

---

## 10. RESEARCH METADATA

### Sources Consulted
- [Vibe Kanban Official Website](https://www.vibekanban.com/)
- [GitHub Repository: BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban)
- [Vibe Kanban Documentation](https://vibekanban.com/docs)
- [DeepWiki Documentation Structure](https://github.com/BloopAI/vibe-kanban)
- [VirtusLab Blog: vibe-kanban](https://virtuslab.com/blog/ai/vibe-kanban/)
- [Medium: Reimagining Software Development with Vibe Kanban](https://thamizhelango.medium.com/vibe-kanban-reimagining-the-software-development-lifecycle-with-ai-agent-orchestration-eebe9744edf4)
- [Tool Review by Eleanor Berger](https://elite-ai-assisted-coding.dev/p/vibe-kanban-tool-review)
- [Awesome Vibe Coding](https://github.com/no-fluff/awesome-vibe-coding)
- [Chinese Article: Vibe Kanban Overview](https://zhuanlan.zhihu.com/p/1994016643249087311)
- [Tencent Developer: AI Agent Orchestration](https://cloud.tencent.com.cn/developer/article/2618054?policyId=1003)
- [Blog: AI Worktree Parallel Development](https://blog.einverne.info/post/2026/01/vibe-kanban-parallel-ai-worktree.html)

### Research Notes
- **Gaps Identified**:
  - Limited documentation on complex task dependencies
  - Less information on enterprise/team deployment scenarios
- **Needs Verification**:
  - Actual performance with 5+ parallel agents
  - Worktree cleanup behavior verification
- **Community Sentiment**:
  - Highly positive reviews
  - "Biggest increase in productivity since Cursor" - Luke Harries (Eleven Labs)
  - "This project is underrated. I've found it to be useful and fun" - Hamel Husain

### Contact Points
- **Documentation**: https://vibekanban.com/docs
- **Community**: GitHub Discussions, Discord
- **Issues**: https://github.com/BloopAI/vibe-kanban/issues
- **LinkedIn**: https://www.linkedin.com/company/bloop-ai

---

## FINAL VERDICT

### Workshop Suitability Score: 9/10

**Breakdown**:
- Teaching Value: 9/10 - Excellent visual demonstration of parallel agent orchestration
- Hands-on Potential: 9/10 - Participants can run real parallel agents during workshop
- Integration Ease: 8/10 - Simple npx installation, but requires CLI familiarity
- Production Relevance: 10/10 - Real-world tool used by thousands of developers
- Documentation Quality: 8/10 - Good documentation, but still evolving

### One-Sentence Summary
Vibe Kanban is the premier visual orchestration platform for AI coding agents, combining Git worktree isolation with a Kanban-style interface to enable safe parallel development - an excellent tool for teaching modern AI-assisted development workflows.

### Tags for Categorization
`[multiagent]` `[git-worktrees]` `[orchestration]` `[visual-interface]` `[intermediate]` `[production-ready]` `[claude-code]` `[parallel-development]` `[code-review]`

---

## APPENDIX: Workshop Integration Guide

### Pre-Workshop Setup Checklist

1. **Install Prerequisites**:
   - Node.js 18+
   - Git
   - Claude Code CLI (authenticated)

2. **Install Vibe Kanban**:
   ```bash
   npx vibe-kanban
   ```

3. **Prepare Demo Repository**:
   - Create a sample git repository with some bugs/features to fix
   - Ensure all participants can clone/access the repo

4. **Test Parallel Agents**:
   - Verify Claude Code authentication
   - Test basic task creation and execution

### Workshop Slides Outline

1. **Introduction (5 slides)**
   - The challenge of managing AI coding agents
   - From watching to orchestrating
   - Enter Vibe Kanban

2. **Core Concepts (5 slides)**
   - Git worktree isolation explained
   - Kanban-style task management
   - Multi-agent support

3. **Live Demo (10 slides)**
   - Installation and setup
   - Creating first project
   - Running parallel agents
   - Code review workflow
   - Merging completed work

4. **Hands-on Exercise (5 slides)**
   - Exercise instructions
   - Expected outcomes
   - Troubleshooting common issues

5. **Advanced Patterns (5 slides)**
   - Task templates
   - Multi-agent strategies
   - Production workflows

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `npx vibe-kanban` fails | Ensure Node.js 18+ is installed |
| Agent authentication fails | Verify Claude Code CLI is authenticated |
| Worktree creation fails | Ensure git repository is clean (no uncommitted changes) |
| Cannot connect to web interface | Check if PORT is already in use |
| Windows MCP connection issues | Set `MCP_HOST=127.0.0.1` environment variable |

### Evaluation Metrics

**Participants should be able to**:
- [ ] Install and start Vibe Kanban
- [ ] Create a project from a git repository
- [ ] Run at least two agents in parallel
- [ ] Review code changes using the diff viewer
- [ ] Merge completed work back to main branch
- [ ] Explain the benefits of Git worktree isolation

**Post-Workshop Survey Questions**:
1. How confident do you feel using Vibe Kanban to orchestrate AI agents? (1-5)
2. Did the hands-on exercise help solidify your understanding? (Yes/No)
3. Would you use Vibe Kanban in your daily development workflow? (Yes/No/Maybe)
4. What would improve the workshop experience?

---

*Research Report Generated: 2026-02-02*
*Research Agent: Claude Code*
*Template Version: UNIFIED_RESEARCH_TEMPLATE.md*
