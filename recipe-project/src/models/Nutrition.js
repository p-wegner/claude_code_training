class Nutrition {
  constructor(data) {
    this.id = data.id;
    this.recipeId = data.recipe_id;
    this.calories = data.calories;
    this.protein = data.protein;
    this.carbs = data.carbs;
    this.fat = data.fat;
    this.fiber = data.fiber;
    this.sugar = data.sugar;
    this.sodium = data.sodium;
  }

  // Validate nutrition data
  validate() {
    const errors = [];

    if (this.calories < 0) {
      errors.push('Calories cannot be negative');
    }

    if (this.protein < 0) {
      errors.push('Protein cannot be negative');
    }

    if (this.carbs < 0) {
      errors.push('Carbs cannot be negative');
    }

    if (this.fat < 0) {
      errors.push('Fat cannot be negative');
    }

    if (this.fiber < 0) {
      errors.push('Fiber cannot be negative');
    }

    if (this.sugar < 0) {
      errors.push('Sugar cannot be negative');
    }

    if (this.sodium < 0) {
      errors.push('Sodium cannot be negative');
    }

    return errors;
  }

  // Calculate daily value percentages
  getDailyValues() {
    const dailyValues = {
      calories: 2000,
      protein: 50,
      carbs: 300,
      fat: 65,
      fiber: 25,
      sodium: 2300
    };

    return {
      calories: Math.round((this.calories / dailyValues.calories) * 100),
      protein: Math.round((this.protein / dailyValues.protein) * 100),
      carbs: Math.round((this.carbs / dailyValues.carbs) * 100),
      fat: Math.round((this.fat / dailyValues.fat) * 100),
      fiber: Math.round((this.fiber / dailyValues.fiber) * 100),
      sodium: Math.round((this.sodium / dailyValues.sodium) * 100)
    };
  }

  // Get health score (0-100)
  getHealthScore() {
    let score = 100;

    // Deduct points for high sodium
    if (this.sodium > 600) score -= 20;
    else if (this.sodium > 400) score -= 10;

    // Deduct points for high sugar
    if (this.sugar > 25) score -= 15;
    else if (this.sugar > 15) score -= 8;

    // Deduct points for high saturated fat (assuming fat includes saturated)
    if (this.fat > 20) score -= 15;
    else if (this.fat > 15) score -= 8;

    // Add points for high fiber
    if (this.fiber > 8) score += 10;
    else if (this.fiber > 5) score += 5;

    // Add points for high protein
    if (this.protein > 20) score += 10;
    else if (this.protein > 15) score += 5;

    return Math.max(0, Math.min(100, score));
  }

  // Get dietary warnings
  getDietaryWarnings() {
    const warnings = [];

    if (this.sodium > 600) warnings.push('High sodium');
    if (this.sugar > 20) warnings.push('High sugar');
    if (this.fat > 20) warnings.push('High fat');
    if (this.calories > 800) warnings.push('High calorie');

    return warnings;
  }

  // Convert to JSON for API response
  toJSON() {
    return {
      id: this.id,
      recipeId: this.recipeId,
      calories: this.calories,
      protein: this.protein,
      carbs: this.carbs,
      fat: this.fat,
      fiber: this.fiber,
      sugar: this.sugar,
      sodium: this.sodium,
      dailyValues: this.getDailyValues(),
      healthScore: this.getHealthScore(),
      dietaryWarnings: this.getDietaryWarnings()
    };
  }
}

module.exports = Nutrition;