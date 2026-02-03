# Agent Coordination Patterns - Quick Reference Guide

**Purpose**: Quick reference for agent coordination patterns in Claude Code workshops

---

## Pattern Selection Decision Tree

```
Start: What is your primary need?
│
├── Central control needed?
│   └── Yes → Supervisor Pattern
│       ├── Large team? → Hierarchical Pattern
│       └── Small team? → Flat Supervisor
│
├── Task classification possible?
│   └── Yes → Router Pattern
│
├── Sequential processing steps?
│   └── Yes → Pipeline Pattern
│
├── Quality critical (need consensus)?
│   └── Yes → Committee Pattern
│
├── Audit trail required?
│   └── Yes → Event-Driven Pattern
│
├── Fault tolerance critical?
│   └── Yes → Peer-to-Peer Pattern
│
└── Shared state requirements?
    └── Yes → Shared Memory Pattern
```

---

## Pattern Comparison Matrix

| Pattern | Complexity | Scalability | Fault Tolerance | Best Use Case | Claude Integration |
|---------|-----------|-------------|-----------------|---------------|-------------------|
| **Supervisor** | Low | Medium | Low | Centralized control | Easy |
| **Hierarchical** | Medium | High | Medium | Large teams | Easy |
| **Router** | Low | High | Medium | Task classification | Easy |
| **Pipeline** | Low | Low | Low | Multi-step workflows | Easy |
| **Event-Driven** | High | Very High | High | Async workflows | Medium |
| **P2P** | High | Very High | Very High | Decentralized | Hard |
| **Committee** | Medium | Low | Medium | Quality-critical | Medium |
| **Shared Memory** | Medium | Medium | Low | Stateful workflows | Medium |

---

## Framework Compatibility

| Framework | Supervisor | Hierarchical | Router | Pipeline | Event-Driven | P2P |
|-----------|-----------|--------------|--------|----------|--------------|-----|
| **CrewAI** | ✅ Excellent | ✅ Good | ⚠️ Custom | ✅ Excellent | ⚠️ Custom | ⚠️ Custom |
| **AutoGen** | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Good | ✅ Good |
| **LangGraph** | ✅ Good | ✅ Good | ✅ Excellent | ✅ Excellent | ✅ Excellent | ⚠️ Custom |
| **Semantic Kernel** | ✅ Good | ✅ Good | ⚠️ Custom | ✅ Good | ✅ Good | ⚠️ Custom |
| **CCSwarm** | ✅ Excellent | ✅ Good | ✅ Good | ✅ Good | ✅ Good | ⚠️ Custom |

---

## Quick Implementation Examples

### Supervisor Pattern (CrewAI)
```python
from crewai import Agent, Crew, Process

supervisor = Agent(role="Supervisor", allow_delegation=True)
workers = [Agent(role=f"Worker{i}") for i in range(3)]

crew = Crew(
    agents=[supervisor, *workers],
    process=Process.hierarchical
)
```

### Router Pattern (AutoGen)
```python
from autogen_agentchat.teams import SelectorChatGraph

router_team = SelectorChatGraph(
    participants=[frontend, backend, devops],
    selector_prompt="Route to appropriate specialist"
)
```

### Pipeline Pattern (LangGraph)
```python
from langgraph.graph import StateGraph, START, END

workflow = StateGraph(State)
workflow.add_node("stage1", agent1)
workflow.add_node("stage2", agent2)
workflow.add_node("stage3", agent3)

workflow.add_edge(START, "stage1")
workflow.add_edge("stage1", "stage2")
workflow.add_edge("stage2", "stage3")
workflow.add_edge("stage3", END)

app = workflow.compile()
```

### Event-Driven (Generic)
```python
# Publish
event_bus.publish("task-complete", {"task": "X", "status": "done"})

# Subscribe
def handler(event):
    if event["task"] == "X":
        process(event)

event_bus.subscribe("task-complete", handler)
```

---

## Claude Code Integration Patterns

### 1. MCP Integration (Universal)
```python
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(
    model="claude-3.5-sonnet",
    anthropic_api_key="...",
    # MCP tools loaded automatically
)
```

### 2. ACP Integration (CCSwarm)
```bash
# Start Claude Code with ACP
claude-code --acp-server --port 9100

# CCSwarm auto-connects
ccswarm start
```

### 3. CLI Wrapper (Simple)
```python
import subprocess

result = subprocess.run([
    "claude-code",
    "-C", "/path/to/worktree",
    "Build authentication system"
], capture_output=True)
```

---

## Workshop Exercise Templates

### Exercise 1: Pattern Recognition (15 min)
**Goal**: Match scenarios to patterns

**Scenarios**:
1. "Build web app with 3 developers" → Supervisor
2. "Process data through 5 stages" → Pipeline
3. "Classify and route support tickets" → Router
4. "Audit all agent decisions" → Event-Driven

### Exercise 2: Build Supervisor Crew (30 min)
**Goal**: Implement supervisor pattern

**Steps**:
1. Create supervisor agent
2. Create 3 specialist agents
3. Implement task delegation
4. Test with sample tasks

### Exercise 3: Pipeline Content Creation (30 min)
**Goal**: Build 3-stage pipeline

**Stages**: Research → Write → Edit

### Exercise 4: Event-Driven Debugging (30 min)
**Goal**: Fix broken event system

**Task**: Find miswired events in provided code

---

## Common Patterns for Common Tasks

| Task | Recommended Pattern | Framework |
|------|-------------------|-----------|
| **Content Creation** | Pipeline | CrewAI, LangGraph |
| **Customer Support** | Router | AutoGen, LangGraph |
| **Code Review** | Committee | AutoGen |
| **Data Processing** | Pipeline | LangGraph |
| **Microservices** | Event-Driven | LangGraph, Custom |
| **Research Team** | Supervisor | CrewAI |
| **Large Project** | Hierarchical | AutoGen, CCSwarm |
| **Parallel Development** | P2P + Worktrees | CCSwarm |

---

## Performance Considerations

| Pattern | Latency | Throughput | Resource Usage |
|---------|---------|------------|----------------|
| **Supervisor** | Medium | Medium | Low |
| **Hierarchical** | High | Low | Medium |
| **Router** | Low | High | Low |
| **Pipeline** | High | Low | Low |
| **Event-Driven** | Low | Very High | Medium |
| **P2P** | Low | Very High | High |
| **Committee** | Very High | Low | High |
| **Shared Memory** | Medium | Medium | Medium |

---

## Anti-Patterns to Avoid

### 1. The "God Supervisor"
**Problem**: Single supervisor managing too many workers
**Solution**: Use hierarchical pattern

### 2. The "Spaghetti Router"
**Problem**: Too many routing rules
**Solution**: Simplify or use classifier agent

### 3. The "Infinite Pipeline"
**Problem**: Pipeline with no termination
**Solution**: Add exit conditions

### 4. The "Event Storm"
**Problem**: Too many events causing noise
**Solution**: Event filtering and aggregation

### 5. The "Shared Memory Bottleneck"
**Problem**: All agents contending for same state
**Solution**: Partition state or use events

---

## Key Resources

- [Full Pattern Documentation](./COORDINATION_PATTERNS.md)
- [LangGraph Deep Dive](./LANGGRAPH_COORDINATION.md)
- [Research Summary](./SUMMARY.md)
- [Multiagent Tools Summary](../multiagent/SUMMARY.md)
- [Worktree Coordination](../worktrees/PATTERN_MULTIAGENT_COORDINATION.md)

---

## Quick Links by Pattern

| Pattern | Deep Dive | Framework Examples |
|---------|-----------|-------------------|
| Supervisor | [COORDINATION_PATTERNS.md](./COORDINATION_PATTERNS.md) | CrewAI, AutoGen |
| Hierarchical | [COORDINATION_PATTERNS.md](./COORDINATION_PATTERNS.md) | AutoGen, CCSwarm |
| Router | [COORDINATION_PATTERNS.md](./COORDINATION_PATTERNS.md) | LangGraph, AutoGen |
| Pipeline | [COORDINATION_PATTERNS.md](./COORDINATION_PATTERNS.md) | LangGraph, CrewAI |
| Event-Driven | [COORDINATION_PATTERNS.md](./COORDINATION_PATTERNS.md) | LangGraph, Custom |
| P2P | [COORDINATION_PATTERNS.md](./COORDINATION_PATTERNS.md) | AutoGen, Custom |

---

**Version**: 1.0
**Last Updated**: 2026-02-02
**Maintained By**: Workshop Research Team
