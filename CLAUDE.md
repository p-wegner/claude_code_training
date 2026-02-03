# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains **Claude Code Workshop Materials** for teaching developers agentic coding concepts. There are two main workshop tracks:

1. **One-Day Practical Workshop** (README.md) - Introductory workshop covering slash commands, sub-agents, hooks, and automation
2. **Advanced Agentic Coding Workshop** (materials/README.md) - 2-day advanced workshop on MCP, Skills, multiagent orchestration, GSD, and git worktrees

## Repository Structure

```
claude_code_training/
├── materials/          # Advanced workshop materials (2-day)
│   └── README.md       # Complete advanced workshop overview
├── research/           # 80 research documents across 11 categories
│   └── MASTER_SUMMARY.md # Research synthesis (150+ sources)
├── TODO.md            # Workshop development status
└── README.md          # One-day introductory workshop
```

## Key Commands

### Development
No build commands - this is a documentation repository. Content is in Markdown format.

### Git Operations
```bash
git status             # Check modified/untracked files
git add <files>        # Stage changes
git commit             # Create commits
```

## Content Architecture

### Workshop Progression
The materials follow a **progressive complexity model**:
1. **Direct Commands** → Simple, one-off tasks
2. **Output Formats** → Consistent formatting for teams
3. **Slash Commands** → Reusable workflow patterns
4. **Sub-agents** → Complex, specialized problem-solving
5. **Hooks** → Full automation and CI/CD integration

### Advanced Workshop (materials/) - 8 Modules
- **Module 1-2**: Skills & MCP (Essential - 10/10 importance)
- **Module 3**: Spec-Driven Development with GSD (Core - 9/10)
- **Module 4**: Multiagent Fundamentals with CrewAI (Core - 9/10)
- **Module 5**: Git Worktrees + Claude Squad (CROWN JEWEL - 9/10)
- **Module 6**: Hooks & Automation (Core - 9/10)
- **Module 7**: Platform Comparison (Context)
- **Module 8**: Enterprise Patterns (Production)

### Research Basis (research/)
The curriculum is based on comprehensive research:
- **80 documents** across 11 categories
- **50+ tools** analyzed and scored
- **150+ sources** (GitHub repos, academic papers, case studies)
- **Critical findings**: 8-13% realistic productivity gains (not marketing claims)

## Important Conventions

### Content Creation
- Use Markdown for all documentation
- Maintain the progressive learning flow
- Include hands-on exercises with solutions
- Provide timing estimates for each module
- Reference research sources when making claims

### Workshop Design Principles
- **Progressive complexity**: Start simple, add complexity only when needed
- **Trade-off awareness**: Teach participants when to use each approach
- **Production reality**: Use real-world scenarios, not toy examples
- **Context engineering**: How to structure requests for optimal results

### Key Learning Focus Areas
1. **Skills Development**: Marketplace integration, custom skill creation
2. **MCP Integration**: External tool integration, custom servers
3. **Spec-Driven Development**: GSD workflow, atomic commits, verification
4. **Multiagent Orchestration**: CrewAI, Claude Squad, coordination patterns
5. **Git Worktrees**: Parallel AI development (60%+ time savings)
6. **Automation**: Hooks, AutoClaude, validation pipelines

## When Working with This Repository

- This is a **workshop materials repository**, not a code project
- Focus is on **documentation quality** and **educational progression**
- Research documents in `research/` provide source material for curriculum
- Workshop content should be grounded in the research findings
- Maintain consistency between one-day and advanced workshop materials

## File Editing Guidelines

- When updating workshop materials, preserve the progressive structure
- Add timing estimates and prerequisites for new modules
- Reference specific research documents when introducing new tools
- Maintain the trade-off comparison format across modules
