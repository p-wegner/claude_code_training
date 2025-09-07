# Module 2: Working with Existing Code - Exercises

## Exercise 1: Code Exploration and Analysis

### Objective
Use Claude Code's search tools to understand the recipe project codebase.

### Tasks

**1. Find all route definitions**
```
"Use Grep to find all route definitions in the project. Categorize them by function."
```

**Expected Analysis:**
- Identify all API endpoints
- Group by functionality (recipes, ingredients, etc.)
- Note any missing endpoints or inconsistencies

**2. Map the data models**
```
"Find all model definitions and their relationships. Create a data model diagram."
```

**Expected Analysis:**
- Identify Recipe, Ingredient, and Nutrition models
- Map relationships between models
- Note any missing relationships or constraints

**3. Analyze the service layer**
```
"Find all service classes and their methods. What business logic do they contain?"
```

**Expected Analysis:**
- Identify RecipeService and any other services
- List all methods and their purposes
- Note any missing business logic

### Deliverable
Create a brief document describing:
- Project structure overview
- Key components and their responsibilities
- Data flow through the system

## Exercise 2: Identify Inconsistencies

### Objective
Find and fix naming and pattern inconsistencies in the codebase.

### Tasks

**1. Find mixed naming conventions**
```
"Search for inconsistent variable naming patterns throughout the codebase"
```

**Issues to Find:**
- Mix of snake_case and camelCase
- Inconsistent function naming
- Mixed case in database column names

**2. Standardize the naming**
```
"Create a consistent naming convention and apply it throughout the codebase"
```

**Areas to Standardize:**
- Database column names (all snake_case)
- JavaScript variables (all camelCase)
- Function names (camelCase for methods, PascalCase for classes)

**3. Fix inconsistent error handling**
```
"Find all the different error handling patterns and standardize them"
```

**Patterns to Standardize:**
- API error responses
- Database error handling
- Frontend error display

### Deliverable
- Standardized naming convention document
- Refactored code with consistent naming
- Unified error handling patterns

## Exercise 3: Bug Hunt and Fix

### Objective
Identify and fix functional bugs in the recipe project.

### Tasks

**1. Fix the search endpoint**
```
"The search by ingredient endpoint has a bug. Find it and fix it."
```

**Steps:**
1. Test the current endpoint
2. Identify the specific issue
3. Fix the bug
4. Test the fix

**Test the endpoint:**
```bash
curl "http://localhost:3000/api/recipes/search/by-ingredient?ingredient=chicken"
```

**2. Fix ingredient validation**
```
"Ingredient validation is not working properly. Find and fix the issues."
```

**Issues to Address:**
- Negative quantities being accepted
- Empty ingredient names
- Invalid units

**3. Fix the frontend JavaScript**
```
"The frontend has JavaScript errors that prevent proper functionality. Fix them."
```

**Issues to Address:**
- Form submission errors
- Search functionality
- Recipe display issues

### Deliverable
- Working search endpoint
- Proper ingredient validation
- Functional frontend interface

## Exercise 4: Performance Analysis

### Objective
Identify and fix performance issues in the application.

### Tasks

**1. Find N+1 query problems**
```
"Search for potential N+1 query issues in the database operations"
```

**Areas to Check:**
- Recipe listing with ingredients
- Ingredient retrieval
- Any operations that loop and query

**2. Optimize database queries**
```
"Find inefficient database queries and optimize them"
```

**Optimizations to Consider:**
- Add proper JOINs
- Use indexes where appropriate
- Batch operations instead of individual queries

**3. Fix frontend performance issues**
```
"Identify and fix performance issues in the frontend JavaScript"
```

**Issues to Address:**
- Inefficient DOM manipulation
- Unnecessary re-renders
- Large data processing in the browser

### Deliverable
- Optimized database queries
- Improved frontend performance
- Performance metrics before and after

## Exercise 5: Security Analysis

### Objective
Identify and fix security vulnerabilities.

### Tasks

**1. Find SQL injection vulnerabilities**
```
"Search for potential SQL injection vulnerabilities in the code"
```

**Areas to Check:**
- Dynamic SQL construction
- User input in queries
- String concatenation in queries

**2. Fix input validation**
```
"Implement proper input validation for all user inputs"
```

**Validations to Add:**
- Recipe data validation
- Ingredient quantity validation
- File upload validation (if any)

**3. Add security headers**
```
"Add missing security headers and middleware"
```

**Security Measures:**
- CSRF protection
- XSS protection
- Content Security Policy

### Deliverable
- Secure API endpoints
- Proper input validation
- Security headers implemented

## Exercise 6: Code Quality Improvements

### Objective
Improve overall code quality and maintainability.

### Tasks

**1. Remove code duplication**
```
"Find duplicated code and extract it into reusable functions"
```

**Areas to Refactor:**
- Database connection handling
- Error handling patterns
- Validation logic

**2. Add proper error handling**
```
"Add comprehensive error handling throughout the application"
```

**Error Handling to Add:**
- Database operation errors
- API endpoint errors
- Frontend user errors

**3. Improve code documentation**
```
"Add proper documentation and comments to the code"
```

**Documentation to Add:**
- Function documentation
- API endpoint documentation
- Complex logic explanations

### Deliverable
- Refactored code with reduced duplication
- Comprehensive error handling
- Well-documented codebase

## Exercise Solutions

After completing the exercises, compare your solutions with the provided solutions in `solutions/module2/`.

### Success Criteria
- All identified bugs are fixed
- Code follows consistent naming conventions
- Performance is improved
- Security vulnerabilities are addressed
- Code is well-documented and maintainable

### Common Issues and Solutions

**Issue: Can't find all the bugs**
**Solution**: Use systematic search patterns and test thoroughly

**Issue: Refactoring breaks existing functionality**
**Solution**: Make small changes and test frequently

**Issue: Performance improvements are minimal**
**Solution**: Profile the application to find actual bottlenecks

## Next Steps

After completing these exercises, you should be comfortable with:
- Systematic code exploration
- Identifying and fixing inconsistencies
- Bug hunting and resolution
- Performance optimization
- Security analysis

Proceed to Module 3 to learn about output formatting and configuration.