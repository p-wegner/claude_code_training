# OpenAI Swarm Research Report

## Agent Research Template

**Agent Name**: Research Agent
**Research Focus**: Multiagent Orchestration Tools - OpenAI Swarm
**Date**: 2026-02-01
**Researcher**: Claude Code Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: OpenAI Swarm (experimental/educational)
- **Repository/URL**: https://github.com/openai/swarm
- **Latest Version**: Pre-release (educational framework)
- **Last Updated**: 2024-2025
- **License**: MIT License
- **Maintainer**: OpenAI Solutions Team

### Tool Purpose
- **Primary Goal**: Educational framework exploring ergonomic, lightweight multi-agent orchestration patterns.
- **Target Users**: Developers learning about multi-agent orchestration patterns.
- **Core Problem Solved**: Demonstrates lightweight agent coordination and execution with minimal overhead.

**IMPORTANT**: Swarm is now replaced by the OpenAI Agents SDK for production use. Swarm remains as an educational resource.

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| Lightweight Design | Minimal overhead for agent orchestration | High | 5 |
| Agent Handoffs | Simple mechanism for transferring control between agents | High | 5 |
| Function Calling | Direct Python function integration | High | 5 |
| Context Variables | Share context across agents and functions | Medium | 4 |
| Streaming Support | Real-time streaming of responses | Medium | 4 |
| Educational Focus | Designed for learning multi-agent patterns | High | 5 |
| Client-Side Execution | Runs almost entirely on the client | High | 5 |
| Stateless Design | No state storage between calls | Low | 2 |

### Unique Selling Points
1. **Extreme Simplicity**: Only two core primitives (Agents and Handoffs)
2. **Educational Focus**: Designed specifically for learning multi-agent patterns
3. **Lightweight**: Minimal dependencies and overhead
4. **Client-Side**: No server infrastructure required
5. **OpenAI Backing**: Official OpenAI project for educational purposes

### Limitations
- **Not Production-Ready**: Explicitly marked as experimental/educational
- **Superseded**: Replaced by OpenAI Agents SDK for production
- **Stateless**: No built-in memory or state persistence
- **Limited Features**: Lacks advanced features like memory, knowledge bases
- **Python Only**: No support for other languages

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Beginner - Excellent for learning fundamentals
- **Hands-on Potential**: High - Quick to understand and implement
- **Demo-readiness**: Yes - Simple but effective demos
- **Setup Time**: 5-10 minutes

### Learning Objectives Addressed
- [x] **Multiagent Orchestration**: Excellent - Perfect for teaching fundamentals
- [ ] **Spec-driven Development**: Not addressed
- [ ] **Git Worktrees Integration**: No native integration
- [ ] **Production Workflows**: Not suitable (educational only)

### Recommended Workshop Module
- **Module Placement**: Module 6 - Multi-Agent Fundamentals (Introduction)
- **Duration**: 45-60 minutes
- **Prerequisites**:
  - Python 3.10+ installed
  - Basic understanding of functions and classes
  - OpenAI API key

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: Python 3.10+
- **Dependencies**:
  - `swarm` (install from GitHub)
  - OpenAI Python SDK
- **Claude Code Version Required**: None (but can work with Claude via API)
- **Platform Support**: Windows, Linux, macOS (cross-platform)

### Integration Complexity
- **Installation Difficulty**: Easy - Direct pip install from GitHub
- **Configuration Required**: Minimal - Just define agents and functions
- **Compatibility Issues**:
  - Requires OpenAI API (not optimized for Claude)
  - No persistence or state management

### Performance Characteristics
- **Resource Usage**: Low - Very lightweight
- **Execution Speed**: Fast - Minimal overhead
- **Scalability**: Low - Not designed for large-scale deployments

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Basic Agent Handoff
**Difficulty**: Beginner
**Time**: 20 minutes
**Description**: Create two agents and demonstrate handoff between them
**Learning Outcomes**:
- [x] Understanding agent primitives
- [x] Implementing handoffs
- [x] Running basic multi-agent conversations

### Scenario 2: Customer Service Triage
**Difficulty**: Intermediate
**Time**: 30 minutes
**Description**: Build a triage system that routes to specialized agents
**Learning Outcomes**:
- [x] Agent specialization
- [x] Context variables
- [x] Handoff patterns

### Scenario 3: Multi-Step Workflow
**Difficulty**: Intermediate
**Time**: 40 minutes
**Description**: Create a workflow with multiple agents and function calls
**Learning Outcomes**:
- [x] Function calling
- [x] Context sharing
- [x] Multi-agent coordination

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs Swarm | Weaknesses vs Swarm |
|------|----------------------|------------------------|
| AutoGen | Production-ready, more features | More complex, heavier |
| CrewAI | Higher-level abstractions | More overhead |
| LangGraph | Stateful, production-ready | Steeper learning curve |
| Phidata | Multi-modal, production features | More complex |

### Recommendation Score
- **For Beginners**: 9/10 - Excellent starting point for learning
- **For Intermediate**: 5/10 - Too basic, will outgrow quickly
- **For Advanced**: 3/10 - Not suitable for advanced use cases

---

## 7. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Usage
```python
from swarm import Swarm, Agent

client = Swarm()

def transfer_to_agent_b():
    return agent_b

agent_a = Agent(
    name="Agent A",
    instructions="You are a helpful agent.",
    functions=[transfer_to_agent_b],
)

agent_b = Agent(
    name="Agent B",
    instructions="Only speak in Haikus.",
)

response = client.run(
    agent=agent_a,
    messages=[{"role": "user", "content": "I want to talk to agent B."}],
)

print(response.messages[-1]["content"])
```

### Code Example 2: Integration with Git Worktrees
```python
from swarm import Swarm, Agent
import subprocess

def create_worktree(branch: str, path: str) -> str:
    """Create a git worktree for parallel development"""
    result = subprocess.run(
        ["git", "worktree", "add", path, branch],
        capture_output=True,
        text=True
    )
    if result.returncode == 0:
        return f"Created worktree for branch '{branch}' at '{path}'"
    else:
        return f"Error: {result.stderr}"

def list_worktrees() -> str:
    """List all git worktrees"""
    result = subprocess.run(
        ["git", "worktree", "list"],
        capture_output=True,
        text=True
    )
    return result.stdout

# Create a devops agent
devops_agent = Agent(
    name="DevOps Assistant",
    instructions="You help manage git worktrees for parallel development.",
    functions=[create_worktree, list_worktrees],
)

client = Swarm()

response = client.run(
    agent=devops_agent,
    messages=[{"role": "user", "content": "Create worktrees for feature-auth and feature-user at paths ../feature-auth and ../feature-user"}],
)

print(response.messages[-1]["content"])
```

### Code Example 3: Multi-Agent Orchestration
```python
from swarm import Swarm, Agent

client = Swarm()

# Define specialized agents
sales_agent = Agent(
    name="Sales Agent",
    instructions="You are a sales agent. Help customers with purchases."
)

support_agent = Agent(
    name="Support Agent",
    instructions="You are a support agent. Help customers with technical issues."
)

billing_agent = Agent(
    name="Billing Agent",
    instructions="You are a billing agent. Help customers with billing inquiries."
)

# Handoff functions
def transfer_to_sales():
    return sales_agent

def transfer_to_support():
    return support_agent

def transfer_to_billing():
    return billing_agent

# Triage agent
triage_agent = Agent(
    name="Triage Agent",
    instructions="""You are a triage agent. Determine the customer's need and transfer to the appropriate agent:
    - Sales: Purchase inquiries, product information
    - Support: Technical issues, bugs, how-to questions
    - Billing: Payments, invoices, subscriptions""",
    functions=[transfer_to_sales, transfer_to_support, transfer_to_billing],
)

# Run the triage system
response = client.run(
    agent=triage_agent,
    messages=[{"role": "user", "content": "I'm having trouble with my account settings"}],
)

for msg in response.messages:
    if msg.get("role") == "assistant":
        print(f"{msg.get('sender', 'Agent')}: {msg['content']}")
```

---

## 8. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: Build Your First Multi-Agent System
**Objective**: Create two agents that can hand off conversations
**Steps**:
1. Install Swarm and set up OpenAI API key
2. Create Agent A and Agent B with different instructions
3. Implement a handoff function
4. Run a conversation that triggers handoff
5. Observe how the system switches between agents
**Expected Output**: Working handoff between two agents

### Exercise 2: Customer Service Triage System
**Objective**: Build a triage system with multiple specialized agents
**Steps**:
1. Define specialized agents (sales, support, billing)
2. Create a triage agent with handoff functions
3. Test with various customer queries
4. Verify correct routing to specialists
5. Add context variables to track customer information
**Expected Output**: Functional triage system

### Exercise 3: Function Calling Integration
**Objective**: Integrate external functions with agents
**Steps**:
1. Define Python functions for git operations
2. Create an agent that uses these functions
3. Implement proper error handling
4. Test function calling with various inputs
5. Return structured results to user
**Expected Output**: Agent with tool-calling capabilities

---

## 9. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Yes (as introduction only)
- **Confidence Level**: Medium
- **Reasoning**: Swarm is excellent for teaching multi-agent fundamentals due to its simplicity, but participants should be guided toward production-ready frameworks after learning the basics.

### Suggested Implementation Approach
1. **Phase 1**: 30-minute introduction to multi-agent concepts using Swarm
2. **Phase 2**: Explain the limitations and migration path to production frameworks
3. **Phase 3**: Transition to more powerful frameworks (AutoGen, CrewAI, LangGraph)

### Alternative Tools
- **If not this tool, consider**: CrewAI (similar simplicity but production-ready)
- **Reason**: Swarm is educational only; for practical workshop outcomes, use production frameworks

---

## 10. RESEARCH METADATA

### Sources Consulted
- [OpenAI Swarm GitHub]: https://github.com/openai/swarm
- [Swarm Documentation]: Available in GitHub repo
- [Swarm Examples]: /examples directory in repository
- [Migration Guide to Agents SDK]: Available in repo
- [OpenAI Swarm Community Discussions]: https://community.openai.com/

### Research Notes
- **Gaps Identified**: Limited documentation on Claude integration
- **Needs Verification**: Future of Swarm project (superseded by Agents SDK)
- **Community Sentiment**: Positive as learning tool, but not for production

### Contact Points
- **Documentation**: https://github.com/openai/swarm
- **Community**: OpenAI Community Discord
- **Issues**: https://github.com/openai/swarm/issues

---

## FINAL VERDICT

### Workshop Suitability Score: 6/10

**Breakdown**:
- Teaching Value: 9/10 - Excellent for learning fundamentals
- Hands-on Potential: 8/10 - Quick to implement and understand
- Integration Ease: 9/10 - Very simple to set up
- Production Relevance: 2/10 - Not production-ready
- Documentation Quality: 6/10 - Basic but sufficient

### One-Sentence Summary
OpenAI Swarm is an excellent educational framework for teaching multi-agent fundamentals due to its extreme simplicity, but should only be used as an introduction before transitioning to production-ready frameworks.

### Tags for Categorization
`[multiagent]` `[orchestration]` `[educational]` `[beginner-friendly]` `[lightweight]` `[python]` `[experimental]` `[not-production-ready]` `[handoffs]` `[openai]` `[learning-only]`
