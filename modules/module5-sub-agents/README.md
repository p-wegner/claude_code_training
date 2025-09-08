# Module 5: Specialized Sub-agents - Practical Implementation Guide

## Learning Objectives
- Master Claude Code sub-agent architecture with real-world examples
- Create specialized sub-agents using YAML frontmatter configuration
- Implement context isolation and communication patterns
- Build validation, documentation, and security sub-agents
- Integrate sub-agents with hooks and slash commands
- Debug and optimize sub-agent performance

## What Are Claude Code Sub-agents?

Sub-agents are **specialized AI assistants** with focused expertise, isolated contexts, and custom tool access. They live in `.claude/agents/` and can be launched with the Task tool.

### Key Characteristics
- **Specialized Expertise**: Each agent has deep knowledge in a specific domain
- **Context Isolation**: Agents have separate context windows for focused processing
- **Custom Tools**: Agents can be configured with specific tool permissions
- **YAML Configuration**: Simple frontmatter defines agent capabilities
- **Launchable**: Can be launched programmatically via the Task tool

### Real Sub-agent Examples

From the context-engineering repository, we have two working sub-agents:

1. **Documentation Manager**: Proactively updates documentation when code changes
2. **Validation Gates**: Comprehensive testing and quality assurance specialist

## Sub-agent Configuration and Structure

### Real Sub-agent File Format
Sub-agents use YAML frontmatter for configuration:

```yaml
---
name: validation-gates
description: "Testing and validation specialist. Proactively runs tests, validates code changes, ensures quality gates are met, and iterates on fixes until all tests pass. Call this agent after you implement features and need to validate that they were implemented correctly. Be very specific with the features that were implemented and a general idea of what needs to be tested."
tools: Bash, Read, Edit, MultiEdit, Grep, Glob, TodoWrite
---
```

### Configuration Breakdown

**YAML Frontmatter Fields:**
- `name`: Unique identifier for the agent (used for launching)
- `description`: Clear purpose and usage guidelines
- `tools`: Comma-separated list of available tools

**Available Tools:**
- `Bash`: Execute shell commands
- `Read`: Read file contents
- `Write`: Create new files
- `Edit`: Modify existing files
- `MultiEdit`: Make multiple edits to one file
- `Grep`: Search code with ripgrep
- `Glob`: Find files by pattern
- `TodoWrite`: Manage task lists
- `Task`: Launch other sub-agents
- `WebFetch`: Fetch web content
- `WebSearch`: Search the web

### Directory Structure
```
.claude/
├── agents/
│   ├── validation-gates.md
│   ├── documentation-manager.md
│   ├── security-auditor.md
│   └── code-reviewer.md
├── commands/
├── hooks/
└── settings.json
```

## Real Sub-agent Examples

### 1. Validation Gates Agent (Complete Example)

**File: `.claude/agents/validation-gates.md`**
```yaml
---
name: validation-gates
description: "Testing and validation specialist. Proactively runs tests, validates code changes, ensures quality gates are met, and iterates on fixes until all tests pass. Call this agent after you implement features and need to validate that they were implemented correctly. Be very specific with the features that were implemented and a general idea of what needs to be tested."
tools: Bash, Read, Edit, MultiEdit, Grep, Glob, TodoWrite
---
```

**Agent Capabilities:**
- Run automated testing (unit, integration, e2e)
- Execute linting and formatting checks
- Perform type checking and security scanning
- Validate build processes
- Iterate on fixes until all tests pass
- Maintain quality gates and standards

**Usage Pattern:**
```bash
# Launch after implementing features
Task(
    description="Validate new authentication system",
    prompt="I just implemented a JWT-based authentication system with login, logout, and token refresh endpoints. Please run comprehensive tests and validate that everything works correctly.",
    subagent_type="validation-gates"
)
```

### 2. Documentation Manager Agent (Complete Example)

**File: `.claude/agents/documentation-manager.md`**
```yaml
---
name: documentation-manager
description: "Expert documentation specialist. Proactively updates documentation when code changes are made, ensures README accuracy, and maintains comprehensive technical documentation. Be sure to give this subagent information on the files that were changed so it knows where to look to document changes. Always call this agent after there are code changes."
tools: Read, Write, Edit, MultiEdit, Grep, Glob, ls
---
```

**Agent Capabilities:**
- Update README.md when features change
- Create API documentation
- Maintain architecture diagrams
- Generate usage examples
- Ensure documentation consistency
- Validate code comments match external docs

**Usage Pattern:**
```bash
# Launch after code changes
Task(
    description="Update documentation for payment system",
    prompt="I just added a new payment processing module with Stripe integration. The files changed are src/payment/processor.py, src/payment/models.py, and src/payment/routes.py. Please update all relevant documentation.",
    subagent_type="documentation-manager"
)
```

## Creating Custom Sub-agents

### Step 1: Define Agent Purpose
Before creating a sub-agent, identify:
- **Domain expertise needed** (security, documentation, testing, etc.)
- **Specific tasks** it will perform
- **Tools required** for those tasks
- **Success criteria** for the agent

### Step 2: Create Agent File
Create the agent file in `.claude/agents/` with proper YAML frontmatter:

**Example: Security Auditor Agent**
```yaml
---
name: security-auditor
description: "Security specialist that analyzes code for vulnerabilities, performs security audits, and provides remediation guidance. Focus on defensive security only - no malicious code creation."
tools: Read, Edit, MultiEdit, Grep, Glob, Bash, WebSearch
---

You are a security specialist focused on defensive security analysis and vulnerability detection. Your expertise includes:

## Security Expertise
- OWASP Top 10 vulnerabilities
- Common security misconfigurations
- Input validation and sanitization
- Authentication and authorization best practices
- Secure coding guidelines
- Security testing methodologies

## Analysis Methods
- Static code analysis for vulnerability patterns
- Dependency security scanning
- Configuration security review
- Access control validation
- Data protection assessment

## Security Focus Areas
- SQL injection prevention
- XSS and CSRF protection
- Authentication bypass detection
- Privilege escalation vulnerabilities
- Data exposure and leakage
- Insecure direct object references

## Reporting Standards
- Provide clear severity ratings (Critical/High/Medium/Low)
- Include specific code locations for issues
- Suggest concrete remediation steps
- Reference relevant security standards (OWASP, NIST)
- Prioritize fixes based on risk assessment

## Guidelines
- Focus on defensive security only
- Never create or improve malicious code
- Provide actionable, specific recommendations
- Consider both technical and procedural security
- Document all findings with evidence
```

### Step 3: Test the Agent
Launch your agent with specific test scenarios:

```bash
# Test security agent
Task(
    description="Audit authentication system",
    prompt="Please analyze the authentication system in src/auth/ for security vulnerabilities. Focus on password handling, session management, and access controls.",
    subagent_type="security-auditor"
)
```

### Step 4: Refine Based on Results
Monitor the agent's performance and refine:
- Adjust tool permissions if needed
- Update system prompt for better results
- Add more specific guidelines
- Include examples of expected output

## Launching Sub-agents Programmatically

### Using the Task Tool
Sub-agents are launched using the Task tool with specific parameters:

```python
Task(
    description="Brief description of the task",
    prompt="Detailed instructions for the agent",
    subagent_type="agent-name-from-yaml"
)
```

### Parameter Breakdown

**description** (required):
- Short, clear task description (3-5 words)
- Used for logging and tracking
- Example: "Validate user authentication system"

**prompt** (required):
- Detailed instructions for the agent
- Include context about what was implemented
- Specify what needs to be tested/analyzed
- Example: "I just implemented JWT-based authentication with login endpoints. Please test all authentication flows and validate security measures."

**subagent_type** (required):
- Must match the `name` field from the agent's YAML frontmatter
- Example: "validation-gates"

### Real Usage Examples

#### After Code Implementation
```python
# After implementing a new feature
Task(
    description="Validate payment processing system",
    prompt="I just implemented a Stripe payment processing system with webhook handling, payment intent creation, and refund processing. The files changed are src/payment/processor.py, src/payment/models.py, and src/payment/routes.py. Please run comprehensive tests and validate all functionality.",
    subagent_type="validation-gates"
)
```

#### After Documentation Updates
```python
# After adding new API endpoints
Task(
    description="Update API documentation",
    prompt="I just added new REST API endpoints for user management including GET /users, POST /users, PUT /users/{id}, and DELETE /users/{id}. Please update the API documentation and README with the new endpoints.",
    subagent_type="documentation-manager"
)
```

#### Security Audit Request
```python
# After major code changes
Task(
    description="Security audit of authentication system",
    prompt="Please conduct a comprehensive security audit of our authentication system focusing on password handling, session management, JWT token security, and access control vulnerabilities.",
    subagent_type="security-auditor"
)
```

## Advanced Sub-agent Patterns

### 1. Agent Chaining and Orchestration
Create workflows where agents call other agents:

```python
# Main agent orchestrates multiple specialists
Task(
    description="Complete feature development workflow",
    prompt="Please orchestrate a complete development workflow for the new user analytics feature:
1. First, use the validation-gates agent to test the implementation
2. Then, use the security-auditor agent to review for vulnerabilities
3. Finally, use the documentation-manager agent to update all documentation
4. Report back with a comprehensive summary of all findings",
    subagent_type="development-orchestrator"
)
```

### 2. Context Sharing Between Agents
Agents can share context by passing information:

```python
# Agent A generates report, Agent B uses it
Task(
    description="Security review and documentation update",
    prompt="I've completed a security audit that found 3 medium-severity issues in the authentication system. The detailed findings are: [paste security report here]. Please use this information to update the security documentation and create a remediation guide.",
    subagent_type="documentation-manager"
)
```

### 3. Specialized Tool Configurations
Different agents need different tool combinations:

```yaml
# Documentation agent (read-only focus)
---
name: documentation-reviewer
description: "Reviews documentation for accuracy and completeness"
tools: Read, Grep, Glob, ls
---

# Full-stack development agent
---
name: full-stack-developer
description: "Handles both frontend and backend development"
tools: Read, Write, Edit, MultiEdit, Grep, Glob, Bash, TodoWrite, Task
---

# Research agent (web-focused)
---
name: technical-researcher
description: "Researches best practices and solutions"
tools: WebSearch, WebFetch, Read, Write, Edit
---
```

### 4. Error Handling and Recovery
Build agents that can handle failures gracefully:

```yaml
---
name: resilient-processor
description: "Processes tasks with error recovery and retry logic"
tools: Bash, Read, Edit, TodoWrite
---

You are a resilient task processor that can handle failures gracefully.

## Error Handling Approach
- When tests fail, analyze the error and attempt fixes
- If builds fail, check dependencies and configuration
- When documentation is incomplete, research and fill gaps
- Use TodoWrite to track issues and resolutions
- Provide detailed error reports with suggested solutions

## Recovery Strategies
- Retry failed operations with different approaches
- Roll back changes that cause issues
- Research alternative solutions when blocked
- Escalate critical issues that cannot be resolved
```

### 5. Performance Optimization Agents
Create agents focused on performance:

```yaml
---
name: performance-optimizer
description: "Analyzes and optimizes code performance"
tools: Read, Edit, MultiEdit, Grep, Glob, Bash, WebSearch
---

You are a performance optimization specialist.

## Performance Analysis
- Database query optimization
- Algorithm efficiency improvements
- Memory usage optimization
- API response time reduction
- Frontend performance tuning

## Optimization Techniques
- Caching strategies
- Query optimization
- Code refactoring
- Resource usage analysis
- Load testing guidance

## Reporting
- Provide before/after performance metrics
- Suggest specific code changes
- Recommend monitoring solutions
- Document optimization trade-offs
```

## Integration with Other Claude Code Features

### Sub-agents + Hooks
Agents can be triggered automatically by hooks:

**`.claude/settings.json`**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/trigger-validation.sh",
            "description": "Run validation after code changes"
          }
        ]
      }
    ]
  }
}
```

**`.claude/hooks/trigger-validation.sh`**
```bash
#!/bin/bash
# Hook that triggers validation agent
input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# If Python file was written, trigger validation
if [[ "$file_path" == *.py ]]; then
    echo "Triggering validation for $file_path" >&2
    # This would need to be integrated with your Claude Code workflow
    # For now, just log that validation should be triggered
fi

echo "{}"
```

### Sub-agents + Slash Commands
Create commands that launch sub-agents:

**`.claude/commands/validate-feature.md`**
```markdown
# Command: /validate-feature

## Feature description: $ARGUMENTS

Launch the validation-gates subagent to test and validate the specified feature.

## Process
1. Parse feature description from $ARGUMENTS
2. Identify relevant files and test suites
3. Launch validation-gates subagent
4. Report results and recommendations

## Usage
/validate-feature "JWT authentication system"
/validate-feature "Payment processing with Stripe"
```

**`.claude/commands/update-docs.md`**
```markdown
# Command: /update-docs

## Changed files: $ARGUMENTS

Launch the documentation-manager subagent to update documentation for changed files.

## Process
1. Parse file list from $ARGUMENTS
2. Determine what documentation needs updating
3. Launch documentation-manager subagent
4. Confirm documentation changes

## Usage
/update-docs "src/auth.py src/models.py"
/update-docs "src/payment/"
```

### Sub-agents + MCP Servers
Agents can leverage MCP server capabilities:

```yaml
---
name: mcp-enhanced-researcher
description: "Research specialist using MCP servers for enhanced capabilities"
tools: Task, WebSearch, WebFetch, Read, Write, Edit
---

You are a research specialist with access to MCP servers for enhanced capabilities.

## MCP Integration
- Use Serena MCP server for semantic code search
- Leverage database MCP servers for data analysis
- Integrate with file system MCP servers for efficient file operations

## Research Process
1. **Local Analysis**: Use available tools to examine codebase
2. **MCP Enhancement**: Use MCP servers for deep analysis
3. **External Research**: Web search for best practices
4. **Synthesis**: Combine all findings into comprehensive report

## Available MCP Servers
- **Serena**: Semantic search and code understanding
- **Database**: Query and analyze data
- **File System**: Advanced file operations
- **Web**: Enhanced web search and fetching
```

### Complete Workflow Integration
Create comprehensive workflows that combine all features:

```python
# 1. Slash command triggers the process
# /develop-feature "user-authentication"

# 2. Command launches main orchestrator agent
Task(
    description="Develop user authentication feature",
    prompt="Please develop a complete user authentication system with JWT tokens, password hashing, and refresh tokens. Follow the complete development workflow:
    1. Research existing patterns and best practices
    2. Implement the feature following project standards
    3. Write comprehensive tests
    4. Validate security and functionality
    5. Update all documentation
    6. Report back with deployment checklist",
    subagent_type="feature-developer"
)

# 3. Orchestrator agent uses other agents:
#    - technical-researcher for best practices
#    - validation-gates for testing
#    - security-auditor for security review
#    - documentation-manager for docs

# 4. Hooks can trigger additional validation as needed
```

## Best Practices and Patterns

### Agent Design Principles

**1. Single Responsibility**
- Each agent should have one clear, focused purpose
- Avoid creating "do-everything" agents
- Split complex domains into specialized sub-agents

**2. Clear Success Criteria**
- Define what success looks like for each agent
- Include measurable outcomes where possible
- Set quality standards and validation criteria

**3. Appropriate Tool Permissions**
- Grant only the tools necessary for the agent's job
- Use read-only tools for review-focused agents
- Provide write tools for agents that need to modify files

### Tool Permission Matrix

| Agent Type | Read | Write | Bash | Web | Task |
|------------|------|-------|------|-----|------|
| Documentation Reviewer | ✅ | ❌ | ❌ | ❌ | ❌ |
| Documentation Manager | ✅ | ✅ | ❌ | ❌ | ❌ |
| Code Reviewer | ✅ | ❌ | ❌ | ❌ | ❌ |
| Security Auditor | ✅ | ✅ | ✅ | ✅ | ❌ |
| Validation Gates | ✅ | ✅ | ✅ | ❌ | ✅ |
| Feature Developer | ✅ | ✅ | ✅ | ✅ | ✅ |
| Researcher | ✅ | ✅ | ❌ | ✅ | ❌ |

### System Prompt Guidelines

**Structure for Effectiveness:**
1. **Role Definition**: Clear statement of purpose and expertise
2. **Scope Definition**: What the agent should and shouldn't do
3. **Process Description**: Step-by-step approach to tasks
4. **Output Standards**: Expected format and quality level
5. **Guidelines**: Rules, constraints, and best practices

**Example Effective Prompt Structure:**
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

### Error Handling and Recovery

**Build Resilient Agents:**
- Include fallback strategies for common failures
- Provide clear error messages and recovery suggestions
- Use TodoWrite to track issues and resolutions
- Implement retry logic for transient failures

**Example Error Handling Pattern:**
```markdown
## Error Handling
When encountering errors:
1. **Identify the error type** (test failure, build error, permission issue)
2. **Attempt resolution** (fix code, update config, request permissions)
3. **Document the issue** and solution for future reference
4. **Escalate if necessary** for issues that cannot be resolved

## Common Issues and Solutions
- **Test failures**: Check dependencies, update imports, fix assertions
- **Build errors**: Verify syntax, check dependencies, update configuration
- **Permission errors**: Request appropriate permissions, use alternative approaches
```

### Performance Optimization

**Agent Performance Tips:**
- Limit context window usage by focusing on relevant information
- Use efficient search patterns (Grep over Read when possible)
- Batch operations to minimize tool calls
- Cache results when appropriate

**Optimization Techniques:**
```markdown
## Performance Optimization
- Use Grep for targeted searches instead of reading entire files
- Batch multiple edits with MultiEdit instead of individual Edit operations
- Use Glob patterns to find relevant files efficiently
- Leverage TodoWrite for tracking progress without losing context

## Memory Management
- Focus on the most relevant information for the current task
- Prune unnecessary context to maintain performance
- Use structured approaches to handle large codebases
```

## Next Steps

After completing this module, you should be able to:
- ✅ Create specialized sub-agents with YAML frontmatter configuration
- ✅ Launch agents programmatically using the Task tool
- ✅ Design effective system prompts for specific domains
- ✅ Integrate agents with hooks and slash commands
- ✅ Build multi-agent workflows for complex tasks
- ✅ Debug and optimize agent performance

### Continue Your Journey
1. **Practice**: Create agents for your specific project needs
2. **Integrate**: Combine agents with hooks and commands
3. **Optimize**: Refine agent performance based on usage
4. **Share**: Contribute agent patterns to your team

## Key Takeaways
- **Sub-agents provide focused expertise** with isolated contexts
- **YAML frontmatter defines agent capabilities** and tool access
- **Task tool launches agents** with specific parameters
- **Integration with hooks and commands** creates powerful workflows
- **Performance optimization** requires careful context management

Remember: The best agents are those that solve real problems in your development workflow. Start with specific pain points and build agents to address them.