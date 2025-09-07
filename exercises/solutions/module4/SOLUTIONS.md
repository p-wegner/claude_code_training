# Module 4: Slash Commands - Exercise Solutions

## Exercise 1: Basic Slash Commands

### Solution 1: Recipe Validation Command

**File Structure:**
```
.claude/commands/
├── validate-recipe.md
├── analyze-nutrition.md
└── convert-ingredients.md
```

**validate-recipe.md:**
```markdown
# Command: /validate-recipe

## Description
Validates a recipe for completeness, nutrition accuracy, and potential issues.

## Parameters
- recipe_id: ID of recipe to validate (optional, uses current context)
- strict_mode: Enable strict validation (default: false)
- include_suggestions: Include improvement suggestions (default: true)

## Execution Steps
1. Load recipe data from database or context
2. Validate required fields (title, instructions, ingredients)
3. Check ingredient quantities and units
4. Calculate nutrition facts
5. Identify potential issues and allergens
6. Generate improvement suggestions
7. Format results for display

## Validation Rules
- Required fields: title, instructions, ingredients
- Each ingredient must have quantity, unit, and name
- Cooking times must be reasonable (0-1440 minutes)
- Servings must be positive number
- Nutrition values must be non-negative

## Output Format
Validation results grouped by severity with actionable suggestions.
```

**Implementation:**
```javascript
// .claude/commands/validate-recipe.js
class RecipeValidator {
  constructor(config = {}) {
    this.strictMode = config.strict_mode || false;
    this.includeSuggestions = config.include_suggestions !== false;
  }

  async validate(recipe) {
    const results = {
      errors: [],
      warnings: [],
      suggestions: [],
      score: 100,
      valid: true
    };

    // Required fields validation
    this.validateRequiredFields(recipe, results);
    
    // Ingredient validation
    this.validateIngredients(recipe, results);
    
    // Nutrition validation
    this.validateNutrition(recipe, results);
    
    // Practical validation
    this.validatePracticalAspects(recipe, results);
    
    // Calculate final score
    this.calculateScore(results);
    
    // Generate suggestions
    if (this.includeSuggestions) {
      this.generateSuggestions(recipe, results);
    }

    results.valid = results.errors.length === 0;
    return results;
  }

  validateRequiredFields(recipe, results) {
    const requiredFields = ['title', 'instructions', 'ingredients'];
    
    requiredFields.forEach(field => {
      if (!recipe[field] || (Array.isArray(recipe[field]) && recipe[field].length === 0)) {
        results.errors.push({
          field,
          message: `Missing required field: ${field}`,
          severity: 'critical'
        });
      }
    });
  }

  validateIngredients(recipe, results) {
    if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) {
      return;
    }

    recipe.ingredients.forEach((ingredient, index) => {
      const position = index + 1;
      
      // Check quantity
      if (!ingredient.quantity || ingredient.quantity <= 0) {
        results.errors.push({
          field: `ingredients[${index}].quantity`,
          message: `Ingredient ${position}: Invalid quantity`,
          severity: 'critical'
        });
      }

      // Check unit
      if (!ingredient.unit || ingredient.unit.trim() === '') {
        results.warnings.push({
          field: `ingredients[${index}].unit`,
          message: `Ingredient ${position}: Missing unit`,
          severity: 'medium'
        });
      }

      // Check name
      if (!ingredient.name || ingredient.name.trim() === '') {
        results.errors.push({
          field: `ingredients[${index}].name`,
          message: `Ingredient ${position}: Missing name`,
          severity: 'critical'
        });
      }
    });
  }

  validateNutrition(recipe, results) {
    if (!recipe.nutrition) {
      results.warnings.push({
        field: 'nutrition',
        message: 'Nutrition information not provided',
        severity: 'low'
      });
      return;
    }

    const nutritionFields = ['calories', 'protein', 'carbs', 'fat'];
    
    nutritionFields.forEach(field => {
      const value = recipe.nutrition[field];
      if (typeof value !== 'number' || value < 0) {
        results.warnings.push({
          field: `nutrition.${field}`,
          message: `Invalid ${field} value: must be non-negative number`,
          severity: 'medium'
        });
      }
    });

    // Check calorie reasonableness
    if (recipe.nutrition.calories) {
      const perServing = recipe.nutrition.calories / (recipe.servings || 1);
      if (perServing > 2000) {
        results.warnings.push({
          field: 'nutrition.calories',
          message: `Very high calorie count: ${perServing.toFixed(0)} per serving`,
          severity: 'medium'
        });
      }
    }
  }

  validatePracticalAspects(recipe, results) {
    // Cooking time validation
    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
    
    if (totalTime > 480) { // 8 hours
      results.warnings.push({
        field: 'cooking_time',
        message: 'Very long total cooking time: consider breaking into steps',
        severity: 'low'
      });
    }

    // Servings validation
    if (recipe.servings && recipe.servings > 20) {
      results.warnings.push({
        field: 'servings',
        message: 'Large serving size: consider scaling instructions',
        severity: 'low'
      });
    }

    // Instruction length validation
    if (recipe.instructions && recipe.instructions.length < 50) {
      results.warnings.push({
        field: 'instructions',
        message: 'Instructions seem very brief: consider adding more detail',
        severity: 'low'
      });
    }
  }

  calculateScore(results) {
    let score = 100;
    
    // Deduct points for errors
    score -= results.errors.length * 20;
    
    // Deduct points for warnings
    score -= results.warnings.length * 5;
    
    // Ensure score doesn't go below 0
    results.score = Math.max(0, score);
  }

  generateSuggestions(recipe, results) {
    // Ingredient suggestions
    if (recipe.ingredients && recipe.ingredients.length > 15) {
      results.suggestions.push({
        category: 'complexity',
        message: 'Consider simplifying ingredient list for better user experience'
      });
    }

    // Nutrition suggestions
    if (recipe.nutrition && recipe.nutrition.fat > 30) {
      results.suggestions.push({
        category: 'health',
        message: 'Consider reducing fat content for healthier recipe'
      });
    }

    // Time optimization suggestions
    if ((recipe.prep_time || 0) > (recipe.cook_time || 0)) {
      results.suggestions.push({
        category: 'efficiency',
        message: 'High prep-to-cook ratio: consider meal prep techniques'
      });
    }
  }

  formatResults(results) {
    const output = [];
    
    // Header
    output.push(`📋 Recipe Validation Results`);
    output.push(`Score: ${results.score}/100`);
    output.push(`Status: ${results.valid ? '✅ Valid' : '❌ Invalid'}`);
    output.push('');

    // Errors
    if (results.errors.length > 0) {
      output.push('❌ Critical Errors:');
      results.errors.forEach(error => {
        output.push(`   • ${error.message}`);
      });
      output.push('');
    }

    // Warnings
    if (results.warnings.length > 0) {
      output.push('⚠️  Warnings:');
      results.warnings.forEach(warning => {
        output.push(`   • ${warning.message}`);
      });
      output.push('');
    }

    // Suggestions
    if (results.suggestions.length > 0) {
      output.push('💡 Suggestions:');
      results.suggestions.forEach(suggestion => {
        output.push(`   • ${suggestion.message}`);
      });
    }

    return output.join('\n');
  }
}

module.exports = RecipeValidator;
```

### Solution 2: Nutrition Analysis Command

**analyze-nutrition.md:**
```markdown
# Command: /analyze-nutrition

## Description
Analyzes recipe nutritional content and provides health insights.

## Parameters
- recipe_id: ID of recipe to analyze (optional)
- include_breakdown: Include detailed macronutrient breakdown (default: true)
- health_thresholds: Custom health score thresholds (optional)

## Analysis Areas
- Calorie calculation and distribution
- Macronutrient balance (protein, carbs, fat)
- Micronutrient estimation
- Health impact assessment
- Dietary compliance checking

## Health Scoring
- 90-100: Excellent nutritional balance
- 70-89: Good, minor improvements possible
- 50-69: Average, needs improvement
- 0-49: Poor, significant improvements needed

## Output Format
Comprehensive nutrition report with health insights and recommendations.
```

**Implementation:**
```javascript
// .claude/commands/analyze-nutrition.js
class NutritionAnalyzer {
  constructor(config = {}) {
    this.includeBreakdown = config.include_breakdown !== false;
    this.healthThresholds = config.health_thresholds || {
      excellent: 90,
      good: 70,
      average: 50
    };
  }

  async analyze(recipe) {
    const analysis = {
      summary: {},
      breakdown: {},
      healthScore: 0,
      recommendations: [],
      allergens: [],
      dietaryInfo: {}
    };

    // Calculate basic nutrition
    this.calculateBasicNutrition(recipe, analysis);
    
    // Analyze macronutrient balance
    this.analyzeMacronutrients(recipe, analysis);
    
    // Calculate health score
    this.calculateHealthScore(recipe, analysis);
    
    // Identify allergens
    this.identifyAllergens(recipe, analysis);
    
    // Generate recommendations
    this.generateRecommendations(recipe, analysis);
    
    // Check dietary compliance
    this.checkDietaryCompliance(recipe, analysis);

    return analysis;
  }

  calculateBasicNutrition(recipe, analysis) {
    if (!recipe.nutrition) {
      // Estimate from ingredients
      this.estimateNutritionFromIngredients(recipe, analysis);
      return;
    }

    const nutrition = recipe.nutrition;
    const servings = recipe.servings || 1;

    analysis.summary = {
      calories: Math.round(nutrition.calories / servings),
      protein: Math.round(nutrition.protein / servings * 10) / 10,
      carbs: Math.round(nutrition.carbs / servings * 10) / 10,
      fat: Math.round(nutrition.fat / servings * 10) / 10,
      fiber: nutrition.fiber ? Math.round(nutrition.fiber / servings * 10) / 10 : 0,
      sugar: nutrition.sugar ? Math.round(nutrition.sugar / servings * 10) / 10 : 0,
      sodium: nutrition.sodium ? Math.round(nutrition.sodium / servings) : 0
    };

    // Calculate percentages
    const totalCalories = analysis.summary.calories;
    if (totalCalories > 0) {
      analysis.summary.proteinPercent = Math.round((analysis.summary.protein * 4 / totalCalories) * 100);
      analysis.summary.carbsPercent = Math.round((analysis.summary.carbs * 4 / totalCalories) * 100);
      analysis.summary.fatPercent = Math.round((analysis.summary.fat * 9 / totalCalories) * 100);
    }
  }

  estimateNutritionFromIngredients(recipe, analysis) {
    // Basic estimation logic
    const ingredients = recipe.ingredients || [];
    let estimatedCalories = 0;
    let estimatedProtein = 0;
    let estimatedCarbs = 0;
    let estimatedFat = 0;

    ingredients.forEach(ingredient => {
      const density = this.getIngredientDensity(ingredient.name);
      const quantity = this.normalizeQuantity(ingredient.quantity, ingredient.unit);
      
      estimatedCalories += density.calories * quantity;
      estimatedProtein += density.protein * quantity;
      estimatedCarbs += density.carbs * quantity;
      estimatedFat += density.fat * quantity;
    });

    const servings = recipe.servings || 1;
    analysis.summary = {
      calories: Math.round(estimatedCalories / servings),
      protein: Math.round(estimatedProtein / servings * 10) / 10,
      carbs: Math.round(estimatedCarbs / servings * 10) / 10,
      fat: Math.round(estimatedFat / servings * 10) / 10,
      estimated: true
    };
  }

  getIngredientDensity(name) {
    // Basic ingredient density database
    const densities = {
      'flour': { calories: 364, protein: 10, carbs: 76, fat: 1 },
      'sugar': { calories: 387, protein: 0, carbs: 100, fat: 0 },
      'butter': { calories: 717, protein: 1, carbs: 0, fat: 81 },
      'egg': { calories: 155, protein: 13, carbs: 1, fat: 11 },
      'milk': { calories: 42, protein: 3, carbs: 5, fat: 1 },
      'cheese': { calories: 402, protein: 25, carbs: 1, fat: 33 },
      'chicken': { calories: 165, protein: 31, carbs: 0, fat: 4 },
      'beef': { calories: 250, protein: 26, carbs: 0, fat: 15 },
      'rice': { calories: 130, protein: 3, carbs: 28, fat: 0 },
      'pasta': { calories: 131, protein: 5, carbs: 25, fat: 1 },
      'onion': { calories: 40, protein: 1, carbs: 9, fat: 0 },
      'garlic': { calories: 149, protein: 6, carbs: 33, fat: 0 },
      'tomato': { calories: 18, protein: 1, carbs: 4, fat: 0 },
      'oil': { calories: 884, protein: 0, carbs: 0, fat: 100 }
    };

    const nameLower = name.toLowerCase();
    return densities[nameLower] || { calories: 100, protein: 2, carbs: 20, fat: 1 };
  }

  normalizeQuantity(quantity, unit) {
    // Convert to standard units
    const conversions = {
      'cup': 0.24,
      'cups': 0.24,
      'tbsp': 0.015,
      'tablespoon': 0.015,
      'tsp': 0.005,
      'teaspoon': 0.005,
      'oz': 0.028,
      'ounce': 0.028,
      'lb': 0.454,
      'pound': 0.454,
      'g': 0.001,
      'gram': 0.001,
      'kg': 1,
      'kilogram': 1
    };

    return quantity * (conversions[unit.toLowerCase()] || 1);
  }

  analyzeMacronutrients(recipe, analysis) {
    if (!this.includeBreakdown) return;

    const summary = analysis.summary;
    const totalCalories = summary.calories;

    if (totalCalories === 0) return;

    // Macronutrient balance analysis
    analysis.breakdown.macronutrients = {
      protein: {
        grams: summary.protein,
        calories: summary.protein * 4,
        percentage: summary.proteinPercent || 0,
        assessment: this.assessProtein(summary.proteinPercent)
      },
      carbs: {
        grams: summary.carbs,
        calories: summary.carbs * 4,
        percentage: summary.carbsPercent || 0,
        assessment: this.assessCarbs(summary.carbsPercent)
      },
      fat: {
        grams: summary.fat,
        calories: summary.fat * 9,
        percentage: summary.fatPercent || 0,
        assessment: this.assessFat(summary.fatPercent)
      }
    };

    // Fiber analysis
    if (summary.fiber) {
      analysis.breakdown.fiber = {
        grams: summary.fiber,
        recommended: 25,
        percentage: Math.round((summary.fiber / 25) * 100),
        assessment: summary.fiber >= 25 ? 'adequate' : 'low'
      };
    }

    // Sugar analysis
    if (summary.sugar) {
      analysis.breakdown.sugar = {
        grams: summary.sugar,
        recommended: 25,
        percentage: Math.round((summary.sugar / 25) * 100),
        assessment: summary.sugar <= 25 ? 'good' : 'high'
      };
    }
  }

  assessProtein(percentage) {
    if (percentage >= 25) return 'high';
    if (percentage >= 15) return 'adequate';
    return 'low';
  }

  assessCarbs(percentage) {
    if (percentage >= 60) return 'high';
    if (percentage >= 45) return 'moderate';
    return 'low';
  }

  assessFat(percentage) {
    if (percentage >= 40) return 'high';
    if (percentage >= 20) return 'moderate';
    return 'low';
  }

  calculateHealthScore(recipe, analysis) {
    let score = 50; // Base score

    const summary = analysis.summary;

    // Calorie assessment
    if (summary.calories <= 400) score += 15;
    else if (summary.calories <= 600) score += 10;
    else if (summary.calories <= 800) score += 5;

    // Protein assessment
    if (summary.protein >= 20) score += 10;
    else if (summary.protein >= 15) score += 7;
    else if (summary.protein >= 10) score += 3;

    // Fiber bonus
    if (summary.fiber >= 5) score += 5;
    else if (summary.fiber >= 3) score += 3;

    // Sugar penalty
    if (summary.sugar > 15) score -= 10;
    else if (summary.sugar > 10) score -= 5;

    // Sodium penalty
    if (summary.sodium > 600) score -= 10;
    else if (summary.sodium > 400) score -= 5;

    // Fat assessment
    if (summary.fat > 25) score -= 5;
    else if (summary.fat > 15) score -= 2;

    analysis.healthScore = Math.max(0, Math.min(100, score));
  }

  identifyAllergens(recipe, analysis) {
    const commonAllergens = [
      'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts',
      'wheat', 'soybeans', 'sesame', 'mustard', 'celery', 'lupin'
    ];

    const ingredients = recipe.ingredients || [];
    const foundAllergens = new Set();

    ingredients.forEach(ingredient => {
      const name = ingredient.name.toLowerCase();
      commonAllergens.forEach(allergen => {
        if (name.includes(allergen)) {
          foundAllergens.add(allergen);
        }
      });
    });

    analysis.allergens = Array.from(foundAllergens);
  }

  generateRecommendations(recipe, analysis) {
    const summary = analysis.summary;
    const recommendations = [];

    // Calorie recommendations
    if (summary.calories > 800) {
      recommendations.push({
        category: 'calories',
        message: 'Consider reducing portion size or ingredients to lower calories',
        priority: 'high'
      });
    }

    // Protein recommendations
    if (summary.protein < 10) {
      recommendations.push({
        category: 'protein',
        message: 'Add more protein sources (lean meat, beans, tofu) for better satiety',
        priority: 'medium'
      });
    }

    // Fiber recommendations
    if (summary.fiber < 3) {
      recommendations.push({
        category: 'fiber',
        message: 'Add more vegetables, whole grains, or legumes for increased fiber',
        priority: 'medium'
      });
    }

    // Sugar recommendations
    if (summary.sugar > 15) {
      recommendations.push({
        category: 'sugar',
        message: 'Reduce added sugars for better health impact',
        priority: 'high'
      });
    }

    // Sodium recommendations
    if (summary.sodium > 600) {
      recommendations.push({
        category: 'sodium',
        message: 'Reduce salt or use herbs and spices for flavor',
        priority: 'medium'
      });
    }

    analysis.recommendations = recommendations;
  }

  checkDietaryCompliance(recipe, analysis) {
    const ingredients = recipe.ingredients || [];
    const dietaryInfo = {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutFree: true
    };

    ingredients.forEach(ingredient => {
      const name = ingredient.name.toLowerCase();
      
      // Check for non-vegetarian ingredients
      if (name.includes('chicken') || name.includes('beef') || 
          name.includes('pork') || name.includes('fish') || name.includes('meat')) {
        dietaryInfo.vegetarian = false;
        dietaryInfo.vegan = false;
      }

      // Check for non-vegan ingredients
      if (name.includes('egg') || name.includes('milk') || 
          name.includes('cheese') || name.includes('butter') || name.includes('honey')) {
        dietaryInfo.vegan = false;
      }

      // Check for gluten
      if (name.includes('wheat') || name.includes('flour') || 
          name.includes('bread') || name.includes('pasta')) {
        dietaryInfo.glutenFree = false;
      }

      // Check for dairy
      if (name.includes('milk') || name.includes('cheese') || 
          name.includes('butter') || name.includes('yogurt')) {
        dietaryInfo.dairyFree = false;
      }

      // Check for nuts
      if (name.includes('nut') || name.includes('almond') || 
          name.includes('walnut') || name.includes('pecan')) {
        dietaryInfo.nutFree = false;
      }
    });

    analysis.dietaryInfo = dietaryInfo;
  }

  formatResults(analysis) {
    const output = [];
    
    // Header
    output.push('📊 Nutrition Analysis Report');
    output.push(`Health Score: ${analysis.healthScore}/100`);
    output.push('');

    // Summary
    output.push('📋 Nutrition Summary (per serving):');
    output.push(`   Calories: ${analysis.summary.calories} kcal`);
    output.push(`   Protein: ${analysis.summary.protein}g (${analysis.summary.proteinPercent || 0}%)`);
    output.push(`   Carbs: ${analysis.summary.carbs}g (${analysis.summary.carbsPercent || 0}%)`);
    output.push(`   Fat: ${analysis.summary.fat}g (${analysis.summary.fatPercent || 0}%)`);
    
    if (analysis.summary.fiber) {
      output.push(`   Fiber: ${analysis.summary.fiber}g`);
    }
    if (analysis.summary.sugar) {
      output.push(`   Sugar: ${analysis.summary.sugar}g`);
    }
    output.push('');

    // Health assessment
    output.push('🏥 Health Assessment:');
    output.push(`   Overall: ${this.getHealthAssessment(analysis.healthScore)}`);
    output.push('');

    // Dietary information
    output.push('🥗 Dietary Information:');
    Object.entries(analysis.dietaryInfo).forEach(([diet, compliant]) => {
      output.push(`   ${diet}: ${compliant ? '✅' : '❌'}`);
    });
    output.push('');

    // Allergens
    if (analysis.allergens.length > 0) {
      output.push('⚠️  Potential Allergens:');
      analysis.allergens.forEach(allergen => {
        output.push(`   • ${allergen}`);
      });
      output.push('');
    }

    // Recommendations
    if (analysis.recommendations.length > 0) {
      output.push('💡 Recommendations:');
      analysis.recommendations.forEach(rec => {
        output.push(`   • ${rec.message} (${rec.priority} priority)`);
      });
    }

    return output.join('\n');
  }

  getHealthAssessment(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Average';
    return 'Poor';
  }
}

module.exports = NutritionAnalyzer;
```

## Exercise 2: Advanced Command Features

### Solution: Parameter Validation and Progress Tracking

**Enhanced Command Template:**
```javascript
// .claude/commands/base-command.js
class BaseCommand {
  constructor(name, config) {
    this.name = name;
    this.config = config;
    this.validators = [];
    this.progressCallbacks = [];
  }

  addValidator(validator) {
    this.validators.push(validator);
    return this;
  }

  addProgressCallback(callback) {
    this.progressCallbacks.push(callback);
    return this;
  }

  async validateParameters(params) {
    const errors = [];
    
    for (const validator of this.validators) {
      try {
        await validator(params);
      } catch (error) {
        errors.push(error.message);
      }
    }
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  }

  reportProgress(stage, progress, message) {
    this.progressCallbacks.forEach(callback => {
      callback({ stage, progress, message, timestamp: Date.now() });
    });
  }

  async execute(params) {
    try {
      await this.validateParameters(params);
      return await this.run(params);
    } catch (error) {
      throw new Error(`${this.name} failed: ${error.message}`);
    }
  }

  async run(params) {
    throw new Error('run method must be implemented by subclass');
  }
}

// Parameter validators
const validators = {
  required: (field) => (params) => {
    if (!params[field]) {
      throw new Error(`${field} is required`);
    }
  },
  
  number: (field, min = 0, max = Infinity) => (params) => {
    const value = params[field];
    if (typeof value !== 'number' || value < min || value > max) {
      throw new Error(`${field} must be a number between ${min} and ${max}`);
    }
  },
  
  string: (field, minLength = 0, maxLength = Infinity) => (params) => {
    const value = params[field];
    if (typeof value !== 'string' || value.length < minLength || value.length > maxLength) {
      throw new Error(`${field} must be a string between ${minLength} and ${maxLength} characters`);
    }
  },
  
  enum: (field, values) => (params) => {
    const value = params[field];
    if (!values.includes(value)) {
      throw new Error(`${field} must be one of: ${values.join(', ')}`);
    }
  },
  
  custom: (field, validator) => (params) => {
    const value = params[field];
    if (!validator(value)) {
      throw new Error(`${field} failed validation`);
    }
  }
};

module.exports = { BaseCommand, validators };
```

**Enhanced Recipe Validator with Progress:**
```javascript
// .claude/commands/enhanced-validate-recipe.js
const { BaseCommand, validators } = require('./base-command');

class EnhancedRecipeValidator extends BaseCommand {
  constructor() {
    super('validate-recipe', {
      description: 'Enhanced recipe validation with progress tracking',
      parameters: {
        recipe_id: { type: 'string', required: false },
        strict_mode: { type: 'boolean', default: false },
        include_suggestions: { type: 'boolean', default: true },
        output_format: { type: 'enum', values: ['text', 'json', 'markdown'], default: 'text' }
      }
    });

    this.setupValidators();
  }

  setupValidators() {
    this.addValidator(validators.custom('output_format', (value) => 
      ['text', 'json', 'markdown'].includes(value)
    ));
    
    this.addValidator(validators.custom('strict_mode', (value) => 
      typeof value === 'boolean'
    ));
  }

  async run(params) {
    this.reportProgress('loading', 10, 'Loading recipe data...');
    
    const recipe = await this.loadRecipe(params.recipe_id);
    
    this.reportProgress('validating', 20, 'Validating required fields...');
    const results = await this.validateRecipe(recipe, params);
    
    this.reportProgress('analyzing', 60, 'Analyzing nutrition...');
    await this.analyzeNutrition(recipe, results);
    
    this.reportProgress('generating', 80, 'Generating suggestions...');
    await this.generateSuggestions(recipe, results);
    
    this.reportProgress('formatting', 90, 'Formatting results...');
    const formatted = this.formatResults(results, params.output_format);
    
    this.reportProgress('complete', 100, 'Validation complete!');
    
    return formatted;
  }

  async loadRecipe(recipeId) {
    // Simulate loading recipe
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, this would load from database
    return {
      id: recipeId || 'sample',
      title: 'Sample Recipe',
      ingredients: [
        { quantity: 2, unit: 'cups', name: 'flour' },
        { quantity: 1, unit: 'cup', name: 'sugar' },
        { quantity: 2, unit: 'tbsp', name: 'butter' }
      ],
      instructions: 'Mix ingredients and bake.',
      prep_time: 15,
      cook_time: 30,
      servings: 8
    };
  }

  async validateRecipe(recipe, params) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results = {
      errors: [],
      warnings: [],
      suggestions: [],
      score: 100,
      valid: true
    };

    // Basic validation
    if (!recipe.title) {
      results.errors.push({ field: 'title', message: 'Missing title' });
    }
    
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      results.errors.push({ field: 'ingredients', message: 'Missing ingredients' });
    }

    // Ingredient validation
    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient, index) => {
        if (!ingredient.quantity || ingredient.quantity <= 0) {
          results.errors.push({ 
            field: `ingredients[${index}].quantity`, 
            message: `Invalid quantity for ingredient ${index + 1}` 
          });
        }
      });
    }

    results.valid = results.errors.length === 0;
    return results;
  }

  async analyzeNutrition(recipe, results) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Basic nutrition analysis
    results.nutrition = {
      estimated: true,
      calories: 250,
      protein: 5,
      carbs: 35,
      fat: 10
    };
  }

  async generateSuggestions(recipe, results) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (results.nutrition && results.nutrition.calories > 300) {
      results.suggestions.push({
        category: 'calories',
        message: 'Consider reducing calories by using less sugar or fat'
      });
    }
  }

  formatResults(results, format) {
    switch (format) {
      case 'json':
        return JSON.stringify(results, null, 2);
      case 'markdown':
        return this.formatMarkdown(results);
      default:
        return this.formatText(results);
    }
  }

  formatText(results) {
    const output = [];
    output.push(`📋 Recipe Validation Results`);
    output.push(`Score: ${results.score}/100`);
    output.push(`Status: ${results.valid ? '✅ Valid' : '❌ Invalid'}`);
    output.push('');
    
    if (results.errors.length > 0) {
      output.push('❌ Errors:');
      results.errors.forEach(error => output.push(`   • ${error.message}`));
      output.push('');
    }
    
    if (results.suggestions.length > 0) {
      output.push('💡 Suggestions:');
      results.suggestions.forEach(suggestion => output.push(`   • ${suggestion.message}`));
    }
    
    return output.join('\n');
  }

  formatMarkdown(results) {
    let output = `# Recipe Validation Results\n\n`;
    output += `**Score:** ${results.score}/100\n`;
    output += `**Status:** ${results.valid ? '✅ Valid' : '❌ Invalid'}\n\n`;
    
    if (results.errors.length > 0) {
      output += '## Errors\n';
      results.errors.forEach(error => {
        output += `- ${error.message}\n`;
      });
      output += '\n';
    }
    
    if (results.suggestions.length > 0) {
      output += '## Suggestions\n';
      results.suggestions.forEach(suggestion => {
        output += `- ${suggestion.message}\n`;
      });
    }
    
    return output;
  }
}

module.exports = EnhancedRecipeValidator;
```

## Exercise 3: Command Integration

### Solution: Command Chaining and Shared Utilities

**Shared Utilities:**
```javascript
// .claude/commands/shared/utils.js
class RecipeUtils {
  static normalizeUnit(unit) {
    const unitMap = {
      'tbsp': 'tablespoon',
      'tsp': 'teaspoon',
      'oz': 'ounce',
      'lb': 'pound',
      'g': 'gram',
      'kg': 'kilogram',
      'ml': 'milliliter',
      'l': 'liter'
    };
    
    return unitMap[unit.toLowerCase()] || unit;
  }

  static convertQuantity(quantity, fromUnit, toUnit) {
    const conversions = {
      'cup': { 'tablespoon': 16, 'teaspoon': 48, 'milliliter': 240 },
      'tablespoon': { 'teaspoon': 3, 'milliliter': 15 },
      'teaspoon': { 'milliliter': 5 },
      'ounce': { 'gram': 28.35, 'pound': 0.0625 },
      'pound': { 'ounce': 16, 'gram': 453.59 },
      'kilogram': { 'gram': 1000, 'pound': 2.205 }
    };

    fromUnit = this.normalizeUnit(fromUnit);
    toUnit = this.normalizeUnit(toUnit);

    if (fromUnit === toUnit) return quantity;

    // Direct conversion
    if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
      return quantity * conversions[fromUnit][toUnit];
    }

    // Convert through base unit
    throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
  }

  static estimateCookingTime(ingredients, complexity = 'medium') {
    const baseTime = {
      'simple': 15,
      'medium': 30,
      'complex': 60
    };

    let time = baseTime[complexity] || 30;

    // Add time for ingredient count
    if (ingredients.length > 10) time += 10;
    if (ingredients.length > 20) time += 15;

    // Add time for special ingredients
    const specialIngredients = ingredients.filter(ing => 
      ing.name.toLowerCase().includes('meat') || 
      ing.name.toLowerCase().includes('bean') ||
      ing.name.toLowerCase().includes('rice')
    );

    if (specialIngredients.length > 0) time += 15;

    return time;
  }

  static calculateRecipeCost(ingredients) {
    const ingredientCosts = {
      'flour': 0.50,
      'sugar': 0.75,
      'butter': 2.50,
      'egg': 0.25,
      'milk': 0.50,
      'cheese': 3.00,
      'chicken': 4.00,
      'beef': 6.00,
      'rice': 1.00,
      'pasta': 1.50,
      'onion': 0.50,
      'garlic': 0.30,
      'tomato': 1.00,
      'oil': 2.00
    };

    let totalCost = 0;
    ingredients.forEach(ingredient => {
      const name = ingredient.name.toLowerCase();
      const cost = ingredientCosts[name] || 1.00;
      const quantity = this.normalizeToCups(ingredient.quantity, ingredient.unit);
      totalCost += cost * quantity;
    });

    return totalCost;
  }

  static normalizeToCups(quantity, unit) {
    const toCups = {
      'cup': 1,
      'tablespoon': 0.0625,
      'teaspoon': 0.0208,
      'ounce': 0.125,
      'pound': 2,
      'gram': 0.0042
    };

    return quantity * (toCups[unit] || 1);
  }
}

class ValidationUtils {
  static validateIngredient(ingredient) {
    const errors = [];

    if (!ingredient.name || ingredient.name.trim() === '') {
      errors.push('Ingredient name is required');
    }

    if (!ingredient.quantity || ingredient.quantity <= 0) {
      errors.push('Ingredient quantity must be positive');
    }

    if (!ingredient.unit || ingredient.unit.trim() === '') {
      errors.push('Ingredient unit is required');
    }

    return errors;
  }

  static validateInstruction(instruction) {
    const errors = [];

    if (!instruction || instruction.trim() === '') {
      errors.push('Instruction cannot be empty');
    }

    if (instruction.length > 500) {
      errors.push('Instruction is too long (max 500 characters)');
    }

    return errors;
  }

  static validateRecipeStructure(recipe) {
    const errors = [];

    const requiredFields = ['title', 'ingredients', 'instructions'];
    requiredFields.forEach(field => {
      if (!recipe[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    if (recipe.ingredients && !Array.isArray(recipe.ingredients)) {
      errors.push('Ingredients must be an array');
    }

    if (recipe.servings && (recipe.servings <= 0 || recipe.servings > 50)) {
      errors.push('Servings must be between 1 and 50');
    }

    return errors;
  }
}

module.exports = { RecipeUtils, ValidationUtils };
```

**Command Orchestrator:**
```javascript
// .claude/commands/orchestrator.js
class CommandOrchestrator {
  constructor() {
    this.commands = new Map();
    this.commandHistory = [];
    this.sharedContext = new Map();
  }

  registerCommand(name, command) {
    this.commands.set(name, command);
  }

  async executeCommand(name, params, context = {}) {
    const command = this.commands.get(name);
    if (!command) {
      throw new Error(`Command not found: ${name}`);
    }

    const execution = {
      name,
      params,
      context,
      startTime: Date.now(),
      status: 'running'
    };

    this.commandHistory.push(execution);

    try {
      const result = await command.execute(params, context);
      
      execution.status = 'completed';
      execution.endTime = Date.now();
      execution.duration = execution.endTime - execution.startTime;
      execution.result = result;

      // Update shared context
      if (result.context) {
        Object.entries(result.context).forEach(([key, value]) => {
          this.sharedContext.set(key, value);
        });
      }

      return result;
    } catch (error) {
      execution.status = 'failed';
      execution.endTime = Date.now();
      execution.duration = execution.endTime - execution.startTime;
      execution.error = error.message;

      throw error;
    }
  }

  async executeChain(commandChain) {
    const results = [];
    let context = {};

    for (const step of commandChain) {
      const { name, params, dependsOn } = step;

      // Wait for dependencies
      if (dependsOn) {
        dependsOn.forEach(dependency => {
          const dependencyResult = results.find(r => r.name === dependency);
          if (dependencyResult) {
            context = { ...context, ...dependencyResult.context };
          }
        });
      }

      const result = await this.executeCommand(name, params, context);
      results.push({ name, result, context });
    }

    return results;
  }

  getCommandHistory() {
    return this.commandHistory;
  }

  getSharedContext() {
    return Object.fromEntries(this.sharedContext);
  }
}

// Workflow definitions
class RecipeWorkflows {
  static getRecipeAnalysisWorkflow() {
    return [
      {
        name: 'validate-recipe',
        params: { strict_mode: true },
        dependsOn: []
      },
      {
        name: 'analyze-nutrition',
        params: { include_breakdown: true },
        dependsOn: ['validate-recipe']
      },
      {
        name: 'generate-suggestions',
        params: { priority: 'high' },
        dependsOn: ['validate-recipe', 'analyze-nutrition']
      }
    ];
  }

  static getRecipeOptimizationWorkflow() {
    return [
      {
        name: 'analyze-nutrition',
        params: { include_breakdown: true },
        dependsOn: []
      },
      {
        name: 'optimize-ingredients',
        params: { focus: 'health' },
        dependsOn: ['analyze-nutrition']
      },
      {
        name: 'validate-recipe',
        params: { strict_mode: true },
        dependsOn: ['optimize-ingredients']
      },
      {
        name: 'generate-report',
        params: { format: 'comprehensive' },
        dependsOn: ['validate-recipe', 'optimize-ingredients']
      }
    ];
  }

  static getRecipeCreationWorkflow() {
    return [
      {
        name: 'validate-recipe',
        params: { strict_mode: true },
        dependsOn: []
      },
      {
        name: 'analyze-nutrition',
        params: { include_breakdown: true },
        dependsOn: ['validate-recipe']
      },
      {
        name: 'calculate-cost',
        params: {},
        dependsOn: ['validate-recipe']
      },
      {
        name: 'estimate-time',
        params: {},
        dependsOn: ['validate-recipe']
      },
      {
        name: 'generate-recipe-card',
        params: { format: 'standard' },
        dependsOn: ['validate-recipe', 'analyze-nutrition', 'calculate-cost', 'estimate-time']
      }
    ];
  }
}

module.exports = { CommandOrchestrator, RecipeWorkflows };
```

**Example Usage:**
```javascript
// .claude/commands/example-usage.js
const { CommandOrchestrator, RecipeWorkflows } = require('./orchestrator');
const { EnhancedRecipeValidator } = require('./enhanced-validate-recipe');
const { NutritionAnalyzer } = require('./analyze-nutrition');

// Initialize orchestrator
const orchestrator = new CommandOrchestrator();

// Register commands
orchestrator.registerCommand('validate-recipe', new EnhancedRecipeValidator());
orchestrator.registerCommand('analyze-nutrition', new NutritionAnalyzer());

// Execute single command
async function runSingleCommand() {
  try {
    const result = await orchestrator.executeCommand('validate-recipe', {
      recipe_id: 'chocolate-cookies',
      output_format: 'markdown'
    });
    
    console.log('Single command result:', result);
  } catch (error) {
    console.error('Command failed:', error.message);
  }
}

// Execute workflow
async function runWorkflow() {
  try {
    const workflow = RecipeWorkflows.getRecipeAnalysisWorkflow();
    const results = await orchestrator.executeChain(workflow);
    
    console.log('Workflow results:');
    results.forEach(step => {
      console.log(`- ${step.name}: ${step.result.status || 'completed'}`);
    });
    
    console.log('Shared context:', orchestrator.getSharedContext());
  } catch (error) {
    console.error('Workflow failed:', error.message);
  }
}

// Run examples
runSingleCommand();
runWorkflow();
```

## Key Takeaways

### 1. Command Design Principles
- Use inheritance for shared functionality
- Implement proper validation and error handling
- Support multiple output formats
- Provide progress feedback for long operations

### 2. Integration Patterns
- Shared utilities reduce code duplication
- Command orchestration enables complex workflows
- Context sharing between commands improves efficiency
- Progress tracking enhances user experience

### 3. Best Practices
- Separate concerns (validation, execution, formatting)
- Use comprehensive error handling
- Support multiple output formats
- Provide clear progress feedback
- Implement proper dependency management

### 4. Performance Considerations
- Use asynchronous operations for I/O
- Implement caching for expensive operations
- Support cancellation of long operations
- Optimize for common use cases

These solutions provide a comprehensive foundation for building advanced slash commands with proper validation, progress tracking, and integration capabilities.