# Claude Code Sub-agents Cheat Sheet

## Quick Reference

### What are Sub-agents?
Specialized AI assistants with focused expertise, isolated contexts, and custom tool access. They live in `.claude/agents/` and are launched via the Task tool.

### Basic Structure
```yaml
---
name: agent-name
description: "Clear description of agent's purpose and capabilities"
tools: Tool1, Tool2, Tool3
---

# System prompt with detailed instructions
You are a specialist agent...
```

## Launching Sub-agents

### Task Tool Parameters
```python
Task(
    description="Brief task description (3-5 words)",
    prompt="Detailed instructions for the agent",
    subagent_type="agent-name-from-yaml"
)
```

### Real Examples
```python
# Validation after code changes
Task(
    description="Validate authentication system",
    prompt="I just implemented JWT authentication with login/logout endpoints. Please test all functionality and validate security measures.",
    subagent_type="validation-gates"
)

# Documentation updates
Task(
    description="Update API documentation",
    prompt="I just added REST API endpoints for user management. Please update the API documentation and README.",
    subagent_type="documentation-manager"
)
```

## Available Tools

| Tool | Purpose | Common Use Cases |
|------|---------|------------------|
| `Read` | Read file contents | Code review, analysis |
| `Write` | Create new files | Documentation, test generation |
| `Edit` | Modify existing files | Code fixes, updates |
| `MultiEdit` | Multiple edits to one file | Batch changes, refactoring |
| `Grep` | Search with ripgrep | Code search, pattern matching |
| `Glob` | Find files by pattern | File discovery, bulk operations |
| `Bash` | Execute shell commands | Testing, builds, validation |
| `TodoWrite` | Manage task lists | Project tracking, progress |
| `Task` | Launch other agents | Multi-agent workflows |
| `WebSearch` | Search the web | Research, best practices |
| `WebFetch` | Fetch web content | Documentation, examples |

## Agent Configuration Templates

### Code Review Agent
```yaml
---
name: code-reviewer
description: "Code quality specialist that reviews code for bugs, security issues, and best practices"
tools: Read, Grep, Glob, Edit, MultiEdit
---
```

### Security Auditor
```yaml
---
name: security-auditor
description: "Security specialist focused on defensive security analysis and vulnerability detection"
tools: Read, Edit, MultiEdit, Grep, Glob, Bash, WebSearch, TodoWrite
---
```

### Performance Analyzer
```yaml
---
name: performance-analyzer
description: "Performance optimization specialist for identifying and resolving bottlenecks"
tools: Read, Edit, MultiEdit, Grep, Glob, Bash, WebSearch, TodoWrite
---
```

### Documentation Manager
```yaml
---
name: documentation-manager
description: "Documentation specialist that updates docs when code changes"
tools: Read, Write, Edit, MultiEdit, Grep, Glob, ls
---
```

### Validation Gates
```yaml
---
name: validation-gates
description: "Testing specialist that runs tests and validates code changes"
tools: Bash, Read, Edit, MultiEdit, Grep, Glob, TodoWrite
---
```

## System Prompt Structure

### Effective Prompt Template
```markdown
You are a [specialist role] with expertise in [domain areas].

## Core Responsibilities
- [Primary responsibility 1]
- [Primary responsibility 2]
- [Primary responsibility 3]

## Process
1. [Step 1 with specific actions]
2. [Step 2 with criteria]
3. [Step 3 with quality checks]

## Output Standards
- [Expected output format 1]
- [Expected output format 2]
- [Quality criteria]

## Guidelines
- [Important rule 1]
- [Important rule 2]
- [Constraint or limitation]
```

## Common Workflows

### 1. Post-Development Validation
```python
# After implementing a feature
Task(
    description="Validate new feature",
    prompt="Test and validate the [feature name] I just implemented. Check functionality, security, performance, and integration.",
    subagent_type="validation-gates"
)
```

### 2. Multi-Agent Coordination
```python
# Orchestrator coordinating multiple agents
Task(
    description="Comprehensive system review",
    prompt="Coordinate security-auditor, performance-analyzer, and code-reviewer agents for a complete system analysis.",
    subagent_type="development-orchestrator"
)
```

### 3. Documentation Updates
```python
# After code changes
Task(
    description="Update documentation",
    prompt="The files [file list] were changed. Update all relevant documentation including README, API docs, and guides.",
    subagent_type="documentation-manager"
)
```

## Integration Patterns

### With Hooks
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/trigger-validation.sh"
          }
        ]
      }
    ]
  }
}
```

### With Slash Commands
```markdown
# Command: /validate-feature

## Feature: $ARGUMENTS

Launch validation-gates agent to test specified feature.

# Usage:
/validate-feature "user authentication"
/validate-feature "payment processing"
```

## Best Practices

### Agent Design
- ✅ Single responsibility per agent
- ✅ Clear, focused expertise
- ✅ Appropriate tool permissions
- ✅ Comprehensive system prompts
- ✅ Output quality standards

### Context Management
- ✅ Provide focused, relevant context
- ✅ Include specific files and requirements
- ✅ Use efficient search patterns (Grep over Read)
- ✅ Monitor context window usage

### Performance Optimization
- ✅ Batch operations with MultiEdit
- ✅ Use Grep for targeted searches
- ✅ Limit context to relevant information
- ✅ Cache results when appropriate

## Error Handling

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Agent not found | Verify `name` in YAML matches `subagent_type` |
| Tool permissions missing | Add required tools to YAML config |
| Poor output quality | Refine system prompt with specific instructions |
| Performance issues | Optimize context, provide focused tasks |

## Agent Launch Patterns

### Sequential Processing
```python
# Agents run in specific order
Task(
    description="Complete development workflow",
    prompt="Run code review first, then security audit, then performance analysis",
    subagent_type="orchestrator"
)
```

### Parallel Processing
```python
# Agents run simultaneously
Task(
    description="Parallel analysis",
    prompt="Run security audit and performance analysis in parallel",
    subagent_type="parallel-processor"
)
```

### Iterative Refinement
```python
# Agents improve results iteratively
Task(
    description="Iterative optimization",
    prompt="Analyze performance, implement fixes, and validate improvements in cycles",
    subagent_type="iterative-optimizer"
)
```

## Directory Structure

```
.claude/
├── agents/
│   ├── validation-gates.md
│   ├── documentation-manager.md
│   ├── security-auditor.md
│   └── code-reviewer.md
├── commands/
│   ├── validate-feature.md
│   └── update-docs.md
├── hooks/
│   └── agent-trigger.sh
└── settings.json
```

## Quick Start Guide

### 1. Create Your First Agent
```bash
mkdir -p .claude/agents
```

### 2. Create Agent File
```yaml
# .claude/agents/my-agent.md
---
name: my-agent
description: "My specialized agent"
tools: Read, Write, Edit
---

You are a specialist agent...
```

### 3. Launch Your Agent
```python
Task(
    description="Test my agent",
    prompt="Please help me with [specific task]",
    subagent_type="my-agent"
)
```

## Advanced Tips

### 1. Agent Composition
Combine multiple agents for comprehensive workflows:
```python
Task(
    description="Full system analysis",
    prompt="Coordinate validation, security, and performance agents",
    subagent_type="system-analyzer"
)
```

### 2. Context Optimization
Provide focused context for better results:
```python
Task(
    description="Specific task",
    prompt="Focus on [specific aspect] in [specific file]",
    subagent_type="specialist"
)
```

### 3. Error Recovery
Build resilient agents with fallback strategies:
```markdown
## Error Handling
When encountering errors:
1. Identify the error type
2. Attempt resolution
3. Document the issue
4. Escalate if necessary
```

## Resources

### Official Documentation
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Context Engineering Repository](https://github.com/coleam00/context-engineering-intro)

### Community Examples
- [Agent Templates](https://github.com/topics/claude-code-agents)
- [Workflow Patterns](https://github.com/topics/claude-code-workflows)

---

**Remember**: Great agents solve real problems. Start with specific pain points and build agents to address them systematically.