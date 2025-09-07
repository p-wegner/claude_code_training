class Recipe {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.instructions = data.instructions;
    this.prepTime = data.prep_time;
    this.cookTime = data.cook_time;
    this.servings = data.servings;
    this.category = data.category;
    this.createdAt = data.created_at;
    this.ingredients = data.ingredients || [];
    this.nutrition = data.nutrition;
  }

  // Calculate total time
  get totalTime() {
    return (this.prepTime || 0) + (this.cookTime || 0);
  }

  // Validate recipe data
  validate() {
    const errors = [];

    if (!this.title || this.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!this.instructions || this.instructions.trim().length === 0) {
      errors.push('Instructions are required');
    }

    if (this.prepTime < 0) {
      errors.push('Prep time cannot be negative');
    }

    if (this.cookTime < 0) {
      errors.push('Cook time cannot be negative');
    }

    if (this.servings <= 0) {
      errors.push('Servings must be greater than 0');
    }

    return errors;
  }

  // Get difficulty level based on total time
  get difficulty() {
    const total = this.totalTime;
    if (total <= 30) return 'Easy';
    if (total <= 60) return 'Medium';
    return 'Hard';
  }

  // Format time for display
  static formatTime(minutes) {
    if (!minutes) return 'N/A';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  }

  // Convert to JSON for API response
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      instructions: this.instructions,
      prepTime: this.prepTime,
      cookTime: this.cookTime,
      totalTime: this.totalTime,
      servings: this.servings,
      category: this.category,
      difficulty: this.difficulty,
      createdAt: this.createdAt,
      ingredients: this.ingredients,
      nutrition: this.nutrition
    };
  }
}

module.exports = Recipe;