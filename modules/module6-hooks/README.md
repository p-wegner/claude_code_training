# Module 6: Claude Code Hooks - Practical Automation

## Learning Objectives
- Understand Claude Code's hook system and real-world applications
- Master the 8 hook events and when to use each one
- Implement practical hooks for common development workflows
- Handle JSON input/output for advanced hook functionality
- Configure hooks in `.claude/settings.json` with proper syntax
- Build safety, validation, and automation hooks
- Debug and optimize hook performance

## What Are Claude Code Hooks?

Claude Code hooks are **deterministic automation triggers** that execute shell commands at specific points in the development lifecycle. Unlike AI assistants that might forget to run tests or format code, hooks **always execute** when triggered.

### Key Characteristics
- **Deterministic**: Always run when conditions match
- **Shell-based**: Execute any shell command or script
- **JSON-aware**: Can read and process JSON input
- **Configurable**: Fine-grained control over when they run
- **Powerful**: Can block operations, modify behavior, or automate tasks

## Available Hook Events

Claude Code provides 8 hook events that cover the entire development lifecycle:

### 1. PreToolUse
**Runs BEFORE any tool execution**
- Can block dangerous operations
- Perfect for security checks
- Use cases: Prevent destructive commands, validate inputs

### 2. PostToolUse  
**Runs AFTER successful tool completion**
- Most commonly used hook
- Great for automation and logging
- Use cases: Format code, run tests, log changes

### 3. UserPromptSubmit
**Runs when user submits a prompt**
- Can analyze and modify user requests
- Use cases: Add reminders, suggest improvements

### 4. SubagentStop
**Runs when a subagent completes**
- Coordinate between agents
- Use cases: Trigger validation after documentation updates

### 5. Stop
**Runs when main agent finishes responding**
- Final cleanup and notifications
- Use cases: Send summaries, trigger builds

### 6. SessionStart
**Runs at session initialization**
- Environment setup and validation
- Use cases: Check dependencies, setup environment

### 7. PreCompact
**Runs before context compaction**
- Preserve important context
- Use cases: Save critical information before context limits

### 8. Notification
**Runs during system notifications**
- Handle system events
- Use cases: Custom notification handling

## Hook Configuration Structure

Hooks are configured in `.claude/settings.json` (project-specific) or `~/.claude/settings.json` (global):

### Basic Configuration Format
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/format-code.sh",
            "description": "Format code after file changes"
          }
        ]
      }
    ]
  }
}
```

### Advanced Configuration with Multiple Events
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/security-check.sh",
            "description": "Block dangerous commands"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/auto-test.sh",
            "description": "Run tests after code changes"
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/prompt-analyzer.sh",
            "description": "Analyze user prompts for suggestions"
          }
        ]
      }
    ]
  }
}
```

## Understanding Hook Input/Output

### JSON Input Structure
Hooks receive JSON input via stdin that contains context about the event:

```json
{
  "event": "PostToolUse",
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/path/to/file.js",
    "old_string": "old content",
    "new_string": "new content"
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "session_id": "session-123"
}
```

### Hook Output Options
Hooks must return JSON:

```bash
# Success - continue operation
echo "{}"

# Block operation with message
echo '{"action": "block", "message": "Dangerous command blocked"}'

# Warning (continues but shows message)
echo '{"action": "warn", "message": "Consider running tests first"}'
```

## Practical Hook Examples

### Example 1: Auto-Format After Edits
**File: `.claude/hooks/format-code.sh`**
```bash
#!/bin/bash
# Format code automatically after file edits

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# Only format certain file types
if [[ "$file_path" =~ \.(js|ts|py|go|rs|java)$ ]]; then
    case "${file_path##*.}" in
        js|ts)
            # Format JavaScript/TypeScript
            if command -v prettier >/dev/null 2>&1; then
                prettier --write "$file_path" 2>/dev/null || true
            fi
            ;;
        py)
            # Format Python
            if command -v black >/dev/null 2>&1; then
                black "$file_path" 2>/dev/null || true
            fi
            ;;
        go)
            # Format Go
            go fmt "$file_path" 2>/dev/null || true
            ;;
    esac
fi

# Always return success
echo "{}"
```

### Example 2: Security Check for Dangerous Commands
**File: `.claude/hooks/security-check.sh`**
```bash
#!/bin/bash
# Block potentially dangerous bash commands

input=$(cat)
command=$(echo "$input" | jq -r '.tool_input.command // empty')

# Define dangerous patterns
dangerous_patterns=(
    "rm.*-rf"
    "rm.*\*"
    "rm.*\.env"
    "rm.*credentials"
    "rm.*secret"
    "dd.*if=/dev/zero"
    "mkfs"
    "chmod.*777"
    "chown.*root"
    ">:"
    "sudo.*rm"
)

# Check for dangerous patterns
for pattern in "${dangerous_patterns[@]}"; do
    if [[ "$command" =~ $pattern ]]; then
        echo "{\"action\": \"block\", \"message\": \"Dangerous command blocked: $command\"}"
        exit 0
    fi
done

# Allow safe commands
echo "{}"
```

### Example 3: Auto-Test After Code Changes
**File: `.claude/hooks/auto-test.sh`**
```bash
#!/bin/bash
# Run tests automatically after code changes

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# Only run tests for source files (not tests themselves)
if [[ "$file_path" =~ ^(src/|lib/|app/).*\.(js|ts|py|go|java)$ ]]; then
    echo "Running tests after change to $file_path..." >&2
    
    # Detect project type and run appropriate tests
    if [[ -f "package.json" ]]; then
        # Node.js project
        if npm test >/dev/null 2>&1; then
            echo "✅ Tests passed" >&2
        else
            echo "⚠️  Tests failed - review changes" >&2
        fi
    elif [[ -f "pyproject.toml" ]] || [[ -f "requirements.txt" ]]; then
        # Python project
        if python -m pytest >/dev/null 2>&1; then
            echo "✅ Tests passed" >&2
        else
            echo "⚠️  Tests failed - review changes" >&2
        fi
    fi
fi

echo "{}"
```

### Example 4: Log All Tool Usage
**File: `.claude/hooks/log-usage.sh`**
```bash
#!/bin/bash
# Log all tool usage for auditing and debugging

timestamp=$(date '+%Y-%m-%d %H:%M:%S')
input=$(cat)

# Create logs directory
mkdir -p .claude/logs

# Extract relevant information
tool_name=$(echo "$input" | jq -r '.tool_name // "unknown"')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // "N/A"')

# Log the usage
echo "[$timestamp] $tool_name - $file_path" >> .claude/logs/tool-usage.log

echo "{}"
```

### Example 5: Prompt Analysis with Suggestions
**File: `.claude/hooks/prompt-analyzer.sh`**
```bash
#!/bin/bash
# Analyze user prompts and provide helpful suggestions

input=$(cat)
prompt=$(echo "$input" | jq -r '.prompt // empty')

# Check for testing-related prompts
if [[ "$prompt" =~ (test|validate|check) ]] && [[ ! "$prompt" =~ (skip|no|without).*(test|validation) ]]; then
    echo "💡 Tip: Consider using the validation-gates subagent for comprehensive testing." >&2
fi

# Check for documentation-related prompts
if [[ "$prompt" =~ (document|docs|readme) ]]; then
    echo "💡 Tip: The documentation-manager subagent can help maintain documentation." >&2
fi

# Check for new feature prompts
if [[ "$prompt" =~ (add|create|implement|build) ]] && [[ ! "$prompt" =~ (test|validate) ]]; then
    echo "💡 Tip: Remember to include tests for new features." >&2
fi

echo "{}"
```

## Setting Up Hooks

### Step 1: Create Hooks Directory
```bash
mkdir -p .claude/hooks
```

### Step 2: Create Hook Scripts
```bash
# Create a hook script
cat > .claude/hooks/my-hook.sh << 'EOF'
#!/bin/bash
# Your hook logic here
echo "{}"
EOF

# Make it executable
chmod +x .claude/hooks/my-hook.sh
```

### Step 3: Configure in Settings
```bash
# Create or update .claude/settings.json
cat > .claude/settings.json << 'EOF'
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/my-hook.sh",
            "description": "My custom hook"
          }
        ]
      }
    ]
  }
}
EOF
```

### Step 4: Test Your Hooks
```bash
# Run Claude Code with debug to see hook execution
claude --debug
```

## Advanced Hook Patterns

### Pattern 1: Chained Hooks
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/format.sh",
            "description": "Format code"
          },
          {
            "type": "command", 
            "command": ".claude/hooks/test.sh",
            "description": "Run tests"
          },
          {
            "type": "command",
            "command": ".claude/hooks/notify.sh",
            "description": "Send notification"
          }
        ]
      }
    ]
  }
}
```

### Pattern 2: Conditional Execution
```bash
#!/bin/bash
# Only run for specific file types or conditions
input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# Only process Python files
if [[ "$file_path" =~ \.py$ ]]; then
    # Your logic here
    echo "Processing Python file: $file_path" >&2
fi

echo "{}"
```

### Pattern 3: Environment-Specific Hooks
```bash
#!/bin/bash
# Different behavior based on environment
input=$(cat)

if [[ "$CI" == "true" ]]; then
    # CI environment - stricter checks
    echo "Running in CI mode" >&2
else
    # Local development - friendlier output
    echo "Running in local mode" >&2
fi

echo "{}"
```

## Debugging Hooks

### Enable Debug Mode
```bash
claude --debug
```

### Common Issues
1. **Permission denied**: Make sure hook scripts are executable (`chmod +x`)
2. **Path issues**: Use absolute paths or ensure scripts are in the right location
3. **JSON parsing errors**: Validate JSON output with `jq`
4. **Silent failures**: Check hook logic and error handling

### Debug Hook Script
**File: `.claude/hooks/debug.sh`**
```bash
#!/bin/bash
# Debug hook - logs all input for troubleshooting

input=$(cat)
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

mkdir -p .claude/debug
echo "[$timestamp] Hook input: $input" >> .claude/debug/hook-debug.log

echo "{}"
```

## Hook Best Practices

### 1. Security
- **Validate all inputs** - Don't trust JSON input
- **Use absolute paths** - Avoid PATH manipulation
- **Sanitize commands** - Prevent command injection
- **Principle of least privilege** - Only necessary permissions

### 2. Performance
- **Keep hooks fast** - Avoid blocking operations
- **Use caching** - Cache expensive operations
- **Parallel execution** - Run independent tasks in parallel
- **Conditional execution** - Skip when not needed

### 3. Reliability
- **Graceful degradation** - Don't break if dependencies missing
- **Clear error messages** - Help users understand issues
- **Idempotent operations** - Safe to run multiple times
- **Comprehensive logging** - Track hook execution

### 4. Maintainability
- **Document your hooks** - Explain purpose and behavior
- **Modular design** - Small, focused hooks
- **Version control** - Track hook changes
- **Test your hooks** - Verify they work as expected

## Hands-on Exercises

### Exercise 1: Basic Hook Setup
**Objective**: Create your first hook and understand the workflow.

**Tasks**:
1. **Create a simple logging hook**
   ```bash
   # Create .claude/hooks/simple-log.sh
   # Log timestamp and tool name to .claude/logs/simple.log
   ```

2. **Configure the hook**
   ```bash
   # Update .claude/settings.json to run on PostToolUse
   # Match all tools with ".*"
   ```

3. **Test the hook**
   ```bash
   # Make a file edit and check the log file
   # Verify the hook executed correctly
   ```

### Exercise 2: File Type Specific Hook
**Objective**: Create hooks that only run for specific file types.

**Tasks**:
1. **Create a Python-specific hook**
   ```bash
   # Create hook that runs black formatter on .py files
   # Only run when Python files are modified
   ```

2. **Create a JavaScript-specific hook**
   ```bash
   # Create hook that runs ESLint on .js files
   # Only run when JavaScript files are modified
   ```

3. **Test both hooks**
   ```bash
   # Edit both Python and JavaScript files
   # Verify only the appropriate hook runs
   ```

### Exercise 3: Security Hook
**Objective**: Implement a security hook that blocks dangerous operations.

**Tasks**:
1. **Create a dangerous command blocker**
   ```bash
   # Block commands containing "rm -rf", "chmod 777", etc.
   # Return block action with descriptive message
   ```

2. **Test the security hook**
   ```bash
   # Try to execute blocked commands
   # Verify they are properly blocked
   ```

3. **Add logging for security events**
   ```bash
   # Log blocked attempts to .claude/logs/security.log
   # Include timestamp, command, and reason
   ```

### Exercise 4: Workflow Automation
**Objective**: Create a complete workflow automation chain.

**Tasks**:
1. **Create a development workflow**
   ```bash
   # Format → Lint → Test → Notify
   # Each step runs only if previous succeeds
   ```

2. **Add error handling**
   ```bash
   # Handle failures gracefully
   # Provide helpful error messages
   ```

3. **Integrate with project tools**
   ```bash
   # Use your project's actual tools (npm, pytest, etc.)
   # Make it work with your real development workflow
   ```

### Exercise 5: Advanced Hook with JSON Processing
**Objective**: Create a hook that processes complex JSON input.

**Tasks**:
1. **Create a comprehensive analysis hook**
   ```bash
   # Extract file changes, analyze impact
   # Suggest related files to update
   ```

2. **Add intelligent suggestions**
   ```bash
   # Based on file type, suggest next steps
   # "Tests changed - run test suite?"
   ```

3. **Create a summary report**
   ```bash
   # Generate .claude/reports/session-summary.md
   # Include all changes and suggestions
   ```

## Hook Reference Sheet

### Quick Reference
| Event | When It Runs | Common Use Cases |
|-------|--------------|------------------|
| `PreToolUse` | Before tool execution | Security checks, validation |
| `PostToolUse` | After successful tool | Automation, logging, formatting |
| `UserPromptSubmit` | When user submits prompt | Analysis, suggestions |
| `SubagentStop` | When subagent completes | Coordination, follow-up tasks |
| `Stop` | When main agent finishes | Cleanup, notifications |
| `SessionStart` | At session start | Environment setup |
| `PreCompact` | Before context compaction | Context preservation |
| `Notification` | During system notifications | Custom notification handling |

### Matcher Patterns
| Pattern | Matches |
|---------|---------|
| `.*` | All tools |
| `Edit|Write|MultiEdit` | File modification tools |
| `Bash` | Command execution |
| `Read` | File reading |
| `npm.*` | NPM commands only |
| `git.*` | Git commands only |

### Common Hook Commands
| Purpose | Example Commands |
|---------|------------------|
| Code Formatting | `pretier --write`, `black`, `go fmt` |
| Testing | `npm test`, `pytest`, `go test` |
| Linting | `eslint`, `ruff check`, `go vet` |
| Security | `semgrep`, `bandit`, `npm audit` |
| Notifications | `notify-send`, `slack-notify` |
| Logging | `echo >> logfile`, `logger` |

## Next Steps

After completing this module, you should be able to:
- ✅ Configure hooks for any Claude Code event
- ✅ Write shell scripts that handle JSON input/output
- ✅ Implement security, automation, and validation hooks
- ✅ Debug and troubleshoot hook issues
- ✅ Create complex workflow automation chains
- ✅ Integrate hooks with your existing development tools

**Pro Tip**: Start with simple PostToolUse hooks for logging and formatting, then gradually add more complex automation as you become comfortable with the system.

Continue to the final module to learn about integration and real-world deployment scenarios.