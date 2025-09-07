# Module 1: Exercise Solutions

## Exercise 1: First Interaction Solutions

### Sample Interactions

**1. Reading package.json:**
```
"Read the package.json file and tell me what dependencies this project uses"
```

Expected response should identify:
- Express for web server
- SQLite3 for database
- Jest for testing
- Various middleware packages

**2. Exploring project structure:**
```
"What files are in the src directory? Give me a brief overview of what each does"
```

Expected response should identify:
- `models/` - Data models (Recipe, Ingredient, Nutrition)
- `routes/` - API route handlers
- `services/` - Business logic
- `utils/` - Utility functions

**3. Simple modification:**
```
"Add a comment at the top of server.js that says 'Recipe Management System - Claude Code Workshop'"
```

The comment should be added at the very top of the file.

## Exercise 2: Fix Basic Server Errors

### Primary Issues and Fixes

**Issue 1: Missing database import**
- **Problem**: `server.js` tries to require `./src/database.js` but there's no export
- **Solution**: Update `src/database.js` to properly export the database instance

**Issue 2: Missing Ingredient model import**
- **Problem**: `Ingredient` model not imported where needed
- **Solution**: Add proper import statements

**Issue 3: Route definition issues**
- **Problem**: Search endpoint defined incorrectly
- **Solution**: Fix route path and handler

### Fixed Code Examples

**database.js export fix:**
```javascript
// At the end of src/database.js
module.exports = db;
```

**Import fixes:**
```javascript
// Add to files that need database
const db = require('./database');
```

## Exercise 3: API Test Script

### Solution: test-api.js
```javascript
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/recipes',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('Response:', JSON.parse(data));
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.end();
```

## Exercise 4: Health Check Endpoint

### Solution: Add to server.js
```javascript
// Add this route before the error handlers
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});
```

## Exercise 5: Code Review Improvements

### Common Suggestions and Implementation

**1. Error handling improvements:**
```javascript
// Better error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    
    res.status(500).json({ error: 'Internal server error' });
});
```

**2. Input validation:**
```javascript
// Add validation middleware
const validateRecipe = (req, res, next) => {
    const { title, instructions } = req.body;
    
    if (!title || !instructions) {
        return res.status(400).json({ error: 'Title and instructions are required' });
    }
    
    next();
};
```

**3. Security improvements:**
```javascript
// Add rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Complete Server Fix

### Fixed server.js structure:
```javascript
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import database
const db = require('./src/database');

// Import routes
const recipeRoutes = require('./src/routes/recipes');
const ingredientRoutes = require('./src/routes/ingredients');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Make database available to routes
app.use((req, res, next) => {
    req.db = db.db; // Access the actual db instance
    next();
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Recipe Manager server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close().then(() => {
        console.log('Closed the database connection.');
        process.exit(0);
    });
});
```

## Key Takeaways

1. **Start simple** - Begin with basic interactions
2. **Be specific** - Clear requests get better results
3. **Iterate** - Make small changes and test frequently
4. **Review** - Always review generated code
5. **Test** - Verify changes work as expected

## Next Steps

After completing these exercises, you should be comfortable with:
- Basic Claude Code interactions
- Simple debugging and fixing
- Adding new features
- Understanding project structure

Proceed to Module 2 to learn more advanced techniques.