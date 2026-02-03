# Advanced Agentic Coding with Claude Code - Workshop Materials

**Workshop Version**: 2.0
**Last Updated**: February 2, 2026
**Duration**: 2 Days (12 hours total)
**Target Audience**: Developers with Claude Code experience

---

## Course Overview

This advanced workshop builds on foundational Claude Code knowledge to teach production-ready patterns for enterprise development. Participants will learn MCP integration, skills development, multiagent orchestration, spec-driven development, and git worktree patterns for parallel AI development.

### Learning Objectives

By the end of this workshop, participants will be able to:

1. **Extend Claude Code** using Skills and MCP for custom workflows
2. **Apply spec-driven development** (GSD) for predictable AI code generation
3. **Orchestrate multiagent systems** using CrewAI and Claude Squad
4. **Leverage git worktrees** for parallel AI development (60%+ time savings)
5. **Implement automation** using hooks and validation pipelines
6. **Compare AI platforms** and make informed tool selection decisions
7. **Apply enterprise patterns** for team deployment and governance

---

## Prerequisites

### Required Knowledge
- [ ] Completed "Introduction to Claude Code" workshop **OR**
- [ ] 1+ months of daily Claude Code usage
- [ ] Familiarity with command line interface
- [ ] Basic understanding of YAML and markdown
- [ ] Git workflow experience (branches, commits, merges)

### Technical Requirements
- [ ] Claude Code CLI installed and authenticated
- [ ] GitHub account (for MCP exercises)
- [ ] Code editor (VS Code recommended)
- [ ] Node.js 18+ or Python 3.9+
- [ ] Git installed
- [ ] 8GB+ RAM available
- [ ] 20GB+ free disk space

### Pre-Workshop Setup (30 minutes)

See [`setup/SETUP.md`](setup/SETUP.md) for detailed instructions.

---

## Day-by-Day Agenda

### Day 1: Foundation & Core Skills (6 hours)

**09:00 - 09:30**: Welcome & Context
- Workshop overview and goals
- Proficiency assessment
- Current landscape (2025-2026 trends)

**09:30 - 10:30**: Module 1: Skills & Marketplaces [ESSENTIAL]
- Skills architecture and frontmatter
- Marketplaces: daymade-skills, cc-skills
- Creating custom skills
- Hands-on: Build 3 production skills

**10:30 - 10:45**: Break

**10:45 - 11:45**: Module 2: MCP Integration [ESSENTIAL]
- MCP protocol and architecture
- Installing and configuring MCP servers
- GitHub integration example
- Hands-on: Build custom MCP server

**11:45 - 12:00**: Module 3 Introduction: Spec-Driven Development
- Why specs matter for AI coding
- The context rot problem

**12:00 - 13:00**: Lunch

**13:00 - 14:30**: Module 3: Spec-Driven Development with GSD (continued)
- GSD installation and workflow
- Atomic commits and verification
- Hands-on: Feature from spec with atomic commits

**14:30 - 14:45**: Break

**14:45 - 16:15**: Module 4: Multiagent Fundamentals
- Multiagent patterns and concepts
- OpenAI Swarm (educational)
- CrewAI hands-on
- Agent coordination patterns

**16:15 - 17:00**: Day 1 Wrap-up & Q&A

---

### Day 2: Advanced Patterns & Production (6 hours)

**09:00 - 09:15**: Day 1 Review & Day 2 Overview

**09:15 - 11:45**: Module 5: Git Worktrees + Claude Squad [CROWN JEWEL]
- Git worktree fundamentals
- Claude Squad installation and setup
- Multi-agent parallel development
- Hands-on: 3 parallel agents on real tasks

**11:45 - 12:00**: Break

**12:00 - 13:00**: Lunch

**13:00 - 14:00**: Module 6: Hooks & Automation
- Hook events and lifecycle
- Building automation workflows
- AutoClaude demonstration
- Hands-on: Create production hooks

**14:00 - 14:15**: Break

**14:15 - 14:45**: Module 7: Platform Comparison
- Cursor vs Claude Code philosophy
- Windsurf agentic AI
- Continue.dev extensibility
- When to choose which platform

**14:45 - 16:15**: Module 8: Enterprise Patterns & Wrap-up
- Enterprise deployment strategies
- Governance frameworks
- Team collaboration patterns
- Cost management and ROI
- Q&A and next steps

**16:15 - 17:00**: Final Assessment & Certificates

---

## Module Details

### Module 1: Skills & Marketplaces (60 min)
**Status**: ESSENTIAL for all users
**Tools**: daymade-skills, cc-skills, skill-creator

**Learning Outcomes**:
- Understand Skills architecture and frontmatter
- Install and use marketplace skills
- Create custom skills with proper structure
- Implement argument handling and tool restrictions

**Exercises**:
1. Install marketplace and explore skills
2. Create code review skill with frontmatter
3. Create testing assistant skill
4. Share skills with team

**Resources**: [`exercises/module1-skills/`](exercises/module1-skills/)

---

### Module 2: MCP Integration (60 min)
**Status**: ESSENTIAL for advanced workflows
**Tools**: MCP protocol, GitHub MCP server, custom servers

**Learning Outcomes**:
- Understand MCP architecture and benefits
- Connect to external services (GitHub, databases)
- Use MCP resources in workflows
- Build custom MCP server

**Exercises**:
1. Configure GitHub MCP server
2. Query issues and PRs with MCP
3. Build database query MCP server
4. Multi-server automation workflow

**Resources**: [`exercises/module2-mcp/`](exercises/module2-mcp/)

---

### Module 3: Spec-Driven Development with GSD (90 min)
**Status**: CORE - Production patterns
**Tools**: GSD (Get Shit Done)

**Learning Outcomes**:
- Understand context rot problem
- Implement atomic commits workflow
- Use verification and UAT processes
- Apply context engineering principles

**Exercises**:
1. Experience context rot firsthand
2. Build feature with GSD workflow
3. Compare git history (atomic vs monolithic)
4. Verification walkthrough

**Resources**: [`exercises/module3-gsd/`](exercises/module3-gsd/)

---

### Module 4: Multiagent Fundamentals (90 min)
**Status**: CORE - Multiagent patterns
**Tools**: OpenAI Swarm, CrewAI

**Learning Outcomes**:
- Understand multiagent coordination patterns
- Learn handoff and delegation patterns
- Implement CrewAI with git worktrees
- Design agent specializations

**Exercises**:
1. OpenAI Swarm concepts (20 min)
2. CrewAI hands-on (70 min)
3. Agent coordination challenge

**Resources**: [`exercises/module4-multiagent/`](exercises/module4-multiagent/)

---

### Module 5: Git Worktrees + Claude Squad (150 min)
**Status**: CROWN JEWEL - Advanced orchestration
**Tools**: Git worktrees, Claude Squad, CCSwarm

**Learning Outcomes**:
- Master git worktree commands and patterns
- Run multiple Claude Code instances in parallel
- Orchestrate specialized agents via Claude Squad
- Achieve 60%+ time savings on parallel tasks

**Exercises**:
1. Git worktree fundamentals (30 min)
2. Claude Squad setup (30 min)
3. Parallel development sprint (60 min)
4. Integration and cleanup (30 min)

**Resources**: [`exercises/module5-worktrees/`](exercises/module5-worktrees/)

---

### Module 6: Hooks & Automation (60 min)
**Status**: CORE - Production automation
**Tools**: Hooks, AutoClaude, validation pipelines

**Learning Outcomes**:
- Master hook events and lifecycle
- Build automation workflows
- Implement quality gates
- Use AutoClaude for 24/7 automation

**Exercises**:
1. Create auto-formatting hook
2. Build protected files hook
3. AutoClaude queue management
4. End-to-end automation demo

**Resources**: [`exercises/module6-automation/`](exercises/module6-automation/)

---

### Module 7: Platform Comparison (30 min)
**Status**: COMPARISON - Decision framework
**Tools**: Cursor, Windsurf, Continue.dev

**Learning Outcomes**:
- Compare Claude Code with competing platforms
- Understand different philosophies (CLI vs GUI)
- Make informed tool selection decisions
- Evaluate trade-offs

**Exercises**:
1. Platform feature comparison matrix
2. Hands-on demo: Cursor vs Claude Code
3. Team decision framework

**Resources**: [`exercises/module7-platforms/`](exercises/module7-platforms/)

---

### Module 8: Enterprise Patterns & Wrap-up (90 min)
**Status**: ENTERPRISE - Production deployment
**Tools**: Governance frameworks, deployment strategies

**Learning Outcomes**:
- Understand enterprise deployment strategies
- Implement governance frameworks
- Plan team rollout and training
- Calculate ROI and TCO

**Exercises**:
1. Enterprise rollout simulation
2. Governance framework design
3. ROI calculation exercise
4. Team deployment plan

**Resources**: [`exercises/module8-enterprise/`](exercises/module8-enterprise/)

---

## Assessment & Certification

### Assessment Criteria

**Formative Assessment** (Throughout):
- [ ] Exercise completion rates (target: 90%+)
- [ ] Code quality checks
- [ ] Peer review feedback
- [ ] Instructor observation

**Summative Assessment** (End of workshop):
- [ ] Capstone project: Complete workflow automation
- [ ] Skills demonstration: Teach a concept
- [ ] Knowledge check: Multiple choice (30 questions)
- [ ] Self-assessment: Confidence survey

### Certification

Participants who complete 80%+ of exercises and pass the knowledge check will receive:
- **Certificate of Completion**: Advanced Agentic Coding with Claude Code
- **Digital Badge**: Shareable on LinkedIn and resume
- **Skills Summary**: List of all skills mastered

---

## Materials Included

### For Participants
- 📄 [`setup/SETUP.md`](setup/SETUP.md) - Pre-workshop setup guide
- 📊 [`slides/AGENDA.md`](slides/AGENDA.md) - Complete slide deck
- 📝 [`exercises/`](exercises/) - All hands-on exercises
- ✅ [`solutions/`](solutions/) - Exercise solutions
- 📚 [`resources/`](resources/) - Reference materials and cheat sheets

### For Instructors
- 🎓 [`instructor-guide/INSTRUCTOR_GUIDE.md`](instructor-guide/INSTRUCTOR_GUIDE.md) - Comprehensive facilitation guide
- ⏱️ Timing guides for each module
- 🔧 Troubleshooting guides
- 📋 Assessment rubrics
- 🎯 Demo scripts and checklists

---

## Success Metrics

### Immediate Metrics
- [ ] 90%+ exercise completion rate
- [ ] 80%+ participant satisfaction
- [ ] 70%+ confidence increase (pre/post survey)
- [ ] 0 participants stuck on exercises >15 min

### Follow-up Metrics (1 month)
- [ ] Participants using skills in daily work
- [ ] Skills shared with teams
- [ ] MCP integrations deployed
- [ ] Productivity improvements reported

---

## Quick Reference

### Installation Commands
```bash
# Claude Code
npm install -g @anthropic-ai/claude-code

# GSD (Spec-Driven)
npm install -g gsd-cli

# Claude Squad
npx claude-squad init

# CrewAI (Multiagent)
pip install crewai

# AutoClaude (Automation)
# Via VS Code extension

# Skills Marketplace
claude plugin marketplace add daymade/claude-code-skills
```

### Key Files Created During Workshop
```bash
# Skills
~/.claude/skills/                    # User skills
.claude/skills/                      # Project skills

# MCP Configuration
~/.claude/settings.json              # User MCP servers
.mcp.json                            # Project MCP servers

# GSD
.gsd/                                # GSD project directory
PLAN.md                              # Generated plans

# Claude Squad
.claude-squad/                       # Squad configuration

# Git Worktrees
git worktree add -b feature ../worktree-feature
```

---

## Research-Based Curriculum

This workshop is based on comprehensive research covering:
- **80 research documents** across 11 categories
- **50+ tools** analyzed and evaluated
- **150+ sources** consulted
- **Enterprise case studies** (Drata, Novo Nordisk, Money Forward)
- **Academic research** (arXiv papers, conference proceedings)

See [`research/MASTER_SUMMARY.md`](../research/MASTER_SUMMARY.md) for complete research synthesis.

---

## Version History

- **v2.0** (February 2026): Initial advanced workshop based on comprehensive research
- Future versions will incorporate feedback and evolving tool landscape

---

**Ready to transform your Claude Code skills!** 🚀
