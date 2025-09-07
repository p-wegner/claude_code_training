# Module 1: First Contact with Agentic Coding - Exercises

## Exercise 1: Your First Claude Code Interaction

### Objective
Get familiar with Claude Code's basic interface and tool usage.

### Instructions
1. Navigate to the recipe project directory
2. Start Claude Code
3. Perform the following interactions:

```bash
# Start in the project directory
cd recipe-project
claude
```

### Tasks to Complete
1. **Read a file**
   ```
   "Read the package.json file and tell me what dependencies this project uses"
   ```

2. **Explore the project structure**
   ```
   "What files are in the src directory? Give me a brief overview of what each does"
   ```

3. **Make a simple modification**
   ```
   "Add a comment at the top of server.js that says 'Recipe Management System - Claude Code Workshop'"
   ```

4. **Test your changes**
   ```
   "Now try to start the server and see what happens"
   ```

## Exercise 2: Fix Basic Server Errors

### Objective
Use Claude Code to identify and fix basic syntax and import errors.

### Current Issues
The server has several basic errors that prevent it from starting:

1. Missing database file import
2. Incorrect route references
3. Missing dependencies

### Instructions
1. **Try to start the server**
```bash
npm start
```

2. **Ask Claude Code to fix the errors**
```
"The server won't start. Can you identify and fix the errors?"
```

3. **Verify the fixes**
```bash
npm start
```

### Expected Outcome
- Server should start successfully on port 3000
- No error messages in the console
- Can access the basic web interface

## Exercise 3: Create a Simple API Test

### Objective
Learn how to use Claude Code to create and test API endpoints.

### Instructions
1. **Test the existing API**
```bash
curl http://localhost:3000/api/recipes
```

2. **Ask Claude Code to create a test script**
```
"Create a simple test script that tests the main API endpoints"
```

3. **Run the test**
```bash
node test-api.js
```

### Expected Outcome
- A working test script
- Understanding of basic API interactions
- Confidence in making API calls

## Exercise 4: Add a Simple Feature

### Objective
Practice adding a new feature using Claude Code.

### Instructions
1. **Ask Claude Code to add a new endpoint**
```
"Add a new API endpoint /api/health that returns a simple health check response"
```

2. **Test the new endpoint**
```bash
curl http://localhost:3000/api/health
```

### Expected Outcome
- New working API endpoint
- Understanding of how to add features
- Experience with iterative development

## Bonus Exercise: Code Review

### Objective
Learn how to ask Claude Code for code review and improvements.

### Instructions
1. **Ask for a code review**
```
"Review the routes/recipes.js file and suggest improvements"
```

2. **Implement the suggestions**
```
"Implement the top 3 suggestions from your review"
```

### Expected Outcome
- Improved code quality
- Understanding of best practices
- Experience with code review workflows

## Exercise Solutions

After completing the exercises, compare your solutions with the provided solutions in the `solutions/module1/` directory.

### Key Learning Points
1. **Be specific** in your requests to Claude Code
2. **Iterate gradually** - don't try to do too much at once
3. **Test frequently** to catch issues early
4. **Review code** before accepting changes
5. **Ask questions** if you don't understand something

## Common Issues and Solutions

### Issue: Claude Code won't start
**Solution**: Check authentication and installation
```bash
claude --version
```

### Issue: Server won't start after fixes
**Solution**: Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: API endpoints not working
**Solution**: Check server logs and route definitions
```bash
npm run dev  # Run in development mode for better error messages
```

## Next Steps

Once you've completed these exercises, you should be comfortable with:
- Basic Claude Code interactions
- Simple code modifications
- Testing and debugging
- Adding basic features

Proceed to Module 2 to learn about working with existing codebases.