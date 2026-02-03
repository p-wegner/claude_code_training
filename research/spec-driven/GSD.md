# Agent Research Template

**Agent Name**: Research Agent
**Research Focus**: Spec-Driven Development Tools - GSD (Get Shit Done)
**Date**: 2026-02-01
**Researcher**: Claude Code Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: GSD (Get Shit Done)
- **Repository/URL**: https://github.com/glittercowboy/get-shit-done
- **Latest Version**: Active development (frequent updates)
- **Last Updated**: January 2026
- **License**: MIT
- **Maintainer**: TÂCHES (glittercowboy)

### Tool Purpose
- **Primary Goal**: Solve context rot in Claude Code through meta-prompting, context engineering, and spec-driven development that produces consistent, verified results
- **Target Users**: Individual developers and small teams who want to describe what they want and have it built correctly without enterprise theater
- **Core Problem Solved**: Claude Code quality degrades as context window fills; GSD maintains fresh context per task through intelligent context engineering, XML prompts, and subagent orchestration

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| Context Engineering | Structured file system (PROJECT.md, RESEARCH, REQUIREMENTS, ROADMAP, STATE) | High - teaches context management | 5 |
| XML Prompt Formatting | Every task structured as optimized XML for Claude | High - shows prompt engineering | 5 |
| Multi-Agent Orchestration | Thin orchestrator spawns specialized subagents | High - demonstrates agent patterns | 5 |
| Atomic Git Commits | Each task gets its own commit immediately | High - Git best practices | 5 |
| Fresh Context Per Task | 200k tokens per execution, zero accumulated garbage | High - solves real AI problem | 5 |
| Quick Mode | Fast path for ad-hoc tasks with GSD guarantees | High - practical for real work | 5 |
| Verification Workflow | `/gsd:verify-work` walks through UAT testing | High - teaches testing mindset | 5 |
| Map Codebase | Parallel agents analyze existing projects | Medium - useful for brownfield | 4 |
| Milestone Management | Complete → archive → tag release cycle | Medium - project lifecycle | 4 |
| Model Profiles | Quality/balanced/budget profiles for cost control | Medium - production consideration | 4 |

### Unique Selling Points
1. **Solves Context Rot**: Primary focus on maintaining Claude Code quality as projects grow
2. **Atomic Commits**: Every task is independently revertable with clean git history
3. **Verification Built-In**: `/gsd:verify-work` walks through actual user testing, not just automated checks
4. **No Enterprise BS**: Explicitly rejects sprint ceremonies, story points, Jira workflows
5. **Subagent Orchestration**: Main context stays at 30-40% while work happens in fresh subagent contexts
6. **Trusted in Production**: Used by engineers at Amazon, Google, Shopify, Webflow
7. **Claude Code Native**: Built specifically for Claude Code (not multi-tool)

### Limitations
- **Claude Code Only**: Native support only for Claude Code (OpenCode/Gemini via community ports)
- **No Multi-Agent Framework**: Uses subagents but doesn't teach multi-agent architecture
- **Less Formal Spec Process**: Specification emerges through questioning, not formal artifacts
- **Individual Focus**: Designed for solo developers, less team-oriented
- **Documentation**: Minimal formal documentation, learning by doing
- **Git Worktree Support**: No explicit worktree features (relies on atomic commits instead)

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Intermediate to Advanced (requires understanding of AI context)
- **Hands-on Potential**: High (complete workflow is demonstrable)
- **Demo-readiness**: Yes (clear commands, visible results)
- **Setup Time**: 5-10 minutes (npm install, that's it)

### Learning Objectives Addressed
- [x] **Spec-driven Development**: Yes, but through emergent questioning not formal specs
- [x] **Multiagent Orchestration**: Yes - subagent orchestration is core feature
- [ ] **Git Worktrees Integration**: No - uses atomic commits instead
- [x] **Production Workflows**: Strong - verification and atomic commits are production practices

### Recommended Workshop Module
- **Module Placement**: "Module 9 - Context Engineering & Verification"
- **Duration**: 90-120 minutes
- **Prerequisites**:
  - Claude Code experience
  - Git proficiency
  - Understanding of AI context windows (helpful but not required)

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: Node.js (for installer)
- **Dependencies**: npm (for install)
- **Claude Code Version Required**: Any recent version
- **Platform Support**: Windows, Linux, macOS

### Integration Complexity
- **Installation Difficulty**: Very Easy (`npx get-shit-done-cc`)
- **Configuration Required**: Minimal (optional: model profiles, workflow settings)
- **Compatibility Issues**: Designed for Claude Code specifically

### Performance Characteristics
- **Resource Usage**: Medium (multiple subagents but fresh contexts)
- **Execution Speed**: Medium (intentional - verification takes time)
- **Scalability**: Good (atomic commits prevent large monolithic changes)

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Build a Feature End-to-End
**Difficulty**: Intermediate
**Time**: 90 minutes
**Description**: Complete GSD workflow from new-project through verify-work
**Learning Outcomes**:
- [x] Experience context engineering
- [x] Learn atomic commit pattern
- [x] Practice verification workflow
- [x] See value of fresh context per task

### Scenario 2: Quick Mode for Bug Fix
**Difficulty**: Beginner
**Time**: 30 minutes
**Description**: Use `/gsd:quick` for rapid bug fix with verification
**Learning Outcomes**:
- [x] Learn quick path for small tasks
- [x] Understand when to use quick vs full workflow
- [x] Practice verification even for small changes

### Scenario 3: Context Rot Demonstration
**Difficulty**: Advanced
**Time**: 60 minutes
**Description**: Compare Claude Code quality with/without GSD on same feature
**Learning Outcomes**:
- [x] Direct experience of context rot problem
- [x] See how GSD maintains quality
- [x] Learn to recognize when context needs refresh

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs GSD | Weaknesses vs GSD |
|------|----------------------|------------------------|
| Spec Kit | More formal spec process, GitHub official, multi-agent | Heavier, no context engineering focus |
| OpenSpec | Simpler, supports 20+ AI tools | Less powerful context management |
| BMAD | More agents, enterprise features, git worktrees | Much heavier, enterprise-focused |

### Recommendation Score
- **For Beginners**: 7/10 (valuable but requires some experience to appreciate)
- **For Intermediate**: 9/10 (excellent balance of power and simplicity)
- **For Advanced**: 8/10 (may want more formal process or multi-agent architecture)

---

## 7. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Full Workflow
```bash
# Install GSD
npx get-shit-done-cc

# In Claude Code:

# Initialize new project
/gsd:new-project
# AI asks questions → research → requirements → roadmap
# Creates: PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md, .planning/research/

# Discuss phase (capture implementation decisions)
/gsd:discuss-phase 1

# Plan phase (research + plan + verify)
/gsd:plan-phase 1

# Execute phase (parallel waves, fresh context per plan)
/gsd:execute-phase 1

# Verify work (user acceptance testing)
/gsd:verify-work 1

# Complete milestone and tag release
/gsd:complete-milestone
```

### Code Example 2: Quick Mode
```bash
# For ad-hoc tasks
/gsd:quick
> What do you want to do? "Fix navbar responsive breakpoint"

# Creates plan in .planning/quick/001-fix-navbar/
# Executes with fresh context
# Creates atomic commit
# Summary of what changed
```

### Code Example 3: Context Engineering Files
```bash
# GSD creates structured context files:

# PROJECT.md - Project vision (always loaded)
# .planning/research/ - Ecosystem knowledge
# REQUIREMENTS.md - Scoped v1/v2 requirements
# ROADMAP.md - Phases with completion status
# STATE.md - Decisions, blockers, position (memory)
# {phase}-{N}-PLAN.md - XML-structured task
# {phase}-{N}-SUMMARY.md - What happened, what changed

# Each file sized to stay under context degradation limits
```

### Code Example 4: Atomic Commits
```bash
# GSD creates atomic commits per task
abc123f docs(08-02): complete user registration plan
def456g feat(08-02): add email confirmation flow
hij789k feat(08-02): implement password hashing
lmn012o feat(08-02): create registration endpoint

# Benefits:
# - Git bisect finds exact failing task
# - Each task independently revertable
# - Clear history for future sessions
# - Better observability
```

---

## 8. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: Experience Context Engineering
**Objective**: Understand how GSD manages AI context
**Steps**:
1. Run `/gsd:new-project` for a simple feature
2. Review the generated context files (PROJECT.md, REQUIREMENTS, etc.)
3. Notice file sizes and structure
4. Discuss how this prevents context rot
**Expected Output**: Understanding of context management strategy

### Exercise 2: Atomic Commit Practice
**Objective**: Learn value of atomic, revertable changes
**Steps**:
1. Run `/gsd:execute-phase` for a multi-task phase
2. Review git history - see atomic commits
3. Intentionally break something and git bisect to find the task
4. Revert just that task
**Expected Output**: Appreciation for atomic commit pattern

### Exercise 3: Verification Workflow
**Objective**: Practice user acceptance testing with AI guidance
**Steps**:
1. Complete a feature with `/gsd:execute-phase`
2. Run `/gsd:verify-work`
3. Walk through each testable deliverable
4. If something broken, observe how GSD creates fix plans
**Expected Output**: Understanding of thorough verification

---

## 9. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Yes (strong recommend)
- **Confidence Level**: High
- **Reasoning**: GSD strikes an excellent balance - powerful enough to solve real problems, simple enough to learn in a workshop, with unique strengths in context engineering and verification that other tools lack.

### Suggested Implementation Approach
1. **Phase 1** (30 min): Explain context rot problem and GSD's solution, show quick demo
2. **Phase 2** (60 min): Hands-on - participants build a feature with full workflow
3. **Phase 3** (30 min): Compare git history with non-GSD approach, discuss atomic commits

### Alternative Tools
- **If not this tool, consider**: OpenSpec (for lighter weight), Spec Kit (for more formal process)
- **Reason**: GSD is excellent for most scenarios, but some workshops may prioritize spec formality or multi-agent support

---

## 10. RESEARCH METADATA

### Sources Consulted
- GitHub Repository: https://github.com/glittercowboy/get-shit-done
- Medium Review: https://medium.com/@joe.njenga/i-tested-gsd-claude-code-meta-prompting-that-ships-faster-no-agile-bs-ca62aff18c04
- Reddit Discussion: https://www.reddit.com/r/ClaudeAI/comments/1q4yjo0/get_shit_done_the_1_cc_framework_for_people_tired/
- YouTube: "Stop Vibe-Coding in Claude Code. Do This Instead." https://www.youtube.com/watch?v=AAG97Yatadc
- Community Ports: gsd-opencode, gsd-gemini (referenced in README)

### Research Notes
- **Gaps Identified**: Limited formal documentation/tutorials
- **Needs Verification**: Long-term adoption patterns and team usage
- **Community Sentiment**: Extremely positive - "best results I've had," "nothing over-engineered"

### Contact Points
- **Documentation**: https://github.com/glittercowboy/get-shit-done (README only)
- **Community**: Discord (link in repo)
- **Creator**: TÂCHES (glittercowboy on GitHub)

---

## FINAL VERDICT

### Workshop Suitability Score: 9/10

**Breakdown**:
- Teaching Value: 9/10 (unique focus on context engineering)
- Hands-on Potential: 9/10 (complete workflow, visible results)
- Integration Ease: 10/10 (simplest installation of all tools)
- Production Relevance: 9/10 (used at major tech companies)
- Documentation Quality: 6/10 (minimal but sufficient)

### One-Sentence Summary
GSD is the most practical spec-driven tool for individual developers, solving the real problem of context rot with atomic commits and verification that delivers production-ready results without enterprise overhead.

### Tags for Categorization
`[spec-driven]` `[intermediate]` `[advanced]` `[context-engineering]` `[atomic-commits]` `[verification]` `[claude-code-native]` `[production-ready]` `[individual-focused]` `[subagent-orchestration]`
