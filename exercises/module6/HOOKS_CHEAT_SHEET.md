# Claude Code Hooks - Quick Reference

## Hook Events

| Event | Timing | Common Use Cases | Example Matcher |
|-------|--------|------------------|-----------------|
| `PreToolUse` | Before tool execution | Security checks, input validation | `Bash`, `.*` |
| `PostToolUse` | After successful tool | Format code, run tests, log changes | `Edit\|Write\|MultiEdit` |
| `UserPromptSubmit` | When user submits prompt | Analysis, suggestions, reminders | `.*` |
| `SubagentStop` | When subagent completes | Coordination, follow-up tasks | `.*` |
| `Stop` | When main agent finishes | Cleanup, notifications | `.*` |
| `SessionStart` | At session initialization | Environment setup, dependency checks | `.*` |
| `PreCompact` | Before context compaction | Context preservation | `.*` |
| `Notification` | During system notifications | Custom notification handling | `.*` |

## Configuration Structure

### Basic Hook Configuration
```json
{
  "hooks": {
    "EVENT_NAME": [
      {
        "matcher": "PATTERN",
        "hooks": [
          {
            "type": "command",
            "command": "path/to/hook.sh",
            "description": "Hook description"
          }
        ]
      }
    ]
  }
}
```

### Multiple Hooks for Same Event
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/format.sh"
          },
          {
            "type": "command", 
            "command": ".claude/hooks/test.sh"
          }
        ]
      }
    ]
  }
}
```

## Matcher Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `.*` | Match all tools | Catch-all logging |
| `Edit|Write|MultiEdit` | File modification tools | Format on save |
| `Bash` | Command execution | Security checks |
| `Read` | File reading | Access logging |
| `npm.*` | NPM commands only | Package management |
| `git.*` | Git commands only | Version control |
| `pytest|test` | Test commands | Test automation |

## Hook Script Template

```bash
#!/bin/bash
# Hook description

# Read JSON input
input=$(cat)

# Extract data (examples)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')
command=$(echo "$input" | jq -r '.tool_input.command // empty')
tool_name=$(echo "$input" | jq -r '.tool_name // empty')

# Your hook logic here

# Return JSON response
echo "{}"  # Success
# echo '{"action": "block", "message": "Reason"}'  # Block operation
```

## JSON Input Structure

### PostToolUse Input
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

### PreToolUse Input
```json
{
  "event": "PreToolUse", 
  "tool_name": "Bash",
  "tool_input": {
    "command": "rm -rf file.txt",
    "timeout": 30000
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### UserPromptSubmit Input
```json
{
  "event": "UserPromptSubmit",
  "prompt": "Create a new feature",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Common Hook Patterns

### 1. Logging Hook
```bash
#!/bin/bash
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name // "unknown"')
echo "[$timestamp] $tool_name" >> .claude/logs/tools.log
echo "{}"
```

### 2. File Format Hook
```bash
#!/bin/bash
input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

if [[ "$file_path" =~ \.py$ ]]; then
    black "$file_path" 2>/dev/null || true
fi

echo "{}"
```

### 3. Security Hook
```bash
#!/bin/bash
input=$(cat)
command=$(echo "$input" | jq -r '.tool_input.command // empty')

if [[ "$command" =~ "rm.*-rf" ]]; then
    echo '{"action": "block", "message": "Dangerous command blocked"}'
    exit 0
fi

echo "{}"
```

## Setup Commands

### Create Hooks Directory
```bash
mkdir -p .claude/hooks
mkdir -p .claude/logs
```

### Create Executable Hook
```bash
cat > .claude/hooks/my-hook.sh << 'EOF'
#!/bin/bash
echo "{}"
EOF
chmod +x .claude/hooks/my-hook.sh
```

### Create Configuration
```bash
cat > .claude/settings.json << 'EOF'
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/my-hook.sh"
          }
        ]
      }
    ]
  }
}
EOF
```

## Debug Commands

### Run Claude with Debug
```bash
claude --debug
```

### Test Hook Manually
```bash
echo '{"tool_name": "Edit", "tool_input": {"file_path": "test.js"}}' | .claude/hooks/my-hook.sh
```

### Check Hook Logs
```bash
tail -f .claude/logs/tools.log
```

## Best Practices

### 1. Always return JSON
```bash
# ✅ Good
echo "{}"
echo '{"action": "block", "message": "Reason"}'

# ❌ Bad
echo "success"
exit 1
```

### 2. Handle errors gracefully
```bash
#!/bin/bash
input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

if [[ -z "$file_path" ]]; then
    echo "{}"  # Don't block, just continue
    exit 0
fi

# Your logic here
echo "{}"
```

### 3. Use absolute paths or check commands
```bash
#!/bin/bash
# Check if command exists
if command -v black >/dev/null 2>&1; then
    black "$file_path"
fi

echo "{}"
```

### 4. Log for debugging
```bash
#!/bin/bash
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
input=$(cat)

# Log input for debugging
echo "[$timestamp] Hook input: $input" >> .claude/debug.log

# Your logic here
echo "{}"
```

## Common Use Cases

### After File Edit
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {"command": ".claude/hooks/format.sh"},
          {"command": ".claude/hooks/test.sh"}
        ]
      }
    ]
  }
}
```

### Before Command Execution
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {"command": ".claude/hooks/security.sh"}
        ]
      }
    ]
  }
}
```

### Session Management
```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {"command": ".claude/hooks/setup-env.sh"}
        ]
      }
    ]
  }
}
```

## Troubleshooting

### Hook Not Running
1. Check file permissions: `chmod +x .claude/hooks/hook.sh`
2. Verify configuration syntax in `.claude/settings.json`
3. Check matcher pattern matches the tool
4. Run with debug: `claude --debug`

### JSON Errors
1. Always return valid JSON
2. Use `jq` to test JSON output
3. Check for special characters in strings

### Permission Issues
1. Ensure hook scripts are executable
2. Check file permissions for files hook accesses
3. Use absolute paths for external commands

## File Locations

| File | Purpose | Location |
|------|---------|----------|
| `settings.json` | Hook configuration | `.claude/settings.json` |
| `hook.sh` | Hook script | `.claude/hooks/hook.sh` |
| `tools.log` | Tool usage log | `.claude/logs/tools.log` |
| `debug.log` | Debug information | `.claude/debug/debug.log` |

Remember: Hooks are powerful automation tools. Start simple and gradually add complexity as needed!