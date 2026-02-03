# Sourcegraph Cody - Platform Research Report

## Agent Research Template

**Agent Name**: Research Agent
**Research Focus**: AI Development Platforms - Sourcegraph Cody
**Date**: 2026-02-02
**Researcher**: Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: Cody (Sourcegraph)
- **Repository/URL**: https://sourcegraph.com/cody
- **Latest Version**: 2026 release ( transitioning to "Amp")
- **Last Updated**: January 2026
- **License**: Proprietary (Free tier available)
- **Maintainer**: Sourcegraph

### Tool Purpose
- **Primary Goal**: Most powerful and accurate AI coding assistant for writing, fixing, and maintaining code in complex codebases
- **Target Users**: Enterprise teams with large, complex codebases (monorepos)
- **Core Problem Solved**: Understands entire codebases at scale, providing context-aware assistance across massive repositories

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| Codebase Understanding | Indexes entire project for context | High | 5 |
| Code Chat | Context-aware chat about code | High | 5 |
| Code Autocomplete | Intelligent completion | High | 4 |
| Code Search Integration | Leverages Sourcegraph's code search | High | 5 |
| Multi-Model Support | Claude, GPT-4, Gemini | High | 5 |
| Enterprise Security | Zero retention, no training | High | 5 |
| Large File Support | Handles largest files effortlessly | High | 5 |
| IDE Integration | VS Code, JetBrains | High | 5 |
| Code Host Integration | GitHub, GitLab, Bitbucket | High | 5 |

### Unique Selling Points
1. **Enterprise Scale**: Handles massive codebases (4/6 top US banks, 15+ US government agencies, 7/10 top public tech companies)
2. **Code Graph Intelligence**: Leverages Sourcegraph's code graph for deep understanding
3. **Amp Transition**: New generation coding agent being introduced
4. **Zero Data Retention**: Enterprise-grade security with no model training on customer code
5. **Context-Aware**: Understands dependencies, architecture, and workflows
6. **Production-Focused**: Built for real-world enterprise development

### Limitations
- **Setup Complexity**: More complex setup for large projects
- **Enterprise Pricing**: Can be expensive for smaller teams
- **Latency Issues**: Some users report slower response times compared to competitors
- **Less Focus on Completion**: More focused on chat/understanding than inline completion
- **Learning Curve**: More complex than simpler AI assistants

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Advanced
- **Hands-on Potential**: Medium
- **Demo-readiness**: Yes
- **Setup Time**: 30 minutes

### Learning Objectives Addressed
- [x] **Spec-driven Development**: Can implement from specifications
- [ ] **Multiagent Orchestration**: Limited agent capabilities
- [ ] **Git Worktrees Integration**: Not directly relevant
- [x] **Production Workflows**: Enterprise-scale development

### Recommended Workshop Module
- **Module Placement**: Enterprise AI Development
- **Duration**: 40 minutes
- **Prerequisites**: Experience with large codebases

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: IDE extension (VS Code, JetBrains) or web
- **Dependencies**: Sourcegraph account (can use existing Sourcegraph instance)
- **Claude Code Version Required**: N/A (Competitor platform)
- **Platform Support**: Windows, macOS, Linux (via IDEs)

### Integration Complexity
- **Installation Difficulty**: Medium - Requires Sourcegraph setup
- **Configuration Required**: Moderate to Extensive (for enterprise)
- **Compatibility Issues**: Some users report latency issues

### Performance Characteristics
- **Resource Usage**: Medium
- **Execution Speed**: Medium (some latency reported)
- **Scalability**: Excellent - Designed for massive codebases

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Large Codebase Navigation
**Difficulty**: Advanced
**Time**: 30 minutes
**Description**: Use Cody to understand and navigate a complex monorepo
**Learning Outcomes**:
- [x] Codebase understanding at scale
- [x] Context-aware queries
- [x] Cross-repository insights

### Scenario 2: Legacy Code Modernization
**Difficulty**: Advanced
**Time**: 25 minutes
**Description**: Use Cody to understand and refactor legacy code
**Learning Outcomes**:
- [x] Understanding unfamiliar code
- [x] Safe refactoring
- [x] Test generation

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs This Tool | Weaknesses vs This Tool |
|------|----------------------|------------------------|
| Cursor | Better UX, faster responses | Less scalable |
| Tabnine | Lower latency | Less codebase understanding |
| Windsurf | Better agent features | Less enterprise-focused |
| GitHub Copilot | Faster, cheaper | Can't handle large codebases as well |

### Recommendation Score
- **For Beginners**: 4/10 - Overkill and complex
- **For Intermediate**: 6/10 - Good for learning codebase understanding
- **For Advanced**: 9/10 - Excellent for large-scale development

---

## 7. PRICING STRUCTURE (2026)

### Individual Plans
- **Free**: $0
  - Basic coding assistance
  - Limited requests

- **Pro**: $9-$20/user/month
  - Unlimited code completion
  - Premium requests
  - Choice of LLM

### Enterprise Plans
- **Enterprise**: $49-$59/user/month
  - Enterprise security
  - Scalability
  - Priority support
  - Advanced features
  - SSO/SAML
  - Audit logs

---

## 8. NOTABLE CUSTOMERS

### Enterprise Adoption
According to Sourcegraph:
- 4 out of 6 top US banks
- 15+ US government agencies
- 7 out of 10 top public technology companies
- Coinbase (Principal Engineer: "Engineers are saving roughly 5-6 hours per week")

---

## 9. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Usage
```bash
# Install Cody extension in VS Code or JetBrains
# Sign in with Sourcegraph account

# Use Cmd+Shift+A to open Cody chat
# Ask: "How does the authentication flow work in this codebase?"
# Cody will explain using code context
```

### Code Example 2: Code Search
```bash
# Use Cody with Sourcegraph code search
# Query: "Where is the user validation logic implemented?"
# Cody will find and explain the relevant code
```

### Code Example 3: Multi-File Understanding
```bash
# Ask Cody about cross-cutting concerns
# Prompt: "Show me all places where the payment API is called"
# Cody will provide comprehensive results across the codebase
```

---

## 10. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: Understanding a Complex Codebase
**Objective**: Learn to use AI for codebase comprehension
**Steps**:
1. Open a medium-large open source project
2. Use Cody to understand the architecture
3. Ask about specific components
4. Have Cody explain relationships
**Expected Output**: Comprehensive understanding of project structure

### Exercise 2: Cross-Repository Development
**Objective**: Experience enterprise-scale AI assistance
**Steps**:
1. Set up Cody with multiple repositories
2. Ask cross-repo questions
3. Make changes across repositories
4. Verify consistency
**Expected Output**: Understanding of multi-repo workflows

---

## 11. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Yes (for enterprise/advanced track)
- **Confidence Level**: High
- **Reasoning**: Cody excels at enterprise-scale codebase understanding, making it ideal for teaching how AI can help with large, complex projects.

### Suggested Implementation Approach
1. **Phase 1**: Demonstrate codebase understanding capabilities
2. **Phase 2**: Hands-on with a moderately complex project
3. **Phase 3**: Compare with other tools for different use cases

### Alternative Tools
- **If not this tool, consider**: Cursor for better UX, Tabnine for lower latency
- **Reason**: Different tools excel at different aspects

---

## 12. RESEARCH METADATA

### Sources Consulted
- [Sourcegraph Cody Official](https://sourcegraph.com/cody)
- [Sourcegraph Pricing](https://sourcegraph.com/pricing)
- [Best AI Coding Assistants 2026](https://playcode.io/blog/best-ai-coding-assistants-2026)
- [Cody vs Cursor Comparison](https://www.devtoolsacademy.com/blog/cody-vs-cursor-choosing-the-right-ai-code-assistant-for-your-development-workflow/)

### Research Notes
- **Gaps Identified**: Specific API documentation for extending Cody
- **Needs Verification**: "Amp" next-generation agent details
- **Community Sentiment**: Positive for enterprise, mixed on latency

### Contact Points
- **Documentation**: https://sourcegraph.com/docs
- **Community**: Sourcegraph community
- **Issues**: Via Sourcegraph support

---

## FINAL VERDICT

### Workshop Suitability Score: 7/10

**Breakdown**:
- Teaching Value: 8/10
- Hands-on Potential: 6/10
- Integration Ease: 5/10
- Production Relevance: 10/10
- Documentation Quality: 7/10

### One-Sentence Summary
Cody is the premier AI assistant for enterprise-scale codebases, offering unparalleled codebase understanding but with higher complexity and latency than consumer-focused tools.

### Tags for Categorization
`enterprise-focused` `codebase-understanding` `large-scale` `monorepo` `code-graph` `security-first` `sourcegraph`
