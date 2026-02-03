# Advanced Claude Code Workshop - 2-Day Roadmap

**Workshop Title**: Advanced Agentic Coding with Claude Code
**Target Audience**: Developers with Claude Code experience
**Duration**: 2 Days (12 hours total)
**Last Updated**: February 2026

---

## Executive Summary

This advanced workshop builds on foundational Claude Code knowledge to teach production-ready patterns for enterprise development. Participants will learn MCP integration, skills development, subagent orchestration, spec-driven development, and enterprise automation patterns.

### Learning Objectives

By the end of this workshop, participants will be able to:

1. Design and implement custom skills for reusable behaviors
2. Integrate external tools via MCP for complete workflows
3. Orchestrate multiagent systems for complex tasks
4. Apply spec-driven development for predictable AI code generation
5. Build production automations using hooks
6. Implement enterprise-grade governance and configuration

---

## Prerequisites

### Required Knowledge
- [ ] Completed "Introduction to Claude Code" workshop OR
- [ ] 1+ months of daily Claude Code usage
- [ ] Familiarity with command line interface
- [ ] Basic understanding of YAML and markdown
- [ ] Git workflow experience

### Technical Requirements
- [ ] Claude Code CLI installed and authenticated
- [ ] GitHub account (for MCP exercises)
- [ ] Code editor (VS Code recommended)
- [ ] Node.js 18+ or Python 3.9+
- [ ] Git installed

### Pre-Workshop Setup (30 minutes)
```bash
# Verify installation
claude --version

# Create workshop directory
mkdir claude-advanced-workshop
cd claude-advanced-workshop

# Clone exercise repository
git clone https://github.com/your-org/exercises.git

# Setup environment
npm install  # or python setup
```

---

## Day 1: Foundation & Core Skills

### Module 1: Welcome & Context (30 minutes)

**Learning Objectives**
- Understand workshop scope and goals
- Assess current Claude Code proficiency
- Set expectations for advanced topics

**Agenda**
1. Introduction (5 min)
   - Instructor introductions
   - Participant backgrounds
   - Workshop overview

2. Current Landscape (10 min)
   - 2025-2026 AI coding trends
   - Enterprise adoption patterns
   - Where Claude Code fits

3. Proficiency Check (10 min)
   - Quick hands-on assessment
   - Identify knowledge gaps
   - Adjust pacing if needed

4. Logistics (5 min)
   - Schedule overview
   - Q&A process
   - Resources location

**Deliverable**: Participant profile with learning goals

---

### Module 2: Claude Code Architecture Deep Dive (60 minutes)

**Learning Objectives**
- Understand Claude Code's internal architecture
- Learn context window management strategies
- Master compaction and memory patterns

**Topics Covered**
```
Architecture Overview (15 min)
├─ Session model and lifecycle
├─ Context window structure
├─ Tool execution flow
└─ State management

Context Management (20 min)
├─ CLAUDE.md patterns
├─ Compaction strategies
├─ Memory hierarchies
└─ Context injection techniques

Hands-on: Context Optimization (25 min)
├─ Exercise: Analyze current context
├─ Implement CLAUDE.md improvements
├─ Test compaction behavior
└─ Measure effectiveness
```

**Exercise**: Context Optimization Challenge
- Task: Optimize a bloated conversation
- Tools: `/compact`, `/context`, CLAUDE.md
- Success: Reduce context by 50% while maintaining effectiveness

---

### Module 3: Advanced Skills Development (90 minutes)

**Learning Objectives**
- Design effective skills with proper frontmatter
- Implement skills with supporting files and scripts
- Control skill invocation and tool access
- Create visual output generation skills

**Topics Covered**
```
Skill Architecture (20 min)
├─ Frontmatter reference
├─ Skill types (reference vs task)
├─ Invocation control patterns
└─ Tool restriction strategies

Advanced Patterns (25 min)
├─ Argument handling ($ARGUMENTS)
├─ Dynamic context injection (!commands)
├─ Supporting files organization
└─ Script bundling

Hands-on: Build Production Skills (45 min)
├─ Exercise 1: Code review skill (15 min)
├─ Exercise 2: Testing skill (15 min)
├─ Exercise 3: Visual generator (15 min)
```

**Exercises**

1. **Code Review Skill** (15 min)
   ```markdown
   ---
   name: pr-review
   description: Review code against team standards
   disable-model-invocation: true
   argument-hint: [pr-number]
   ---
   Review PR $ARGUMENTS:
   1. Fetch PR diff
   2. Check against standards in docs/standards.md
   3. Verify tests present
   4. Check documentation
   5. Provide structured feedback
   ```

2. **Testing Assistant** (15 min)
   ```markdown
   ---
   name: test-this
   description: Generate comprehensive tests
   allowed-tools: Read, Grep, Bash(jest *)
   ---
   Generate tests for $ARGUMENTS:
   - Unit tests for all functions
   - Edge cases covered
   - Integration tests
   - Follow patterns in tests/
   ```

3. **Visual Codebase Explorer** (15 min)
   - Bundle Python script for HTML generation
   - Use `allowed-tools` for security
   - Generate interactive tree visualization
   - Open in browser

**Deliverable**: Three production-ready skills

---

### Module 4: Spec-Driven Development (60 minutes)

**Learning Objectives**
- Understand why specs matter for AI coding
- Write effective specifications
- Implement features from specs
- Validate against acceptance criteria

**Topics Covered**
```
Why Spec-Driven? (10 min)
├─ AI unpredictability problem
├─ Benefits of structured specs
├─ Enterprise adoption patterns
└─ 2025 trend analysis

Spec Writing (20 min)
├─ Spec structure and format
├─ Requirements vs implementation
├─ Acceptance criteria
└─ Technical notes

Hands-on: Spec-to-Code (30 min)
├─ Write spec for feature
├─ Implement with Claude
├─ Validate against criteria
└─ Iterate on spec
```

**Exercise**: Feature from Spec
```markdown
# Feature: User Authentication with Roles

## Overview
Add role-based access control (RBAC) to existing auth system

## Requirements
1. Define roles: admin, editor, viewer
2. Role assignment in user profile
3. Permission checks on protected routes
4. Admin UI for role management

## Acceptance Criteria
- [ ] Users have role field (default: viewer)
- [ ] Protected routes return 403 without permission
- [ ] Admin can assign roles
- [ ] Role changes take effect immediately
- [ ] Audit log for role changes

## Technical Notes
- Use middleware for permission checks
- Store roles in user.profile.role
- Permissions defined in config/permissions.js
- Audit logs to audit.role_changes table
```

**Deliverable**: Working RBAC implementation from spec

---

## Day 2: Advanced Patterns & Production

### Module 5: MCP Integration (90 minutes)

**Learning Objectives**
- Understand MCP architecture and benefits
- Connect to external services (GitHub, databases)
- Use MCP resources in workflows
- Manage enterprise MCP configuration

**Topics Covered**
```
MCP Fundamentals (20 min)
├─ What is MCP?
├─ Transport types (HTTP, SSE, stdio)
├─ Server scopes (local, project, user)
└─ Resource references

Integration Patterns (25 min)
├─ OAuth authentication
├─ Environment variable handling
├─ Multiple server management
└─ Tool search optimization

Hands-on: MCP Workflows (45 min)
├─ Exercise 1: GitHub integration (15 min)
├─ Exercise 2: Database queries (15 min)
├─ Exercise 3: Multi-server workflow (15 min)
```

**Exercises**

1. **GitHub Integration** (15 min)
   ```bash
   # Add GitHub MCP server
   claude mcp add --transport http github \
     https://api.githubcopilot.com/mcp/

   # Authenticate
   /mcp
   # Select: Authenticate

   # Use it
   "Show me my open PRs"
   "Review PR #123"
   "Create issue for bug we found"
   ```

2. **Database Query Assistant** (15 min)
   ```bash
   # Add database server
   claude mcp add --transport stdio \
     --env DATABASE_URL="postgresql://..." \
     db -- npx -y @bytebase/dbhub

   # Query naturally
   "What's our total revenue this month?"
   "Show users who haven't logged in 90 days"
   "What's the most common error?"
   ```

3. **Multi-Server Automation** (15 min)
   - Connect GitHub + Sentry + Slack
   - Create workflow: PR → Check errors → Notify
   - Build end-to-end automation

**Deliverable**: Working multi-server integration

---

### Module 6: Subagents & Orchestration (60 minutes)

**Learning Objectives**
- Understand subagent types and use cases
- Delegate tasks to specialized agents
- Design multiagent workflows
- Handle agent coordination and communication

**Topics Covered**
```
Subagent Fundamentals (15 min)
├─ Why subagents?
├─ Built-in agent types (Explore, Plan, etc.)
├─ Forked contexts
└─ Agent lifecycle

Orchestration Patterns (20 min)
├─ Sequential delegation
├─ Parallel execution
├─ Agent specialization
└─ Result aggregation

Hands-on: Multiagent System (25 min)
├─ Design agent roles
├─ Implement coordination
├─ Test workflows
└─ Measure performance
```

**Exercise**: Multiagent Code Review System
```yaml
Architecture:
  Explore Agent:
    role: Codebase analysis
    task: Find relevant files and patterns

  Plan Agent:
    role: Review planning
    task: Design review approach

  Code Agent:
    role: Implementation review
    task: Check code quality and patterns

  Test Agent:
    role: Test validation
    task: Verify test coverage

  Coordinator:
    role: Result aggregation
    task: Compile findings and recommendations
```

**Deliverable**: Working multiagent review system

---

### Module 7: Hooks & Automation (90 minutes)

**Learning Objectives**
- Master hook events and lifecycle
- Build command, prompt, and agent hooks
- Create production automations
- Implement enterprise governance with hooks

**Topics Covered**
```
Hook Fundamentals (20 min)
├─ Hook events and when they fire
├─ Hook types (command, prompt, agent)
├─ Input/output handling
└─ Matcher patterns

Automation Patterns (25 min)
├─ Code formatting
├─ File protection
├─ Notification systems
└─ Validation workflows

Enterprise Governance (20 min)
├─ Managed configuration
├─ Allowlists/denylists
└─ Policy enforcement

Hands-on: Production Automations (25 min)
├─ Exercise 1: Auto-formatting (10 min)
├─ Exercise 2: Protected files (10 min)
├─ Exercise 3: Notification hook (5 min)
```

**Exercises**

1. **Auto-Format Hook**
   ```json
   {
     "hooks": {
       "PostToolUse": [{
         "matcher": "Edit|Write",
         "hooks": [{
           "type": "command",
           "command": "jq -r '.tool_input.file_path' | xargs prettier --write"
         }]
       }]
     }
   }
   ```

2. **Protected Files Hook**
   ```bash
   # scripts/protect-files.sh
   PROTECTED_FILES=('.env' 'package-lock.json' '.git/')

   INPUT=$(cat)
   FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path')

   for pattern in "${PROTECTED_FILES[@]}"; do
     if [[ "$FILE" == *"$pattern"* ]]; then
       echo "Blocked: $FILE is protected" >&2
       exit 2
     fi
   done

   exit 0
   ```

3. **Notification Hook**
   ```json
   {
     "hooks": {
       "Notification": [{
         "hooks": [{
           "type": "command",
           "command": "notify-send 'Claude Code' 'Needs your attention'"
         }]
       }]
     }
   }
   ```

**Deliverable**: Three production hooks

---

### Module 8: Enterprise Patterns & Wrap-up (60 minutes)

**Learning Objectives**
- Understand enterprise deployment patterns
- Implement managed configuration
- Design team workflows
- Plan organizational rollout

**Topics Covered**
```
Enterprise Configuration (20 min)
├─ managed-mcp.json for exclusive control
├─ allowlists/denylists for governance
├─ Enterprise skills distribution
└─ Team synchronization

Rollout Planning (20 min)
├─ Assessment phase
├─ Pilot programs
├─ Phased deployment
└─ Success metrics

Best Practices Summary (15 min)
├─ Security considerations
├─ Common anti-patterns
├─ Troubleshooting guide
└─ Resources for continued learning

Q&A and Next Steps (5 min)
```

**Enterprise Checklist**
```yaml
Assessment:
  - [ ] Identify pilot teams
  - [ ] Document current workflows
  - [ ] Define success metrics
  - [ ] Assess security requirements

Governance:
  - [ ] Create managed-mcp.json
  - [ ] Define allowlists
  - [ ] Set up audit logging
  - [ ] Document policies

Training:
  - [ ] Develop training materials
  - [ ] Create skill library
  - [ ] Set up support channels
  - [ ] Plan office hours

Deployment:
  - [ ] Configure project skills
  - [ ] Deploy managed settings
  - [ ] Set up monitoring
  - [ ] Establish feedback loop
```

---

## Assessment & Success Criteria

### Participant Assessment

#### Formative Assessment (Throughout)
- [ ] Exercise completion rates
- [ ] Code quality checks
- [ ] Peer review feedback
- [ ] Instructor observation

#### Summative Assessment (End of Workshop)
- [ ] Capstone project: Build complete workflow
- [ ] Skills demonstration: Teach a concept
- [ ] Knowledge check: Multiple choice
- [ ] Self-assessment: Confidence survey

### Success Metrics

#### Immediate Metrics
- [ ] 90%+ exercise completion rate
- [ ] 80%+ participant satisfaction
- [ ] 70%+ confidence increase (pre/post survey)
- [ ] 0 participants stuck on exercises >15 min

#### Follow-up Metrics (1 month)
- [ ] Participants using skills in daily work
- [ ] Skills shared with teams
- [ ] MCP integrations deployed
- [ ] Productivity improvements reported

---

## Materials & Resources

### Participant Materials
```
Pre-Workshop:
  - Setup guide (PDF)
  - Environment checklist
  - Pre-workshop exercises (optional)

During Workshop:
  - Slide deck (minimal, focus on demos)
  - Exercise repository (GitHub)
  - Reference documentation (printed)
  - Troubleshooting guide

Post-Workshop:
  - Exercise solutions (GitHub)
  - Skill library (collection)
  - Further reading list
  - Community links
  - Office hours schedule
```

### Instructor Materials
```
Preparation:
  - Detailed instructor guide
  - Demo scripts
  - Exercise solutions with rubrics
  - FAQ document

During Workshop:
  - Slide deck with notes
  - Live coding environment
  - Debugging tools
  - Assessment tools

Post-Workshop:
  - Feedback analysis
  - Improvement recommendations
  - Participant follow-up plan
```

---

## Integration with Existing Workshops

### Prerequisite Path
```
Complete First: "Introduction to Claude Code"
├─ Basic commands and navigation
├─ Core concepts (context, tools, permissions)
├─ Simple skills and CLAUDE.md
└─ Basic workflows

Then Take: "Advanced Agentic Coding"
├─ Advanced skills and frontmatter
├─ MCP integration
├─ Subagent orchestration
├─ Spec-driven development
└─ Enterprise patterns

Optional Follow-up: "Enterprise Deployment"
├─ Managed configuration deep dive
├─ Multi-team coordination
├─ Custom plugin development
└─ Advanced governance
```

### Content Overlap Analysis
```
Introduction Workshop:
  - What is Claude Code
  - Basic commands (/help, /compact, /context)
  - Simple SKILL.md files
  - CLAUDE.md basics

Advanced Workshop (This Document):
  - Deep architecture dive
  - Advanced skills with frontmatter
  - MCP integration (NEW)
  - Subagents (NEW)
  - Hooks (NEW)
  - Spec-driven development (NEW)
  - Enterprise patterns (NEW)

No Content Overlap - Clear Progression
```

---

## Research Sources

This roadmap is based on research from:

- [Claude Code Official Documentation](https://code.claude.com/docs/en/mcp)
- [Extend Claude with skills](https://code.claude.com/docs/en/skills)
- [Automate workflows with hooks](https://code.claude.com/docs/en/hooks-guide)
- [Spec-driven development: 2025 key practice - Thoughtworks](https://www.thoughtworks.com/en-cn/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)
- [AI Coding Assistant Statistics 2025 - SecondTalent](https://www.secondtalent.com/resources/ai-coding-assistant-statistics/)
- [Enterprise AI Adoption - OpenAI 2025 Report](https://cdn.openai.com/pdf/7ef17d82-96bf-4dd1-9df2-228f7f377a29/the-state-of-enterprise-ai_2025-report.pdf)
- [Agentic Coding Workshop Methodologies](https://agilemania.com/workshop/agentic-software-development-with-claude-code)
- [Multiagent Orchestration Patterns 2025 - Azure](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)

---

## Appendix: Quick Reference

### Common Commands
```bash
# Skills
/                          # Show all available commands
/skill-name                # Invoke a skill
/context                   # Show current context usage
/compact                   # Compact conversation

# MCP
/mcp                       # Manage MCP servers
claude mcp add             # Add server
claude mcp list            # List servers
claude mcp remove          # Remove server

# Hooks
/hooks                     # Manage hooks
/permissions               # Configure permissions

# Memory
/memory                    # Manage CLAUDE.md files
```

### Troubleshooting
```bash
# Debug mode
claude --debug

# Check configuration
claude config get

# Reset permissions
/permissions
# Then: Reset all rules

# Clear context
/compact
# Or: /clear for full reset
```

### File Locations
```
Configuration:
  ~/.claude/settings.json          # User settings
  .claude/settings.json            # Project settings
  .claude/settings.local.json      # Local (gitignored)

Skills:
  ~/.claude/skills/                # User skills
  .claude/skills/                  # Project skills

MCP:
  .mcp.json                        # Project MCP servers
  ~/.claude.json                   # User MCP servers
```

---

**Document Version**: 1.0
**Last Updated**: February 1, 2026
**Next Review**: March 2026
