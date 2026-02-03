# Multiagent Orchestration Tools - Research Summary

**Research Date**: 2026-02-01
**Researcher**: Claude Code Research Agent
**Workshop Focus**: Claude Code + Git Worktrees for Parallel Development

---

## Executive Summary

This research evaluates multiagent orchestration frameworks for inclusion in a Claude Code workshop focused on parallel development using git worktrees. After analyzing seven tools, we recommend a tiered approach:

1. **Introduction**: OpenAI Swarm (concepts) → CrewAI (hands-on)
2. **Intermediate**: AutoGen or Phidata (production patterns)
3. **Advanced**: CCSwarm (Claude Code + git worktrees) or LangGraph (enterprise)

---

## Quick Comparison Table

| Tool | Language | Difficulty | Claude Code | Git Worktrees | Production Ready | Workshop Score |
|------|----------|------------|-------------|---------------|------------------|----------------|
| **CrewAI** | Python | Beginner | Indirect | Yes ✅ | Yes | **9/10** |
| **OpenAI Swarm** | Python | Beginner | No | No | No (educational) | **6/10** |
| **AutoGen** | Python/.NET | Intermediate | Indirect | Possible | Yes | **8/10** |
| **Phidata** | Python | Intermediate | Indirect | Possible | Yes | **8/10** |
| **LangGraph** | Python/TS | Advanced | Indirect | Manual | Yes | **7/10** |
| **CCSwarm** | Rust | Advanced | **Native ✅** | **Native ✅** | Yes | **9/10** (Advanced) |

---

## Detailed Tool Analysis

### 1. CrewAI - Best for Beginners

**Strengths:**
- Most intuitive abstractions (Agents, Tasks, Crews)
- Explicit git-worktree compatibility mentioned in community
- Excellent parallel execution support
- Quick to learn and implement
- Production-ready

**Weaknesses:**
- Python only
- Less control than lower-level frameworks
- Limited documentation on Claude integration

**Workshop Recommendation**: **HIGHLY RECOMMENDED** for introductory modules

**Ideal Workshop Module**: Module 7 - Introduction to Multi-Agent Systems (60-90 min)

**Key Features for Workshop:**
```python
# Simple, readable code perfect for teaching
from crewai import Agent, Task, Crew

researcher = Agent(role='Researcher', goal='Find information')
writer = Agent(role='Writer', goal='Create content')

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task]
)
result = crew.kickoff()
```

---

### 2. OpenAI Swarm - Best for Learning Concepts

**Strengths:**
- Extreme simplicity (only 2 primitives: Agents + Handoffs)
- Perfect for teaching multi-agent fundamentals
- Official OpenAI project
- Quick setup (5-10 minutes)

**Weaknesses:**
- Educational/experimental only (NOT production-ready)
- Superseded by OpenAI Agents SDK
- No state management
- No Claude Code integration

**Workshop Recommendation**: **RECOMMENDED** as 30-minute concept introduction

**Ideal Workshop Module**: Module 6 - Multi-Agent Fundamentals (30-45 min)

**Key Teaching Points:**
```python
# Simple handoff pattern
from swarm import Swarm, Agent

agent_a = Agent(name="Agent A", instructions="...")
agent_b = Agent(name="Agent B", instructions="...")

def transfer_to_b():
    return agent_b

agent_a.functions = [transfer_to_b]
```

---

### 3. Microsoft AutoGen - Best Balanced Choice

**Strengths:**
- Excellent balance of power and accessibility
- AgentChat API is easy to learn
- Microsoft backing and support
- AutoGen Studio (no-code GUI)
- MCP server support
- Production-ready

**Weaknesses:**
- Some complexity with multiple abstraction layers
- Migration from v0.2 required
- Documentation focuses on OpenAI

**Workshop Recommendation**: **RECOMMENDED** for intermediate modules

**Ideal Workshop Module**: Module 8 - Multi-Agent Patterns (90 min)

**Key Features for Workshop:**
```python
# Clean API for multi-agent systems
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.tools import AgentTool

math_agent = AssistantAgent("math_expert", ...)
math_tool = AgentTool(math_agent)

coordinator = AssistantAgent(
    "coordinator",
    tools=[math_tool, chemistry_tool]
)
```

---

### 4. Phidata (Agno) - Best Multi-Modal Support

**Strengths:**
- Multi-modal by default (images, audio, video)
- Beautiful Agent UI for demos
- Simple and elegant (10-line agents)
- Built-in RAG and memory
- Agent teams support

**Weaknesses:**
- Rebranding confusion (Phidata → Agno)
- Newer ecosystem
- Python only

**Workshop Recommendation**: **RECOMMENDED** for multi-modal focused sessions

**Ideal Workshop Module**: Module 7 - Alternative Approach (60-75 min)

**Key Features for Workshop:**
```python
# Can create agents in 10 lines
from phi.agent import Agent
from phi.tools.duckduckgo import DuckDuckGo

agent = Agent(
    name="Web Agent",
    tools=[DuckDuckGo()],
    instructions=["Always include sources"]
)
agent.print_response("Research topic", stream=True)
```

---

### 5. LangGraph - Best for Advanced/Enterprise

**Strengths:**
- Production-grade framework
- Stateful agents with memory
- Graph-based workflows
- Fine-grained control
- LangSmith integration
- Python and TypeScript support

**Weaknesses:**
- Steep learning curve
- Verbose configuration
- Too complex for beginners
- Overkill for simple use cases

**Workshop Recommendation**: **CONDITIONAL** for advanced modules only

**Ideal Workshop Module**: Module 9 - Advanced Patterns (90-120 min)

**Key Features for Workshop:**
```python
# Graph-based workflow definition
from langgraph.graph import StateGraph

workflow = StateGraph(MessagesState)
workflow.add_node("researcher", researcher_node)
workflow.add_node("writer", writer_node)
workflow.add_edge("researcher", "writer")
app = workflow.compile()
```

---

### 6. CCSwarm - Best for Claude Code + Git Worktrees

**Strengths:**
- **Native Claude Code integration via ACP** (unique!)
- **Native git worktree support** (unique!)
- Rust performance (zero-cost abstractions)
- Production-ready with enterprise features:
  - Observability (OpenTelemetry)
  - Human-in-the-Loop
  - Long-term memory & RAG
  - Security scanning
  - ProactiveMaster orchestration

**Weaknesses:**
- Requires Rust knowledge
- Complex setup
- Smaller community
- Overwhelming for beginners

**Workshop Recommendation**: **HIGHLY RECOMMENDED** for advanced Claude Code workshop

**Ideal Workshop Module**: Module 10 - Production Patterns (120-150 min)

**Why It's Special for This Workshop:**

CCSwarm is the **only tool** that specifically addresses the workshop's core focus:

1. **Claude Code Integration**: Uses Agent Client Protocol (ACP) to connect directly
   ```bash
   # Auto-connects to Claude Code
   ccswarm start  # Connects to ws://localhost:9100
   ```

2. **Git Worktree Support**: Built-in parallel development with isolation
   ```bash
   # Native worktree management
   ccswarm init --name Project --agents frontend,backend
   git worktree add ../frontend feature/frontend
   ccswarm delegate task "Build UI" --agent frontend
   ```

3. **Production Features**: Enterprise-grade capabilities
   - Observability & tracing
   - Human-in-the-loop approval
   - Security scanning
   - Long-term memory

---

## Recommended Workshop Curriculum

### Tier 1: Introduction (Beginner)

**Module 6: Multi-Agent Fundamentals (45 min)**
- OpenAI Swarm for concept learning (20 min)
- Handoff patterns and agent coordination (25 min)

**Module 7: Hands-On Multi-Agent Systems (90 min)**
- CrewAI introduction (30 min)
- Build first crew (45 min)
- Git worktree integration demo (15 min)

### Tier 2: Intermediate (Intermediate)

**Module 8: Production Patterns (90 min)**
- AutoGen or Phidata (choose based on audience)
- Agent specialization and delegation
- Tool integration
- Parallel execution strategies

### Tier 3: Advanced (Advanced)

**Module 9: Enterprise Multi-Agent (Optional, 120 min)**
- LangGraph for stateful workflows
- Graph-based orchestration
- Memory and persistence

**Module 10: Claude Code + Git Worktrees (150 min)**
- CCSwarm deep dive
- ACP integration
- Parallel development with worktrees
- ProactiveMaster orchestration
- Observability and HITL

---

## Comparative Analysis by Dimension

### 1. Ease of Learning
1. **OpenAI Swarm** - Simplest, just 2 primitives
2. **CrewAI** - Intuitive abstractions, good docs
3. **Phidata** - Simple API, good examples
4. **AutoGen** - Moderate complexity, good support
5. **LangGraph** - Steep curve, complex concepts
6. **CCSwarm** - Requires Rust + advanced knowledge

### 2. Claude Code Integration
1. **CCSwarm** - Native ACP integration ✅
2. **CrewAI** - Possible via custom tools
3. **AutoGen** - Possible via MCP
4. **Phidata** - Possible via tools
5. **LangGraph** - Possible via tools
6. **OpenAI Swarm** - No integration

### 3. Git Worktree Support
1. **CCSwarm** - Native support ✅
2. **CrewAI** - Community examples
3. **AutoGen** - Possible via tools
4. **Phidata** - Possible via tools
5. **LangGraph** - Manual implementation
6. **OpenAI Swarm** - No support

### 4. Production Readiness
1. **LangGraph** - Enterprise-grade
2. **CCSwarm** - Enterprise features
3. **AutoGen** - Microsoft backing
4. **CrewAI** - Production-ready
5. **Phidata** - Production-ready
6. **OpenAI Swarm** - Educational only

### 5. Workshop Teaching Value
1. **CrewAI** - Best for beginners
2. **OpenAI Swarm** - Best for concepts
3. **AutoGen** - Best balanced choice
4. **Phidata** - Best for multi-modal demos
5. **LangGraph** - Best for advanced
6. **CCSwarm** - Best for Claude Code + worktrees

---

## Final Recommendations

### For Beginner Workshop
**Primary**: CrewAI
**Secondary**: OpenAI Swarm (for concepts only)
**Time**: 2-3 hours total

### For Intermediate Workshop
**Primary**: AutoGen or Phidata
**Prerequisite**: CrewAI or equivalent
**Time**: 3-4 hours total

### For Advanced Claude Code Workshop
**Primary**: CCSwarm
**Prerequisite**: Rust, git worktrees, multi-agent basics
**Time**: 4-5 hours total

### For Enterprise Workshop
**Primary**: LangGraph or CCSwarm
**Prerequisite**: Strong programming background
**Time**: 5-6 hours total

---

## Example Workshop Scenario

### Scenario: Building a Feature with Parallel Agents

**Objective**: Three agents work in parallel on different components using git worktrees

**Tier 1 Approach (CrewAI)**:
```python
from crewai import Agent, Task, Crew

# Define agents
frontend = Agent(role='Frontend Dev', goal='Build React components')
backend = Agent(role='Backend Dev', goal='Build Node.js APIs')
devops = Agent(role='DevOps', goal='Set up infrastructure')

# Create worktrees
# (manual git worktree commands)

# Execute in parallel
crew = Crew(
    agents=[frontend, backend, devops],
    process=Process.hierarchical
)
```

**Tier 3 Approach (CCSwarm)**:
```bash
# Setup
ccswarm init --name FeatureAuth --agents frontend,backend,devops
git worktree add ../auth-frontend feature/frontend
git worktree add ../auth-backend feature/backend
git worktree add ../auth-devops feature/devops

# Execute
ccswarm start
ccswarm delegate task "Create login form" --agent frontend
ccswarm delegate task "Build auth API" --agent backend
ccswarm delegate task "Set up CI/CD" --agent devops

# Monitor in TUI
ccswarm tui
```

---

## Resources and References

### Official Documentation
- [CrewAI Docs](https://docs.crewai.com/)
- [AutoGen Docs](https://microsoft.github.io/autogen/)
- [LangGraph Docs](https://docs.langchain.com/oss/python/langgraph/overview)
- [Phidata Docs](https://docs.phidata.com/)
- [OpenAI Swarm GitHub](https://github.com/openai/swarm)
- [CCSwarm GitHub](https://github.com/nwiizo/ccswarm)

### Community Resources
- CrewAI Discord: https://discord.gg/crewai
- LangChain Discord: https://discord.gg/langchain
- AutoGen GitHub Discussions
- CCSwarm GitHub Issues

### Tutorial Videos
- [Multi-Agent Systems with CrewAI](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/)
- [LangGraph Tutorial](https://www.datacamp.com/tutorial/langgraph-agents)
- [Build Multi-Agent System with CrewAI](https://www.youtube.com/watch?v=qsrl2DHYi1Y)

---

## Conclusion

For a **Claude Code workshop focused on git worktrees and parallel development**, we recommend:

1. **Start with CrewAI** for accessible introduction to multi-agent concepts
2. **Progress to AutoGen or Phidata** for production patterns
3. **Culminate with CCSwarm** for the ultimate Claude Code + git worktree experience

This tiered approach ensures participants:
- Learn fundamental concepts without overwhelm
- Gain hands-on experience with production tools
- See the full potential of Claude Code orchestration
- Understand git worktree parallel development patterns

**CCSwarm is the crown jewel** for this specific workshop, as it's the only tool that natively integrates both Claude Code and git worktrees for production-grade multi-agent orchestration.
