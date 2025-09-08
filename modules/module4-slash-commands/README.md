# Module 4: Claude Code Slash Commands - Practical Workflow Automation

## Learning Objectives
- Master Claude Code's slash command system and real-world applications
- Understand the `$ARGUMENTS` variable and parameter handling
- Create practical commands for common development workflows
- Implement advanced patterns like research, automation, and GitHub integration
- Organize and manage command libraries effectively
- Integrate commands with hooks and subagents for complete workflows

## What Are Claude Code Slash Commands?

Slash commands are **reusable, parameterized workflows** that automate common development tasks. They live in `.claude/commands/` and can be executed with `/command-name arguments`.

### Key Characteristics
- **Parameterized**: Use `$ARGUMENTS` to accept user input
- **Reusable**: Execute the same workflow multiple times
- **Shareable**: Commands work across teams and projects
- **Powerful**: Can use all Claude Code tools and capabilities
- **Integratable**: Work with hooks, subagents, and external tools

## Built-in Commands

Claude Code includes several built-in commands:

| Command | Purpose | Example Usage |
|---------|---------|---------------|
| `/init` | Generate initial CLAUDE.md | `/init` |
| `/permissions` | Manage tool permissions | `/permissions` |
| `/clear` | Clear context between tasks | `/clear` |
| `/agents` | Create and manage subagents | `/agents` |
| `/help` | Get help with Claude Code | `/help` |

## Command Structure and File Organization

### Directory Structure
```
.claude/
├── commands/
│   ├── analyze-performance.md
│   ├── code-review.md
│   ├── generate-prp.md
│   ├── fix-github-issue.md
│   └── prep-parallel.md
└── settings.json
```

### Command File Format
Commands are simple markdown files with a specific structure:

```markdown
# Command: /your-command-name

Brief description of what the command does.

## Parameters
- param1: Description of first parameter (optional)
- param2: Description of second parameter (optional)

## Steps/Logic
1. First step to execute
2. Second step with $ARGUMENTS
3. Third step using tools

## Expected Output
What the command should produce or accomplish.
```

## The $ARGUMENTS Variable

The `$ARGUMENTS` variable is the key to creating powerful, parameterized commands:

### Basic Usage
```markdown
# Command: /analyze-file

## File to analyze: $ARGUMENTS

Read the file at $ARGUMENTS and provide a comprehensive analysis...
```

**Usage:** `/analyze-file src/main.js`

### Multiple Arguments
```markdown
# Command: /compare-files

## Files to compare: $ARGUMENTS

Compare the files specified in $ARGUMENTS (space-separated)...
```

**Usage:** `/compare-files file1.js file2.js file3.js`

### Advanced Argument Processing
```markdown
# Command: /deploy-service

## Deployment parameters: $ARGUMENTS

Parse $ARGUMENTS for:
- Service name
- Environment (dev/staging/prod)
- Version tag
- Additional flags
```

## Practical Command Examples

### Example 1: Repository Analysis (primer)
**File: `.claude/commands/primer.md`**
```markdown
# Prime Context for Claude Code

Use the command `tree` to get an understanding of the project structure.

Start with reading the CLAUDE.md file if it exists to get an understanding of the project.

Read the README.md file to get an understanding of the project.

Read key files in the src/ or root directory

Explain back to me:
- Project structure
- Project purpose and goals  
- Key files and their purposes
- Any important dependencies
- Any important configuration files
```

**Usage:** `/primer`

### Example 2: Automated Code Review
**File: `.claude/commands/code-review.md`**
```markdown
# Code Review Command

## Target files/pattern: $ARGUMENTS

Perform comprehensive code review on files matching $ARGUMENTS.

## Review Process
1. Find all files matching the pattern
2. Read each file and analyze for:
   - Code style and consistency
   - Potential bugs and issues
   - Performance concerns
   - Security vulnerabilities
   - Best practices compliance

3. Generate detailed report with:
   - Overall quality assessment
   - Specific issues found
   - Recommended fixes
   - Priority levels (critical/high/medium/low)

## Output Format
Structured report with actionable recommendations.
```

**Usage:** `/code-review src/**/*.js` or `/code-review specific-file.py`

### Example 3: Performance Analysis
**File: `.claude/commands/analyze-performance.md`**
```markdown
# Performance Analysis Command

## Target: $ARGUMENTS

Analyze performance of the specified file, function, or endpoint.

## Analysis Steps
1. Locate and read the target code
2. Identify potential performance bottlenecks:
   - Database queries
   - Algorithmic complexity
   - Memory usage patterns
   - I/O operations
   - Network calls

3. Suggest optimizations:
   - Caching strategies
   - Algorithm improvements
   - Resource optimization
   - Query optimization

4. Create benchmark script if applicable

## Output
Performance report with specific, actionable recommendations.
```

### Example 4: Documentation Generation
**File: `.claude/commands/generate-docs.md`**
```markdown
# Generate Documentation

## Target: $ARGUMENTS

Generate comprehensive documentation for the specified module or component.

## Documentation Process
1. Analyze the target code structure
2. Extract:
   - Function signatures and purposes
   - Class definitions and relationships
   - Configuration options
   - Usage examples
   - Dependencies and requirements

3. Generate:
   - API documentation
   - Usage examples
   - Configuration guide
   - Troubleshooting section

4. Format as markdown with proper structure

## Output
Complete documentation ready for README.md or docs/ folder.
```

### Example 5: GitHub Issue Automation
**File: `.claude/commands/fix-github-issue.md`**
```markdown
# Fix GitHub Issue

## Issue number: $ARGUMENTS

Follow these steps to fix the specified GitHub issue:

1. Use `gh issue view $ARGUMENTS` to get issue details
2. Understand the problem and requirements
3. Search codebase for relevant files
4. Implement necessary changes
5. Write and run tests
6. Ensure code quality (linting, type checking)
7. Create descriptive commit
8. Push and create PR

Remember to use GitHub CLI (`gh`) for all GitHub operations.
```

**Usage:** `/fix-github-issue 123`

## Advanced Command Patterns

### Pattern 1: Research and Implementation (PRP Generation)
**File: `.claude/commands/generate-prp.md`**
```markdown
# Create PRP

## Feature file: $ARGUMENTS

Generate a complete PRP for general feature implementation with thorough research.

## Research Process
1. **Codebase Analysis**
   - Search for similar features/patterns
   - Identify files to reference
   - Note existing conventions
   - Check test patterns

2. **External Research**
   - Search for similar features online
   - Library documentation (include URLs)
   - Implementation examples
   - Best practices and pitfalls

3. **PRP Generation**
   - Include documentation URLs
   - Add real code examples
   - Note library quirks and gotchas
   - Reference existing patterns

## Output
Save as: `PRPs/{feature-name}.md`

Include validation gates and quality checklist.
```

### Pattern 2: Parallel Development Setup
**File: `.claude/commands/prep-parallel.md`**
```markdown
# Initialize parallel git worktree directories

## Feature name: $ARGUMENTS
## Number of worktrees: $ARGUMENTS

## Execute these commands
- Create directory `trees/`
- For i in NUMBER_OF_PARALLEL_WORKTREES:
  - Run `git worktree add -b FEATURE_NAME-i ./trees/FEATURE_NAME-i`
  - Validate with `cd trees/FEATURE_NAME-i && git ls-files`
- Run `git worktree list` to verify

## Purpose
Enable multiple Claude Code instances to work on the same feature in parallel.
```

**Usage:** `/prep-parallel user-auth 3`

### Pattern 3: Workflow Integration
**File: `.claude/commands/full-workflow.md`**
```markdown
# Complete Development Workflow

## Feature/task: $ARGUMENTS

Execute complete development workflow from planning to deployment.

## Workflow Steps
1. **Planning Phase**
   - Analyze requirements
   - Research existing patterns
   - Create implementation plan

2. **Implementation Phase**
   - Write code following patterns
   - Include comprehensive tests
   - Update documentation

3. **Validation Phase**
   - Run all tests
   - Check code quality
   - Performance testing if applicable

4. **Deployment Phase**
   - Prepare for deployment
   - Create PR with proper description
   - Ensure CI/CD checks pass

## Integration
- Use validation-gates subagent for testing
- Use documentation-manager for docs
- Follow all project conventions
```

## Creating Your Own Commands

### Step 1: Plan Your Command
Before creating a command, consider:
- **What problem does it solve?**
- **What parameters does it need?**
- **What tools will it use?**
- **What should the output look like?**

### Step 2: Create the Command File
```bash
# Create commands directory if needed
mkdir -p .claude/commands

# Create your command file
cat > .claude/commands/my-command.md << 'EOF'
# Command: /my-command

## Description of what this command does

## Parameters: $ARGUMENTS

## Steps to execute
1. First step
2. Second step using $ARGUMENTS
3. Third step

## Expected output
What this command produces
EOF
```

### Step 3: Test Your Command
```bash
# Test your command
claude
/my-command your-test-arguments
```

### Step 4: Iterate and Improve
- Test with different arguments
- Handle edge cases
- Add error handling
- Improve output formatting

## Command Organization Strategies

### By Function
```
.claude/commands/
├── analysis/          # Code analysis commands
├── development/      # Development workflow commands
├── deployment/       # Deployment commands
├── documentation/    # Documentation commands
└── utilities/        # Utility commands
```

### By Project Type
```
.claude/commands/
├── frontend/         # Frontend-specific commands
├── backend/          # Backend-specific commands
├── devops/           # DevOps and deployment commands
└── common/           # Shared commands
```

### By Complexity
```
.claude/commands/
├── simple/           # Single-purpose commands
├── workflow/         # Multi-step workflows
└── advanced/         # Complex automation commands
```

## Integration with Other Claude Code Features

### Commands + Hooks
Commands can trigger hooks and vice versa:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/suggest-command.sh",
            "description": "Suggest relevant commands after file writes"
          }
        ]
      }
    ]
  }
}
```

### Commands + Subagents
Commands can delegate to specialized subagents:

```markdown
# Command: /comprehensive-review

## Target: $ARGUMENTS

1. Use code-reviewer subagent for code analysis
2. Use security-auditor subagent for security checks
3. Use documentation-manager subagent for docs updates
4. Use validation-gates subagent for testing
```

### Commands + MCP Servers
Commands can leverage MCP server capabilities:

```markdown
# Command: /semantic-search

## Query: $ARGUMENTS

1. Use Serena MCP server for semantic code search
2. Analyze results for relevance
3. Provide context-aware suggestions
```

## Best Practices

### 1. Command Design
- **Single Responsibility**: Each command should have one clear purpose
- **Descriptive Names**: Use clear, intuitive command names
- **Consistent Interface**: Follow similar patterns across commands
- **Helpful Output**: Provide clear, actionable results

### 2. Parameter Handling
- **Validate Input**: Check if arguments are valid before processing
- **Provide Defaults**: Use sensible defaults when arguments are optional
- **Handle Edge Cases**: Account for missing, invalid, or unexpected arguments
- **Document Usage**: Include examples of how to use the command

### 3. Error Handling
- **Graceful Failure**: Handle errors gracefully and provide helpful messages
- **Recovery Suggestions**: Suggest how to fix common issues
- **Logging**: Include logging for debugging complex commands
- **Idempotency**: Design commands to be safe to run multiple times

### 4. Performance
- **Efficient Operations**: Avoid unnecessary file reads or expensive operations
- **Caching**: Cache results when appropriate
- **Progress Feedback**: Provide feedback for long-running operations
- **Resource Management**: Clean up temporary files and resources

## Advanced Techniques

### 1. Conditional Logic
```markdown
# Command: /smart-action

## Target: $ARGUMENTS

If $ARGUMENTS contains "test":
    Run test suite
Else if $ARGUMENTS contains "deploy":
    Run deployment pipeline
Else if $ARGUMENTS contains "docs":
    Generate documentation
Else:
    Show help and usage examples
```

### 2. File Pattern Matching
```markdown
# Command: /batch-process

## Pattern: $ARGUMENTS

1. Find all files matching $ARGUMENTS pattern
2. For each file:
   - Apply appropriate processing
   - Validate results
   - Log progress
3. Generate summary report
```

### 3. Integration with External Tools
```markdown
# Command: /security-scan

## Target: $ARGUMENTS

1. Run external security scanner on $ARGUMENTS
2. Parse scanner output
3. Generate prioritized remediation plan
4. Create tickets for critical issues
```

## Debugging Commands

### Common Issues
1. **Command not found**: Check file is in `.claude/commands/`
2. **Arguments not working**: Verify `$ARGUMENTS` usage
3. **Permission issues**: Ensure Claude has needed tool permissions
4. **File not found**: Use full paths or check working directory

### Debug Techniques
- **Test with simple arguments**: Start with basic test cases
- **Add logging**: Include progress messages in your commands
- **Use verbose mode**: Run Claude with debug flags
- **Check file permissions**: Ensure files are readable/writable

## Command Templates

### Template 1: Analysis Command
```markdown
# Command: /analyze-[target]

## Target: $ARGUMENTS

## Analysis Steps
1. Load and examine $ARGUMENTS
2. Apply domain-specific analysis
3. Identify issues and opportunities
4. Generate recommendations

## Output Format
Structured report with findings and actionable items.
```

### Template 2: Automation Command
```markdown
# Command: /automate-[task]

## Target: $ARGUMENTS

## Automation Steps
1. Validate input and environment
2. Execute automated workflow
3. Handle errors and edge cases
4. Report results and status

## Integration
Works with existing tools and processes.
```

### Template 3: Workflow Command
```markdown
# Command: /workflow-[name]

## Parameters: $ARGUMENTS

## Workflow Phases
1. **Preparation**: Setup and validation
2. **Execution**: Core workflow steps
3. **Validation**: Quality checks
4. **Finalization**: Cleanup and reporting

## Quality Gates
Must pass all validation checks before completion.
```

## Hands-on Exercises

### Exercise 1: Basic Command Creation
**Objective**: Create your first slash command.

**Tasks**:
1. **Create a file analyzer command**
   ```markdown
   # Command: /analyze-file
   ## File path: $ARGUMENTS
   # Read file and provide basic analysis
   ```

2. **Test with different file types**
   ```bash
   /analyze-file package.json
   /analyze-file src/main.js
   /analyze-file README.md
   ```

3. **Add error handling**
   ```markdown
   # Check if file exists before analyzing
   # Handle permission errors gracefully
   ```

### Exercise 2: Parameterized Command
**Objective**: Create a command with multiple parameters.

**Tasks**:
1. **Create a batch processor**
   ```markdown
   # Command: /batch-format
   ## File pattern: $ARGUMENTS
   # Format all files matching pattern
   ```

2. **Add validation**
   ```markdown
   # Validate file pattern is safe
   # Check formatting tools are available
   ```

3. **Add progress reporting**
   ```markdown
   # Show progress for large batches
   # Report success/failure summary
   ```

### Exercise 3: Advanced Workflow Command
**Objective**: Create a complex multi-step workflow.

**Tasks**:
1. **Create a feature development workflow**
   ```markdown
   # Command: /develop-feature
   ## Feature name: $ARGUMENTS
   # Complete feature development workflow
   ```

2. **Integrate with subagents**
   ```markdown
   # Use validation-gates for testing
   # Use documentation-manager for docs
   ```

3. **Add quality gates**
   ```markdown
   # Must pass tests, linting, and review
   # Generate deployment checklist
   ```

### Exercise 4: Integration Command
**Objective**: Create a command that integrates with external tools.

**Tasks**:
1. **Create a CI/CD integration**
   ```markdown
   # Command: /ci-status
   ## Branch/PR: $ARGUMENTS
   # Check CI/CD status and report
   ```

2. **Add GitHub integration**
   ```markdown
   # Use gh CLI for GitHub operations
   # Create issues/PRs as needed
   ```

3. **Add notifications**
   ```markdown
   # Send status notifications
   # Integrate with team communication tools
   ```

## Next Steps

After completing this module, you should be able to:
- ✅ Create effective slash commands for any workflow
- ✅ Handle parameters and user input effectively
- ✅ Integrate commands with hooks and subagents
- ✅ Build complex automation workflows
- ✅ Organize and share command libraries
- ✅ Debug and optimize command performance

**Pro Tip**: Start with simple, single-purpose commands and gradually build complexity. The most useful commands are often the ones that automate your most frequent manual tasks.

Continue to the next module to learn about subagents and specialized expertise.