# AutoCode CLI - Issue Tracking with AI Validation Pipeline

**Agent Name**: Research Agent
**Research Focus**: NPM Claude Code Orchestration Packages
**Date**: 2026-02-02
**Researcher**: Claude Code

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: @autocode-cli/autocode
- **Repository/URL**: https://www.npmjs.com/package/@autocode-cli/autocode
- **Latest Version**: 0.38.1
- **Last Updated**: January 19, 2026 (6 days ago)
- **License**: SEE LICENSE IN LICENSE
- **Maintainer**: evkoh

### Tool Purpose
- **Primary Goal**: Claude Code wrapper that orchestrates AI-generated code through a customizable validation pipeline with local SQLite database, web dashboard, real-time Kanban board, and REST API.
- **Target Users**: Teams needing issue tracking with AI automation, developers wanting validation pipelines, project managers needing visibility
- **Core Problem Solved**: Combines issue tracking, AI orchestration, automated validation, and testing in one local-first system with zero configuration.

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| **Claude Code Wrapper** | Orchestrates Claude AI through pipeline stages | High | 5 |
| **Customizable Pipeline** | Define validation columns (reviews, tests, deploys) | High | 5 |
| **Real-time Dashboard** | Web Kanban board with WebSocket updates | High | 5 |
| **Local SQLite Database** | Single file database with Prisma ORM | High | 5 |
| **AI Pipeline Generator** | Auto-detect stack and propose columns | Medium | 4 |
| **REST API** | Full API for integrations and automations | High | 5 |
| **Speech-to-Text** | Voice dictation for issue creation | Medium | 3 |
| **Multi-language** | English and French support | Low | 2 |
| **Issue Hierarchy** | Parent-child relationships | Medium | 4 |

### Unique Selling Points
1. **Local-First Architecture**: Single SQLite file, zero configuration, portable
2. **Versioned Pipelines**: Immutable pipeline versions with three segments (definition, action, finish)
3. **Speech-to-Text**: Voice dictation with AI autocomplete for quick issue creation
4. **Real-time Updates**: WebSocket-powered dashboard with live changes
5. **Column Catalog**: Reusable column templates across pipelines

### Limitations
- **SQLite Scaling**: Not designed for large team concurrent access
- **Single-User Focus**: Designed for individual or small team use
- **No Multi-Project**: One database per project
- **Speech Support Limited**: Chrome/Edge/Safari only, Firefox not supported
- **Learning Curve**: Pipeline versioning can be complex initially

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Intermediate
- **Hands-on Potential**: High
- **Demo-readiness**: Yes (web dashboard is very visual)
- **Setup Time**: 5-10 minutes

### Learning Objectives Addressed
- [x] **Spec-driven Development**: Pipeline enforces specification before implementation
- [x] **Production Workflows**: Real-world issue tracking and validation
- [ ] **Multiagent Orchestration**: Not a focus (single AI through pipeline)
- [ ] **Git Worktrees Integration**: Not directly supported

### Recommended Workshop Module
- **Module Placement**: Module 5 - Validation Pipelines and Quality Gates
- **Duration**: 45-60 minutes
- **Prerequisites**:
  - Claude Code basics
  - Understanding of issue tracking concepts
  - Basic CLI familiarity

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: Node.js 18+
- **Dependencies**: Prisma, SQLite, WebSocket
- **Claude Code Version Required**: Latest
- **Platform Support**: Windows/Linux/macOS

### Integration Complexity
- **Installation Difficulty**: Easy (npm install -g)
- **Configuration Required**: Minimal (autocode init)
- **Compatibility Issues**: Speech-to-text browser limitations

### Performance Characteristics
- **Resource Usage**: Low (local SQLite)
- **Execution Speed**: Fast (local database)
- **Scalability**: Medium (single-user focused)

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Setting Up a Validation Pipeline
**Difficulty**: Intermediate
**Time**: 30 minutes
**Description**: Create a custom pipeline with code review, testing, and deployment stages
**Learning Outcomes**:
- [x] Pipeline design principles
- [x] Quality gate configuration
- [x] Workflow automation

### Scenario 2: AI-Generated Issue Tracking
**Difficulty**: Beginner
**Time**: 20 minutes
**Description**: Use voice dictation and AI autocomplete to create and manage issues
**Learning Outcomes**:
- [x] Speech-to-text integration
- [x] AI autocomplete patterns
- [x] Issue hierarchy management

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs This Tool | Weaknesses vs This Tool |
|------|----------------------|------------------------|
| **claude-squad** | Better multi-agent orchestration | No issue tracking or pipeline |
| **Linear/Jira** | Cloud, multi-user, enterprise | No AI automation integration |
| **GitHub Projects** | Better GitHub integration | No AI validation pipeline |

### Recommendation Score
- **For Beginners**: 8/10 - Very accessible with visual dashboard
- **For Intermediate**: 8/10 - Good balance of features
- **For Advanced**: 6/10 - May be too simple for complex needs

---

## 7. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Setup
```bash
# Install globally
npm install -g @autocode-cli/autocode

# Initialize project structure
autocode init

# Create a new issue
autocode new "Implement user authentication" \
  "OAuth2 login with Google and GitHub" \
  --priority P1 \
  --labels "feature,auth" \
  --acceptance "Login button visible,OAuth flow works,Token stored"

# Start web dashboard
autocode serve
```

### Code Example 2: Pipeline Management
```bash
# List all pipelines
autocode pipeline list

# Show pipeline details
autocode pipeline show default

# Create a draft
autocode pipeline draft default

# Add a column to the draft
autocode pipeline add-column default review-security --segment action

# Finalize and activate
autocode pipeline finalize default --activate
```

### Code Example 3: API Usage
```bash
# List all issues
curl http://localhost:3000/api/issues

# Create an issue
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -d '{"title": "New feature", "priority": "P1", "labels": ["feature"]}'

# Move an issue
curl -X POST http://localhost:3000/api/issues/AC-000001/move \
  -H "Content-Type: application/json" \
  -d '{"column": "in-progress"}'
```

---

## 8. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: Custom Validation Pipeline
**Objective**: Design and implement a quality gate workflow
**Steps**:
1. Run `autocode init` in a project directory
2. Create a custom pipeline with 3 stages
3. Add columns for code review, testing, and security
4. Configure quality gates (test coverage 80%+)
5. Create and move issues through the pipeline
6. Start dashboard: `autocode serve`
**Expected Output**: Working Kanban board with validation pipeline

### Exercise 2: AI-Powered Issue Management
**Objective**: Experience AI-assisted issue tracking
**Steps**:
1. Start the web dashboard
2. Use voice dictation to create an issue (Chrome/Edge only)
3. Let AI autocomplete description and acceptance criteria
4. Create parent-child issue relationships
5. View issue history and execution logs
**Expected Output**: Comprehensive issue with AI-generated details

---

## 9. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Yes (for validation and workflow modules)
- **Confidence Level**: High
- **Reasoning**: Excellent teaching tool for validation pipelines and quality gates. Visual web dashboard makes concepts concrete. Local-first architecture means zero setup hassles in workshop environment.

### Suggested Implementation Approach
1. **Phase 1**: Quick init and dashboard tour (10 min)
2. **Phase 2**: Custom pipeline creation exercise (20 min)
3. **Phase 3**: Issue management with AI (15 min)
4. **Phase 4**: API integration demonstration (10 min)

### Alternative Tools
- **If not this tool, consider**: GitHub Projects (if cloud preferred), claude-squad (if multi-agent focus)
- **Reason**: AutoCode fills unique niche of local AI-powered validation pipelines

---

## 10. RESEARCH METADATA

### Sources Consulted
- NPM Package: https://www.npmjs.com/package/@autocode-cli/autocode
- Repository: gitlab.com/evkoh/autocode
- Documentation: Comprehensive README in package

### Research Notes
- **Gaps Identified**: No video tutorials found
- **Needs Verification**: Real-world production usage patterns
- **Community Sentiment**: Active development (6 days ago), 1,400 weekly downloads

### Contact Points
- **Documentation**: NPM package README (very comprehensive)
- **Repository**: gitlab.com/evkoh/autocode
- **Issues**: GitLab issue tracker

---

## FINAL VERDICT

### Workshop Suitability Score: 8.5/10

**Breakdown**:
- Teaching Value: 9/10 - Excellent for teaching validation pipelines
- Hands-on Potential: 9/10 - Visual dashboard + CLI = great engagement
- Integration Ease: 10/10 - Trivial setup, local-first
- Production Relevance: 8/10 - Real-world patterns but single-user limits
- Documentation Quality: 9/10 - Comprehensive README with examples

### One-Sentence Summary
AutoCode is an ideal workshop tool for teaching validation pipelines and quality gates, combining a visual web dashboard with AI-powered issue tracking in a local-first package that requires zero configuration and provides immediate visual feedback.

### Tags for Categorization
`[validation-pipeline]` `[quality-gates]` `[issue-tracking]` `[local-first]` `[intermediate]` `[web-dashboard]` `[ai-automation]` `[rest-api]`
