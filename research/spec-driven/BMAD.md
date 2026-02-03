# Agent Research Template

**Agent Name**: Research Agent
**Research Focus**: Spec-Driven Development Tools - BMAD Method
**Date**: 2026-02-01
**Researcher**: Claude Code Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: BMAD Method (Breakthrough Method for Agile AI Driven Development)
- **Repository/URL**: https://github.com/bmad-code-org/BMAD-METHOD
- **Latest Version**: v6-alpha (as of January 2026)
- **Last Updated**: December 2025 (active development)
- **License**: MIT
- **Maintainer**: BMad Code, LLC (bmad-code-org)

### Tool Purpose
- **Primary Goal**: Transform AI from a one-off code helper into a structured, auditable workflow through specialized agents and facilitated development processes
- **Target Users**: Teams and enterprises adopting AI-assisted development who need structure, governance, and scale-adaptive intelligence
- **Core Problem Solved**: Traditional AI tools do the thinking FOR you (producing average results); BMAD agents act as expert collaborators who guide YOU through structured processes to bring out YOUR best thinking

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| 21 Specialized Agents | PM, Architect, Developer, UX, Scrum Master, QA, and more | High - demonstrates agent specialization | 5 |
| 50+ Guided Workflows | Complete coverage of software development lifecycle | High - comprehensive workflow library | 5 |
| Scale-Domain-Adaptive | Automatically adjusts planning based on project complexity/domain | High - teaches adaptive approaches | 5 |
| Party Mode | Multiple agent personas in one session for collaborative planning | Medium - fun but may overwhelm beginners | 4 |
| Quick Flow | `/quick-spec`, `/dev-story`, `/code-review` for small features | High - fast path for simple tasks | 5 |
| Full Planning Path | Complete PRD → Architecture → Epics → Stories workflow | High - enterprise methodology | 5 |
| BMad Help AI | AI-assisted guidance system (`/bmad-help`) | High - intelligent onboarding | 5 |
| Module System | Extensible modules (TEA for testing, CIS for creativity, etc.) | Medium - advanced feature | 4 |
| Test Architect (TEA) | Enterprise-grade test strategy module (8 workflows) | High - teaches testing best practices | 5 |
| Git Worktree Support | Automated worktree management for parallel development | High - core feature | 5 |

### Unique Selling Points
1. **Agent Philosophy**: "AI as expert collaborator, not replacement" - guides human thinking rather than replacing it
2. **Scale Adaptivity**: Automatically adjusts approach based on project complexity (e.g., dating app vs medical system)
3. **Modular Architecture**: Core framework + specialized modules (TEA, CIS, Game Dev Studio, Builder)
4. **Complete Lifecycle Coverage**: From brainstorming through deployment, not just implementation
5. **Free and Open Source**: No paywalls, no gated content, no gated Discord - truly open
6. **Party Mode**: Bring multiple agent perspectives together for collaborative decision-making
7. **Enterprise Testing**: Test Architect module provides risk-based testing, quality gates, NFR assessment

### Limitations
- **Extreme Complexity**: 21 agents and 50+ workflows can be overwhelming for beginners
- **Enterprise Focus**: Designed for teams/enterprises, may be overkill for solo developers
- **Learning Curve**: Requires significant time investment to master all workflows
- **Setup Overhead**: Node.js + npm + module selection + configuration
- **Documentation Depth**: So comprehensive that finding specific workflows can be challenging
- **Context Window Usage**: Multiple agents in Party Mode can consume context quickly

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Advanced (requires understanding of agile, software lifecycle)
- **Hands-on Potential**: Medium (complex workflows mean longer time to demonstrate)
- **Demo-readiness**: Partial (too complex for full demo, but individual workflows demo well)
- **Setup Time**: 30-45 minutes (installation, module selection, configuration)

### Learning Objectives Addressed
- [x] **Spec-driven Development**: Yes, but as part of broader agile framework
- [x] **Multiagent Orchestration**: Strongest of all tools - core feature
- [x] **Git Worktrees Integration**: Yes - automated worktree management
- [x] **Production Workflows**: Excellent - enterprise-grade throughout

### Recommended Workshop Module
- **Module Placement**: "Module 10 - Enterprise AI Workflows" (Advanced/Optional)
- **Duration**: 180 minutes (minimum) to cover meaningful subset
- **Prerequisites**:
  - Completion of basic and intermediate modules
  - Understanding of agile methodologies
  - Experience with AI coding assistants
  - Team/enterprise context (recommended)

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: Node.js v20+
- **Dependencies**: npm, optional modules (tea, cis, etc.)
- **Claude Code Version Required**: Latest recommended
- **Platform Support**: Windows, Linux, macOS

### Integration Complexity
- **Installation Difficulty**: Medium (npm install, prompts for modules)
- **Configuration Required**: Extensive (agent selection, workflow customization)
- **Compatibility Issues**: Minimal (designed for multiple AI IDEs)

### Performance Characteristics
- **Resource Usage**: High (multiple agents, Party Mode, complex workflows)
- **Execution Speed**: Slow (intentionally - emphasizes thoroughness over speed)
- **Scalability**: Excellent (designed for enterprise-scale projects)

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Quick Flow for Bug Fix
**Difficulty**: Intermediate
**Time**: 60 minutes
**Description**: Use BMAD's quick flow to fix a bug with proper spec and review
**Learning Outcomes**:
- [x] Experience streamlined BMAD workflow
- [x] Learn spec → dev → review cycle
- [x] Understand when to use quick vs full planning

### Scenario 2: Full Planning for E-Commerce Platform
**Difficulty**: Advanced
**Time**: 180 minutes
**Description**: Complete BMAD workflow from product brief through sprint planning
**Learning Outcomes**:
- [x] Understand enterprise AI development
- [x] Practice multi-agent collaboration
- [x] Learn scale-adaptive planning

### Scenario 3: Party Mode Brainstorming
**Difficulty**: Intermediate
**Time**: 45 minutes
**Description**: Use Party Mode to bring multiple agent perspectives to design discussion
**Learning Outcomes**:
- [x] Experience collaborative AI decision-making
- [x] Learn from different agent perspectives
- [x] Practice structured brainstorming

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs BMAD | Weaknesses vs BMAD |
|------|----------------------|------------------------|
| Spec Kit | Simpler, faster, GitHub official | Fewer agents, less comprehensive |
| OpenSpec | Much lighter weight, easier to learn | Not enterprise-focused, fewer workflows |
| GSD | Better for individuals, faster workflow | Less comprehensive, fewer agents |

### Recommendation Score
- **For Beginners**: 3/10 (overwhelming for beginners)
- **For Intermediate**: 6/10 (valuable but complex)
- **For Advanced**: 9/10 (excellent for enterprise/teams)

---

## 7. IMPLEMENTATION EXAMPLES

### Code Example 1: Quick Flow
```bash
# Install BMAD Method
npx bmad-method install

# In Claude Code:

# For bug fixes and small features
/quick-spec     # Analyzes codebase, produces tech-spec with stories
/dev-story      # Implements each story
/code-review    # Validates quality
```

### Code Example 2: Full Planning Path
```bash
# For products, platforms, complex features
/product-brief           # Define problem, users, MVP scope
/create-prd             # Full requirements with personas, metrics, risks
/create-architecture    # Technical decisions and system design
/create-epics-and-stories # Break work into prioritized stories
/sprint-planning        # Initialize sprint tracking

# Repeat per story
/create-story → /dev-story → /code-review
```

### Code Example 3: Multi-Agent Party Mode
```bash
# Bring multiple agents into discussion
/party-mode

# PM agent: What are our user personas?
# Architect agent: What's our system architecture?
# UX agent: What's the user experience?
# Developer agent: What are implementation considerations?

# All agents discuss collaboratively
# Facilitator guides to consensus
```

### Code Example 4: Git Worktree Integration
```bash
# BMAD includes automated worktree management
# For parallel development:

# BMAD creates worktrees automatically for parallel stories
git worktree list
# Shows multiple worktrees for different features

# Each worktree isolated for independent development
# Merge when complete with full testing
```

---

## 8. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: BMAD Help Discovery
**Objective**: Learn BMAD through AI-guided assistance
**Steps**:
1. Run `/bmad-help` to see what's next
2. Ask `/bmad-help` specific questions about your project
3. Follow recommendations to select appropriate workflows
4. Document your learning path
**Expected Output**: Understanding of BMAD's intelligent onboarding

### Exercise 2: Quick vs Full Planning
**Objective**: Understand when to use each BMAD path
**Steps**:
1. Use Quick Flow for a simple bug fix
2. Use Full Planning for a complex feature
3. Compare time spent, artifacts created, outcomes
4. Discuss decision criteria for choosing
**Expected Output**: Framework for selecting appropriate workflow

### Exercise 3: Agent Specialization Experience
**Objective**: Learn value of specialized agents
**Steps**:
1. Run `/product-brief` (PM agent focus)
2. Run `/create-architecture` (Architect agent focus)
3. Run `/create-story` (Developer agent focus)
4. Compare perspectives and artifacts
**Expected Output**: Appreciation for specialized expertise

---

## 9. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Maybe (as optional advanced module)
- **Confidence Level**: Medium
- **Reasoning**: BMAD is powerful but overwhelming for general workshops. Best suited for enterprise/advanced tracks or as mention for participants to explore independently.

### Suggested Implementation Approach
1. **Phase 1** (30 min): Overview of BMAD's agent philosophy and approach
2. **Phase 2** (60 min): Hands-on with Quick Flow only (most practical for workshops)
3. **Phase 3** (30 min): Demo of Party Mode and discussion of enterprise use cases

### Alternative Tools
- **If not this tool, consider**: Spec Kit (for enterprise structure without complexity), GSD (for individual productivity)
- **Reason**: BMAD is excellent for teams but overkill for most workshop participants

---

## 10. RESEARCH METADATA

### Sources Consulted
- GitHub Repository: https://github.com/bmad-code-org/BMAD-METHOD
- Official Guide: https://bmadmethodguide.com/
- Medium Guide: https://medium.com/@hieutrantrung.it/the-complete-business-analysts-guide-to-bmad-method-from-zero-to-expert-project-planning-in-30-3cf3995a0480
- YouTube Masterclass: https://www.youtube.com/watch?v=LorEJPrALcg
- Implementation Guide: https://buildmode.dev/blog/mastering-bmad-method-2025/
- GMO Article: https://recruit.group.gmo/engineer/jisedai/blog/the-bmad-method-a-framework-for-spec-oriented-ai-driven-development/
- Dev Labs Article: https://devlabs.angelhack.com/blog/bmad-method/
- Comprehensive Analysis: https://redreamality.com/garden/notes/bmad-method-guide/

### Research Notes
- **Gaps Identified**: Limited real-world case studies from production teams
- **Needs Verification**: Long-term adoption and maintenance patterns
- **Community Sentiment**: Very positive among enterprise adopters, seen as comprehensive but complex

### Contact Points
- **Documentation**: https://github.com/bmad-code-org/BMAD-METHOD
- **Community**: Discord (active, link in repo)
- **YouTube**: Tutorial channel (BMad Method Official)
- **Issues**: https://github.com/bmad-code-org/BMAD-METHOD/issues

---

## FINAL VERDICT

### Workshop Suitability Score: 6.5/10

**Breakdown**:
- Teaching Value: 8/10 (comprehensive coverage of AI workflows)
- Hands-on Potential: 5/10 (too complex for typical workshop timeframe)
- Integration Ease: 6/10 (setup and configuration are involved)
- Production Relevance: 9/10 (enterprise-grade throughout)
- Documentation Quality: 9/10 (extensive but can be overwhelming)

### One-Sentence Summary
BMAD is the most comprehensive spec-driven framework available, offering enterprise-grade workflows and agent specialization that will overwhelm beginners but delight teams seeking structure and scale.

### Tags for Categorization
`[spec-driven]` `[advanced]` `[enterprise]` `[multiagent]` `[agile]` `[git-worktrees]` `[comprehensive]` `[modular]` `[party-mode]` `[scale-adaptive]`
