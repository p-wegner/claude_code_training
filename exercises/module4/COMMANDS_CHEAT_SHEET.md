# Claude Code Slash Commands - Quick Reference

## Built-in Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `/init` | Generate initial CLAUDE.md | `/init` |
| `/permissions` | Manage tool permissions | `/permissions` |
| `/clear` | Clear context between tasks | `/clear` |
| `/agents` | Create and manage subagents | `/agents` |
| `/help` | Get help with Claude Code | `/help` |

## Command Structure

### Basic Format
```markdown
# Command: /command-name

Brief description

## Parameters: $ARGUMENTS

Steps to execute...

Expected output...
```

### Usage
```bash
/command-name your-arguments-here
```

## The $ARGUMENTS Variable

### Basic Usage
```markdown
## File to process: $ARGUMENTS
```
**Usage:** `/command file.txt`

### Multiple Arguments
```markdown
## Parameters: $ARGUMENTS
```
**Usage:** `/command param1 param2 param3`

### Advanced Parsing
```markdown
## Options: $ARGUMENTS
Parse for flags, options, and values
```

## Directory Structure
```
.claude/
├── commands/
│   ├── analyze-file.md
│   ├── code-review.md
│   └── workflow.md
└── settings.json
```

## Common Command Patterns

### 1. Analysis Command
```markdown
# Command: /analyze-[target]

## Target: $ARGUMENTS

1. Load and examine $ARGUMENTS
2. Apply analysis
3. Generate recommendations
```

### 2. Automation Command
```markdown
# Command: /automate-[task]

## Target: $ARGUMENTS

1. Validate input
2. Execute workflow
3. Report results
```

### 3. Workflow Command
```markdown
# Command: /workflow-[name]

## Parameters: $ARGUMENTS

1. Preparation phase
2. Execution phase  
3. Validation phase
4. Finalization phase
```

## Practical Examples

### File Analysis
```markdown
# Command: /analyze-file

## File path: $ARGUMENTS

Read $ARGUMENTS and provide comprehensive analysis:
- File type and structure
- Content quality
- Potential issues
- Recommendations
```

### Code Review
```markdown
# Command: /code-review

## Target and options: $ARGUMENTS

Parse $ARGUMENTS for target and review options:
- Target files/pattern
- Strictness level
- Focus areas
- Output format
```

### Batch Processing
```markdown
# Command: /batch-process

## Pattern and action: $ARGUMENTS

Parse $ARGUMENTS:
1. Extract file pattern
2. Determine action (format/lint/analyze)
3. Process matching files
4. Report results
```

### GitHub Integration
```markdown
# Command: /github-action

## Action and params: $ARGUMENTS

Use gh CLI to:
- Create issues/PRs
- Check status
- Update labels/milestones
```

## Argument Processing

### Simple Arguments
```markdown
## Single parameter: $ARGUMENTS
/command value
```

### Multiple Arguments
```markdown
## Multiple params: $ARGUMENTS  
/command value1 value2 value3
```

### Flag Arguments
```markdown
## Options: $ARGUMENTS
/command --flag1 --flag2 value
```

### Structured Arguments
```markdown
## Complex params: $ARGUMENTS
/command "param1" "param2 with spaces" --option=value
```

## Integration Patterns

### Commands + Hooks
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/suggest-command.sh"
          }
        ]
      }
    ]
  }
}
```

### Commands + Subagents
```markdown
# Command: /comprehensive-review

## Target: $ARGUMENTS

1. Use validation-gates for testing
2. Use security-auditor for security
3. Use documentation-manager for docs
```

### Commands + MCP Servers
```markdown
# Command: /semantic-search

## Query: $ARGUMENTS

1. Use Serena MCP for search
2. Analyze results
3. Provide recommendations
```

## Command Organization

### By Function
```
.claude/commands/
├── analysis/        # Code analysis commands
├── development/    # Development workflows
├── deployment/     # Deployment commands
└── utilities/      # Utility commands
```

### By Complexity
```
.claude/commands/
├── simple/         # Single-purpose commands
├── workflow/       # Multi-step workflows
└── advanced/       # Complex automation
```

## Best Practices

### Command Design
- **Single purpose** - One clear responsibility
- **Descriptive names** - Clear and intuitive
- **Consistent interface** - Similar patterns
- **Helpful output** - Actionable results

### Parameter Handling
- **Validate input** - Check arguments before processing
- **Provide defaults** - Sensible defaults for optional params
- **Handle edge cases** - Missing/invalid arguments
- **Document usage** - Include examples

### Error Handling
- **Graceful failure** - Handle errors gracefully
- **Clear messages** - Helpful error messages
- **Recovery suggestions** - How to fix issues
- **Idempotency** - Safe to run multiple times

## Debugging Commands

### Common Issues
1. **Command not found** - Check `.claude/commands/` directory
2. **Arguments not working** - Verify `$ARGUMENTS` usage  
3. **Permission errors** - Check tool permissions
4. **File not found** - Use full paths or check directory

### Debug Techniques
- **Test with simple arguments** - Start basic
- **Add logging** - Include progress messages
- **Use verbose mode** - `claude --debug`
- **Check permissions** - File access and tool permissions

## Advanced Features

### Conditional Logic
```markdown
# Command: /smart-action

## Input: $ARGUMENTS

If $ARGUMENTS contains "test":
    Run test suite
Else if $ARGUMENTS contains "deploy":
    Run deployment
Else:
    Show help
```

### File Pattern Matching
```markdown
# Command: /batch-process

## Pattern: $ARGUMENTS

1. Find files matching $ARGUMENTS
2. Process each file
3. Generate summary
```

### External Tool Integration
```markdown
# Command: /security-scan

## Target: $ARGUMENTS

1. Run external scanner on $ARGUMENTS
2. Parse output
3. Generate report
```

## Command Templates

### Analysis Template
```markdown
# Command: /analyze-[target]

## Target: $ARGUMENTS

1. Load and examine $ARGUMENTS
2. Apply domain-specific analysis
3. Identify issues and opportunities
4. Generate recommendations
```

### Automation Template
```markdown
# Command: /automate-[task]

## Target: $ARGUMENTS

1. Validate input and environment
2. Execute automated workflow
3. Handle errors and edge cases
4. Report results
```

### Workflow Template
```markdown
# Command: /workflow-[name]

## Parameters: $ARGUMENTS

1. Preparation: Setup and validation
2. Execution: Core workflow steps
3. Validation: Quality checks
4. Finalization: Cleanup and reporting
```

## File Locations

| File | Purpose | Location |
|------|---------|----------|
| `command.md` | Command definition | `.claude/commands/` |
| `settings.json` | Claude configuration | `.claude/` |
| Command logs | Execution logs | `.claude/logs/` |

## Quick Start

1. **Create directory:** `mkdir -p .claude/commands`
2. **Create command:** Edit `.claude/commands/my-command.md`
3. **Test:** `/my-command arguments`
4. **Iterate:** Improve based on usage

Remember: Start simple and build complexity gradually. The best commands automate your most frequent manual tasks!