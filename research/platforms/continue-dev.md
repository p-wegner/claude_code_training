# Continue.dev - Platform Research Report

## Agent Research Template

**Agent Name**: Research Agent
**Research Focus**: AI Development Platforms - Continue.dev
**Date**: 2026-02-02
**Researcher**: Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: Continue
- **Repository/URL**: https://continue.dev | https://github.com/continuedev/continue
- **Latest Version**: 2026 release
- **Last Updated**: 2026
- **License**: Apache 2.0 (Open Source)
- **Maintainer**: Continue Dev, Inc.

### Tool Purpose
- **Primary Goal**: Open-source "Continuous AI" platform that integrates AI assistance directly into development workflows
- **Target Users**: Developers who want open-source, customizable AI assistance
- **Core Problem Solved**: Provides extensible AI coding assistance that can be self-hosted and customized

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| Chat | Ask questions and clarify code | High | 5 |
| Autocomplete | Intelligent code completion | High | 5 |
| Edit | Modify code sections inline | High | 5 |
| Codebase Context | Work with entire codebase | High | 5 |
| PR Review Agents | Automated pull request review | High | 5 |
| Cloud Agents | Async cloud-based agents | High | 5 |
| CLI Agents | Terminal-based AI agents | High | 5 |
| IDE Agents | VS Code and JetBrains integration | High | 5 |
| Custom Models | Support for open-source models | High | 5 |
| Extensions | Extensible architecture | High | 5 |

### Unique Selling Points
1. **Fully Open Source**: Apache 2.0 license - can be forked, modified, self-hosted
2. **Multiple Deployment Modes**: Cloud agents, CLI (headless), CLI (TUI), IDE extensions
3. **Open-Source Model Support**: Works with Ollama, DeepSeek, and other local models
4. **PR Review Automation**: Create agents that review every PR as GitHub checks
5. **Flexible Architecture**: Can be extended and customized for team workflows
6. **"Continuous AI" Philosophy**: AI assistance as natural and reliable as syntax highlighting

### Limitations
- **Setup Complexity**: More complex to set up than commercial tools
- **Documentation**: Open-source docs can be scattered
- **Self-Hosted Responsibility**: You manage infrastructure if self-hosting
- **Variable Quality**: Quality depends on configured models
- **Less Polished**: May not have the UI polish of commercial tools

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Intermediate to Advanced
- **Hands-on Potential**: High
- **Demo-readiness**: Yes
- **Setup Time**: 25 minutes

### Learning Objectives Addressed
- [x] **Spec-driven Development**: Can implement from specifications
- [x] **Multiagent Orchestration**: Multiple agent modes (cloud, CLI, IDE)
- [ ] **Git Worktrees Integration**: Not directly relevant
- [x] **Production Workflows**: CI/CD integration with PR review agents

### Recommended Workshop Module
- **Module Placement**: Open Source AI Development Tools
- **Duration**: 50 minutes
- **Prerequisites**: Comfortable with command line and configuration

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: Node.js (for CLI), VS Code/JetBrains (for IDE)
- **Dependencies**: npm, optionally Ollama for local models
- **Claude Code Version Required**: N/A (Competitor platform)
- **Platform Support**: Windows, macOS, Linux (via npm/IDEs)

### Integration Complexity
- **Installation Difficulty**: Medium - npm install or IDE extension
- **Configuration Required**: Moderate - Need to configure models and API keys
- **Compatibility Issues**: Some model configurations can be complex

### Performance Characteristics
- **Resource Usage**: Variable (depends on configured models)
- **Execution Speed**: Variable (depends on model choice)
- **Scalability**: Good - Can scale with infrastructure

---

## 5. PRICING

### Pricing Structure
- **Free**: Open source, self-hosted
- **Pro**: Available (pricing not publicly listed)
- **Enterprise**: Available with additional features

The open-source nature means the core functionality is free to use, with optional paid features for enterprise needs.

---

## 6. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Setting Up Continue with Local Models
**Difficulty**: Intermediate
**Time**: 30 minutes
**Description**: Install Continue and configure it with Ollama for local AI
**Learning Outcomes**:
- [x] Open-source AI development
- [x] Local model integration
- [x] Privacy-preserving AI workflows

### Scenario 2: PR Review Agent
**Difficulty**: Advanced
**Time**: 25 minutes
**Description**: Set up an automated PR review agent with Continue
**Learning Outcomes**:
- [x] CI/CD AI integration
- [x] Automated code review
- [x] GitHub Actions integration

---

## 7. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs This Tool | Weaknesses vs This Tool |
|------|----------------------|------------------------|
| Cursor | More polished, easier setup | Closed source, paid |
| Claude Code | Better terminal integration | Less IDE integration |
| Windsurf | Better agent features | Not open source |
| GitHub Copilot | Easier setup | Closed source, sends code to GitHub |

### Recommendation Score
- **For Beginners**: 5/10 - More setup required than commercial tools
- **For Intermediate**: 8/10 - Good balance of power and flexibility
- **For Advanced**: 9/10 - Highly customizable and extensible

---

## 8. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Installation and Usage
```bash
# Install Continue CLI
npm i -g @continuedev/cli

# Start Continue in TUI mode
cn

# Or use in headless mode for automation
cn --headless --prompt "Fix the failing tests"
```

### Code Example 2: VS Code Integration
```bash
# Install Continue extension in VS Code
# Search "Continue" in extensions marketplace

# Use Cmd+L to open Continue sidebar
# Chat with your codebase:
# "Explain how the authentication middleware works"
# "Refactor this function to be more readable"
```

### Code Example 3: PR Review Agent Setup
```yaml
# .continue/config.yml
agents:
  - name: pr-reviewer
    trigger: pull_request
    actions:
      - review_code
      - check_tests
      - suggest_improvements
```

### Code Example 4: Local Model Configuration
```json
// .continue/config.json
{
  "models": [{
    "title": "Ollama - DeepSeek Coder",
    "provider": "ollama",
    "model": "deepseek-coder:latest",
    "apiBase": "http://localhost:11434"
  }]
}
```

---

## 9. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: Open-Source AI Development Environment
**Objective**: Set up a complete open-source AI development workflow
**Steps**:
1. Install Continue CLI and VS Code extension
2. Configure with Ollama for local models
3. Complete a coding task using Continue
4. Compare results with different models
**Expected Output**: Functional local AI development setup

### Exercise 2: Custom Agent Creation
**Objective**: Create a custom AI agent for specific workflows
**Steps**:
1. Define a custom agent configuration
2. Set up triggers for the agent
3. Test the agent on sample tasks
4. Integrate with GitHub Actions
**Expected Output**: Working custom AI agent

### Exercise 3: Multi-Model Comparison
**Objective**: Compare different AI models through Continue
**Steps**:
1. Configure multiple model providers (OpenAI, Anthropic, Ollama)
2. Run same prompts across models
3. Compare quality and speed
4. Document findings
**Expected Output**: Understanding of model trade-offs

---

## 10. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Yes (for open-source/advanced track)
- **Confidence Level**: High
- **Reasoning**: Continue.dev is the leading open-source AI development platform, offering unique educational opportunities for understanding how AI tools work and can be customized.

### Suggested Implementation Approach
1. **Phase 1**: Introduction to open-source AI development
2. **Phase 2**: Hands-on setup and configuration
3. **Phase 3**: Custom agent creation and CI/CD integration

### Alternative Tools
- **If not this tool, consider**: Cursor for ease of use, Claude Code for terminal workflows
- **Reason**: Different tools for different needs and skill levels

---

## 11. RESEARCH METADATA

### Sources Consulted
- [Continue.dev Official](https://continue.dev)
- [Continue GitHub Repository](https://github.com/continuedev/continue)
- [Continue Documentation Resources](https://continue.dev/resources)

### Research Notes
- **Gaps Identified**: Detailed API documentation for custom extensions
- **Needs Verification**: Enterprise pricing and features
- **Community Sentiment**: Positive among open-source advocates

### Contact Points
- **Documentation**: https://docs.continue.dev
- **GitHub**: https://github.com/continuedev/continue
- **Community**: Discord available

---

## FINAL VERDICT

### Workshop Suitability Score: 8/10

**Breakdown**:
- Teaching Value: 9/10
- Hands-on Potential: 8/10
- Integration Ease: 6/10
- Production Relevance: 8/10
- Documentation Quality: 7/10

### One-Sentence Summary
Continue.dev is the premier open-source AI development platform, offering unparalleled flexibility and customization for developers who want to understand and extend their AI tools.

### Tags for Categorization
`open-source` `extensible` `self-hostable` `local-models` `multi-modal` `pr-review` `cli-based` `ide-integration` `apache-2.0`
