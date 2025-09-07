class Ingredient {
  constructor(data) {
    this.id = data.id;
    this.recipeId = data.recipe_id;
    this.name = data.name;
    this.quantity = data.quantity;
    this.unit = data.unit;
  }

  // Validate ingredient data
  validate() {
    const errors = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push('Ingredient name is required');
    }

    if (this.quantity === undefined || this.quantity === null) {
      errors.push('Quantity is required');
    }

    if (this.quantity <= 0) {
      errors.push('Quantity must be greater than 0');
    }

    if (!this.unit || this.unit.trim().length === 0) {
      errors.push('Unit is required');
    }

    return errors;
  }

  // Format ingredient for display
  format() {
    return `${this.quantity} ${this.unit} ${this.name}`;
  }

  // Check if ingredient is common allergen
  isAllergen() {
    const allergens = [
      'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts', 'wheat', 'soybeans',
      'dairy', 'nuts', 'gluten'
    ];
    
    const nameLower = this.name.toLowerCase();
    return allergens.some(allergen => nameLower.includes(allergen));
  }

  // Get standard units for categories
  static getStandardUnits(category) {
    const units = {
      'liquid': ['ml', 'l', 'cups', 'tbsp', 'tsp', 'fl oz'],
      'dry': ['g', 'kg', 'oz', 'lb', 'cups', 'tbsp', 'tsp'],
      'count': ['pieces', 'whole', 'slices', 'cloves', 'cans']
    };
    
    return units[category] || [];
  }

  // Convert to JSON for API response
  toJSON() {
    return {
      id: this.id,
      recipeId: this.recipeId,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      formatted: this.format(),
      isAllergen: this.isAllergen()
    };
  }
}

module.exports = Ingredient;