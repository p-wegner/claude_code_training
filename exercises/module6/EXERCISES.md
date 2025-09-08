# Module 6: Hooks - Practical Exercises

## Exercise Solutions and Templates

This directory contains practical exercises for mastering Claude Code hooks. Each exercise builds on the previous one, progressing from basic hook setup to advanced automation workflows.

## Exercise 1: Basic Hook Setup

### Objective
Create your first hook and understand the complete workflow.

### Files to Create
1. `.claude/hooks/simple-log.sh` - Basic logging hook
2. `.claude/settings.json` - Hook configuration

### Solution Template

**`.claude/hooks/simple-log.sh`:**
```bash
#!/bin/bash
# Basic logging hook - logs tool usage with timestamps

timestamp=$(date '+%Y-%m-%d %H:%M:%S')
input=$(cat)

# Extract tool information
tool_name=$(echo "$input" | jq -r '.tool_name // "unknown"')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // "N/A"')

# Create logs directory
mkdir -p .claude/logs

# Log the usage
echo "[$timestamp] Tool: $tool_name, File: $file_path" >> .claude/logs/simple.log

echo "{}"
```

**`.claude/settings.json`:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/simple-log.sh",
            "description": "Log all tool usage"
          }
        ]
      }
    ]
  }
}
```

### Testing Steps
1. Make the hook executable: `chmod +x .claude/hooks/simple-log.sh`
2. Create a test file: `echo "test" > test.txt`
3. Check the log: `cat .claude/logs/simple.log`

## Exercise 2: File Type Specific Hooks

### Objective
Create hooks that only run for specific file types.

### Solution Template

**`.claude/hooks/format-code.sh`:**
```bash
#!/bin/bash
# Format code based on file type

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# Only process specific file types
if [[ "$file_path" =~ \.(js|ts|py|go|java)$ ]]; then
    echo "Formatting $file_path..." >&2
    
    case "${file_path##*.}" in
        js|ts)
            if command -v prettier >/dev/null 2>&1; then
                prettier --write "$file_path" 2>/dev/null && echo "✅ Formatted with prettier" >&2
            else
                echo "⚠️  prettier not found" >&2
            fi
            ;;
        py)
            if command -v black >/dev/null 2>&1; then
                black "$file_path" 2>/dev/null && echo "✅ Formatted with black" >&2
            else
                echo "⚠️  black not found" >&2
            fi
            ;;
        go)
            go fmt "$file_path" 2>/dev/null && echo "✅ Formatted with go fmt" >&2
            ;;
        java)
            if command -v google-java-format >/dev/null 2>&1; then
                google-java-format --replace "$file_path" 2>/dev/null && echo "✅ Formatted with google-java-format" >&2
            fi
            ;;
    esac
fi

echo "{}"
```

**Configuration (add to `.claude/settings.json`):**
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

## Exercise 3: Security Hook

### Objective
Implement a security hook that blocks dangerous operations.

### Solution Template

**`.claude/hooks/security-check.sh`:**
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
    "rm.*key"
    "dd.*if=/dev/zero"
    "mkfs"
    "chmod.*777"
    "chown.*root"
    ">:"
    "sudo.*rm"
    "sudo.*chmod"
    "sudo.*chown"
    "shutdown"
    "reboot"
    "halt"
    "poweroff"
)

# Check for dangerous patterns
for pattern in "${dangerous_patterns[@]}"; do
    if [[ "$command" =~ $pattern ]]; then
        timestamp=$(date '+%Y-%m-%d %H:%M:%S')
        mkdir -p .claude/logs
        echo "[$timestamp] BLOCKED: $command" >> .claude/logs/security.log
        
        echo "{\"action\": \"block\", \"message\": \"🚨 Dangerous command blocked: $command\"}"
        exit 0
    fi
done

# Log the command for auditing
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
mkdir -p .claude/logs
echo "[$timestamp] ALLOWED: $command" >> .claude/logs/security.log

echo "{}"
```

**Configuration:**
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
            "description": "Block dangerous bash commands"
          }
        ]
      }
    ]
  }
}
```

## Exercise 4: Workflow Automation

### Objective
Create a complete workflow automation chain.

### Solution Template

**`.claude/hooks/workflow.sh`:**
```bash
#!/bin/bash
# Complete development workflow: format → lint → test → notify

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# Only process source files
if [[ ! "$file_path" =~ ^(src/|lib/|app/).*\.(js|ts|py|go|java)$ ]]; then
    echo "{}"
    exit 0
fi

echo "🔄 Running development workflow for $file_path..." >&2

# Step 1: Format
echo "📝 Formatting..." >&2
if [[ "$file_path" =~ \.(js|ts)$ ]] && command -v prettier >/dev/null 2>&1; then
    prettier --write "$file_path" >/dev/null 2>&1
elif [[ "$file_path" =~ \.py$ ]] && command -v black >/dev/null 2>&1; then
    black "$file_path" >/dev/null 2>&1
elif [[ "$file_path" =~ \.go$ ]]; then
    go fmt "$file_path" >/dev/null 2>&1
fi

# Step 2: Lint
echo "🔍 Linting..." >&2
lint_status=0
if [[ "$file_path" =~ \.(js|ts)$ ]] && command -v eslint >/dev/null 2>&1; then
    eslint "$file_path" >/dev/null 2>&1 || lint_status=1
elif [[ "$file_path" =~ \.py$ ]] && command -v ruff >/dev/null 2>&1; then
    ruff check "$file_path" >/dev/null 2>&1 || lint_status=1
elif [[ "$file_path" =~ \.go$ ]]; then
    go vet "$file_path" >/dev/null 2>&1 || lint_status=1
fi

# Step 3: Test (only if linting passed)
if [[ $lint_status -eq 0 ]]; then
    echo "🧪 Testing..." >&2
    test_status=0
    
    # Run tests based on project type
    if [[ -f "package.json" ]] && command -v npm >/dev/null 2>&1; then
        npm test >/dev/null 2>&1 || test_status=1
    elif [[ -f "pyproject.toml" ]] && command -v pytest >/dev/null 2>&1; then
        pytest >/dev/null 2>&1 || test_status=1
    elif [[ "$file_path" =~ \.go$ ]]; then
        go test ./... >/dev/null 2>&1 || test_status=1
    fi
    
    if [[ $test_status -eq 0 ]]; then
        echo "✅ All checks passed!" >&2
    else
        echo "❌ Tests failed" >&2
    fi
else
    echo "❌ Linting failed" >&2
fi

echo "{}"
```

## Exercise 5: Advanced Hook with JSON Processing

### Objective
Create a comprehensive analysis hook with intelligent suggestions.

### Solution Template

**`.claude/hooks/analyze-changes.sh`:**
```bash
#!/bin/bash
# Comprehensive analysis of code changes with intelligent suggestions

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')
tool_name=$(echo "$input" | jq -r '.tool_name // "unknown"')

# Create reports directory
mkdir -p .claude/reports
timestamp=$(date '+Y-%m-%d %H:%M:%S')

# Initialize report
cat > .claude/reports/analysis.md << EOF
# Code Analysis Report
Generated: $timestamp

## File Changed: $file_path
Tool Used: $tool_name

EOF

# Analyze based on file type and content
if [[ -f "$file_path" ]]; then
    # Get file stats
    line_count=$(wc -l < "$file_path" | tr -d ' ')
    file_size=$(du -h "$file_path" | cut -f1)
    
    cat >> .claude/reports/analysis.md << EOF
### File Statistics
- Lines: $line_count
- Size: $file_size

EOF

    # Analyze by file type
    case "${file_path##*.}" in
        py)
            analyze_python_file "$file_path" >> .claude/reports/analysis.md
            ;;
        js|ts)
            analyze_javascript_file "$file_path" >> .claude/reports/analysis.md
            ;;
        go)
            analyze_go_file "$file_path" >> .claude/reports/analysis.md
            ;;
    esac
    
    # Check for TODOs and FIXMEs
    echo "### Action Items" >> .claude/reports/analysis.md
    grep -n -i "TODO\|FIXME\|HACK" "$file_path" | while read line; do
        echo "- $line" >> .claude/reports/analysis.md
    done
    
    # Add intelligent suggestions
    echo "" >> .claude/reports/analysis.md
    echo "### Suggestions" >> .claude/reports/analysis.md
    
    # Suggest next steps based on file type
    if [[ "$file_path" =~ test ]]; then
        echo "- 🧪 Consider running the full test suite" >> .claude/reports/analysis.md
    elif [[ "$file_path" =~ \.(py|js|ts|go)$ ]]; then
        echo "- 📊 Run tests to verify changes" >> .claude/reports/analysis.md
        echo "- 🔍 Consider code review" >> .claude/reports/analysis.md
    fi
    
    if [[ "$file_path" =~ README ]]; then
        echo "- 📚 Update documentation links" >> .claude/reports/analysis.md
    fi
fi

# Show summary to user
echo "📊 Analysis complete. Report saved to .claude/reports/analysis.md" >&2

echo "{}"
}

# Helper functions
analyze_python_file() {
    local file="$1"
    echo "### Python Analysis"
    
    # Check for imports
    echo "- Import statements found:"
    grep "^import\|^from" "$file" | head -5 | sed 's/^/  /'
    
    # Check for functions
    func_count=$(grep -c "^def " "$file")
    echo "- Functions defined: $func_count"
    
    # Check for classes
    class_count=$(grep -c "^class " "$file")
    echo "- Classes defined: $class_count"
}

analyze_javascript_file() {
    local file="$1"
    echo "### JavaScript/TypeScript Analysis"
    
    # Check for imports
    echo "- Import statements found:"
    grep "^import\|^require" "$file" | head -5 | sed 's/^/  /'
    
    # Check for functions
    func_count=$(grep -c "function\|=>\|() " "$file")
    echo "- Functions/Arrow functions: $func_count"
}

analyze_go_file() {
    local file="$1"
    echo "### Go Analysis"
    
    # Check for package
    echo "- Package: $(grep "^package " "$file" | cut -d' ' -f2)"
    
    # Check for imports
    echo "- Import packages:"
    grep "^import (" "$file" -A 10 | grep "\"" | sed 's/^/  /'
    
    # Check for functions
    func_count=$(grep -c "^func " "$file")
    echo "- Functions defined: $func_count"
}
```

## Hook Testing Script

**`test-hooks.sh`:**
```bash
#!/bin/bash
# Test script for verifying hook functionality

echo "🧪 Testing Claude Code Hooks"
echo "============================"

# Test 1: Basic logging
echo "Test 1: Basic logging hook"
echo "Creating test file..."
echo "test content" > test-file.txt

if [[ -f ".claude/logs/simple.log" ]]; then
    echo "✅ Logging hook working"
    tail -1 .claude/logs/simple.log
else
    echo "❌ Logging hook not working"
fi

# Test 2: Security hook
echo -e "\nTest 2: Security hook"
echo "Testing dangerous command blocking..."
# This would be blocked by the security hook
echo "Attempt to run 'rm -rf test-file.txt' (should be blocked)"

# Test 3: File type specific
echo -e "\nTest 3: File type specific hooks"
echo "Creating test.py..."
echo "print('hello')" > test.py

if [[ -f ".claude/logs/simple.log" ]]; then
    echo "✅ File type hook processed"
    grep "test.py" .claude/logs/simple.log | tail -1
else
    echo "❌ File type hook not working"
fi

# Cleanup
rm -f test-file.txt test.py

echo -e "\n🎯 Hook testing complete!"
echo "Check .claude/logs/ for detailed logs"
echo "Check .claude/reports/ for analysis reports"
```

## Setup Instructions

1. **Create the hooks directory:**
   ```bash
   mkdir -p .claude/hooks
   mkdir -p .claude/logs
   mkdir -p .claude/reports
   ```

2. **Copy the hook scripts:**
   ```bash
   # Copy each hook script from the solutions above
   # Make them executable
   chmod +x .claude/hooks/*.sh
   ```

3. **Configure the hooks:**
   ```bash
   # Create or update .claude/settings.json
   # Use the configuration examples provided
   ```

4. **Test your hooks:**
   ```bash
   # Run the test script
   chmod +x test-hooks.sh
   ./test-hooks.sh
   ```

5. **Debug with Claude Code:**
   ```bash
   # Run Claude Code with debug mode
   claude --debug
   ```

## Common Issues and Solutions

### Issue 1: Hook not executing
- **Cause**: File not executable or wrong path
- **Solution**: `chmod +x .claude/hooks/your-hook.sh`

### Issue 2: JSON parsing errors
- **Cause**: Invalid JSON output from hook
- **Solution**: Always return valid JSON: `echo "{}"`

### Issue 3: Permission denied
- **Cause**: Hook script trying to access protected files
- **Solution**: Check file permissions and use appropriate user rights

### Issue 4: Hook blocking legitimate operations
- **Cause**: Overly restrictive security patterns
- **Solution**: Adjust regex patterns in security hooks

## Next Steps

After completing these exercises:
1. **Customize hooks** for your specific project needs
2. **Add more sophisticated analysis** based on your codebase
3. **Integrate with CI/CD** pipelines
4. **Share useful hooks** with your team
5. **Monitor hook performance** and optimize as needed

Remember: Hooks are powerful tools for automation, but they should enhance your workflow, not hinder it. Start simple and gradually add complexity as needed.