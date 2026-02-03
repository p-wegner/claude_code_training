# Spec-Driven Development Tools Research

## Tool: Spec Kit (GitHub)

### 1. TOOL OVERVIEW
- **Repository**: https://github.com/github/spec-kit
- **Latest Version**: Available via `uv tool install specify-cli`
- **License**: MIT
- **Maintainer**: GitHub (Den Delimarsky @localden, John Lam @jflam)

### 2. CAPABILITY ASSESSMENT
**Primary Goal**: An open source toolkit for Spec-Driven Development that flips traditional development by making specifications executable rather than just scaffolding.

**Core Features**:
- Feature 1: **Specify CLI** - Bootstrap projects with templates from GitHub repository
- Feature 2: **Slash Command System** - `/speckit.*` commands for structured development (constitution, specify, plan, tasks, implement)
- Feature 3: **Multi-Agent Support** - Works with 17+ AI coding assistants (Claude Code, Cursor, GitHub Copilot, Gemini CLI, etc.)
- Feature 4: **Development Phases** - Supports 0-to-1 (greenfield), Creative Exploration, and Iterative Enhancement (brownfield)

**Unique Selling Points**:
1. **Official GitHub backing** - Enterprise-grade support and active development
2. **Technology independence** - Validates SDD as a process not tied to specific technologies
3. **Complete workflow coverage** - From constitution/principles through spec, plan, tasks, to implementation
4. **Template system** - Official templates that can be customized for different project needs

**Limitations**:
- **Heavyweight** - More complex setup compared to lighter alternatives
- **Rigid phase gates** - Structured process may feel ceremonial for small projects
- **Python/uv dependency** - Requires Python 3.11+ and uv package manager
- **Lots of Markdown artifacts** - Generates multiple documentation files per feature

### 3. WORKSHOP INTEGRATION POTENTIAL
**Teaching Suitability**:
- Conceptual Complexity: **Intermediate** - Requires understanding of SDD principles
- Hands-on Potential: **High** - Clear workflow with tangible artifacts at each step
- Setup Time: **15-20 minutes** (requires uv, Python, AI agent setup)

**Learning Objectives**:
- [x] Spec-driven development concepts
- [x] Integration with Claude Code
- [x] Git worktrees compatibility (uses feature branches)
- [x] Production workflows

**Recommended Module**: Module 2: Spec-Driven Development Fundamentals (best for demonstrating enterprise-grade SDD with official backing)

### 4. TECHNICAL EVALUATION
**Requirements**:
- Runtime: Python 3.11+, Node.js (for some AI agents)
- Claude Code Version: Any (via slash commands)
- Platform: Windows/Linux/macOS (supports PowerShell scripts for Windows)

**Integration Complexity**: **Medium** - Requires uv tool installation and understanding of multi-step workflow
**Resource Usage**: **Medium** - Generates multiple markdown files and documentation artifacts

### 5. PRACTICAL WORKSHOP SCENARIOS

#### Scenario 1: Build a Task Management App
**Difficulty**: Intermediate
**Time**: 45-60 min
**Steps**:
1. Run `specify init taskify --ai claude` to bootstrap project
2. Use `/speckit.constitution` to establish project principles
3. Use `/speckit.specify` to define requirements (Kanban board, tasks, users)
4. Use `/speckit.plan` to define tech stack (e.g., Vite + vanilla JS)
5. Use `/speckit.tasks` to generate actionable task breakdown
6. Use `/speckit.implement` to execute implementation

#### Scenario 2: Add Feature to Existing Project
**Difficulty**: Intermediate
**Time**: 30-45 min
**Steps**:
1. Navigate to existing project
2. Run `specify init . --ai claude --here --force`
3. Follow workflow for new feature specification and implementation

### 6. COMPARATIVE ANALYSIS
| Tool | Strengths | Weaknesses |
|------|-----------|------------|
| **Spec Kit** | Official GitHub backing, comprehensive workflow, multi-agent support, enterprise-ready | Heavyweight, Python dependency, lots of ceremony for small projects |
| **OpenSpec** | Lightweight, Node.js-only, fluid iteration, simpler artifact structure | Less comprehensive documentation, newer project |
| **BMAD** | 21+ specialized agents, 50+ workflows, scale-adaptive, party mode | Overkill for solo developers, complex enterprise roleplay |
| **GSD** | Extremely lightweight, minimal ceremony, atomic commits, fast execution | Less structured, no formal spec artifacts, more "opinionated" workflow |

### 7. IMPLEMENTATION EXAMPLES
```bash
# Installation
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Initialize new project
specify init my-project --ai claude

# Initialize in current directory
specify init . --ai claude --here

# Check prerequisites
specify check

# Inside Claude Code, available commands:
/speckit.constitution Create principles focused on code quality, testing standards
/speckit.specify Build a photo album organizer with drag-and-drop
/speckit.plan Use Vite with minimal libraries, SQLite for metadata
/speckit.tasks Generate actionable task list
/speckit.implement Execute all tasks and build the feature
/speckit.clarify Clarify underspecified areas
/speckit.analyze Cross-artifact consistency analysis
/speckit.checklist Generate quality checklists
```

### 8. RECOMMENDATION
**Include in Workshop**: **Yes**

**Confidence**: **High**

**Reasoning**: Spec Kit is the most "official" and comprehensive SDD tool with GitHub backing, making it ideal for teaching enterprise-grade spec-driven development. While it has more ceremony than alternatives, this is actually beneficial for a workshop setting as it demonstrates the full SDD lifecycle clearly. The multi-agent support shows interoperability, a key learning objective.

**Workshop Suitability Score**: **9/10**

**One-Sentence Summary**: The most comprehensive, enterprise-ready spec-driven development framework with official GitHub backing, ideal for teaching complete SDD workflows despite its heavier setup requirements.

---

## Tool: OpenSpec

### 1. TOOL OVERVIEW
- **Repository**: https://github.com/Fission-AI/OpenSpec
- **Latest Version**: `@fission-ai/openspec@latest` (npm)
- **License**: MIT
- **Maintainer**: Fission AI (0xTab)

### 2. CAPABILITY ASSESSMENT
**Primary Goal**: A lightweight spec-driven framework that adds a spec layer so humans and AI agree on what to build before code is written.

**Core Features**:
- Feature 1: **Artifact-Guided Workflow** - proposal.md, specs/, design.md, tasks.md structure
- Feature 2: **20+ AI Assistant Support** - Works via slash commands with Claude Code, Cursor, Copilot, etc.
- Feature 3: **Fluid Philosophy** - Iterative not waterfall, easy not complex, brownfield-friendly
- Feature 4: **Dashboard** - Visual dashboard for managing changes and specs

**Unique Selling Points**:
1. **Lightweight** - Simple npm install, minimal dependencies
2. **Fluid iteration** - No rigid phase gates, update any artifact anytime
3. **New workflow** - `/opsx:onboard` for artifact-guided development
4. **Multi-language support** - Works across different programming languages

**Limitations**:
- **Newer project** - Less mature than Spec Kit, smaller community
- **Less comprehensive documentation** - Getting started is good, deep dives limited
- **Simpler structure** - May not cover all edge cases that heavier frameworks handle

### 3. WORKSHOP INTEGRATION POTENTIAL
**Teaching Suitability**:
- Conceptual Complexity: **Beginner to Intermediate** - Easier to grasp than Spec Kit
- Hands-on Potential: **High** - Quick setup, fast feedback loop
- Setup Time: **5-10 minutes** (npm install only)

**Learning Objectives**:
- [x] Spec-driven development concepts
- [x] Integration with Claude Code
- [x] Git worktrees compatibility
- [ ] Production workflows (less mature than Spec Kit)

**Recommended Module**: Module 1: Introduction to Spec-Driven Development (gentle entry point) or Module 2 as lightweight alternative to Spec Kit

### 4. TECHNICAL EVALUATION
**Requirements**:
- Runtime: Node.js 20.19.0+
- Claude Code Version: Any (via slash commands)
- Platform: Windows/Linux/macOS

**Integration Complexity**: **Easy** - Simple npm global install
**Resource Usage**: **Low** - Minimal artifact structure, lightweight overhead

### 5. PRACTICAL WORKSHOP SCENARIOS

#### Scenario 1: Add Dark Mode Feature
**Difficulty**: Beginner
**Time**: 20-30 min
**Steps**:
1. `npm install -g @fission-ai/openspec@latest`
2. `cd your-project && openspec init`
3. `/opsx:new add-dark-mode`
4. `/opsx:ff` - fast-forward to generate all planning docs
5. Review proposal.md, specs/, design.md, tasks.md
6. `/opsx:apply` - implement all tasks
7. `/opsx:archive` - archive completed feature

#### Scenario 2: Brownfield Feature Addition
**Difficulty**: Intermediate
**Time**: 30-40 min
**Steps**:
1. Initialize OpenSpec in existing codebase
2. Use `/opsx:new` for new feature with existing context
3. Demonstrate fluid iteration by updating artifacts mid-flow

### 6. COMPARATIVE ANALYSIS
| Tool | Strengths | Weaknesses |
|------|-----------|------------|
| **OpenSpec** | Lightweight, simple setup, fluid iteration, npm-only | Less mature, smaller community, simpler than enterprise needs |
| **Spec Kit** | Official GitHub, comprehensive, enterprise-ready | Heavyweight, Python/uv dependency, more ceremony |
| **BMAD** | 21+ agents, 50+ workflows, scale-adaptive | Over-engineered for small projects, complex setup |
| **GSD** | Fast, minimal ceremony, atomic commits | Less structured, no formal spec artifacts |

### 7. IMPLEMENTATION EXAMPLES
```bash
# Installation
npm install -g @fission-ai/openspec@latest

# Initialize in project
cd your-project
openspec init

# Inside Claude Code:
/opsx:onboard                    # Get started with new workflow
/opsx:new add-dark-mode           # Create new change
/opsx:ff                          # Fast-forward: generate all planning docs
/opsx:apply                       # Implement all tasks
/opsx:archive                     # Archive completed change

# Creates structure:
# openspec/changes/add-dark-mode/
#   proposal.md    - why we're doing this, what's changing
#   specs/         - requirements and scenarios
#   design.md      - technical approach
#   tasks.md       - implementation checklist
```

### 8. RECOMMENDATION
**Include in Workshop**: **Yes**

**Confidence**: **High**

**Reasoning**: OpenSpec is the most approachable SDD tool for beginners due to its lightweight nature and simple npm-only setup. Its philosophy of "fluid not rigid, iterative not waterfall" aligns well with modern development practices. The new `/opsx:onboard` workflow provides an excellent teaching moment for artifact-driven development.

**Workshop Suitability Score**: **9.5/10**

**One-Sentence Summary**: The most beginner-friendly spec-driven development framework with quick setup, fluid iteration, and a clean artifact structure that makes SDD concepts accessible without overwhelming ceremony.

---

## Tool: BMAD METHOD

### 1. TOOL OVERVIEW
- **Repository**: https://github.com/bmad-code-org/BMAD-METHOD
- **Latest Version**: v6.x (beta as of 2026)
- **License**: MIT
- **Maintainer**: BMad Code, LLC

### 2. CAPABILITY ASSESSMENT
**Primary Goal**: An AI-driven agile development framework with 21 specialized agents, 50+ guided workflows, and scale-adaptive intelligence that adjusts from bug fixes to enterprise systems.

**Core Features**:
- Feature 1: **21+ Specialized Agents** - PM, Architect, Developer, UX, QA, Scrum Master, Analyst, and more
- Feature 2: **50+ Guided Workflows** - Across 4 development phases (analysis, planning, architecture, implementation)
- Feature 3: **Scale-Adaptive Intelligence** - Automatically adjusts planning depth based on project complexity
- Feature 4: **Party Mode** - Bring multiple agent personas into one session for collaborative planning
- Feature 5: **AI Help System** - `/bmad-help` provides contextual guidance throughout development

**Unique Selling Points**:
1. **Complete lifecycle coverage** - From brainstorming to deployment
2. **Modular architecture** - Core BMM framework + optional modules (Builder, Test Architect, Game Dev, Creative Intelligence)
3. **100% free and open source** - No paywalls, no gated content
4. **Enterprise-ready depth** - Risk-based testing, quality gates, NFR assessment via TEA module

**Limitations**:
- **Over-engineered for small projects** - Sprint ceremonies, story points, retrospectives feel like "enterprise theater" for solo developers
- **Complex setup** - Many agents and workflows to understand
- **Steeper learning curve** - Requires understanding of agile practices and agent roles
- **Time investment** - Full workflow can take hours compared to alternatives

### 3. WORKSHOP INTEGRATION POTENTIAL
**Teaching Suitability**:
- Conceptual Complexity: **Advanced** - Requires understanding of agile practices, multi-agent orchestration
- Hands-on Potential: **Medium** - Lots to explore but may overwhelm beginners
- Setup Time: **10-15 minutes** (npx install, but learning curve is significant)

**Learning Objectives**:
- [x] Spec-driven development concepts
- [x] Integration with Claude Code
- [ ] Git worktrees compatibility (not explicitly mentioned)
- [x] Production workflows (enterprise-grade)

**Recommended Module**: Module 4: Advanced Workshop Topics (as an example of comprehensive multi-agent systems) OR Advanced/Masterclass level workshop

### 4. TECHNICAL EVALUATION
**Requirements**:
- Runtime: Node.js v20+
- Claude Code Version: Any (via slash commands)
- Platform: Windows/Linux/macOS

**Integration Complexity**: **Medium to Hard** - Simple install but complex to master
**Resource Usage**: **High** - Multiple agents, workflows, and modules

### 5. PRACTICAL WORKSHOP SCENARIOS

#### Scenario 1: Simple Path (Quick Flow)
**Difficulty**: Intermediate
**Time**: 30-40 min
**Steps**:
1. `npx bmad-method install` (choose BMM module)
2. `/quick-spec` - analyzes codebase, produces tech-spec with stories
3. `/dev-story` - implements each story
4. `/code-review` - validates quality

#### Scenario 2: Full Planning Path (Complete BMad Method)
**Difficulty**: Advanced
**Time**: 2+ hours
**Steps**:
1. `/product-brief` - define problem, users, MVP scope
2. `/create-prd` - full requirements with personas, metrics, risks
3. `/create-architecture` - technical decisions and system design
4. `/create-epics-and-stories` - break work into prioritized stories
5. `/sprint-planning` - initialize sprint tracking
6. Loop: `/create-story` → `/dev-story` → `/code-review`

#### Scenario 3: Party Mode (Multi-Agent Discussion)
**Difficulty**: Advanced
**Time**: 20-30 min
**Steps**:
1. Bring multiple agent personas (PM, Architect, Developer) into session
2. Collaboratively plan or troubleshoot project
3. Demonstrate multi-perspective analysis

### 6. COMPARATIVE ANALYSIS
| Tool | Strengths | Weaknesses |
|------|-----------|------------|
| **BMAD** | Most comprehensive (21+ agents, 50+ workflows), scale-adaptive, modular, enterprise-ready | Overkill for small projects, "enterprise theater," steep learning curve |
| **Spec Kit** | Official GitHub backing, balanced complexity, enterprise-ready | Heavyweight, Python dependency |
| **OpenSpec** | Lightweight, simple, fluid iteration | Less comprehensive than BMAD |
| **GSD** | Fast, minimal ceremony, solo-developer focused | Less structured, no formal agents or workflows |

### 7. IMPLEMENTATION EXAMPLES
```bash
# Installation
npx bmad-method install

# Quick Path (bug fixes, small features)
/quick-spec           # Analyze codebase, produce tech-spec
/dev-story            # Implement each story
/code-review          # Validate quality

# Full Planning Path (products, platforms)
/product-brief        # Define problem, users, MVP
/create-prd           # Full requirements document
/create-architecture  # Technical decisions, system design
/create-epics-and-stories  # Break into prioritized stories
/sprint-planning      # Initialize sprint tracking

# AI Help
/bmad-help            # Contextual guidance on next steps
/bmad-help How should I build a scalable web app?
/bmad-help I just finished architecture, what's next?

# Party Mode
# (Brings multiple agents into collaborative discussion)
```

### 8. RECOMMENDATION
**Include in Workshop**: **Maybe** (Advanced module only)

**Confidence**: **Medium**

**Reasoning**: BMAD is incredibly comprehensive but may be overkill for a general workshop. Its strength is in demonstrating advanced multi-agent orchestration and enterprise-grade workflows, making it suitable for an advanced/masterclass level workshop. For a standard workshop, the complexity and "enterprise theater" elements (sprint ceremonies, story points, Jira workflows) may overwhelm participants who just want to learn SDD fundamentals.

**Workshop Suitability Score**: **6/10** (for general workshop), **9/10** (for advanced enterprise workshop)

**One-Sentence Summary**: The most comprehensive spec-driven development framework with 21+ specialized agents and 50+ workflows, ideal for enterprise scenarios but potentially over-engineered for smaller projects and beginner workshops.

---

## Tool: GSD (Get Shit Done)

### 1. TOOL OVERVIEW
- **Repository**: https://github.com/glittercowboy/get-shit-done
- **Latest Version**: Available via `npx get-shit-done-cc@latest`
- **License**: MIT
- **Maintainer**: TACHES (glittercowboy)

### 2. CAPABILITY ASSESSMENT
**Primary Goal**: A lightweight meta-prompting, context engineering, and spec-driven development system that solves context rot in Claude Code by maintaining clean context windows throughout development.

**Core Features**:
- Feature 1: **Context Engineering** - Maintains clean 200k token contexts per task, no degradation
- Feature 2: **XML Prompt Formatting** - Optimized task structure with embedded verification
- Feature 3: **Multi-Agent Orchestration** - Thin orchestrators spawn specialized agents
- Feature 4: **Atomic Git Commits** - Every task gets its own commit with clean history
- Feature 5: **Modular Workflow** - discuss → plan → execute → verify per phase

**Unique Selling Points**:
1. **Solves context rot** - Quality degradation that happens as Claude fills its context window
2. **Minimal ceremony** - No enterprise roleplay, just effective workflows
3. **Fresh context per plan** - 200k tokens purely for implementation, zero accumulated garbage
4. **Trusted by engineers at Amazon, Google, Shopify, Webflow**
5. **Multi-runtime support** - Claude Code, OpenCode, Gemini CLI

**Limitations**:
- **Less formal structure** - No traditional spec artifacts like proposal.md, design.md
- **More opinionated** - Assumes specific workflow that may not fit all styles
- **Solo-developer focused** - Not designed for team collaboration scenarios
- **Quick mode only** - Lacks the comprehensive planning of Spec Kit/BMAD

### 3. WORKSHOP INTEGRATION POTENTIAL
**Teaching Suitability**:
- Conceptual Complexity: **Beginner to Intermediate** - Easy to understand, harder to master
- Hands-on Potential: **High** - Immediate results, clear workflow
- Setup Time: **2-5 minutes** (npx install, ready to use)

**Learning Objectives**:
- [x] Spec-driven development concepts (context engineering approach)
- [x] Integration with Claude Code
- [x] Git worktrees compatibility (works with any git setup)
- [x] Production workflows (real-world usage)

**Recommended Module**: Module 1: Introduction (for quick wins) OR Module 3: Practical Implementation (for demonstrating context engineering)

### 4. TECHNICAL EVALUATION
**Requirements**:
- Runtime: Node.js (for npx)
- Claude Code Version: Any (via slash commands)
- Platform: Windows/Linux/macOS

**Integration Complexity**: **Easy** - Single npx command, ready to use
**Resource Usage**: **Low to Medium** - Efficient context management, minimal overhead

### 5. PRACTICAL WORKSHOP SCENARIOS

#### Scenario 1: New Project (Full Flow)
**Difficulty**: Beginner
**Time**: 30-45 min
**Steps**:
1. `npx get-shit-done-cc --claude --global`
2. `/gsd:new-project` - Answer questions until requirements understood
3. `/gsd:discuss-phase 1` - Capture implementation decisions
4. `/gsd:plan-phase 1` - Research and create plans
5. `/gsd:execute-phase 1` - Execute all plans in parallel waves
6. `/gsd:verify-work 1` - Manual user acceptance testing

#### Scenario 2: Quick Mode (Bug Fix)
**Difficulty**: Beginner
**Time**: 10-15 min
**Steps**:
1. `/gsd:quick`
2. Describe: "Add dark mode toggle to settings"
3. System generates plan and executes immediately
4. Verify fix works

#### Scenario 3: Brownfield (Existing Codebase)
**Difficulty**: Intermediate
**Time**: 20-30 min
**Steps**:
1. `/gsd:map-codebase` - Spawns parallel agents to analyze existing stack
2. `/gsd:new-project` - Now knows your codebase patterns
3. Continue with standard workflow

### 6. COMPARATIVE ANALYSIS
| Tool | Strengths | Weaknesses |
|------|-----------|------------|
| **GSD** | Fast, minimal ceremony, solves context rot, atomic commits, solo-dev focused | Less formal structure, opinionated workflow, no team features |
| **Spec Kit** | Official backing, comprehensive spec artifacts, enterprise-ready | Heavyweight, more ceremony |
| **OpenSpec** | Lightweight, fluid iteration, clean artifacts | Less comprehensive than GSD for execution |
| **BMAD** | 21+ agents, 50+ workflows, enterprise features | Over-engineered for solo developers |

### 7. IMPLEMENTATION EXAMPLES
```bash
# Installation (interactive)
npx get-shit-done-cc

# Non-interactive installation
npx get-shit-done-cc --claude --global   # Install to ~/.claude/
npx get-shit-done-cc --claude --local    # Install to ./.claude/
npx get-shit-done-cc --all --global      # Install to all runtimes

# Core Workflow
/gsd:new-project              # Full initialization: questions -> research -> requirements -> roadmap
/gsd:discuss-phase [N]        # Capture implementation decisions before planning
/gsd:plan-phase [N]           # Research + plan + verify for a phase
/gsd:execute-phase <N>        # Execute all plans in parallel waves
/gsd:verify-work [N]          # Manual user acceptance testing
/gsd:complete-milestone       # Archive milestone, tag release
/gsd:new-milestone [name]     # Start next version

# Quick Mode (for ad-hoc tasks)
/gsd:quick                    # Execute task with GSD guarantees (atomic commits, state tracking)

# Navigation
/gsd:progress                 # Where am I? What's next?
/gsd:help                     # Show all commands

# Brownfield
/gsd:map-codebase             # Analyze existing codebase before new-project

# XML Plan Format (what GSD generates)
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>
    Use jose for JWT (not jsonwebtoken - CommonJS issues).
    Validate credentials against users table.
    Return httpOnly cookie on success.
  </action>
  <verify>curl -X POST localhost:3000/api/auth/login returns 200 + Set-Cookie</verify>
  <done>Valid credentials return cookie, invalid return 401</done>
</task>
```

### 8. RECOMMENDATION
**Include in Workshop**: **Yes**

**Confidence**: **High**

**Reasoning**: GSD strikes an excellent balance for workshop settings - it's easy to set up, produces immediate results, and teaches important concepts like context engineering and atomic commits. Its focus on solving "context rot" provides a compelling narrative for why spec-driven approaches matter. The minimal ceremony makes it approachable for beginners while still demonstrating advanced concepts.

**Workshop Suitability Score**: **9/10**

**One-Sentence Summary**: The fastest path to productive spec-driven development with minimal setup, solving the critical context rot problem while maintaining clean git history through atomic commits.

---

## Summary Comparison Table

| Tool | Setup Time | Complexity | Best For | Claude Code Integration | Git Worktrees | Workshop Rating |
|------|------------|------------|----------|-------------------------|---------------|-----------------|
| **Spec Kit** | 15-20 min | Intermediate | Enterprise, comprehensive SDD | Native (slash commands) | Yes (feature branches) | 9/10 |
| **OpenSpec** | 5-10 min | Beginner | Lightweight, iterative SDD | Native (slash commands) | Yes | 9.5/10 |
| **BMAD** | 10-15 min | Advanced | Enterprise, multi-agent teams | Native (slash commands) | Not specified | 6/10 (general), 9/10 (advanced) |
| **GSD** | 2-5 min | Beginner-Intermediate | Solo developers, fast execution | Native (slash commands) | Yes | 9/10 |

## Final Recommendation for Workshop Structure

### Module 1: Introduction to Spec-Driven Development
**Primary Tool**: **OpenSpec** (lightweight entry point)
**Secondary Tool**: **GSD** (for quick wins)

### Module 2: Spec-Driven Development Fundamentals
**Primary Tool**: **Spec Kit** (enterprise-grade, official backing)
**Alternative**: OpenSpec for simpler workflows

### Module 3: Practical Implementation
**Primary Tool**: **GSD** (context engineering focus)
**Secondary**: Spec Kit for comprehensive planning

### Module 4: Advanced Workshop Topics (Optional)
**Primary Tool**: **BMAD** (multi-agent orchestration, enterprise workflows)
**Focus**: Advanced scenarios, team collaboration patterns

## Sources

### Spec Kit
- [GitHub Repository - github/spec-kit](https://github.com/github/spec-kit)
- [Diving Into Spec-Driven Development With GitHub Spec Kit - Microsoft Developer Blog](https://developer.microsoft.com/blog/spec-driven-development-spec-kit)
- [Claude Code Spec Workflow - PromptLayer](https://blog.promptlayer.com/claude-code-spec-workflow/)
- [GitHub Spec Kit: A Guide to Spec-Driven AI Development - Intuition Labs](https://intuitionlabs.ai/pdfs/github-spec-kit-a-guide-to-spec-driven-ai-development.pdf)
- [LogRocket Blog - GitHub Spec Kit](https://blog.logrocket.com/github-spec-kit/)
- [Beyond Planning: How GitHub Spec Kit Transforms Ideas - Arinco](https://arinco.com.au/blog/beyond-planning-how-github-spec-kit-transforms-ideas-into-implementation/)
- [The ONLY guide you'll need for GitHub Spec Kit - YouTube](https://www.youtube.com/watch?v=a9eR1xsfvHg)

### OpenSpec
- [GitHub Repository - Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec Official Website](https://openspec.dev/)
- [OpenSpec Deep Dive Guide](https://redreamality.com/garden/notes/openspec-guide/)
- [OpenSpec: A Spec-Driven Workflow for AI Coding Assistants - Medium](https://medium.com/coding-nexus/openspec-a-spec-driven-workflow-for-ai-coding-assistants-no-api-keys-needed-d5b3323294fa)
- [Dev.to Tutorial - How to use OpenSpec](https://dev.to/webdeveloperhyper/how-to-make-ai-follow-your-instructions-more-for-free-openspec-2c85)
- [GitHub Blog - Spec-driven development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- [OpenSpec Installation and Project Initialization Guide - RexAI](https://rexai.top/en/tutorials/openspec-install/)

### BMAD METHOD
- [GitHub Repository - bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)
- [BMAD-METHOD Tutorial Guide](https://bmadmethodguide.com/)
- [Getting Started Tutorial - BMAD v4](https://github.com/bmad-code-org/BMAD-METHOD/blob/main/docs/tutorials/getting-started/getting-started-bmadv4.md)
- [BMad Method: From Zero To Hero - Medium](https://medium.com/@visrow/bmad-method-from-zero-to-hero-1bf5203f2ecd)
- [BMAD-METHOD Guide by Redreamality](https://redreamality.com/garden/notes/bmad-method-guide/)
- [The BMAD Method: A Framework for Spec Oriented AI-Driven Development - GMO](https://recruit.group.gmo/engineer/jisedai/blog/the-bmad-method-a-framework-for-spec-oriented-ai-driven-development/)
- [BMAD vs Spec Kit vs OpenSpec - YouTube](https://www.youtube.com/watch?v=sGYvGUkerA0)

### GSD (Get Shit Done)
- [GitHub Repository - glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done)
- [Beating context rot in Claude Code with GSD - The New Stack](https://thenewstack.io/beating-context-rot-in-claude-code-with-gsd/)
- [I Created GSD For Claude Code. This Is How I Use It - YouTube](https://www.youtube.com/watch?v=5L3dm7KBCmY)
- [Stop Vibe-Coding in Claude Code. Do This Instead - YouTube](https://www.youtube.com/watch?v=AAG97Yatadc)
- [I Tested GSD Claude Code - Medium](https://medium.com/@joe.njenga/i-tested-gsd-claude-code-meta-prompting-that-ships-faster-no-agile-bs-ca62aff18c04)
- [Reddit Discussion - GSD Usage](https://www.reddit.com/r/ClaudeCode/comments/1qh24np/gsd_get_shit_done_usage/)

### General Comparisons
- [BMAD vs OpenSpec vs Spec Kit - Nosam](https://www.nosam.com/spec-driven-development-openspec-vs-spec-kit-vs-bmad-which-ones-actually-worth-your-time/)
- [BMAD vs spec-kit vs OpenSpec vs PromptX - Redreamality](https://redreamality.com/blog/-sddbmad-vs-spec-kit-vs-openspec-vs-promptx/)
- [Goodbye Vibe Coding: Spec-Driven Development Framework Guide - Pasquale Pillitteri](https://pasqualepillitteri.it/en/news/158/framework-ai-spec-driven-development-guide-bmad-gsd-ralph-loop)
- [Spec-driven development: Unpacking one of 2025's key engineering practices - ThoughtWorks](https://www.thoughtworks.com/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)
- [Beyond Vibe-Coding: A Practical Guide to Spec-Driven Development - Scalable Path](https://www.scalablepath.com/machine-learning/spec-driven-development-guide)
