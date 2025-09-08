# Claude Code Output Formats Cheat Sheet

## Quick Reference

### Configuration Files
- **Global**: `~/.claude/settings.json`
- **Project**: `.claude/settings.json`
- **Session**: Temporary overrides

### Output Styles
- **structured**: Organized, hierarchical display
- **compact**: Minimal, concise output
- **markdown**: Standard markdown formatting
- **adaptive**: Context-aware formatting

## Basic Configuration

### Minimal Setup
```json
{
  "output": {
    "style": "structured",
    "format": "markdown"
  },
  "statusline": {
    "enabled": true
  }
}
```

### Complete Setup
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
    "position": "bottom",
    "refresh_rate": 1000,
    "show": ["model", "cost", "usage"]
  }
}
```

## Statusline Configuration

### Basic Statusline
```json
{
  "statusline": {
    "enabled": true,
    "position": "bottom",
    "refresh_rate": 1000,
    "show": ["model", "cost", "usage"]
  }
}
```

### Advanced Statusline
```json
{
  "statusline": {
    "enabled": true,
    "position": "bottom",
    "refresh_rate": 500,
    "show": ["model", "cost", "usage", "task_progress", "errors"],
    "custom_indicators": {
      "coding": "💻",
      "debugging": "🐛",
      "testing": "🧪",
      "deploying": "🚀",
      "reviewing": "👀"
    },
    "color_scheme": {
      "success": "#4CAF50",
      "error": "#f44336",
      "warning": "#ff9800",
      "info": "#2196F3"
    }
  }
}
```

## Custom Output Formats

### Code Review Format
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

### Test Results Format
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

### API Documentation Format
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

## Advanced Configuration

### Context-Aware Formatting
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

### Dynamic Output Adjustment
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

### Multi-Format Output
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

## Workflow-Specific Configurations

### Development Workflow
```json
{
  "output": {
    "style": "structured",
    "sections": {
      "code_review": {
        "show_diffs": true,
        "show_line_numbers": true
      },
      "test_results": {
        "show_pass_fail": true,
        "show_coverage": true
      }
    }
  },
  "statusline": {
    "enabled": true,
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

### Team Collaboration
```json
{
  "output": {
    "style": "structured",
    "sections": {
      "pull_requests": {
        "show_changes": true,
        "show_reviews": true,
        "show_checks": true
      },
      "team_tasks": {
        "show_assignees": true,
        "show_status": true,
        "show_deadlines": true
      }
    }
  },
  "statusline": {
    "enabled": true,
    "custom_indicators": {
      "code_review": "👀",
      "pull_request": "📤",
      "team_sync": "🤝",
      "meeting": "📅"
    }
  }
}
```

### Performance Monitoring
```json
{
  "output": {
    "style": "structured",
    "sections": {
      "performance_metrics": {
        "show_execution_time": true,
        "show_memory_usage": true,
        "show_cpu_usage": true
      },
      "error_analysis": {
        "show_error_count": true,
        "show_error_types": true,
        "show_error_locations": true
      }
    }
  },
  "statusline": {
    "enabled": true,
    "refresh_rate": 2000,
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

## Integration Configuration

### IDE Integration (VSCode)
```json
{
  "output": {
    "style": "structured",
    "ide_integration": {
      "vscode": {
        "format": "vscode_specific",
        "show_diagnostics": true,
        "show_quick_fixes": true,
        "show_code_actions": true
      }
    }
  }
}
```

### CI/CD Integration (GitHub Actions)
```json
{
  "output": {
    "style": "structured",
    "cicd": {
      "github_actions": {
        "format": "github_specific",
        "show_step_status": true,
        "show_artifacts": true,
        "show_logs": true,
        "show_annotations": true
      }
    }
  }
}
```

## Custom Indicators

### Development Indicators
```json
{
  "custom_indicators": {
    "coding": "💻",
    "debugging": "🐛",
    "testing": "🧪",
    "deploying": "🚀",
    "reviewing": "👀",
    "documenting": "📝",
    "refactoring": "🔧",
    "optimizing": "⚡"
  }
}
```

### Project Type Indicators
```json
{
  "custom_indicators": {
    "backend_dev": "⚙️",
    "frontend_dev": "🎨",
    "mobile_dev": "📱",
    "data_science": "📊",
    "devops": "🔧",
    "ai_ml": "🤖",
    "game_dev": "🎮",
    "blockchain": "⛓️"
  }
}
```

## Troubleshooting

### Common Issues

**Configuration Not Applied**
```bash
# Check file locations
ls -la ~/.claude/settings.json
ls -la .claude/settings.json

# Validate JSON syntax
cat .claude/settings.json | python -m json.tool
```

**Statusline Not Working**
```bash
# Check terminal compatibility
echo $TERM

# Verify statusline enabled
cat .claude/settings.json | grep -A 10 "statusline"
```

**Performance Issues**
```json
{
  "output": {
    "style": "compact",
    "statusline": {
      "refresh_rate": 2000,
      "show": ["model", "cost"]
    }
  }
}
```

## Command Line Usage

### Test Configuration
```bash
# Check configuration syntax
cat .claude/settings.json | python -m json.tool

# Test configuration loading
claude-code --help

# Verify statusline functionality
echo "Test statusline display" | claude-code
```

### Override Settings
```bash
# Use specific output style
claude-code --style structured
claude-code --style compact

# Test with different configurations
echo "Test output formatting" | claude-code --style structured
```

## Best Practices

### 1. Performance
- Use appropriate refresh rates (500-2000ms)
- Balance detail with performance
- Cache expensive formatting operations

### 2. Readability
- Use consistent formatting across projects
- Structure information hierarchically
- Highlight important information

### 3. Maintenance
- Document custom configurations
- Use version control for settings files
- Test configuration changes in isolation

### 4. Team Collaboration
- Share configuration files across team
- Use project-specific settings for consistency
- Document custom indicators and formats

## File Structure

```
.claude/
├── settings.json              # Main configuration
├── agents/                    # Sub-agents
│   ├── validation-gates.md
│   ├── code-reviewer.md
│   └── documentation-manager.md
├── commands/                  # Slash commands
│   ├── validate-feature.md
│   └── update-docs.md
└── hooks/                     # Event hooks
    └── post-tool-use.sh
```

## Quick Start

### 1. Create Basic Configuration
```bash
mkdir -p .claude
cat > .claude/settings.json << 'EOF'
{
  "output": {
    "style": "structured",
    "format": "markdown",
    "code_blocks": true
  },
  "statusline": {
    "enabled": true,
    "refresh_rate": 1000,
    "show": ["model", "cost", "usage"]
  }
}
EOF
```

### 2. Test Configuration
```bash
# Validate JSON
cat .claude/settings.json | python -m json.tool

# Test with Claude Code
echo "Test configuration" | claude-code
```

### 3. Customize for Your Workflow
```json
{
  "statusline": {
    "custom_indicators": {
      "your_task": "🎯",
      "your_project": "🚀"
    }
  }
}
```

## Resources

### Official Documentation
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Configuration Guide](https://docs.anthropic.com/claude-code/configuration)
- [Output Formats Reference](https://docs.anthropic.com/claude-code/output-formats)

### Community Examples
- [Configuration Templates](https://github.com/topics/claude-code-config)
- [Custom Formats](https://github.com/topics/claude-code-formats)
- [Statusline Examples](https://github.com/topics/claude-code-statusline)

---

**Remember**: Great output configurations enhance productivity. Start with basic setups and gradually add complexity as needed.