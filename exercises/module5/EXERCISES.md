# Module 5: Specialized Agents - Exercises

## Exercise 1: Create Nutrition Analysis Agent

### Objective
Build a specialized sub-agent for nutritional analysis of recipes.

### Tasks

**1. Define the agent scope and expertise**
```
"Create a nutrition analyst agent with expertise in nutritional science, recipe analysis, and health impact assessment"
```

**Requirements:**
- Expertise in nutritional science and dietetics
- Knowledge of dietary guidelines and standards
- Ability to calculate calories and macronutrients
- Understanding of allergens and dietary restrictions
- Health impact assessment capabilities

**2. Implement the agent file**
```
"Create the .claude/agents/nutrition-analyst.md file with comprehensive system prompt and guidelines"
```

**Agent file structure:**
```markdown
# Agent: Nutrition Analyst

## Role
You are a specialized nutrition analyst with expertise in recipe nutritional analysis, dietary guidelines, and health impact assessment.

## Expertise
- Nutritional science and dietetics
- Recipe analysis and calorie calculation
- Dietary restrictions and allergen identification
- Health impact assessment
- Nutritional database management

## Responsibilities
- Analyze recipe nutritional content
- Calculate per-serving nutrition facts
- Identify potential health concerns
- Suggest nutritional improvements
- Provide dietary compliance information

## Tools Available
- Recipe database access
- Nutritional information database
- Unit conversion utilities
- Calculation tools
- Report generation

## Guidelines
- Focus on accuracy in calculations
- Consider different dietary needs
- Provide actionable recommendations
- Flag potential allergens and health concerns
- Use evidence-based nutritional standards

## Output Format
Structured nutritional analysis with:
- Per-serving nutrition facts
- Health impact assessment
- Dietary compliance information
- Improvement suggestions
- Allergen warnings
```

**3. Create nutritional calculation logic**
```
"Implement the core nutritional calculation logic using the ingredient database and conversion utilities"
```

**Implementation requirements:**
- Parse ingredient quantities and units
- Convert to standard units for calculation
- Calculate calories per serving
- Determine macronutrient breakdown
- Identify common allergens
- Generate health score

**4. Test the agent with sample recipes**
```
"Test the nutrition agent with the sample chocolate chip cookie recipe and verify accuracy"
```

**Test cases:**
- Verify calorie calculations
- Check macro nutrient accuracy
- Validate allergen detection
- Assess health score relevance
- Test improvement suggestions

### Expected Outcomes
- Working nutrition analysis agent
- Accurate nutritional calculations
- Useful health insights and suggestions
- Structured output format

## Exercise 2: Security Audit Agent

### Objective
Create a security-focused sub-agent for code analysis.

### Tasks

**1. Define security expertise**
```
"Create a security auditor agent with expertise in web application security, SQL injection, and input validation"
```

**Security expertise areas:**
- OWASP Top 10 vulnerabilities
- SQL injection detection and prevention
- Cross-site scripting (XSS) protection
- Input validation and sanitization
- Authentication and authorization
- Security best practices for Node.js/Express

**2. Implement security analysis capabilities**
```
"Implement static code analysis for common security vulnerabilities in the recipe project"
```

**Analysis capabilities:**
- SQL injection vulnerability detection
- Input validation checking
- XSS vulnerability scanning
- Authentication flow analysis
- Dependency security checking
- Configuration security assessment

**3. Create risk assessment system**
```
"Develop a risk scoring system for security findings with remediation suggestions"
```

**Risk assessment components:**
- Severity levels (Critical, High, Medium, Low)
- Impact analysis (Confidentiality, Integrity, Availability)
- Exploitability assessment
- Business impact evaluation
- Remediation priority scoring
- Detailed remediation steps

**4. Test security detection**
```
"Test the security agent against the recipe project codebase and identify real vulnerabilities"
```

**Testing approach:**
- Analyze route handlers for SQL injection
- Check input validation in API endpoints
- Review authentication implementation
- Assess database query safety
- Test file upload security
- Evaluate configuration security

### Expected Outcomes
- Comprehensive security analysis agent
- Accurate vulnerability detection
- Actionable remediation suggestions
- Risk assessment framework

## Exercise 3: Recipe Validation Agent

### Objective
Create a specialized agent for recipe validation and quality assessment.

### Tasks

**1. Define validation expertise**
```
"Create a recipe validation agent with expertise in recipe structure, content quality, and usability assessment"
```

**Validation expertise areas:**
- Recipe structure and completeness
- Instruction clarity and accuracy
- Ingredient measurement validation
- Cooking time reasonableness
- Nutritional consistency
- User experience assessment

**2. Implement validation rules**
```
"Implement comprehensive validation rules for recipe quality and completeness"
```

**Validation rules:**
- Required field validation
- Data type checking
- Range validation (times, quantities)
- Relationship validation (ingredients vs instructions)
- Format validation (instructions structure)
- Consistency checks

**3. Create quality scoring system**
```
"Develop a quality scoring system that rates recipes on multiple dimensions"
```

**Quality dimensions:**
- Completeness (all required fields present)
- Clarity (instructions easy to follow)
- Accuracy (measurements and times correct)
- Usability (easy to prepare)
- Nutritional value (balanced nutrition)
- Originality (unique or creative)

**4. Test validation accuracy**
```
"Test the validation agent against various recipes and assess scoring accuracy"
```

**Test scenarios:**
- Complete vs incomplete recipes
- Clear vs confusing instructions
- Accurate vs inaccurate measurements
- Simple vs complex recipes
- Different recipe categories

### Expected Outcomes
- Comprehensive recipe validation agent
- Quality assessment framework
- Actionable improvement suggestions
- Consistent scoring system

## Exercise 4: Multi-Agent Coordination

### Objective
Coordinate multiple sub-agents for comprehensive recipe analysis.

### Tasks

**1. Design agent communication protocol**
```
"Create a communication protocol for coordinating nutrition, security, and validation agents"
```

**Protocol requirements:**
- Standardized message format
- Agent discovery and registration
- Request/response handling
- Error propagation
- Result aggregation
- Conflict resolution

**2. Implement main orchestrator**
```
"Create a main agent that can orchestrate multiple sub-agents for comprehensive analysis"
```

**Orchestrator capabilities:**
- Agent task assignment
- Parallel execution management
- Result collection and aggregation
- Conflict detection and resolution
- Final report generation
- Performance monitoring

**3. Handle agent coordination**
```
"Implement coordination logic for managing multiple agents working on the same recipe"
```

**Coordination challenges:**
- Parallel vs sequential execution
- Context sharing between agents
- Result dependency management
- Conflict resolution strategies
- Performance optimization
- Error handling and recovery

**4. Test multi-agent workflows**
```
"Test the complete multi-agent system with complex recipe analysis scenarios"
```

**Test scenarios:**
- Full recipe analysis workflow
- Partial analysis requests
- Error recovery scenarios
- Performance under load
- Edge case handling

### Expected Outcomes
- Working multi-agent coordination system
- Efficient parallel processing
- Comprehensive analysis results
- Robust error handling

## Exercise 5: Advanced Agent Features

### Objective
Implement advanced features for sub-agents.

### Tasks

**1. Add learning capabilities**
```
"Implement learning capabilities for agents to improve their performance over time"
```

**Learning features:**
- Result feedback collection
- Performance metric tracking
- Pattern recognition
- Adaptive response generation
- Knowledge base expansion

**2. Create agent marketplace**
```
"Design a system for discovering, sharing, and reusing specialized agents"
```

**Marketplace features:**
- Agent discovery and search
- Agent rating and reviews
- Version management
- Dependency resolution
- Usage analytics
- Community sharing

**3. Implement agent monitoring**
```
"Create monitoring and observability for sub-agent performance and health"
```

**Monitoring capabilities:**
- Performance metrics collection
- Error tracking and alerting
- Resource usage monitoring
- Response time analysis
- Success rate tracking
- Health check endpoints

**4. Add agent persistence**
```
"Implement persistence for agent state, learning data, and configuration"
```

**Persistence features:**
- Agent state management
- Learning data storage
- Configuration persistence
- Session management
- Cache management
- Backup and recovery

### Expected Outcomes
- Intelligent, learning agents
- Scalable agent ecosystem
- Comprehensive monitoring
- Reliable persistence system

## Exercise Solutions

After completing the exercises, compare your solutions with the provided solutions in `solutions/module5/`.

### Success Criteria
- Agents demonstrate specialized expertise
- Multi-agent coordination works smoothly
- Performance is acceptable for production use
- Error handling is robust
- Results are accurate and actionable

### Common Issues and Solutions

**Issue: Agent context is too large**
**Solution**: Implement context pruning and information filtering

**Issue: Agents provide conflicting results**
**Solution**: Implement conflict resolution and result prioritization

**Issue: Performance is slow with multiple agents**
**Solution**: Optimize parallel processing and reduce overhead

**Issue: Agents lack domain knowledge**
**Solution**: Enhance system prompts and provide better knowledge bases

## Next Steps

After completing these exercises, you should be comfortable with:
- Creating specialized sub-agents for specific domains
- Managing context isolation and communication
- Coordinating multiple agents for complex tasks
- Implementing advanced agent features
- Evaluating agent performance and effectiveness

Proceed to Module 6 to learn about hooks and automation patterns.