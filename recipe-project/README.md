# Recipe Management System - Workshop Project

This is a intentionally buggy Recipe Management System designed for the Claude Code workshop. Participants will use Claude Code to identify and fix various issues throughout the day.

## Project Overview

A recipe management system with the following features:
- Recipe CRUD operations
- Ingredient management with unit conversion
- Nutritional calculation
- Search functionality
- Web interface

## Known Issues & Bugs (For Workshop Exercises)

### Module 1: Basic Bugs
1. **Database path issue**: `server.js` references `./src/database.js` but the file doesn't exist
2. **Missing import**: `Ingredient` model not imported in `ingredientService.js`
3. **Incorrect route**: Search endpoint should be `/api/recipes/search/by-ingredient` but is defined incorrectly
4. **Validation error**: Negative time values are not properly validated

### Module 2: Code Quality Issues
1. **Inconsistent naming**: Mix of `prep_time` and `prepTime` across files
2. **Missing error handling**: Several API endpoints lack proper error handling
3. **Security issue**: SQL injection vulnerability in search functionality
4. **Performance issue**: N+1 query problem in recipe listing

### Module 3: Advanced Issues
1. **Transaction handling**: Database transactions not properly rolled back on errors
2. **Nutrition calculation**: Incorrect per-serving calculations
3. **Unit conversion**: Missing several common unit conversions
4. **Frontend bugs**: JavaScript errors in recipe management

### Module 4: Integration Issues
1. **API consistency**: Inconsistent response formats
2. **Testing**: Missing test cases for edge cases
3. **Documentation**: Missing API documentation
4. **Validation**: Complex validation scenarios not handled

## Setup Instructions

1. Install dependencies:
```bash
cd recipe-project
npm install
```

2. Start the server:
```bash
npm start
```

3. Or run in development mode:
```bash
npm run dev
```

4. Access the application at `http://localhost:3000`

## API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `GET /api/recipes/search/by-ingredient?ingredient=<name>` - Search by ingredient

### Ingredients
- `GET /api/ingredients` - Get all ingredients
- `GET /api/ingredients/:id` - Get ingredient by ID
- `GET /api/ingredients/recipe/:recipeId` - Get ingredients by recipe ID
- `GET /api/ingredients/convert/:fromUnit/:toUnit?amount=<value>` - Convert units
- `POST /api/ingredients` - Create new ingredient
- `PUT /api/ingredients/:id` - Update ingredient
- `DELETE /api/ingredients/:id` - Delete ingredient

## Workshop Exercise Structure

### Module 1: First Contact
- Fix basic syntax and import errors
- Correct route definitions
- Add basic validation

### Module 2: Code Exploration
- Use Grep/Glob to find related code
- Identify inconsistent patterns
- Fix naming conventions

### Module 3: Output Formatting
- Standardize API response formats
- Add proper error handling
- Implement consistent logging

### Module 4: Slash Commands
- Create reusable command patterns
- Implement code review automation
- Set up testing workflows

### Module 5: Sub-agents
- Create specialized agents for:
  - Nutrition analysis
  - Ingredient validation
  - Recipe optimization

### Module 6: Hooks
- Implement pre-commit validation
- Set up automated testing
- Create deployment safety checks

## Technical Stack

- **Backend**: Node.js, Express.js, SQLite3
- **Frontend**: HTML, CSS, vanilla JavaScript
- **Testing**: Jest, Supertest
- **Development**: Nodemon, ESLint

## File Structure

```
recipe-project/
├── src/
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── tests/
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── public/             # Static files
├── data/               # Sample data
├── package.json
└── server.js           # Main application file
```

## Contributing

This is a workshop project designed for learning purposes. Please follow the workshop instructions for making changes and improvements.

## License

MIT License - See LICENSE file for details.