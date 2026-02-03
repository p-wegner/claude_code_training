# Skills & Subagents Research

## Agent Research Template

**Agent Name**: Research Agent
**Research Focus**: Claude Code Skills and Subagents
**Date**: 2026-02-01
**Researcher**: Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: Skills and Subagents
- **Repository/URL**: https://code.claude.com/docs/en/skills
- **Latest Version**: Part of Claude Code core (continuously evolving)
- **Last Updated**: Ongoing (latest docs accessed Feb 2026)
- **License**: Part of Claude Code
- **Maintainer**: Anthropic

### Tool Purpose
- **Primary Goal**: Extend Claude's capabilities with custom instructions (skills) and delegate specialized tasks to isolated agents (subagents)
- **Target Users**: Developers wanting to customize Claude's behavior, teams building AI-powered workflows
- **Core Problem Solved**: Standardize prompt patterns, create reusable behaviors, and isolate complex tasks to specialized contexts

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| SKILL.md Files | Markdown-based instruction files | High | 5 |
| Custom Slash Commands | Create /command invocations | High | 5 |
| Frontmatter Configuration | YAML-based skill behavior control | High | 5 |
| Invocation Control | Control who can invoke skills | Medium | 4 |
| Tool Restrictions | Limit tools available to skills | Medium | 4 |
| Dynamic Context Injection | `!command` syntax for runtime data | High | 5 |
| Subagent Forking | Run skills in isolated contexts | High | 5 |
| Visual Output Generation | Skills can generate HTML/visualizations | Medium | 4 |

### Unique Selling Points
1. **Open Standard**: Skills follow the Agent Skills open standard across AI tools
2. **Multi-Location Discovery**: Personal, project, plugin, and enterprise scopes
3. **File Bundling**: Include supporting files, scripts, examples with skills
4. **Agent Integration**: Skills can run in specific agent contexts (Explore, Plan, etc.)
5. **Argument Passing**: Full argument support with flexible substitution

### Limitations
- **Context Budget**: Skill descriptions consume context (15,000 char default)
- **No Direct Tool Calls**: Skills can't trigger slash commands directly
- **Script Dependencies**: Bundled scripts require proper setup
- **Limited Inter-Skill Communication**: Skills can't easily call other skills

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Intermediate to Advanced
- **Hands-on Potential**: Very High
- **Demo-readiness**: Yes
- **Setup Time**: 10 minutes (for basic skills)

### Learning Objectives Addressed
- [x] **Spec-driven Development**: Skills embody specifications for behaviors
- [x] **Multiagent Orchestration**: Subagents enable specialized task delegation
- [x] **Production Workflows**: Skills automate repetitive tasks
- [ ] **Git Worktrees Integration**: Not directly related

### Recommended Workshop Module
- **Module Placement**: "Module 5 - Skills & Custom Behaviors" and "Module 6 - Subagents & Task Delegation"
- **Duration**: 120 minutes (combined)
- **Prerequisites**:
  - Basic Claude Code familiarity
  - Understanding of markdown and YAML
  - Command line basics

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: None (skills are text files)
- **Dependencies**: Claude Code CLI
- **Claude Code Version Required**: Latest (for full skill features)
- **Platform Support**: Windows, Linux, macOS (cross-platform paths)

### Integration Complexity
- **Installation Difficulty**: Very Easy (create files)
- **Configuration Required**: Minimal for basic, Moderate for advanced
- **Compatibility Issues**: Path handling differences across platforms

### Performance Characteristics
- **Resource Usage**: Very Low (text files)
- **Execution Speed**: Instant (inline), Medium (subagent forking)
- **Scalability**: Excellent (designed for hundreds of skills)

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Create a Code Review Skill
**Difficulty**: Intermediate
**Time**: 30 minutes
**Description**: Build a skill that reviews code against team standards
**Learning Outcomes**:
- [x] Create SKILL.md with frontmatter
- [x] Define invocation rules
- [x] Include supporting files with examples
- [x] Test skill invocation

### Scenario 2: Build a Research Subagent
**Difficulty**: Advanced
**Time**: 45 minutes
**Description**: Create a skill that forks to an Explore agent for deep codebase research
**Learning Outcomes**:
- [x] Use `context: fork` frontmatter
- [x] Select appropriate agent type
- [x] Handle dynamic context injection
- [x] Process subagent results

### Scenario 3: Visual Codebase Explorer
**Difficulty**: Advanced
**Time**: 60 minutes
**Description**: Build a skill that generates interactive HTML visualizations
**Learning Outcomes**:
- [x] Bundle scripts with skills
- [x] Use `allowed-tools` for security
- [x] Generate visual output
- [x] Handle cross-platform script execution

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs Skills | Weaknesses vs Skills |
|------|---------------------|---------------------|
| Custom Plugins | More code, complex logic | Require more setup, not portable |
| CLAUDE.md | Good for project context | No invocation control, always loaded |
| Hooks | Event-driven automation | Not for extending capabilities |
| Prompt Templates | Simpler | No frontmatter, no tool control |

### Recommendation Score
- **For Beginners**: 7/10 - Concepts easy, advanced patterns take time
- **For Intermediate**: 9/10 - Very practical for daily workflows
- **For Advanced**: 10/10 - Extensible and powerful for complex scenarios

---

## 7. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Skill
```markdown
---
name: explain-code
description: Explains code with visual diagrams and analogies
---

When explaining code, always include:
1. **Start with an analogy**: Compare to everyday life
2. **Draw a diagram**: Use ASCII art for flow/structure
3. **Walk through the code**: Step-by-step explanation
4. **Highlight a gotcha**: Common mistakes

Keep explanations conversational.
```

### Code Example 2: Task Skill with Arguments
```markdown
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
argument-hint: [issue-number]
---

Fix GitHub issue $ARGUMENTS following our coding standards:

1. Read the issue description
2. Understand the requirements
3. Implement the fix
4. Write tests
5. Create a commit
```

### Code Example 3: Subagent Research Skill
```markdown
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

Research $ARGUMENTS thoroughly:

1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

### Code Example 4: Dynamic Context with PR Summary
```markdown
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request focusing on:
- Main changes
- Files affected
- Potential issues
- Testing recommendations
```

---

## 8. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: Create Your First Skill
**Objective**: Build and test a simple skill
**Steps**:
1. Create `~/.claude/skills/echo/SKILL.md`
2. Add frontmatter with name and description
3. Add instructions to repeat back what user says
4. Test with `/echo hello world`
**Expected Output**: Skill echoes "hello world" with formatting

### Exercise 2: Build a Deployment Skill
**Objective**: Create a task-oriented skill with argument handling
**Steps**:
1. Create skill for deployment
2. Add `disable-model-invocation: true`
3. Include multi-step deployment process
4. Test with arguments for different environments
**Expected Output**: Skill runs deployment steps when invoked

### Exercise 3: Forked Subagent for Code Analysis
**Objective**: Use subagent for isolated analysis
**Steps**:
1. Create skill with `context: fork` and `agent: Explore`
2. Add task instructions for security review
3. Invoke on specific code paths
4. Review isolated results
**Expected Output**: Subagent performs read-only security analysis

---

## 9. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Yes, absolutely
- **Confidence Level**: Very High
- **Reasoning**: Skills and subagents are core Claude Code features, enable powerful customization, and have excellent real-world applications. They're essential for advanced usage.

### Suggested Implementation Approach
1. **Phase 1**: Basic skills - creation, frontmatter, invocation (30 min)
2. **Phase 2**: Advanced skill features - arguments, tools, supporting files (45 min)
3. **Phase 3**: Subagents - forking, agent types, isolation (45 min)

### Alternative Tools
- **If not skills, consider**: CLAUDE.md for static context, plugins for code extensions
- **Reason**: Skills are the right tool for 90% of customization needs

---

## 10. RESEARCH METADATA

### Sources Consulted
- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [The Essential Guide to Claude Code Skills - Egghead.io](https://egghead.io/courses/the-essential-guide-to-claude-code-skills~7349k)
- [Claude and Claude Code for Builders - James Gray (Maven)](https://maven.com/james-gray/claude)
- [Subagents, MCP, Hooks & AI Workflows - Udemy](https://www.udemy.com/course/claude-code-generative-ai-assisted-development/)
- [awesome-claude-skills - GitHub](https://github.com/VoltAgent/awesome-claude-skills)
- [Learning Claude Code — From Context Engineering to Multi-Agent Workflows - Medium](https://medium.com/data-science-collective/learning-claude-code-from-context-engineering-to-multi-agent-workflows-4825e216403f)

### Research Notes
- **Gaps Identified**: Limited information on enterprise skill distribution patterns
- **Needs Verification**: Performance characteristics with hundreds of skills
- **Community Sentiment**: Very positive, seen as essential for power users

### Contact Points
- **Documentation**: https://code.claude.com/docs/en/skills
- **Community**: Anthropic Discord, GitHub Discussions, Reddit r/ClaudeAI
- **Issues**: https://github.com/anthropics/claude-code/issues

---

## FINAL VERDICT

### Workshop Suitability Score: 10/10

**Breakdown**:
- Teaching Value: 10/10
- Hands-on Potential: 10/10
- Integration Ease: 9/10
- Production Relevance: 10/10
- Documentation Quality: 9/10

### One-Sentence Summary
Skills and subagents are essential Claude Code features that enable powerful customization and task delegation, making them must-have content for any advanced workshop.

### Tags for Categorization
`[multiagent]` `[orchestration]` `[production-ready]` `[intermediate]` `[advanced]` `[spec-driven]`
