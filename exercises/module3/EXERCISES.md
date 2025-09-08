# Module 3: Output Formats - Practical Exercises

## Exercise 1: Basic Output Configuration

### Objective
Set up basic output formatting for your development workflow and understand how different configurations affect Claude Code's output.

### Tasks

#### Task 1.1: Create Basic Configuration
Create a `.claude/settings.json` file with basic output formatting configuration.

**Instructions:**
1. Create the `.claude` directory if it doesn't exist
2. Create a `settings.json` file with basic output configuration
3. Include structured output style and basic statusline setup

**Expected Configuration:**
```json
{
  "output": {
    "style": "structured",
    "format": "markdown",
    "code_blocks": true,
    "syntax_highlighting": true
  },
  "statusline": {
    "enabled": true,
    "show_model": true,
    "show_cost": true,
    "show_usage": true,
    "position": "bottom"
  }
}
```

#### Task 1.2: Test Different Output Styles
Experiment with different output styles and observe how they affect the display.

**Instructions:**
1. Modify the `style` setting in your configuration
2. Test with values: "structured", "compact", "markdown"
3. Observe the differences in output formatting

**Testing Commands:**
```bash
# Create a test file
echo "def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)" > test_function.py

# Test different configurations
echo "Analyze this Python function for potential improvements" > test_request.txt
```

#### Task 1.3: Configure Statusline
Set up and customize the statusline for real-time feedback.

**Instructions:**
1. Enable the statusline with custom refresh rate
2. Add custom indicators for different tasks
3. Test the statusline functionality

**Configuration Example:**
```json
{
  "statusline": {
    "enabled": true,
    "refresh_rate": 1000,
    "show": ["model", "cost", "usage", "task_progress"],
    "custom_indicators": {
      "coding": "💻",
      "debugging": "🐛",
      "testing": "🧪"
    }
  }
}
```

### Success Criteria
- [ ] Configuration file created successfully
- [ ] Different output styles tested and understood
- [ ] Statusline configured and working
- [ ] Custom indicators display correctly

---

## Exercise 2: Custom Output Formats

### Objective
Create custom output formats for specific development tasks and understand how to tailor output to different contexts.

### Tasks

#### Task 2.1: Code Review Output Format
Create a specialized output format for code reviews.

**Instructions:**
1. Configure output formatting for code review scenarios
2. Include diff display, line numbers, and syntax highlighting
3. Test with actual code files

**Configuration:**
```json
{
  "output": {
    "style": "structured",
    "sections": {
      "code_review": {
        "show_diffs": true,
        "show_line_numbers": true,
        "highlight_changes": true,
        "format": "side_by_side"
      }
    }
  }
}
```

#### Task 2.2: Test Results Formatting
Create a specialized format for displaying test results.

**Instructions:**
1. Configure test results output format
2. Include pass/fail status, coverage, and execution time
3. Test with actual test files

**Configuration:**
```json
{
  "output": {
    "style": "structured",
    "sections": {
      "test_results": {
        "show_pass_fail": true,
        "show_coverage": true,
        "show_execution_time": true,
        "format": "table"
      }
    }
  }
}
```

#### Task 2.3: API Documentation Format
Create a format for API documentation generation.

**Instructions:**
1. Configure API documentation output format
2. Include method, endpoint, parameters, and response format
3. Test with API endpoint files

**Configuration:**
```json
{
  "output": {
    "style": "structured",
    "sections": {
      "api_docs": {
        "show_method": true,
        "show_endpoint": true,
        "show_parameters": true,
        "show_response_format": true,
        "include_examples": true
      }
    }
  }
}
```

### Success Criteria
- [ ] Code review format created and tested
- [ ] Test results format working correctly
- [ ] API documentation format functional
- [ ] All formats display appropriate information

---

## Exercise 3: Statusline Customization

### Objective
Customize the statusline for specific development workflows and understand how to create effective status indicators.

### Tasks

#### Task 3.1: Development-Focused Statusline
Create a statusline optimized for development work.

**Instructions:**
1. Configure statusline for development tasks
2. Include relevant indicators for different development activities
3. Set appropriate refresh rate

**Configuration:**
```json
{
  "statusline": {
    "enabled": true,
    "refresh_rate": 500,
    "show": ["model", "cost", "usage", "current_task", "file_count"],
    "custom_indicators": {
      "backend_dev": "⚙️",
      "frontend_dev": "🎨",
      "database_work": "🗄️",
      "api_work": "🔌",
      "testing": "🧪",
      "deployment": "🚀"
    }
  }
}
```

#### Task 3.2: Team Collaboration Statusline
Create a statusline for team collaboration scenarios.

**Instructions:**
1. Configure statusline for team collaboration
2. Include indicators for code reviews, pull requests, and team sync
3. Test with team-related activities

**Configuration:**
```json
{
  "statusline": {
    "enabled": true,
    "refresh_rate": 1000,
    "show": ["model", "cost", "usage", "team_tasks", "pull_requests"],
    "custom_indicators": {
      "code_review": "👀",
      "pull_request": "📤",
      "team_sync": "🤝",
      "deployment": "🚀",
      "meeting": "📅"
    }
  }
}
```

#### Task 3.3: Performance Monitoring Statusline
Create a statusline for performance monitoring.

**Instructions:**
1. Configure statusline for performance monitoring
2. Include indicators for optimization, profiling, and benchmarking
3. Set appropriate refresh rate for performance data

**Configuration:**
```json
{
  "statusline": {
    "enabled": true,
    "refresh_rate": 2000,
    "show": ["model", "cost", "usage", "performance_metrics", "error_rate"],
    "custom_indicators": {
      "optimizing": "⚡",
      "profiling": "📊",
      "benchmarking": "⏱️",
      "memory_analysis": "🧠",
      "error_investigation": "🔍"
    }
  }
}
```

### Success Criteria
- [ ] Development statusline configured and working
- [ ] Team collaboration statusline functional
- [ ] Performance monitoring statusline operational
- [ ] All statuslines update at appropriate intervals

---

## Exercise 4: Advanced Output Configuration

### Objective
Create advanced output configurations with context-aware formatting and dynamic adjustments.

### Tasks

#### Task 4.1: Context-Aware Formatting
Create output formats that adapt to different file types and contexts.

**Instructions:**
1. Configure context-aware output formatting
2. Create specific formats for Python and JavaScript files
3. Test with different file types

**Configuration:**
```json
{
  "output": {
    "style": "adaptive",
    "context_aware": {
      "file_type": {
        "python": {
          "show_type_hints": true,
          "show_docstrings": true,
          "format": "python_specific"
        },
        "javascript": {
          "show_types": true,
          "show_jsdoc": true,
          "format": "js_specific"
        }
      }
    }
  }
}
```

#### Task 4.2: Dynamic Output Adjustment
Create output formats that adjust based on complexity and screen size.

**Instructions:**
1. Configure dynamic output adjustment
2. Set different formats for different complexity levels
3. Test with various scenarios

**Configuration:**
```json
{
  "output": {
    "style": "dynamic",
    "adaptive": {
      "complexity": {
        "simple": "minimal",
        "moderate": "standard",
        "complex": "detailed"
      }
    }
  }
}
```

#### Task 4.3: Multi-Format Output
Create configurations that support multiple output formats.

**Instructions:**
1. Configure multi-format output support
2. Set primary and secondary formats
3. Configure export formats

**Configuration:**
```json
{
  "output": {
    "style": "multi_format",
    "formats": {
      "primary": "structured",
      "secondary": "json",
      "export_formats": ["markdown", "html", "pdf"]
    },
    "selection_criteria": {
      "interactive": "structured",
      "api": "json",
      "documentation": "markdown",
      "report": "pdf"
    }
  }
}
```

### Success Criteria
- [ ] Context-aware formatting working correctly
- [ ] Dynamic output adjustment functional
- [ ] Multi-format output configuration complete
- [ ] All advanced features tested and working

---

## Exercise 5: Integration and Troubleshooting

### Objective
Integrate output formats with other tools and troubleshoot common configuration issues.

### Tasks

#### Task 5.1: IDE Integration
Configure output formats for IDE integration.

**Instructions:**
1. Configure output formatting for VSCode or IntelliJ
2. Include IDE-specific features
3. Test with IDE integration

**Configuration:**
```json
{
  "output": {
    "style": "structured",
    "ide_integration": {
      "vscode": {
        "format": "vscode_specific",
        "show_diagnostics": true,
        "show_quick_fixes": true
      }
    }
  }
}
```

#### Task 5.2: CI/CD Integration
Configure output formats for CI/CD pipelines.

**Instructions:**
1. Configure output formatting for GitHub Actions or Jenkins
2. Include pipeline-specific features
3. Test with CI/CD scenarios

**Configuration:**
```json
{
  "output": {
    "style": "structured",
    "cicd": {
      "github_actions": {
        "format": "github_specific",
        "show_step_status": true,
        "show_artifacts": true
      }
    }
  }
}
```

#### Task 5.3: Troubleshooting Common Issues
Create solutions for common output format configuration issues.

**Instructions:**
1. Identify common configuration problems
2. Create troubleshooting scripts
3. Document solutions

**Troubleshooting Commands:**
```bash
# Verify configuration file exists
ls -la ~/.claude/settings.json
ls -la .claude/settings.json

# Validate JSON syntax
cat .claude/settings.json | python -m json.tool

# Check terminal compatibility
echo $TERM

# Verify configuration is loaded
claude-code --version
```

### Success Criteria
- [ ] IDE integration configured and working
- [ ] CI/CD integration functional
- [ ] Troubleshooting solutions documented
- [ ] Common issues resolved

---

## Exercise Solutions and Verification

### Verification Commands
```bash
# Check configuration syntax
cat .claude/settings.json | python -m json.tool

# Test configuration loading
claude-code --help

# Verify statusline functionality
echo "Test statusline display" | claude-code

# Test different output formats
echo "Test output formatting" | claude-code --style structured
echo "Test output formatting" | claude-code --style compact
```

### Common Issues and Solutions
1. **Configuration Not Applied**
   - Check file location: `~/.claude/settings.json` or `.claude/settings.json`
   - Validate JSON syntax
   - Restart Claude Code after changes

2. **Statusline Not Working**
   - Verify terminal compatibility
   - Check if statusline is enabled
   - Adjust refresh rate if needed

3. **Output Format Inconsistencies**
   - Standardize configuration across environments
   - Clear cache if needed
   - Verify file permissions

### Next Steps
After completing these exercises, you should be able to:
- Configure Claude Code output formats for various scenarios
- Create custom output formats for specific development tasks
- Set up and customize statusline for different workflows
- Troubleshoot common configuration issues
- Integrate output formats with other development tools