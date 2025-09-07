const UnitConverter = {
  // Conversion rates to base units
  conversions: {
    volume: {
      'tsp': 4.929,
      'tbsp': 14.787,
      'fl oz': 29.574,
      'cup': 236.588,
      'pint': 473.176,
      'quart': 946.353,
      'gallon': 3785.412,
      'ml': 1,
      'l': 1000
    },
    weight: {
      'oz': 28.3495,
      'lb': 453.592,
      'g': 1,
      'kg': 1000
    },
    count: {
      'piece': 1,
      'pieces': 1,
      'whole': 1,
      'slice': 1,
      'slices': 1,
      'clove': 1,
      'cloves': 1,
      'can': 1,
      'cans': 1
    }
  },

  // Get category for unit
  getUnitCategory(unit) {
    const unitLower = unit.toLowerCase();
    
    for (const [category, units] of Object.entries(this.conversions)) {
      if (units.hasOwnProperty(unitLower)) {
        return category;
      }
    }
    
    return 'unknown';
  },

  // Convert between units
  convert(amount, fromUnit, toUnit) {
    const fromCategory = this.getUnitCategory(fromUnit);
    const toCategory = this.getUnitCategory(toUnit);

    if (fromCategory === 'unknown' || toCategory === 'unknown') {
      throw new Error(`Unknown unit: ${fromCategory === 'unknown' ? fromUnit : toUnit}`);
    }

    if (fromCategory !== toCategory) {
      throw new Error(`Cannot convert between ${fromCategory} and ${toCategory}`);
    }

    const fromRate = this.conversions[fromCategory][fromUnit.toLowerCase()];
    const toRate = this.conversions[toCategory][toUnit.toLowerCase()];

    // Convert to base unit, then to target unit
    const baseAmount = amount * fromRate;
    const result = baseAmount / toRate;

    return Math.round(result * 1000) / 1000; // Round to 3 decimal places
  },

  // Get common substitutes
  getSubstitutes(ingredientName) {
    const substitutes = {
      'butter': [
        { name: 'margarine', ratio: 1, note: '1:1 substitution' },
        { name: 'coconut oil', ratio: 0.75, note: 'Use 3/4 cup coconut oil for 1 cup butter' },
        { name: 'applesauce', ratio: 0.5, note: 'Use 1/2 cup applesauce for 1 cup butter (for baking)' }
      ],
      'eggs': [
        { name: 'flax eggs', ratio: 1, note: '1 tbsp ground flax + 3 tbsp water per egg' },
        { name: 'chia eggs', ratio: 1, note: '1 tbsp chia seeds + 3 tbsp water per egg' },
        { name: 'banana', ratio: 0.5, note: '1/2 mashed banana per egg' }
      ],
      'milk': [
        { name: 'almond milk', ratio: 1, note: '1:1 substitution' },
        { name: 'soy milk', ratio: 1, note: '1:1 substitution' },
        { name: 'oat milk', ratio: 1, note: '1:1 substitution' }
      ],
      'sugar': [
        { name: 'honey', ratio: 0.75, note: 'Use 3/4 cup honey for 1 cup sugar, reduce liquid by 1/4 cup' },
        { name: 'maple syrup', ratio: 0.75, note: 'Use 3/4 cup maple syrup for 1 cup sugar, reduce liquid by 1/4 cup' },
        { name: 'stevia', ratio: 0.01, note: 'Use much less stevia, check package instructions' }
      ],
      'flour': [
        { name: 'almond flour', ratio: 1, note: '1:1 substitution for most recipes' },
        { name: 'coconut flour', ratio: 0.25, note: 'Use 1/4 cup coconut flour for 1 cup regular flour, add extra liquid' },
        { name: 'gluten-free flour', ratio: 1, note: '1:1 substitution, may need xanthan gum' }
      ]
    };

    const nameLower = ingredientName.toLowerCase();
    return substitutes[nameLower] || [];
  },

  // Standardize ingredient names
  standardizeName(name) {
    const nameLower = name.toLowerCase();
    const standards = {
      'tomatoes': 'tomato',
      'potatoes': 'potato',
      'onions': 'onion',
      'garlic cloves': 'garlic',
      'bell peppers': 'bell pepper',
      'carrots': 'carrot',
      'celery stalks': 'celery'
    };

    return standards[nameLower] || name;
  },

  // Parse quantity from string
  parseQuantity(quantityStr) {
    if (typeof quantityStr === 'number') {
      return quantityStr;
    }

    const fractionMap = {
      '1/4': 0.25,
      '1/3': 0.333,
      '1/2': 0.5,
      '2/3': 0.666,
      '3/4': 0.75,
      '1/8': 0.125
    };

    // Check for fractions
    if (fractionMap[quantityStr]) {
      return fractionMap[quantityStr];
    }

    // Try to parse as number
    const num = parseFloat(quantityStr);
    if (!isNaN(num)) {
      return num;
    }

    throw new Error(`Cannot parse quantity: ${quantityStr}`);
  }
};

module.exports = UnitConverter;