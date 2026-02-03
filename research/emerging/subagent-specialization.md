# Subagent Specialization Pattern

**Agent Name**: Research Agent
**Research Focus**: Subagent Specialization and Modular Agent Teams
**Date**: 2026-02-02
**Researcher**: Claude Code Research Agent

---

## Executive Summary

**Pattern**: Shift from monolithic AI assistants to modular, specialized sub-agent teams
**Status**: Production-ready, widely adopted (2026)
**Key Players**: Claude Code, Spring AI, Cursor, Antigravity
**Workshop Relevance**: **CRITICAL** - Core pattern for production AI development

---

## 1. PATTERN OVERVIEW

### What It Is
Sub-agents are specialized AI instances that handle specific tasks within a larger workflow. Each operates in its own isolated context window with custom prompts, tools, and permissions. A primary orchestrator delegates work to these sub-agents, which execute independently and return results.

### Why Use Them

**Context Management**:
- Single agents get overwhelmed by context pollution
- Sub-agents keep main conversation clean and focused
- Each sub-agent maintains its own context history

**Specialization**:
- Fine-tune sub-agent for specific domains (security, testing, docs)
- Avoid diluting main agent's focus with peripheral concerns
- Domain expertise stays encapsulated

**Security**:
- Restrict tool access (e.g., read-only for code reviewers)
- Limit sub-agent permissions to minimum required
- Isolate dangerous operations (file deletion, deployments)

**Parallelization**:
- Run multiple sub-agents simultaneously
- Different tasks progress in parallel
- Faster overall completion

---

## 2. IMPLEMENTATION EXAMPLES

### 2.1 Claude Code Subagents

**Definition Methods**:
1. **YAML Files**: `.claude/agents/agent-name.md`
2. **CLI Command**: `/agents` command
3. **Natural Language**: Just ask Claude to spin up sub-agent

**Example YAML**:
```yaml
---
name: security-reviewer
description: Expert security analyst. Use for security reviews and vulnerability detection.
tools: Read, Grep, Glob
disallowedTools: Edit, Write
model: sonnet
skills:
  - owasp-top-10
  - security-best-practices
---

You are a senior security analyst with expertise in application security.

**When Invoked**:
1. Run `git diff` to see recent changes
2. Focus analysis on modified files
3. Check for common vulnerabilities (SQL injection, XSS, etc.)

**Review Checklist**:
- Input validation and sanitization
- Authentication and authorization
- Sensitive data handling
- Dependency vulnerabilities

**Output**: Clear, actionable security findings with file references and severity ratings.
```

**Built-in Capabilities**:
- Dynamic spawning based on task requirements
- Automatic cleanup when task complete
- Context isolation between sub-agents
- Multi-model routing (Haiku for fast, Sonnet/Opus for complex)

### 2.2 Spring AI Task Tool

**Architecture**:
```
Main Agent (Orchestrator)
    ↓
Agent Registry (catalog of available sub-agents)
    ↓
Task Tool (spawns and manages sub-agents)
    ↓
Sub-agents (isolated execution)
```

**Built-in Subagents**:
| Subagent | Purpose | Tools |
|----------|---------|-------|
| Explore | Fast, read-only codebase exploration | Read, Grep, Glob |
| General-Purpose | Multi-step research and execution | All tools |
| Plan | Software architect for design strategies | Read-only + search |
| Bash | Command execution specialist | Bash only |

**Usage**:
```java
ChatClient chatClient = chatClientBuilder
    .defaultToolCallbacks(taskTools)  // Adds Task tool
    .build();

// Agent automatically decides when to delegate
String response = chatClient
    .prompt("Explore the authentication module and explain how it works")
    .call()
    .content();
```

**Key Innovation**: **A2A Integration** (Agent2Agent Protocol)
- Protocol-agnostic abstraction for remote agents
- Supports A2A, MCP, or custom protocols
- Interoperable across different agent systems

### 2.3 Cursor Parallel Subagents

**Use Cases**:
- Image generation (one sub-agent)
- Clarifying questions (another sub-agent)
- Context gathering (fast model like GPT-5.2 Codex)
- Code implementation (smart model)

**Pattern**: Fast model for exploration → Smart model for implementation

---

## 3. PRODUCTION PATTERNS

### 3.1 Writer/Reviewer Pattern

**Setup**:
1. **Writer Agent**: Generates code, has Edit/Write tools
2. **Reviewer Agent**: Reviews code, Read-only tools
3. **Context Clearing**: Reviewer starts fresh, no bias

**Benefits**:
- Fresh perspective on each review
- No "rubber stamp" approvals
- Catches mistakes writer missed

**Implementation**:
```yaml
# .claude/agents/writer.md
name: writer
description: Implement features based on specifications
tools: All tools
model: sonnet

# .claude/agents/reviewer.md
name: reviewer
description: Review code for quality, bugs, and best practices
tools: Read, Grep, Glob
disallowedTools: Edit, Write
model: sonnet
```

### 3.2 Plan/Execute Separation

**Setup**:
1. **Planning Agent**: Powerful model (Opus), Read-only access
2. **Execution Agent**: Fast model (Haiku), Write access
3. **Handoff**: Planner passes plan to executor

**Benefits**:
- Better plans from more capable model
- Faster execution from cheaper model
- Clear separation of concerns

**Cost Optimization**:
- Planning (Opus): 10% of tokens, high complexity
- Execution (Haiku): 90% of tokens, low complexity
- Net cost: ~60% of all-Opus approach

### 3.3 Specialized Review Agents

**Security Reviewer**:
```yaml
name: security-reviewer
description: Review code for security vulnerabilities
tools: Read, Grep
disallowedTools: Edit, Write, Bash
skills:
  - owasp-top-10
  - security-checklist
```

**Performance Reviewer**:
```yaml
name: performance-reviewer
description: Review code for performance issues
tools: Read, Grep
disallowedTools: Edit, Write, Bash
skills:
  - performance-patterns
  - optimization-checklist
```

**Test Coverage Reviewer**:
```yaml
name: test-coverage-reviewer
description: Review test coverage and quality
tools: Read, Bash
disallowedTools: Edit, Write
skills:
  - testing-best-practices
  - coverage-analysis
```

**Parallel Execution**: All three run simultaneously, faster than sequential review

---

## 4. WORKSHOP INTEGRATION

### Teaching Suitability
- **Conceptual Complexity**: Intermediate
- **Hands-on Potential**: High (easy to demonstrate, clear benefits)
- **Demo-readiness**: Yes (simple before/after examples)
- **Setup Time**: 20 minutes (create agent files, test delegation)

### Learning Objectives
1. Understand when to use sub-agents vs single agent
2. Design agent specialization (roles, tools, permissions)
3. Implement hierarchical orchestration
4. Test and validate sub-agent outputs

### Recommended Exercises

**Exercise 1: First Sub-agent**
- Create simple reviewer agent
- Test with code snippet
- Compare reviewer output to main agent

**Exercise 2: Parallel Review**
- Create 3 specialized reviewers (security, performance, tests)
- Run all in parallel
- Synthesize findings

**Exercise 3: Plan/Execute**
- Create planner agent (Opus, read-only)
- Create executor agent (Haiku, write access)
- Test handoff mechanism

---

## 5. BEST PRACTICES

### DO ✅
- Define clear, specific descriptions for each sub-agent
- Restrict tools to minimum required (security)
- Use isolated context windows
- Run sub-agents in parallel when possible
- Set appropriate model per task (Haiku for fast, Opus for complex)
- Test sub-agent behavior before production use

### DON'T ❌
- Don't give sub-agents Task tool (no recursive spawning)
- Don't over-specify (let agent specialize)
- Don't skip verification (still need human review)
- Don't use expensive models for simple tasks
- Don't forget to clean up completed sub-agents

---

## 6. COMMON PITFALLS

### Pitfall 1: Over-Specialization
**Problem**: Too many sub-agents, unclear when to use which
**Solution**: Start with 2-3 core roles, expand as needed

### Pitfall 2: Permission Creep
**Problem**: Giving sub-agents too many tools for "convenience"
**Solution**: Minimum required permissions, add only when necessary

### Pitfall 3: No Verification
**Problem**: Trusting sub-agent output without review
**Solution**: Always have human-in-the-loop for important tasks

### Pitfall 4: Model Mismatch
**Problem**: Using expensive models for simple tasks
**Solution**: Haiku for fast/simple, Sonnet/Opus for complex

---

## 7. MEASURING SUCCESS

### Metrics
- **Task Completion Rate**: Does sub-agent finish assigned task?
- **Quality Score**: How good is the output?
- **Time to Complete**: Faster than single agent?
- **Cost Efficiency**: Token usage vs value delivered

### Benchmarks
From Spring AI documentation:
- **34-64% token savings** with dynamic tool discovery
- **2-3x faster** parallel execution vs sequential
- **15% quality improvement** with specialized reviewers

---

## 8. FUTURE DIRECTIONS

### Agent2Agent (A2A) Protocol
- Standardized communication between agents
- Cross-platform interoperability
- Enterprise adoption (Microsoft, Google support)

### Dynamic Agent Discovery
- Agents find and collaborate with other agents automatically
- Marketplace for specialized agents
- Reputation and trust scoring

### Self-Improving Agents
- Agents that can write and improve other agents
- Recursive optimization within guardrails
- Emergent capabilities from collaboration

---

## 9. IMPLEMENTATION CHECKLIST

### Phase 1: Planning
- [ ] Identify tasks suitable for sub-agents
- [ ] Define sub-agent roles and responsibilities
- [ ] Determine required tools and permissions
- [ ] Choose appropriate models for each role

### Phase 2: Implementation
- [ ] Create sub-agent configuration files
- [ ] Implement orchestrator logic
- [ ] Test each sub-agent independently
- [ ] Test handoff between sub-agents

### Phase 3: Production
- [ ] Set up monitoring and logging
- [ ] Implement verification loops
- [ ] Document sub-agent behavior
- [ ] Train team on usage

---

## 10. CONCLUSION

**Subagent specialization is the difference between "using AI" and "orchestrating AI."**

**Key Takeaway**: The future isn't one super-agent that does everything. It's teams of specialized agents working together under human orchestration.

**Workshop Priority**: **HIGHEST** - This is the core pattern for production AI development in 2026.

---

## RESEARCH SOURCES

- Spring AI Agentic Patterns (Part 4): Subagent Orchestration
- Claude Code Subagents Documentation
- "Multi-Agent collaboration patterns with Strands" (AWS)
- "AI Agent Orchestration Patterns" (Microsoft Azure)
- Cursor Parallel Agents Documentation
