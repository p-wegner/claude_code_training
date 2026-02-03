# Agent Research Template

**Agent Name**: Claude Code Research Agent
**Research Focus**: myclaude Multi-Agent Orchestration System
**Date**: 2026-02-01
**Researcher**: Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: myclaude
- **Repository/URL**: https://github.com/cexll/myclaude
- **Latest Version**: 6.x
- **Last Updated**: 2026
- **License**: AGPL-3.0 (Commercial licensing available)
- **Maintainer**: cexll (evanxian9@gmail.com)

### Tool Purpose
- **Primary Goal**: Multi-agent orchestration workflow system for Claude Code with support for multiple backends
- **Target Users**: Teams doing AI-assisted development, organizations wanting structured AI workflows
- **Core Problem Solved**: Orchestrates multiple AI agents across different backends (Claude, Codex, Gemini, OpenCode) with specialized modules for different development workflows

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| do Module | 7-phase feature development with codeagent orchestration | High | 5 |
| omo Module | Multi-agent orchestration with intelligent routing | High | 5 |
| bmad Module | BMAD agile workflow with 6 specialized agents | Medium | 4 |
| sparv Module | SPARV workflow (Specify→Plan→Act→Review→Vault) | High | 5 |
| requirements Module | Lightweight requirements-to-code pipeline | High | 4 |
| Multi-Backend Support | Codex, Claude, Gemini, OpenCode integration | Medium | 4 |
| codeagent-wrapper | Executor for code editing and test execution | High | 4 |

### Unique Selling Points
1. **Multi-Backend Architecture**: Not Claude-specific - supports multiple AI coding assistants
2. **Specialized Modules**: Different workflows for different scenarios (bug fix vs feature development)
3. **Production-Tested**: Claims 90% test coverage
4. **Modular Installation**: Install only the modules you need
5. **AGPL with Commercial Option**: Open source but commercial licensing available

### Limitations
- **Limitation 1**: AGPL license may not be suitable for all commercial use
- **Limitation 2**: Requires multiple backend CLI tools to be installed
- **Limitation 2**: Complex installation with multiple components
- **Limitation 4**: Documentation is primarily in English/Chinese mix

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Advanced
- **Hands-on Potential**: Medium (requires significant setup)
- **Demo-readiness**: Partial (complex to demo quickly)
- **Setup Time**: 30-45 minutes

### Learning Objectives Addressed
- [x] **Spec-driven Development**: do module uses 7-phase spec-driven workflow
- [x] **Multiagent Orchestration**: Core feature across all modules
- [ ] **Git Worktrees Integration**: Not explicitly mentioned
- [x] **Production Workflows**: Designed for production development teams

### Recommended Workshop Module
- **Module Placement**: Module 8 - Advanced Multi-Agent Patterns
- **Duration**: 60-90 minutes
- **Prerequisites**: Claude Code mastery, comfort with CLI tools, understanding of agile workflows

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: Node.js (for wrapper)
- **Dependencies**:
  - Claude CLI (for Claude backend)
  - Codex CLI (for Codex backend)
  - Gemini CLI (for Gemini backend)
- **Claude Code Version Required**: 2.0+
- **Platform Support**: Windows/Linux/macOS

### Integration Complexity
- **Installation Difficulty**: Medium (npx based but requires configuration)
- **Configuration Required**: Extensive (config.json, backend setup)
- **Compatibility Issues**: Backend CLI version compatibility

### Performance Characteristics
- **Resource Usage**: Medium (multiple agent processes)
- **Execution Speed**: Medium (orchestration overhead)
- **Scalability**: Good (designed for team use)

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Feature Development with do Module
**Difficulty**: Advanced
**Time**: 60 minutes
**Description**: Use the `/do` command to implement a feature through 7 phases
**Learning Outcomes**:
- [x] Understand the 7-phase development workflow
- [x] See spec-driven development in action
- [x] Experience multi-agent coordination
- [ ] Learn to customize the workflow

### Scenario 2: Bug Investigation with omo Module
**Difficulty**: Advanced
**Time**: 45 minutes
**Description**: Use `/omo` for intelligent bug routing and fixing
**Learning Outcomes**:
- [x] See intelligent agent routing
- [x] Learn bug investigation workflows
- [x] Understand multi-backend execution

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs myclaude | Weaknesses vs myclaude |
|------|----------------------|------------------------|
| claude-flow | More Claude-specific, better docs | Single-backend focused |
| ccswarm | Rust-native, better performance | More complex setup |
| Native Claude Code | Simpler, official | No multi-backend, less structured |
| Custom Scripts | Full control | Reinventing the wheel |

### Recommendation Score
- **For Beginners**: 3/10 (Too complex)
- **For Intermediate**: 6/10 (Valuable but steep learning curve)
- **For Advanced**: 8/10 (Powerful orchestration capabilities)

---

## 7. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Usage
```bash
# Install myclaude
npx github:cexll/myclaude

# Use the do module for feature development
/do "Implement user authentication with JWT tokens"

# Use omo for bug investigation
/omo "Investigate why the login form submits twice"

# Use bmad for large enterprise projects
/bmad-pilot "Add payment processing feature"
```

### Code Example 2: Configuration
```json
// ~/.claude/config.json (or ccswarm.json equivalent)
{
  "modules": {
    "do": { "enabled": true },
    "omo": { "enabled": true },
    "bmad": { "enabled": false },
    "sparv": { "enabled": false }
  },
  "master_claude": {
    "role": "technical_lead",
    "quality_threshold": 0.85,
    "think_mode": "ultra_think"
  }
}
```

### Code Example 3: Multiagent Coordination
```bash
# The do module coordinates multiple agents:
# 1. Orchestrator (Claude Code) - Planning and delegation
# 2. Executor (codeagent-wrapper) - Code editing and tests

# Participants see:
# Phase 1: Requirements Analysis
# Phase 2: Design Specification
# Phase 3: Implementation Planning
# Phase 4: Core Implementation
# Phase 5: Testing Strategy
# Phase 6: Code Review
# Phase 7: Documentation
```

---

## 8. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: 7-Phase Feature Development
**Objective**: Experience the full do module workflow
**Steps**:
1. Run `/do` with a feature request
2. Observe each of the 7 phases
3. Review the generated specifications
4. Examine the implementation
5. Check test coverage
**Expected Output**: Complete feature with specs, code, tests, and docs

### Exercise 2: Backend Comparison
**Objective**: Compare different AI backends on the same task
**Steps**:
1. Configure multiple backends (Claude, Codex, Gemini)
2. Run the same task with different backends
3. Compare output quality and speed
4. Discuss pros/cons of each backend
**Expected Output**: Understanding of backend strengths

---

## 9. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Maybe (as advanced/demonstration only)
- **Confidence Level**: Medium
- **Reasoning**: Powerful but complex. Better as a demonstration of what's possible rather than hands-on for most participants. AGPL license also complicates workshop use.

### Suggested Implementation Approach
1. **Phase 1**: Demonstrate the do module workflow
2. **Phase 2**: Discuss the architecture and patterns
3. **Phase 3**: Optional hands-on for interested participants

### Alternative Tools
- **If not myclaude, consider**: Native Claude Code subagents (simpler), ccswarm (more modern), claude-flow (better documentation)
- **Reason**: Simpler alternatives are better for teaching fundamentals

---

## 10. RESEARCH METADATA

### Sources Consulted
- GitHub Repository: https://github.com/cexll/myclaude
- Documentation: README.md in repository
- Community Discussions: Reddit r/ClaudeAI

### Research Notes
- **Gaps Identified**: Limited independent documentation
- **Needs Verification**: Actual test coverage claims
- **Community Sentiment**: Positive but niche audience

### Contact Points
- **Documentation**: README in GitHub repo
- **Community**: GitHub Issues
- **Commercial Licensing**: evanxian9@gmail.com

---

## FINAL VERDICT

### Workshop Suitability Score: 6/10

**Breakdown**:
- Teaching Value: 7/10
- Hands-on Potential: 5/10
- Integration Ease: 4/10
- Production Relevance: 8/10
- Documentation Quality: 6/10

### One-Sentence Summary
myclaude is a powerful multi-agent orchestration system with sophisticated workflows but significant complexity and licensing considerations that limit its workshop suitability.

### Tags for Categorization
`[multiagent]` `[orchestration]` `[advanced]` `[production-ready]` `[multi-backend]` `[agpl]` `[enterprise]`
