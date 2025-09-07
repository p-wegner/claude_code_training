const RecipeValidator = {
  // Validate recipe data
  validateRecipe(recipeData) {
    const errors = [];

    // Required fields
    if (!recipeData.title || recipeData.title.trim().length === 0) {
      errors.push('Recipe title is required');
    }

    if (!recipeData.instructions || recipeData.instructions.trim().length === 0) {
      errors.push('Recipe instructions are required');
    }

    // Time validation
    if (recipeData.prep_time < 0) {
      errors.push('Prep time cannot be negative');
    }

    if (recipeData.cook_time < 0) {
      errors.push('Cook time cannot be negative');
    }

    // Servings validation
    if (recipeData.servings <= 0) {
      errors.push('Servings must be greater than 0');
    }

    // Instructions validation
    if (recipeData.instructions && recipeData.instructions.length < 10) {
      errors.push('Instructions must be at least 10 characters long');
    }

    return errors;
  },

  // Validate ingredient data
  validateIngredient(ingredientData) {
    const errors = [];

    // Required fields
    if (!ingredientData.name || ingredientData.name.trim().length === 0) {
      errors.push('Ingredient name is required');
    }

    if (ingredientData.quantity === undefined || ingredientData.quantity === null) {
      errors.push('Ingredient quantity is required');
    }

    if (ingredientData.quantity <= 0) {
      errors.push('Ingredient quantity must be greater than 0');
    }

    if (!ingredientData.unit || ingredientData.unit.trim().length === 0) {
      errors.push('Ingredient unit is required');
    }

    // Name validation
    if (ingredientData.name && ingredientData.name.length < 2) {
      errors.push('Ingredient name must be at least 2 characters long');
    }

    // Unit validation
    const validUnits = ['tsp', 'tbsp', 'cup', 'cups', 'oz', 'lb', 'g', 'kg', 'ml', 'l', 'piece', 'pieces'];
    if (ingredientData.unit && !validUnits.includes(ingredientData.unit.toLowerCase())) {
      errors.push(`Invalid unit: ${ingredientData.unit}`);
    }

    return errors;
  },

  // Validate nutrition data
  validateNutrition(nutritionData) {
    const errors = [];

    // Validate that all numeric values are non-negative
    const numericFields = ['calories', 'protein', 'carbs', 'fat', 'fiber', 'sugar', 'sodium'];
    
    for (const field of numericFields) {
      if (nutritionData[field] < 0) {
        errors.push(`${field} cannot be negative`);
      }
    }

    // Validate reasonable ranges
    if (nutritionData.calories > 10000) {
      errors.push('Calories seem unreasonably high');
    }

    if (nutritionData.sodium > 10000) {
      errors.push('Sodium levels seem dangerously high');
    }

    return errors;
  },

  // Check for duplicate ingredients
  checkDuplicateIngredients(ingredients) {
    const nameMap = new Map();
    const duplicates = [];

    ingredients.forEach((ingredient, index) => {
      const normalizedName = ingredient.name.toLowerCase().trim();
      
      if (nameMap.has(normalizedName)) {
        duplicates.push({
          duplicate: index,
          original: nameMap.get(normalizedName),
          name: ingredient.name
        });
      } else {
        nameMap.set(normalizedName, index);
      }
    });

    return duplicates;
  },

  // Check for common allergens
  checkAllergens(ingredients) {
    const allergens = [
      'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts', 'wheat', 'soybeans',
      'dairy', 'nuts', 'gluten', 'sesame', 'mustard'
    ];

    const foundAllergens = new Set();

    ingredients.forEach(ingredient => {
      const nameLower = ingredient.name.toLowerCase();
      
      allergens.forEach(allergen => {
        if (nameLower.includes(allergen)) {
          foundAllergens.add(allergen);
        }
      });
    });

    return Array.from(foundAllergens);
  },

  // Validate recipe completeness
  validateRecipeCompleteness(recipeData) {
    const issues = [];

    // Check if recipe has both prep and cook time
    if (!recipeData.prep_time && !recipeData.cook_time) {
      issues.push('Recipe should have either prep time or cook time');
    }

    // Check if recipe has ingredients
    if (!recipeData.ingredients || recipeData.ingredients.length === 0) {
      issues.push('Recipe should have at least one ingredient');
    }

    // Check if recipe has category
    if (!recipeData.category) {
      issues.push('Recipe should have a category');
    }

    // Check instruction length
    if (recipeData.instructions && recipeData.instructions.length < 50) {
      issues.push('Instructions seem too brief for a complete recipe');
    }

    return issues;
  },

  // Validate ingredient quantities for serving size
  validateIngredientQuantities(ingredients, servings) {
    const issues = [];

    if (!servings || servings <= 0) {
      issues.push('Invalid serving size');
      return issues;
    }

    ingredients.forEach(ingredient => {
      const perServing = ingredient.quantity / servings;
      
      // Check for unreasonable quantities per serving
      if (ingredient.unit.toLowerCase().includes('cup') && perServing > 4) {
        issues.push(`${ingredient.name}: More than 4 cups per serving seems excessive`);
      }
      
      if (ingredient.unit.toLowerCase() === 'tbsp' && perServing > 20) {
        issues.push(`${ingredient.name}: More than 20 tablespoons per serving seems excessive`);
      }
    });

    return issues;
  }
};

module.exports = RecipeValidator;