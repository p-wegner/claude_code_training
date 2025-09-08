# Module 4: Slash Commands - Practical Exercises

## Exercise Solutions and Templates

This directory contains practical exercises for mastering Claude Code slash commands. Each exercise builds on the previous one, progressing from basic command creation to advanced workflow automation.

## Exercise 1: Basic Command Creation

### Objective
Create your first slash command and understand the fundamentals.

### Files to Create
1. `.claude/commands/analyze-file.md` - Basic file analysis command
2. `.claude/commands/simple-log.md` - Simple logging command

### Solution Templates

**`.claude/commands/analyze-file.md`:**
```markdown
# Command: /analyze-file

## File path: $ARGUMENTS

Analyze the specified file and provide a comprehensive report.

## Analysis Steps
1. Check if the file exists at $ARGUMENTS
2. Determine file type and characteristics
3. Analyze content based on file type
4. Generate insights and recommendations

## Analysis by File Type
- **Code files** (.js, .py, .go, .java): Syntax, complexity, patterns
- **Configuration files** (.json, .yaml, .toml): Structure, validation, best practices
- **Documentation files** (.md, .txt): Content quality, structure, completeness
- **Data files** (.csv, .json): Data quality, structure, validation

## Output
Comprehensive analysis report with actionable insights.
```

**`.claude/commands/simple-log.md`:**
```markdown
# Command: /log-action

## Action to log: $ARGUMENTS

Log the specified action with timestamp and context.

## Logging Process
1. Get current timestamp
2. Extract action from $ARGUMENTS
3. Determine current context (file, project, etc.)
4. Append to log file with structured format

## Log Format
```
[YYYY-MM-DD HH:MM:SS] ACTION: [action] CONTEXT: [context] USER: [user]
```

## Output
Confirmation that action was logged successfully.
```

### Testing Steps
1. **Create commands directory:**
   ```bash
   mkdir -p .claude/commands
   ```

2. **Test the commands:**
   ```bash
   /analyze-file package.json
   /log-action "started new feature"
   /analyze-file README.md
   ```

## Exercise 2: Parameterized Command

### Objective
Create commands that handle multiple parameters and complex input.

### Files to Create
1. `.claude/commands/batch-process.md` - Batch file processing
2. `.claude/commands/code-review.md` - Code review with options

### Solution Templates

**`.claude/commands/batch-process.md`:**
```markdown
# Command: /batch-process

## File pattern and action: $ARGUMENTS

Process multiple files matching a pattern with the specified action.

## Argument Format
$ARGUMENTS should be: "pattern action [options]"
- pattern: File pattern (e.g., "src/**/*.js", "*.py")
- action: Action to perform (format, lint, analyze)
- options: Additional options (dry-run, verbose)

## Process Steps
1. Parse $ARGUMENTS to extract pattern, action, and options
2. Find all files matching the pattern
3. Validate action is supported
4. Process each file with the specified action
5. Report results and statistics

## Supported Actions
- **format**: Format code files (prettier, black, gofmt)
- **lint**: Run linters (eslint, ruff, go vet)
- **analyze**: Perform code analysis
- **validate**: Validate file syntax and structure

## Output
Processing summary with success/failure statistics.
```

**`.claude/commands/code-review.md`:**
```markdown
# Command: /code-review

## Target and options: $ARGUMENTS

Perform comprehensive code review with customizable options.

## Argument Parsing
Parse $ARGUMENTS for:
- Target: File, directory, or pattern to review
- Strictness: low, medium, high (default: medium)
- Focus: security, performance, style, all (default: all)
- Output format: text, json, markdown (default: markdown)

## Review Process
1. Locate target files based on pattern
2. Apply review rules based on strictness and focus
3. Generate findings with severity levels
4. Provide specific recommendations
5. Format output according to specified format

## Review Categories
- **Security**: Vulnerabilities, unsafe patterns, input validation
- **Performance**: Bottlenecks, inefficient algorithms, resource usage
- **Style**: Consistency, naming conventions, code structure
- **Best Practices**: Design patterns, error handling, documentation

## Output
Structured review report with actionable findings.
```

### Testing Steps
1. **Test with different patterns:**
   ```bash
   /batch-process "src/**/*.js format --verbose"
   /batch-process "*.py lint --dry-run"
   ```

2. **Test code review options:**
   ```bash
   /code-review "src/main.js security high json"
   /code-review "*.py performance medium"
   ```

## Exercise 3: Advanced Workflow Command

### Objective
Create complex multi-step workflow commands.

### Files to Create
1. `.claude/commands/develop-feature.md` - Complete feature development workflow
2. `.claude/commands/deploy-service.md` - Deployment workflow

### Solution Templates

**`.claude/commands/develop-feature.md`:**
```markdown
# Command: /develop-feature

## Feature name and description: $ARGUMENTS

Execute complete feature development workflow from planning to deployment.

## Argument Parsing
Extract from $ARGUMENTS:
- Feature name: Unique identifier for the feature
- Description: Brief description of what the feature does
- Options: Additional flags (test-only, docs-only, etc.)

## Workflow Phases

### 1. Planning Phase
- Analyze requirements and description
- Research existing codebase patterns
- Identify files to modify/create
- Create implementation plan using TodoWrite
- Estimate complexity and dependencies

### 2. Implementation Phase
- Create/modify source files following project patterns
- Write comprehensive tests for new functionality
- Update configuration files if needed
- Follow project coding standards and conventions

### 3. Validation Phase
- Run all tests to ensure no regressions
- Perform code quality checks (linting, type checking)
- Validate feature meets requirements
- Performance testing if applicable
- Security scanning for sensitive features

### 4. Documentation Phase
- Update README.md with new features
- Create/update API documentation
- Add usage examples
- Update changelog if applicable

### 5. Integration Phase
- Ensure feature integrates with existing codebase
- Check for breaking changes
- Update dependent components
- Verify CI/CD pipeline compatibility

## Quality Gates
- [ ] All tests pass (100% success rate)
- [ ] Code quality checks pass
- [ ] Documentation is complete and accurate
- [ ] No security vulnerabilities detected
- [ ] Performance benchmarks met
- [ ] Feature meets all requirements

## Integration with Subagents
- Use validation-gates subagent for comprehensive testing
- Use documentation-manager subagent for documentation updates
- Use security-auditor subagent for security reviews

## Output
Complete feature implementation with full validation and documentation.
```

**`.claude/commands/deploy-service.md`:**
```markdown
# Command: /deploy-service

## Service and environment: $ARGUMENTS

Deploy a service to the specified environment with safety checks.

## Argument Parsing
Parse $ARGUMENTS for:
- Service name: Name of the service to deploy
- Environment: target environment (dev, staging, prod)
- Version: Version to deploy (optional, uses latest if not specified)
- Options: Additional flags (dry-run, force, rollback)

## Deployment Workflow

### 1. Pre-deployment Checks
- Validate service configuration
- Check environment is ready and accessible
- Verify version exists and is valid
- Run pre-deployment tests
- Backup current deployment if applicable

### 2. Deployment Process
- Build service artifacts if needed
- Upload artifacts to target environment
- Update configuration and environment variables
- Start/restart service with new version
- Health check and validation

### 3. Post-deployment Validation
- Verify service is running and responsive
- Run smoke tests against deployed service
- Check monitoring and logging
- Validate performance characteristics
- Rollback if issues detected

### 4. Documentation and Reporting
- Update deployment records
- Generate deployment report
- Notify stakeholders of completion
- Document any issues or special considerations

## Safety Mechanisms
- **Health Checks**: Automated health validation
- **Rollback**: Automatic rollback on failure
- **Monitoring**: Post-deployment monitoring setup
- **Notifications**: Alert on deployment issues

## Output
Deployment status report with health metrics and any issues encountered.
```

### Testing Steps
1. **Test feature development:**
   ```bash
   /develop-feature "user-authentication" "Add JWT-based user authentication"
   /develop-feature "api-rate-limiting" "Implement rate limiting for API endpoints --test-only"
   ```

2. **Test deployment workflow:**
   ```bash
   /deploy-service "user-service" "staging v1.2.0"
   /deploy-service "api-gateway" "prod --dry-run"
   ```

## Exercise 4: Integration Command

### Objective
Create commands that integrate with external tools and services.

### Files to Create
1. `.claude/commands/github-integration.md` - GitHub workflow integration
2. `.claude/commands/ci-cd-status.md` - CI/CD pipeline monitoring

### Solution Templates

**`.claude/commands/github-integration.md`:**
```markdown
# Command: /github-integration

## Action and parameters: $ARGUMENTS

Integrate with GitHub for issue management, PR creation, and project tracking.

## Argument Parsing
Parse $ARGUMENTS for:
- Action: issue, pr, status, release
- Target: Issue number, PR number, or repository
- Options: Additional parameters based on action

## Supported Actions

### Issue Management
- Create issues from templates
- Update issue status and labels
- Add comments and assignees
- Link related issues

### Pull Request Management
- Create PRs with descriptions
- Update PR status and reviewers
- Add labels and milestones
- Merge PRs with checks

### Repository Status
- Get repository overview
- Check branch status
- List recent commits
- Monitor release status

### Release Management
- Create releases with changelog
- Update release notes
- Tag releases appropriately
- Notify stakeholders

## GitHub CLI Integration
All operations use the GitHub CLI (`gh`) for consistency:
- `gh issue create/ view/ update`
- `gh pr create/ status/ merge`
- `gh release create/ view`
- `gh repo view/ status`

## Output
Action-specific results with GitHub URLs and status information.
```

**`.claude/commands/ci-cd-status.md`:**
```markdown
# Command: /ci-cd-status

## Pipeline and branch: $ARGUMENTS

Check CI/CD pipeline status and generate reports.

## Argument Parsing
Parse $ARGUMENTS for:
- Pipeline: CI/CD pipeline name or ID
- Branch/PR: Branch name or PR number
- Options: verbose, history, notifications

## Status Checking Process

### 1. Pipeline Discovery
- Identify active CI/CD pipelines
- Determine pipeline provider (GitHub Actions, Jenkins, etc.)
- Locate relevant pipeline runs

### 2. Status Retrieval
- Get current pipeline status
- Check individual job statuses
- Identify failed steps and errors
- Collect timing and resource usage

### 3. Analysis and Reporting
- Analyze failure patterns
- Identify performance bottlenecks
- Generate health metrics
- Provide recommendations

### 4. Notification and Alerting
- Send status notifications
- Alert on critical failures
- Escalate persistent issues
- Generate summary reports

## Integration Points
- **GitHub Actions**: Check workflow runs and status
- **Jenkins**: Query build status and test results
- **CircleCI**: Monitor pipeline execution and artifacts
- **Custom Systems**: Generic REST API integration

## Output
Comprehensive pipeline status report with health metrics and recommendations.
```

### Testing Steps
1. **Test GitHub integration:**
   ```bash
   /github-integration "issue create --title 'Bug fix needed'"
   /github-integration "pr status main"
   /github-integration "release list"
   ```

2. **Test CI/CD monitoring:**
   ```bash
   /ci-cd-status "main-branch --verbose"
   /ci-cd-status "pr-123 --history"
   ```

## Exercise 5: Advanced Research Command

### Objective
Create a sophisticated research and analysis command using external resources.

### Files to Create
1. `.claude/commands/research-feature.md` - Comprehensive feature research

### Solution Template

**`.claude/commands/research-feature.md`:**
```markdown
# Command: /research-feature

## Feature description: $ARGUMENTS

Conduct comprehensive research for feature implementation with external resources.

## Research Process

### 1. Requirements Analysis
- Parse feature description from $ARGUMENTS
- Identify core functionality and requirements
- Determine technical constraints and dependencies
- Research industry best practices and standards

### 2. Codebase Research
- Search for similar existing functionality
- Identify relevant patterns and conventions
- Locate dependent components and services
- Analyze integration points and APIs

### 3. External Research
- Search for library documentation and examples
- Research implementation patterns on GitHub
- Find Stack Overflow solutions and discussions
- Locate official documentation and guides
- Identify common pitfalls and solutions

### 4. Technology Evaluation
- Evaluate suitable libraries and frameworks
- Compare different implementation approaches
- Assess performance and scalability implications
- Consider security and maintenance requirements

### 5. Implementation Planning
- Create detailed implementation approach
- Identify required files and modifications
- Plan testing strategy and validation
- Estimate complexity and development timeline

## Research Deliverables

### Research Report
- Executive summary of findings
- Recommended implementation approach
- Key libraries and dependencies
- Potential risks and mitigations
- Implementation timeline and milestones

### Code Examples
- Relevant code snippets and patterns
- Library usage examples
- Integration code samples
- Test pattern examples

### Resource Links
- Official documentation URLs
- Helpful GitHub repositories
- Stack Overflow discussions
- Blog posts and tutorials

## Web Search Integration
Use WebSearch tool to:
- Find current library documentation
- Research implementation patterns
- Locate code examples and tutorials
- Identify best practices and standards

## Output
Comprehensive research report with implementation guidance and resources.
```

### Testing Steps
1. **Test feature research:**
   ```bash
   /research-feature "implement real-time notifications using WebSockets"
   /research-feature "add machine learning model for user recommendations"
   ```

## Setup Instructions

### Create Commands Directory
```bash
mkdir -p .claude/commands
```

### Copy Command Templates
```bash
# Copy each command template from the solutions above
# Save as .claude/commands/command-name.md
```

### Test Commands
```bash
# Start Claude Code
claude

# Test each command
/analyze-file package.json
/batch-process "src/**/*.js format"
/develop-feature "test-feature" "A test feature"
```

## Common Issues and Solutions

### Issue 1: Command Not Found
- **Cause**: File not in `.claude/commands/` directory
- **Solution**: Verify file location and name

### Issue 2: Arguments Not Working
- **Cause**: Missing `$ARGUMENTS` variable or incorrect parsing
- **Solution**: Check `$ARGUMENTS` usage in command file

### Issue 3: Permission Errors
- **Cause**: Claude lacks required tool permissions
- **Solution**: Use `/permissions` to grant necessary permissions

### Issue 4: File Not Found
- **Cause**: Incorrect file paths or working directory
- **Solution**: Use absolute paths or check current directory

## Advanced Tips

### 1. Command Chaining
```bash
# Chain commands for complex workflows
/analyze-project
/plan-feature "user-auth"
/develop-feature "user-auth" "JWT authentication system"
```

### 2. Integration with Hooks
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/suggest-next-command.sh"
          }
        ]
      }
    ]
  }
}
```

### 3. Subagent Integration
```markdown
# Command: /comprehensive-review

## Target: $ARGUMENTS

1. Use validation-gates for testing
2. Use security-auditor for security checks
3. Use documentation-manager for docs
4. Use code-reviewer for code quality
```

## Next Steps

After completing these exercises:
1. **Customize commands** for your specific project needs
2. **Create command libraries** for common workflows
3. **Share commands** with your team
4. **Integrate with existing tools** and workflows
5. **Monitor command usage** and optimize performance

Remember: Great commands are those that save you time and reduce errors in your daily development workflow. Start with automating your most frequent manual tasks!