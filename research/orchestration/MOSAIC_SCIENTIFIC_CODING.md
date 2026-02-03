# MOSAIC: Multi-agent Orchestration for Scientific Coding

## Agent Research Template

**Agent Name**: Research Agent
**Research Focus**: MOSAIC - Scientific Coding Multi-Agent Framework
**Date**: 2026-02-02
**Researcher**: Research Agent

---

## 1. TOOL OVERVIEW

### Tool Identity
- **Name**: MOSAIC (Multi-agent Orchestration for Task-Intelligent Scientific Coding)
- **Repository/URL**: https://arxiv.org/html/2510.08804v1
- **Latest Version**: Research publication (October 9, 2025)
- **Last Updated**: October 2025
- **License**: Academic/Research
- **Maintainer**: Tanwi Mallick et al.

### Tool Purpose
- **Primary Goal**: A training-free, LLM-agnostic multi-agent framework for scientific code generation that operates without validation I/O test cases
- **Target Users**: Scientific researchers, computational scientists, developers working on scientific computing tasks
- **Core Problem Solved**: Scientific coding requires rigorous algorithms, domain-specific reasoning, and interconnected subproblems - areas where general coding frameworks fail due to lack of test cases

---

## 2. CAPABILITY ASSESSMENT

### Core Features
| Feature | Description | Workshop Relevance | Rating (1-5) |
|---------|-------------|-------------------|--------------|
| Self-Reflection Agent | Learns to evaluate intermediate reasoning steps | High | 5 |
| Rationale Agent | Produces step-by-step reasoning plans | High | 5 |
| Coding Agent | Generates code from detailed plans | High | 5 |
| Debugger Agent | Iterative error correction with k rounds | High | 5 |
| Consolidated Context Window | Reduces hallucinations in long chains | High | 5 |
| Teacher-Student Paradigm | Knowledge distillation from validation data | High | 5 |
| Domain-Segregated Memory | Prevents cross-domain interference | Medium | 4 |
| LLM-Agnostic Design | Works with GPT-4o, Claude Sonnet 4, Gemini 2.5 Flash | High | 5 |

### Unique Selling Points
1. **Test-Case-Free Operation**: Unlike MapCoder, CodeSIM, and AgentCoder, works without sample I/O test cases
2. **Scientific Domain Focus**: Specifically designed for physics, chemistry, biology, mathematics, and materials science
3. **Consolidated Context Window**: Maintains only function signatures and one-line summaries to reduce hallucinations
4. **Knowledge Distillation**: Teacher module uses ground-truth code to guide student learning

### Limitations
- **Test I/O Free Limitation**: Cannot leverage frameworks that require validation test cases
- **Domain Knowledge Dependency**: Relies on dataset's domain split information
- **Closed-Source Performance Gap**: Closed-source models outperform open-source by 3x on main problems
- **Biology Domain Challenge**: Consistently lower performance in biology due to conceptual complexity

---

## 3. WORKSHOP INTEGRATION POTENTIAL

### Teaching Suitability
- **Conceptual Complexity**: Advanced (multi-agent orchestration, scientific computing)
- **Hands-on Potential**: Medium (requires SciCode benchmark setup)
- **Demo-readiness**: Yes (paper includes detailed examples and evaluation scripts)
- **Setup Time**: 30+ minutes (requires LangGraph, SciCode dataset, LLM API access)

### Learning Objectives Addressed
- [x] **Spec-driven Development**: Rationale Agent creates detailed specifications before coding
- [x] **Multiagent Orchestration**: Four specialized agents collaborate in student-teacher setup
- [x] **Git Worktrees Integration**: Could be adapted for multi-file scientific projects
- [x] **Production Workflows**: Demonstrates iterative refinement patterns applicable to production

### Recommended Workshop Module
- **Module Placement**: Module 10 - Specialized Applications (Scientific/AI Research)
- **Duration**: 60 minutes
- **Prerequisites**: Understanding of multi-agent systems, scientific computing concepts

---

## 4. TECHNICAL EVALUATION

### System Requirements
- **Runtime**: Python
- **Dependencies**: LangGraph (for agent orchestration), PyTorch (for SciCode benchmark)
- **Claude Code Version Required**: N/A (standalone research framework)
- **Platform Support**: Cross-platform

### Integration Complexity
- **Installation Difficulty**: Medium (requires multiple dependencies)
- **Configuration Required**: Extensive (prompts for each agent, validation data setup)
- **Compatibility Issues**: Requires specific LLM backbones for best results

### Performance Characteristics
- **Resource Usage**: Medium to High (multiple LLM calls per task)
- **Execution Speed**: Medium (iterative agent coordination)
- **Scalability**: Good for scientific domains, limited for general coding

### Performance Results (SciCode Benchmark)
| LLM Backbone | Main Problems Solved | Subproblems Solved | Improvement |
|--------------|---------------------|-------------------|-------------|
| GPT-4o | 12/65 (18.5%) | 113/283 (39.9%) | 8.5% over baseline |
| Claude Sonnet 4 | 13/65 (20%) | 118/283 (41.7%) | Best overall |
| Gemini 2.5 Flash | 11/65 (16.9%) | 117/283 (41.3%) | Strong in physics |

---

## 5. PRACTICAL WORKSHOP SCENARIOS

### Scenario 1: Scientific Problem Decomposition
**Difficulty**: Advanced
**Time**: 25 minutes
**Description**: Demonstrate how MOSAIC breaks a complex physics problem into solvable sub-tasks
**Learning Outcomes**:
- [x] Understanding problem decomposition in scientific contexts
- [x] Applying teacher-student knowledge distillation
- [x] Managing context across chained subproblems

### Scenario 2: Domain-Specific Agent Configuration
**Difficulty**: Advanced
**Time**: 20 minutes
**Description**: Configure MOSAIC agents for different scientific domains
**Learning Outcomes**:
- [x] Domain-specific prompt engineering
- [x] Memory isolation across domains
- [x] Adapting to domain-specific reasoning patterns

---

## 6. COMPARATIVE ANALYSIS

### Similar Tools in Category
| Tool | Strengths vs MOSAIC | Weaknesses vs MOSAIC |
|------|-------------------|---------------------|
| MapCoder | Better for general coding (has test cases) | Cannot handle scientific coding without I/O examples |
| CodeSIM | Stronger on competitive programming benchmarks | Requires sample I/O for verification |
| AgentCoder | More sophisticated testing loops | Depends on validation I/O |
| Orchestral AI | Provider-agnostic, simpler architecture | Not specialized for scientific domain |

### Recommendation Score
- **For Beginners**: 3/10 (Complex setup, requires scientific background)
- **For Intermediate**: 6/10 (Valuable concepts but steep learning curve)
- **For Advanced**: 8/10 (Excellent insights for scientific computing workflows)

---

## 7. IMPLEMENTATION EXAMPLES

### Code Example 1: Basic Agent Configuration
```python
# MOSAIC uses LangGraph for orchestration
from langgraph.graph import StateGraph

# Self-Reflection Agent configuration
self_reflection_prompt = """
Analyze the ground truth code from the validation set.
Understand patterns from each domain.
Prepare gold standard domain-specific pseudocode.
"""

# Rationale Agent with Consolidated Context Window
rationale_agent = RationaleAgent(
    ccw_enabled=True,  # Only function signatures + one-line summaries
    domain="physics"
)

# Orchestrated workflow
def mosaic_workflow(problem):
    # 1. Self-Reflection on algorithm
    pseudocode = self_reflection_agent.generate(ground_truth)

    # 2. Rationale planning with CCW
    plan = rationale_agent.plan(problem, context=ccw_context)

    # 3. Coding from plan
    code = coding_agent.generate(plan)

    # 4. Debugging iteration
    for i in range(k):  # k rounds of debugging
        if code.executes():
            break
        code = debugger_agent.fix(code)

    return code
```

### Code Example 2: Consolidated Context Window
```python
# CCW maintains only essential information
class ConsolidatedContextWindow:
    def add_subproblem(self, subproblem):
        # Store ONLY function signature
        self.context.append({
            'signature': subproblem.function_signature,
            'summary': one_line_summary(subproblem.code)
        })
        # NOT the full code - this prevents context overflow
```

### Code Example 3: Teacher-Student Setup
```python
# Teacher uses validation data
teacher = TeacherAgent(
    validation_data=sci_code_validation_set,
    n_examples=5  # Use ≤5% of training data
)

# Generate few-shot examples
teacher_rationales = teacher.generate_rationales()

# Student learns from teacher's examples
student = StudentAgent(
    few_shot_examples=teacher_rationales,
    domain_memory=domain_specific  # Isolated per domain
)
```

---

## 8. POTENTIAL WORKSHOP EXERCISES

### Exercise 1: Implement Context Window Management
**Objective**: Learn to manage context in long scientific workflows
**Steps**:
1. Create a multi-step scientific problem
2. Implement full context tracking (baseline)
3. Implement Consolidated Context Window
4. Compare hallucination rates
**Expected Output**: Understanding of context management strategies

### Exercise 2: Build Domain-Specific Agents
**Objective**: Create specialized agents for different scientific domains
**Steps**:
1. Choose a scientific domain (physics, chemistry, biology)
2. Configure agent prompts with domain knowledge
3. Implement domain-isolated memory
4. Test on domain-specific problems
**Expected Output**: Working domain-specialized agent

---

## 9. RECOMMENDATION SUMMARY

### Include in Workshop?
- **Recommendation**: Maybe (as advanced case study)
- **Confidence Level**: Medium
- **Reasoning**: MOSAIC provides excellent insights into scientific multi-agent orchestration, but its complexity and specialized focus may limit broad workshop appeal. Best suited for an advanced breakout session or as a reference for participants interested in scientific computing.

### Suggested Implementation Approach
1. **Phase 1**: Present as case study in "Advanced Multi-Agent Patterns" session
2. **Phase 2**: Focus on teachable concepts (CCW, teacher-student, domain isolation)
3. **Phase 3**: Reference for participants doing scientific work

### Alternative Tools
- **If not this tool, consider**: Orchestral AI (simpler), general multi-agent patterns
- **Reason**: MOSAIC is highly specialized; general frameworks may be more broadly applicable

---

## 10. RESEARCH METADATA

### Sources Consulted
- [MOSAIC Paper (arXiv:2510.08804v1)](https://arxiv.org/html/2510.08804v1)
- [SciCode Benchmark](https://arxiv.org/abs/2407.13168)

### Research Notes
- **Gaps Identified**: Limited publicly available code implementation
- **Needs Verification**: Hands-on testing with SciCode benchmark
- **Community Sentiment**: Strong academic interest, limited production adoption visibility

### Contact Points
- **Documentation**: arXiv paper with appendices containing prompt templates
- **Community**: Academic research channels
- **Issues**: Research paper contact (authors)

---

## FINAL VERDICT

### Workshop Suitability Score: 6/10

**Breakdown**:
- Teaching Value: 8/10 (Excellent concepts for multi-agent design)
- Hands-on Potential: 4/10 (Complex setup, requires scientific background)
- Integration Ease: 3/10 (Requires extensive configuration)
- Production Relevance: 7/10 (Valuable for scientific computing contexts)
- Documentation Quality: 8/10 (Well-documented academic paper)

### One-Sentence Summary
MOSAIC is a sophisticated multi-agent framework for scientific coding that demonstrates advanced orchestration patterns including teacher-student learning and consolidated context windows, though its specialized focus and complexity make it better suited as an advanced case study than a general workshop topic.

### Tags for Categorization
`[multiagent]` `[scientific-computing]` `[advanced]` `[research]` `[test-case-free]` `[knowledge-distillation]` `[context-management]` `[domain-specific]`
