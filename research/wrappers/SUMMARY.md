# Claude Code Wrapper & Orchestration Tools - Research Summary

**Date**: 2026-02-01
**Research Focus**: Multi-agent orchestration and wrapper tools for Claude Code
**Researcher**: Claude Code Research Agent

---

## Executive Summary

This document summarizes research on Claude Code wrapper projects, orchestration tools, MCP servers, and the skills ecosystem. The research identifies tools suitable for workshop inclusion based on teaching value, hands-on potential, and production relevance.

---

## Ecosystem Overview

### Tool Categories

| Category | Purpose | Key Tools |
|----------|---------|-----------|
| **Protocol** | Standardized integration | MCP (Model Context Protocol) |
| **Orchestration** | Multi-agent coordination | ccswarm, claude-flow, myclaude |
| **Skills Ecosystem** | Extension distribution | daymade-skills, cc-skills, CCPM |
| **Specialized** | Purpose-built tools | Agentrooms, Claude Orchestrator |

### Market Landscape

```
                    Complexity
                           ^
                           |
                    claude-flow (Enterprise)
                           |
        myclaude ----------+----------- ccswarm
        (Multi-backend)    |           (Git worktrees)
                           |
                 Skills/MCP -------------- Native Claude Code
                 (Easy extensions)         (Simple baseline)
                           |
                           +------------------->
                                            Accessibility
```

---

## Tools Summary

### 1. MCP Servers (Model Context Protocol)

**Rating**: 9/10 for workshop inclusion

**Key Points**:
- Official Anthropic protocol for extending Claude Code
- Standardized way to add tools, resources, and prompts
- Growing ecosystem of community and official servers
- TypeScript and Python SDKs available

**Workshop Fit**:
- Essential for advanced users
- 45-60 minute module recommended
- Requires Claude Code 2.0+

**Best For**: External API integrations, database access, custom tools

---

### 2. ccswarm

**Rating**: 9/10 for workshop inclusion

**Key Points**:
- Rust-native multi-agent orchestration
- First-class Git worktree support
- Claude ACP integration (Agent Client Protocol)
- MIT licensed
- Comprehensive: security, observability, workflows, quality gates

**Workshop Fit**:
- Best for teaching parallel development
- 75 minute module recommended
- Pre-compiled binaries needed for workshops

**Best For**: Parallel development, Git worktrees, team coordination

---

### 3. Claude Flow

**Rating**: 7/10 (demonstration only)

**Key Points**:
- 60+ agents, 170+ MCP tools
- SONA self-learning system
- RuVector database integration
- 84.8% SWE-Bench score
- Enterprise-focused

**Workshop Fit**:
- Demonstration only (too complex for hands-on)
- 90 minute demo recommended
- Requires significant infrastructure

**Best For**: Demonstrating cutting-edge multi-agent capabilities

---

### 4. myclaude

**Rating**: 6/10 for workshop inclusion

**Key Points**:
- Multi-backend support (Claude, Codex, Gemini, OpenCode)
- Multiple modules: do, omo, bmad, sparv
- AGPL licensed (commercial available)
- 90% test coverage claimed

**Workshop Fit**:
- Advanced demonstration recommended
- AGPL license complicates workshop use
- Complex installation

**Best For**: Multi-backend workflows, enterprise teams

---

### 5. Skills & Marketplaces

**Rating**: 10/10 for workshop inclusion

**Key Points**:
- **daymade/claude-code-skills**: 34+ production-ready skills
- **terrylica/cc-skills**: 18+ ADR-focused plugins
- **skill-creator**: Meta-skill for building skills
- **CCPM**: Skills registry and search

**Workshop Fit**:
- Essential for all users
- 45-60 minute module recommended
- Easy to teach and learn

**Best For**: Customizing Claude Code, team workflows

---

## Recommended Workshop Curriculum

### Module Sequence

```
Module 1: Claude Code Fundamentals
  ↓
Module 2: Skills & Marketplaces [ESSENTIAL]
  - Add marketplaces
  - Install community skills
  - Create custom skills
  - Progressive disclosure patterns
  ↓
Module 3: MCP Integration [ESSENTIAL]
  - Understand MCP protocol
  - Install and configure MCP servers
  - Build custom MCP server
  - External API integration
  ↓
Module 4: Native Subagents
  - Create custom subagents
  - Task delegation patterns
  - Specialized agent roles
  ↓
Module 5: Parallel Development with ccswarm [ADVANCED]
  - Git worktree fundamentals
  - Multi-agent coordination
  - ProactiveMaster orchestration
  - Quality gates
  ↓
Module 6: Enterprise Orchestration [DEMO]
  - claude-flow demonstration
  - Self-learning agents
  - Hive-mind patterns
  - Production considerations
```

### Time Allocation

| Module | Duration | Hands-on | Difficulty |
|--------|----------|-----------|------------|
| Skills & Marketplaces | 45-60 min | 80% | Beginner |
| MCP Integration | 45-60 min | 70% | Intermediate |
| Native Subagents | 30-45 min | 60% | Intermediate |
| ccswarm | 75 min | 70% | Advanced |
| Enterprise Demo | 60-90 min | 10% | Advanced |

---

## Integration Patterns

### Pattern 1: Skill + MCP Combination

```bash
# Install skill that uses MCP server
claude plugin install github-ops@daymade-skills

# Configure GitHub MCP server
# ~/.claude/settings.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}
```

### Pattern 2: Multi-Agent with ccswarm

```bash
# Initialize project with specialized agents
ccswarm init --agents frontend,backend,qa

# Create Git worktrees for parallel work
git worktree add ../feature-a frontend
git worktree add ../feature-b backend

# Delegate tasks to worktree-specific agents
ccswarm delegate task "Build login form" --agent frontend --worktree ../feature-a
```

### Pattern 3: Subagent + Skill Delegation

```markdown
---
name: research-task
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly using:
- Glob and Grep for file discovery
- Read for code analysis
- Summarize findings

References: [references/methodology.md](references/methodology.md)
```

---

## Tool Selection Guide

### For Workshops

| Audience Level | Recommended Tools | Rationale |
|----------------|-------------------|-----------|
| Beginner | Skills, MCP | Easy to learn, high impact |
| Intermediate | Skills, MCP, Subagents | Build on fundamentals |
| Advanced | ccswarm, Custom MCP | Production patterns |
| Enterprise | claude-flow (demo) | Cutting-edge capabilities |

### For Production Use

| Use Case | Recommended Tool | Alternative |
|----------|------------------|-------------|
| Custom Tools | MCP Server | Custom Skill |
| Team Workflows | Skills Marketplace | Shared Git repo |
| Parallel Dev | ccswarm | Manual worktrees |
| Multi-backend | myclaude | Separate instances |
| Self-Learning | claude-flow | Custom RAG |

---

## Key Findings

### Positive Trends
1. **Rapid Ecosystem Growth**: New tools and servers released weekly
2. **Standardization**: MCP emerging as de facto standard
3. **Community Innovation**: Diverse solutions from community
4. **Production Readiness**: Many tools ready for enterprise use

### Concerns
1. **Complexity Explosion**: Tools becoming increasingly complex
2. **Documentation Gaps**: Some tools lack comprehensive docs
3. **License Diversity**: AGPL, MIT, proprietary - varies by tool
4. **Maintenance Burden**: Some projects appear unmaintained

### Recommendations
1. **Start Simple**: Teach native features first, then extensions
2. **Focus on Standards**: Emphasize MCP and SKILL.md formats
3. **Provide Binaries**: Pre-compile tools like ccswarm for workshops
4. **Document Patterns**: Teach integration patterns, not just tools
5. **Community First**: Leverage existing marketplaces before building custom

---

## Quick Reference

### Essential Commands

```bash
# Skills
claude plugin marketplace add <repo>
claude plugin install <skill>@<marketplace>
claude plugin list

# MCP (manual config)
# Edit ~/.claude/settings.json
{
  "mcpServers": {
    "server-name": {
      "command": "command",
      "args": ["arg1", "arg2"],
      "env": {"KEY": "value"}
    }
  }
}

# ccswarm
ccswarm init --name "Project" --agents frontend,backend
ccswarm start
ccswarm tui
```

### Resource Links

- **Official Docs**: https://code.claude.com/docs
- **MCP Protocol**: https://modelcontextprotocol.io
- **daymade-skills**: https://github.com/daymade/claude-code-skills
- **cc-skills**: https://github.com/terrylica/cc-skills
- **ccswarm**: https://github.com/nwiizo/ccswarm
- **claude-flow**: https://github.com/ruvnet/claude-flow
- **myclaude**: https://github.com/cexll/myclaude
- **CCPM Registry**: https://skillsmp.com

---

## Conclusion

The Claude Code wrapper and orchestration ecosystem is vibrant and growing rapidly. For workshop purposes, we recommend:

1. **Essential**: Skills & Marketplaces (Module 2)
2. **Essential**: MCP Integration (Module 3)
3. **Advanced**: ccswarm for parallel development (Module 5)
4. **Demonstration**: claude-flow for enterprise capabilities (Module 6)

These tools provide a complete progression from beginner-friendly extensions to production-grade orchestration systems.

---

**Research Completed**: 2026-02-01
**Next Review**: 2026-03-01 (ecosystem evolves rapidly)
