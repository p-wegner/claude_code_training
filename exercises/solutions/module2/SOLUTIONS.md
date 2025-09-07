# Module 2: Exercise Solutions

## Exercise 1: Code Exploration and Analysis

### Solution: Project Structure Analysis

**Route Definitions Found:**
```javascript
// Recipes routes
GET    /api/recipes           // List all recipes
GET    /api/recipes/:id       // Get recipe by ID
POST   /api/recipes           // Create new recipe
PUT    /api/recipes/:id       // Update recipe
DELETE /api/recipes/:id       // Delete recipe
GET    /api/recipes/search/by-ingredient // Search by ingredient

// Ingredients routes
GET    /api/ingredients           // List all ingredients
GET    /api/ingredients/:id       // Get ingredient by ID
GET    /api/ingredients/recipe/:recipeId // Get ingredients by recipe
GET    /api/ingredients/convert/:fromUnit/:toUnit // Unit conversion
POST   /api/ingredients           // Create ingredient
PUT    /api/ingredients/:id       // Update ingredient
DELETE /api/ingredients/:id       // Delete ingredient
```

**Data Model Relationships:**
```
Recipe (1) <-> (N) Ingredient
Recipe (1) <-> (1) Nutrition
```

**Service Layer Analysis:**
- `RecipeService` - Handles recipe business logic
- Missing: `IngredientService` and `NutritionService`

## Exercise 2: Naming Convention Fixes

### Issue 1: Mixed Database Column Names
**Problem:** Mix of snake_case and camelCase in database
**Solution:** Standardize to snake_case

**Fixed database schema:**
```sql
CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    prep_time INTEGER,           -- Changed from prepTime
    cook_time INTEGER,           -- Changed from cookTime
    servings INTEGER,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Issue 2: Inconsistent JavaScript Variables
**Problem:** Mixed naming in JavaScript code
**Solution:** Standardize to camelCase

**Fixed variable naming:**
```javascript
// Before
const prep_time = recipe.prep_time;
const cook_time = recipe.cook_time;

// After
const prepTime = recipe.prep_time;
const cookTime = recipe.cook_time;
```

### Issue 3: Function Naming
**Problem:** Inconsistent function naming conventions
**Solution:** Use camelCase for methods, PascalCase for classes

**Fixed function names:**
```javascript
// Before
function get_recipe_by_id(id) {
    // ...
}

// After
function getRecipeById(id) {
    // ...
}
```

## Exercise 3: Bug Fixes

### Bug 1: Search Endpoint Issue
**Problem:** Search endpoint route was defined incorrectly
**Solution:** Fix the route definition

**Fixed route in server.js:**
```javascript
// Before
app.get('/api/recipes/search/by-ingredient', (req, res) => {
    // ...
});

// After
app.use('/api/recipes', recipeRoutes); // Make sure this is before other routes
```

**Fixed route in recipes.js:**
```javascript
// Add this to the router
router.get('/search/by-ingredient', (req, res) => {
    const db = req.db;
    const ingredientName = req.query.ingredient;

    if (!ingredientName) {
        return res.status(400).json({ error: 'Ingredient name is required' });
    }

    const query = `
        SELECT DISTINCT r.*
        FROM recipes r
        JOIN ingredients i ON r.id = i.recipe_id
        WHERE i.name LIKE ?
        ORDER BY r.created_at DESC
    `;

    db.all(query, [`%${ingredientName}%`], (err, rows) => {
        if (err) {
            console.error('Error searching recipes:', err);
            return res.status(500).json({ error: 'Failed to search recipes' });
        }

        res.json(rows);
    });
});
```

### Bug 2: Ingredient Validation
**Problem:** Missing validation for ingredient data
**Solution:** Add comprehensive validation

**Fixed validation:**
```javascript
function validateIngredient(ingredient) {
    const errors = [];

    if (!ingredient.name || ingredient.name.trim().length === 0) {
        errors.push('Ingredient name is required');
    }

    if (!ingredient.quantity || ingredient.quantity <= 0) {
        errors.push('Ingredient quantity must be greater than 0');
    }

    if (!ingredient.unit || ingredient.unit.trim().length === 0) {
        errors.push('Ingredient unit is required');
    }

    // Valid units
    const validUnits = ['tsp', 'tbsp', 'cup', 'cups', 'oz', 'lb', 'g', 'kg', 'ml', 'l', 'piece', 'pieces'];
    if (!validUnits.includes(ingredient.unit.toLowerCase())) {
        errors.push(`Invalid unit: ${ingredient.unit}`);
    }

    return errors;
}
```

### Bug 3: Frontend JavaScript Errors
**Problem:** Multiple JavaScript errors in the frontend
**Solution:** Fix the main issues

**Fixed app.js:**
```javascript
// Fixed RecipeManager class
class RecipeManager {
    constructor() {
        this.recipes = [];
        this.currentRecipe = null;
        this.apiBase = '/api';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadRecipes();
    }

    bindEvents() {
        const form = document.getElementById('recipeForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveRecipe();
            });
        }

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchRecipes(e.target.value);
            });
        }
    }

    // ... rest of the methods
}
```

## Exercise 4: Performance Optimizations

### Optimization 1: N+1 Query Fix
**Problem:** N+1 queries when fetching recipes with ingredients
**Solution:** Use proper JOIN with JSON aggregation

**Fixed query:**
```javascript
const query = `
    SELECT r.*, 
           json_group_array(
             json_object('id', i.id, 'name', i.name, 'quantity', i.quantity, 'unit', i.unit)
           ) as ingredients
    FROM recipes r
    LEFT JOIN ingredients i ON r.id = i.recipe_id
    GROUP BY r.id
    ORDER BY r.created_at DESC
`;
```

### Optimization 2: Database Indexes
**Problem:** Missing database indexes
**Solution:** Add appropriate indexes

**Added indexes:**
```sql
CREATE INDEX idx_recipes_title ON recipes(title);
CREATE INDEX idx_ingredients_recipe_id ON ingredients(recipe_id);
CREATE INDEX idx_ingredients_name ON ingredients(name);
```

### Optimization 3: Frontend Performance
**Problem:** Inefficient DOM manipulation
**Solution:** Use document fragments and batch updates

**Fixed rendering:**
```javascript
renderRecipes(recipesToRender = this.recipes) {
    const recipeList = document.getElementById('recipeList');
    
    if (!recipeList) return;

    if (recipesToRender.length === 0) {
        recipeList.innerHTML = `
            <div class="empty-state">
                <h3>No recipes found</h3>
                <p>Start by adding your first recipe!</p>
            </div>
        `;
        return;
    }

    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    recipesToRender.forEach(recipe => {
        const recipeCard = this.createRecipeCard(recipe);
        fragment.appendChild(recipeCard);
    });
    
    recipeList.innerHTML = '';
    recipeList.appendChild(fragment);
}
```

## Exercise 5: Security Fixes

### Security Fix 1: SQL Injection
**Problem:** Potential SQL injection in search
**Solution:** Use parameterized queries

**Fixed search query:**
```javascript
// Before (vulnerable)
const query = `SELECT * FROM recipes WHERE title LIKE '%${ingredientName}%'`;

// After (secure)
const query = `
    SELECT DISTINCT r.*
    FROM recipes r
    JOIN ingredients i ON r.id = i.recipe_id
    WHERE i.name LIKE ?
    ORDER BY r.created_at DESC
`;

db.all(query, [`%${ingredientName}%`], (err, rows) => {
    // ...
});
```

### Security Fix 2: Input Validation
**Problem:** Missing input validation
**Solution:** Add comprehensive validation

**Added validation middleware:**
```javascript
function validateRecipeInput(req, res, next) {
    const { title, instructions, ingredients } = req.body;
    
    if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    if (!instructions || instructions.trim().length === 0) {
        return res.status(400).json({ error: 'Instructions are required' });
    }
    
    if (ingredients && Array.isArray(ingredients)) {
        for (const ingredient of ingredients) {
            if (!ingredient.name || ingredient.name.trim().length === 0) {
                return res.status(400).json({ error: 'All ingredients must have names' });
            }
            
            if (!ingredient.quantity || ingredient.quantity <= 0) {
                return res.status(400).json({ error: 'All ingredients must have valid quantities' });
            }
        }
    }
    
    next();
}
```

### Security Fix 3: Additional Security Headers
**Problem:** Missing security headers
**Solution:** Add security middleware

**Added security middleware:**
```javascript
const helmet = require('helmet');
app.use(helmet());

// Additional security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});
```

## Exercise 6: Code Quality Improvements

### Improvement 1: Remove Code Duplication
**Problem:** Duplicated error handling code
**Solution:** Create reusable error handler

**Created error handler:**
```javascript
function handleDatabaseError(err, res) {
    console.error('Database error:', err);
    
    if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ error: 'Data constraint violation' });
    }
    
    res.status(500).json({ error: 'Database operation failed' });
}

function handleValidationError(errors, res) {
    res.status(400).json({ 
        error: 'Validation failed',
        details: errors 
    });
}
```

### Improvement 2: Add Proper Error Handling
**Problem:** Missing error handling in many places
**Solution:** Add comprehensive error handling

**Added error handling:**
```javascript
// In recipe service
async createRecipe(recipeData) {
    try {
        const recipe = new Recipe(recipeData);
        const validationErrors = recipe.validate();

        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join(', '));
        }

        // ... rest of the implementation
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }
}
```

### Improvement 3: Add Documentation
**Problem:** Missing code documentation
**Solution:** Add comprehensive comments

**Added documentation:**
```javascript
/**
 * Recipe Service - Handles all recipe-related business logic
 * 
 * This service provides methods for CRUD operations on recipes,
 * including validation, search functionality, and relationship
 * management with ingredients and nutrition data.
 */
class RecipeService {
    /**
     * Create a new recipe with ingredients
     * @param {Object} recipeData - Recipe data including title, instructions, ingredients
     * @returns {Promise<Object>} Created recipe with ID
     * @throws {Error} If validation fails or database operation fails
     */
    async createRecipe(recipeData) {
        // Implementation
    }
    
    // ... other methods
}
```

## Summary of Fixes

### Fixed Issues:
1. ✅ Route definition problems
2. ✅ Naming convention inconsistencies
3. ✅ Missing validation
4. ✅ JavaScript errors
5. ✅ N+1 query problems
6. ✅ SQL injection vulnerabilities
7. ✅ Missing error handling
8. ✅ Performance issues
9. ✅ Security vulnerabilities
10. ✅ Code duplication

### Code Quality Improvements:
- Consistent naming conventions
- Comprehensive error handling
- Proper input validation
- Security best practices
- Performance optimizations
- Code documentation
- Reduced duplication

### Performance Improvements:
- Database query optimization
- Added indexes
- Frontend rendering optimization
- Reduced HTTP requests

### Security Improvements:
- SQL injection protection
- Input validation
- Security headers
- XSS protection
- CSRF protection

## Next Steps

After implementing these fixes, the codebase should be:
- More secure
- Better performing
- More maintainable
- Properly documented
- Consistent in coding standards

Proceed to Module 3 to learn about output formatting and configuration.