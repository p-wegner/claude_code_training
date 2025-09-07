# Module 5: Sub-agents - Exercise Solutions

## Exercise 1: Nutrition Analysis Agent

### Solution 1: Agent Definition and Implementation

**Agent File Structure:**
```
.claude/agents/
├── nutrition-analyst.md
├── nutrition-analyst.js
└── nutrition-database.json
```

**nutrition-analyst.md:**
```markdown
# Agent: Nutrition Analyst

## Role
You are a specialized nutrition analyst with expertise in recipe nutritional analysis, dietary guidelines, and health impact assessment.

## Expertise
- Nutritional science and dietetics
- Recipe analysis and calorie calculation
- Dietary restrictions and allergen identification
- Health impact assessment
- Nutritional database management

## Responsibilities
- Analyze recipe nutritional content
- Calculate per-serving nutrition facts
- Identify potential health concerns
- Suggest nutritional improvements
- Provide dietary compliance information

## Tools Available
- Recipe database access
- Nutritional information database
- Unit conversion utilities
- Calculation tools
- Report generation

## Guidelines
- Focus on accuracy in calculations
- Consider different dietary needs
- Provide actionable recommendations
- Flag potential allergens and health concerns
- Use evidence-based nutritional standards

## Output Format
Structured nutritional analysis with:
- Per-serving nutrition facts
- Health impact assessment
- Dietary compliance information
- Improvement suggestions
- Allergen warnings

## Constraints
- Only provide nutritional advice within scope of recipe analysis
- Do not provide medical advice
- Use conservative estimates for missing data
- Clearly indicate when data is estimated
- Prioritize safety in recommendations
```

**nutrition-analyst.js:**
```javascript
class NutritionAnalystAgent {
  constructor(config = {}) {
    this.config = config;
    this.nutritionDatabase = this.loadNutritionDatabase();
    this.dietaryGuidelines = this.loadDietaryGuidelines();
    this.allergenDatabase = this.loadAllergenDatabase();
  }

  loadNutritionDatabase() {
    // Comprehensive ingredient nutrition database
    return {
      // Grains and starches
      'flour': { calories: 364, protein: 10.3, carbs: 76.3, fat: 0.98, fiber: 2.7, sugar: 0.3 },
      'sugar': { calories: 387, protein: 0, carbs: 99.98, fat: 0, fiber: 0, sugar: 99.98 },
      'brown sugar': { calories: 380, protein: 0.12, carbs: 98.09, fat: 0, fiber: 0.8, sugar: 97.02 },
      'rice': { calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fiber: 0.4, sugar: 0.1 },
      'pasta': { calories: 131, protein: 5.5, carbs: 25.0, fat: 1.1, fiber: 1.8, sugar: 0.6 },
      'bread': { calories: 265, protein: 9.0, carbs: 49.0, fat: 3.2, fiber: 2.7, sugar: 5.0 },
      
      // Proteins
      'chicken breast': { calories: 165, protein: 31.0, carbs: 0, fat: 3.6, fiber: 0, sugar: 0 },
      'ground beef': { calories: 250, protein: 26.0, carbs: 0, fat: 15.0, fiber: 0, sugar: 0 },
      'egg': { calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fiber: 0, sugar: 1.1 },
      'milk': { calories: 42, protein: 3.4, carbs: 5.0, fat: 1.0, fiber: 0, sugar: 5.0 },
      'cheese': { calories: 402, protein: 25.0, carbs: 1.3, fat: 33.0, fiber: 0, sugar: 0.5 },
      'yogurt': { calories: 59, protein: 10.0, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.6 },
      'tofu': { calories: 76, protein: 8.0, carbs: 1.9, fat: 4.8, fiber: 0.3, sugar: 0.7 },
      'beans': { calories: 127, protein: 8.7, carbs: 22.8, fat: 0.5, fiber: 6.4, sugar: 0.3 },
      
      // Fats and oils
      'butter': { calories: 717, protein: 0.9, carbs: 0.1, fat: 81.1, fiber: 0, sugar: 0.1 },
      'olive oil': { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, sugar: 0 },
      'vegetable oil': { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, sugar: 0 },
      
      // Vegetables
      'onion': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, sugar: 4.2 },
      'garlic': { calories: 149, protein: 6.4, carbs: 33.1, fat: 0.5, fiber: 2.1, sugar: 1.0 },
      'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6 },
      'carrot': { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, sugar: 4.7 },
      'potato': { calories: 77, protein: 2.0, carbs: 17.0, fat: 0.1, fiber: 2.2, sugar: 0.8 },
      'lettuce': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, sugar: 0.8 },
      'broccoli': { calories: 34, protein: 2.8, carbs: 7.0, fat: 0.4, fiber: 2.6, sugar: 1.5 },
      
      // Fruits
      'apple': { calories: 52, protein: 0.3, carbs: 14.0, fat: 0.2, fiber: 2.4, sugar: 10.4 },
      'banana': { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, sugar: 12.2 },
      'lemon': { calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, fiber: 2.8, sugar: 2.5 },
      'strawberry': { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2.0, sugar: 4.9 },
      
      // Spices and seasonings
      'salt': { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 38758 },
      'pepper': { calories: 251, protein: 10.4, carbs: 63.9, fat: 3.3, fiber: 25.3, sugar: 0.99 },
      'cinnamon': { calories: 247, protein: 4.0, carbs: 80.6, fat: 1.2, fiber: 53.1, sugar: 2.2 },
      'vanilla': { calories: 288, protein: 0.1, carbs: 12.7, fat: 0.1, fiber: 0, sugar: 12.7 }
    };
  }

  loadDietaryGuidelines() {
    return {
      dailyValues: {
        calories: 2000,
        protein: 50, // grams
        carbs: 275, // grams
        fat: 78, // grams
        fiber: 28, // grams
        sugar: 50, // grams
        sodium: 2300, // milligrams
        saturatedFat: 20, // grams
        cholesterol: 300 // milligrams
      },
      recommendedRatios: {
        protein: { min: 10, max: 35 }, // percentage of calories
        carbs: { min: 45, max: 65 }, // percentage of calories
        fat: { min: 20, max: 35 } // percentage of calories
      }
    };
  }

  loadAllergenDatabase() {
    return {
      majorAllergens: [
        'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts',
        'wheat', 'soybeans', 'sesame', 'mustard', 'celery', 'lupin'
      ],
      ingredientMapping: {
        'milk': ['milk', 'cheese', 'butter', 'yogurt', 'cream', 'whey', 'casein'],
        'eggs': ['egg', 'eggs', 'mayonnaise', 'meringue', 'albumin'],
        'fish': ['fish', 'salmon', 'tuna', 'cod', 'anchovy', 'gelatin'],
        'shellfish': ['shrimp', 'crab', 'lobster', 'mussels', 'clams', 'oyster'],
        'tree nuts': ['almond', 'walnut', 'pecan', 'cashew', 'pistachio', 'hazelnut'],
        'peanuts': ['peanut', 'peanuts', 'peanut butter', 'groundnut'],
        'wheat': ['wheat', 'flour', 'bread', 'pasta', 'couscous', 'bulgur'],
        'soybeans': ['soy', 'soybeans', 'tofu', 'tempeh', 'edamame', 'soy sauce']
      }
    };
  }

  async analyzeRecipe(recipe) {
    console.log('🔍 Starting nutritional analysis...');
    
    const analysis = {
      recipe: {
        id: recipe.id,
        title: recipe.title,
        servings: recipe.servings || 4
      },
      nutrition: {},
      healthAssessment: {},
      allergens: [],
      dietaryCompliance: {},
      recommendations: [],
      dataQuality: {
        complete: true,
        estimated: false,
        confidence: 'high'
      }
    };

    // Calculate nutrition from ingredients
    analysis.nutrition = await this.calculateRecipeNutrition(recipe);
    
    // Assess health impact
    analysis.healthAssessment = await this.assessHealthImpact(analysis.nutrition);
    
    // Identify allergens
    analysis.allergens = await this.identifyAllergens(recipe.ingredients);
    
    // Check dietary compliance
    analysis.dietaryCompliance = await this.checkDietaryCompliance(recipe);
    
    // Generate recommendations
    analysis.recommendations = await this.generateRecommendations(analysis);

    console.log('✅ Nutritional analysis complete');
    return analysis;
  }

  async calculateRecipeNutrition(recipe) {
    const ingredients = recipe.ingredients || [];
    const servings = recipe.servings || 4;
    
    let totalNutrition = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0
    };

    let estimatedCount = 0;
    let missingCount = 0;

    for (const ingredient of ingredients) {
      const ingredientNutrition = await this.calculateIngredientNutrition(ingredient);
      
      if (ingredientNutrition.estimated) {
        estimatedCount++;
      }
      
      if (ingredientNutrition.missing) {
        missingCount++;
        continue;
      }

      totalNutrition.calories += ingredientNutrition.calories;
      totalNutrition.protein += ingredientNutrition.protein;
      totalNutrition.carbs += ingredientNutrition.carbs;
      totalNutrition.fat += ingredientNutrition.fat;
      totalNutrition.fiber += ingredientNutrition.fiber || 0;
      totalNutrition.sugar += ingredientNutrition.sugar || 0;
      totalNutrition.sodium += ingredientNutrition.sodium || 0;
    }

    // Calculate per-serving values
    const perServing = {
      calories: Math.round(totalNutrition.calories / servings),
      protein: Math.round(totalNutrition.protein / servings * 10) / 10,
      carbs: Math.round(totalNutrition.carbs / servings * 10) / 10,
      fat: Math.round(totalNutrition.fat / servings * 10) / 10,
      fiber: Math.round(totalNutrition.fiber / servings * 10) / 10,
      sugar: Math.round(totalNutrition.sugar / servings * 10) / 10,
      sodium: Math.round(totalNutrition.sodium / servings)
    };

    // Calculate macronutrient percentages
    const totalCalories = perServing.calories;
    const percentages = {
      protein: totalCalories > 0 ? Math.round((perServing.protein * 4 / totalCalories) * 100) : 0,
      carbs: totalCalories > 0 ? Math.round((perServing.carbs * 4 / totalCalories) * 100) : 0,
      fat: totalCalories > 0 ? Math.round((perServing.fat * 9 / totalCalories) * 100) : 0
    };

    return {
      total: totalNutrition,
      perServing,
      percentages,
      dataQuality: {
        estimatedIngredients: estimatedCount,
        missingIngredients: missingCount,
        totalIngredients: ingredients.length,
        confidence: this.calculateConfidence(estimatedCount, missingCount, ingredients.length)
      }
    };
  }

  async calculateIngredientNutrition(ingredient) {
    const { name, quantity, unit } = ingredient;
    const normalizedName = this.normalizeIngredientName(name);
    const normalizedQuantity = this.normalizeQuantity(quantity, unit);

    const baseNutrition = this.nutritionDatabase[normalizedName];
    
    if (!baseNutrition) {
      return {
        missing: true,
        name,
        message: `No nutrition data available for: ${name}`
      };
    }

    // Calculate nutrition for the specified quantity
    const nutrition = {};
    Object.keys(baseNutrition).forEach(nutrient => {
      if (typeof baseNutrition[nutrient] === 'number') {
        nutrition[nutrient] = baseNutrition[nutrient] * normalizedQuantity;
      }
    });

    return {
      ...nutrition,
      estimated: this.isEstimated(normalizedName, unit),
      baseData: baseNutrition,
      normalizedQuantity
    };
  }

  normalizeIngredientName(name) {
    return name.toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .trim()
      .replace(/\s+/g, ' ');
  }

  normalizeQuantity(quantity, unit) {
    // Convert to standard units (cups for volume, grams for weight)
    const conversions = {
      // Volume conversions to cups
      'cup': 1,
      'cups': 1,
      'tablespoon': 0.0625,
      'tbsp': 0.0625,
      'teaspoon': 0.0208,
      'tsp': 0.0208,
      'fluid ounce': 0.125,
      'fl oz': 0.125,
      'milliliter': 0.0042,
      'ml': 0.0042,
      'liter': 4.227,
      'l': 4.227,
      
      // Weight conversions to grams
      'gram': 1,
      'grams': 1,
      'g': 1,
      'kilogram': 1000,
      'kg': 1000,
      'ounce': 28.35,
      'oz': 28.35,
      'pound': 453.59,
      'lb': 453.59,
      
      // Default
      'piece': 1,
      'pieces': 1,
      '': 1
    };

    const conversionFactor = conversions[unit.toLowerCase()] || 1;
    return quantity * conversionFactor;
  }

  isEstimated(name, unit) {
    // Some ingredients are estimated due to natural variation
    const estimatedIngredients = ['fresh herbs', 'vegetables', 'fruits'];
    const estimatedUnits = ['piece', 'pieces', 'bunch', 'handful'];
    
    return estimatedIngredients.some(ing => name.includes(ing)) ||
           estimatedUnits.some(u => unit.toLowerCase().includes(u));
  }

  calculateConfidence(estimatedCount, missingCount, totalCount) {
    if (totalCount === 0) return 'low';
    
    const knownRatio = (totalCount - estimatedCount - missingCount) / totalCount;
    
    if (knownRatio >= 0.9) return 'high';
    if (knownRatio >= 0.7) return 'medium';
    return 'low';
  }

  async assessHealthImpact(nutrition) {
    const { perServing, percentages } = nutrition;
    const guidelines = this.dietaryGuidelines.dailyValues;
    
    const assessment = {
      overall: 'moderate',
      score: 50,
      flags: [],
      strengths: [],
      concerns: []
    };

    // Calculate health score
    let score = 50;

    // Calorie assessment
    if (perServing.calories <= 300) score += 15;
    else if (perServing.calories <= 500) score += 10;
    else if (perServing.calories <= 700) score += 5;
    else score -= 10;

    // Macronutrient balance
    if (percentages.protein >= 15 && percentages.protein <= 30) score += 10;
    if (percentages.carbs >= 45 && percentages.carbs <= 65) score += 10;
    if (percentages.fat >= 20 && percentages.fat <= 35) score += 10;

    // Fiber bonus
    if (perServing.fiber >= 5) score += 10;
    else if (perServing.fiber >= 3) score += 5;

    // Sugar penalty
    if (perServing.sugar > 15) score -= 15;
    else if (perServing.sugar > 10) score -= 5;

    // Sodium penalty
    if (perServing.sodium > 600) score -= 15;
    else if (perServing.sodium > 400) score -= 5;

    assessment.score = Math.max(0, Math.min(100, score));

    // Determine overall assessment
    if (assessment.score >= 80) assessment.overall = 'excellent';
    else if (assessment.score >= 60) assessment.overall = 'good';
    else if (assessment.score >= 40) assessment.overall = 'moderate';
    else assessment.overall = 'poor';

    // Identify flags and concerns
    if (perServing.calories > 800) {
      assessment.concerns.push('High calorie content');
    }
    
    if (perServing.sodium > 600) {
      assessment.concerns.push('High sodium content');
    }
    
    if (perServing.sugar > 15) {
      assessment.concerns.push('High sugar content');
    }
    
    if (percentages.fat > 40) {
      assessment.concerns.push('High fat content');
    }

    // Identify strengths
    if (perServing.fiber >= 5) {
      assessment.strengths.push('High fiber content');
    }
    
    if (percentages.protein >= 20) {
      assessment.strengths.push('Good protein content');
    }
    
    if (perServing.calories <= 400) {
      assessment.strengths.push('Reasonable calorie content');
    }

    return assessment;
  }

  async identifyAllergens(ingredients) {
    const allergens = new Set();
    const allergenDb = this.allergenDatabase;

    ingredients.forEach(ingredient => {
      const name = ingredient.name.toLowerCase();
      
      // Check against major allergens
      allergenDb.majorAllergens.forEach(allergen => {
        if (name.includes(allergen)) {
          allergens.add(allergen);
        }
      });

      // Check against ingredient mappings
      Object.entries(allergenDb.ingredientMapping).forEach(([allergen, variations]) => {
        if (variations.some(variation => name.includes(variation))) {
          allergens.add(allergen);
        }
      });
    });

    return Array.from(allergens);
  }

  async checkDietaryCompliance(recipe) {
    const ingredients = recipe.ingredients || [];
    const compliance = {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutFree: true,
      lowSodium: true,
      lowSugar: true,
      highFiber: false,
      highProtein: false
    };

    // Check for non-vegetarian ingredients
    const nonVegetarian = ['chicken', 'beef', 'pork', 'fish', 'meat', 'turkey', 'duck'];
    const nonVegan = ['egg', 'milk', 'cheese', 'butter', 'yogurt', 'cream', 'honey'];
    const glutenContaining = ['wheat', 'flour', 'bread', 'pasta', 'barley', 'rye'];
    const dairy = ['milk', 'cheese', 'butter', 'yogurt', 'cream'];
    const nuts = ['almond', 'walnut', 'pecan', 'cashew', 'pistachio', 'hazelnut'];

    ingredients.forEach(ingredient => {
      const name = ingredient.name.toLowerCase();
      
      if (nonVegetarian.some(meat => name.includes(meat))) {
        compliance.vegetarian = false;
        compliance.vegan = false;
      }
      
      if (nonVegan.some(ingredientType => name.includes(ingredientType))) {
        compliance.vegan = false;
      }
      
      if (glutenContaining.some(grain => name.includes(grain))) {
        compliance.glutenFree = false;
      }
      
      if (dairy.some(dairyProduct => name.includes(dairyProduct))) {
        compliance.dairyFree = false;
      }
      
      if (nuts.some(nut => name.includes(nut))) {
        compliance.nutFree = false;
      }
    });

    // Check nutrition-based compliance
    const nutrition = await this.calculateRecipeNutrition(recipe);
    const perServing = nutrition.perServing;
    
    compliance.lowSodium = perServing.sodium <= 140;
    compliance.lowSugar = perServing.sugar <= 5;
    compliance.highFiber = perServing.fiber >= 5;
    compliance.highProtein = perServing.protein >= 10;

    return compliance;
  }

  async generateRecommendations(analysis) {
    const recommendations = [];
    const { nutrition, healthAssessment, allergens } = analysis;

    // Health-based recommendations
    if (healthAssessment.concerns.length > 0) {
      healthAssessment.concerns.forEach(concern => {
        if (concern.includes('calorie')) {
          recommendations.push({
            category: 'calories',
            priority: 'high',
            message: 'Consider reducing portion sizes or using lower-calorie ingredients',
            impact: 'Reduce calorie content by 15-25%'
          });
        }
        
        if (concern.includes('sodium')) {
          recommendations.push({
            category: 'sodium',
            priority: 'high',
            message: 'Reduce salt and use herbs and spices for flavor',
            impact: 'Lower sodium content by 30-50%'
          });
        }
        
        if (concern.includes('sugar')) {
          recommendations.push({
            category: 'sugar',
            priority: 'medium',
            message: 'Reduce added sugars or use natural sweeteners',
            impact: 'Lower sugar content by 20-40%'
          });
        }
        
        if (concern.includes('fat')) {
          recommendations.push({
            category: 'fat',
            priority: 'medium',
            message: 'Use leaner ingredients or reduce oil/fat content',
            impact: 'Lower fat content by 15-30%'
          });
        }
      });
    }

    // Nutritional improvement recommendations
    if (nutrition.perServing.fiber < 3) {
      recommendations.push({
        category: 'fiber',
        priority: 'medium',
        message: 'Add more vegetables, whole grains, or legumes',
        impact: 'Increase fiber content for better digestion'
      });
    }

    if (nutrition.perServing.protein < 10) {
      recommendations.push({
        category: 'protein',
        priority: 'medium',
        message: 'Add protein sources like lean meat, beans, or tofu',
        impact: 'Improve satiety and muscle maintenance'
      });
    }

    // Allergen-related recommendations
    if (allergens.length > 0) {
      recommendations.push({
        category: 'allergens',
        priority: 'high',
        message: `Recipe contains potential allergens: ${allergens.join(', ')}. Consider alternatives for sensitive diets.`,
        impact: 'Improve safety and accessibility'
      });
    }

    // Balance recommendations
    const { percentages } = nutrition;
    if (percentages.protein < 15) {
      recommendations.push({
        category: 'balance',
        priority: 'low',
        message: 'Consider increasing protein content for better macronutrient balance',
        impact: 'Improve overall nutritional balance'
      });
    }

    return recommendations;
  }

  formatAnalysis(analysis) {
    const output = [];
    
    // Header
    output.push('🍽️  Nutritional Analysis Report');
    output.push(`Recipe: ${analysis.recipe.title}`);
    output.push(`Servings: ${analysis.recipe.servings}`);
    output.push('');
    
    // Nutrition Facts
    output.push('📊 Nutrition Facts (per serving):');
    output.push(`   Calories: ${analysis.nutrition.perServing.calories} kcal`);
    output.push(`   Protein: ${analysis.nutrition.perServing.protein}g (${analysis.nutrition.percentages.protein}%)`);
    output.push(`   Carbohydrates: ${analysis.nutrition.perServing.carbs}g (${analysis.nutrition.percentages.carbs}%)`);
    output.push(`   Fat: ${analysis.nutrition.perServing.fat}g (${analysis.nutrition.percentages.fat}%)`);
    output.push(`   Fiber: ${analysis.nutrition.perServing.fiber}g`);
    output.push(`   Sugar: ${analysis.nutrition.perServing.sugar}g`);
    output.push(`   Sodium: ${analysis.nutrition.perServing.sodium}mg`);
    output.push('');
    
    // Health Assessment
    output.push('🏥 Health Assessment:');
    output.push(`   Overall: ${analysis.healthAssessment.overall.toUpperCase()}`);
    output.push(`   Score: ${analysis.healthAssessment.score}/100`);
    
    if (analysis.healthAssessment.strengths.length > 0) {
      output.push('   Strengths:');
      analysis.healthAssessment.strengths.forEach(strength => {
        output.push(`     • ${strength}`);
      });
    }
    
    if (analysis.healthAssessment.concerns.length > 0) {
      output.push('   Concerns:');
      analysis.healthAssessment.concerns.forEach(concern => {
        output.push(`     • ${concern}`);
      });
    }
    output.push('');
    
    // Dietary Information
    output.push('🥗 Dietary Compliance:');
    Object.entries(analysis.dietaryCompliance).forEach(([diet, compliant]) => {
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
        output.push(`   [${rec.priority.toUpperCase()}] ${rec.message}`);
      });
    }
    
    // Data Quality
    output.push('');
    output.push('📈 Data Quality:');
    output.push(`   Confidence: ${analysis.nutrition.dataQuality.confidence}`);
    output.push(`   Estimated ingredients: ${analysis.nutrition.dataQuality.estimatedIngredients}`);
    output.push(`   Missing ingredients: ${analysis.nutrition.dataQuality.missingIngredients}`);

    return output.join('\n');
  }
}

module.exports = NutritionAnalystAgent;
```

### Solution 2: Agent Testing and Validation

**Test Cases:**
```javascript
// .claude/agents/test-nutrition-analyst.js
const NutritionAnalystAgent = require('./nutrition-analyst');

class NutritionAnalystTester {
  constructor() {
    this.agent = new NutritionAnalystAgent();
    this.testResults = [];
  }

  async runAllTests() {
    console.log('🧪 Running Nutrition Analyst Agent Tests...\n');
    
    await this.testBasicRecipeAnalysis();
    await this.testIngredientCalculation();
    await this.testAllergenDetection();
    await this.testDietaryCompliance();
    await this.testHealthAssessment();
    await this testDataQualityHandling();
    
    this.printTestResults();
  }

  async testBasicRecipeAnalysis() {
    console.log('Test 1: Basic Recipe Analysis');
    
    const testRecipe = {
      id: 'test-1',
      title: 'Simple Salad',
      servings: 2,
      ingredients: [
        { quantity: 2, unit: 'cup', name: 'lettuce' },
        { quantity: 1, unit: 'medium', name: 'tomato' },
        { quantity: 2, unit: 'tbsp', name: 'olive oil' }
      ]
    };

    try {
      const result = await this.agent.analyzeRecipe(testRecipe);
      
      // Validate structure
      const hasRequiredFields = result.nutrition && result.healthAssessment && result.recommendations;
      const hasPerServing = result.nutrition.perServing && result.nutrition.perServing.calories > 0;
      const hasHealthScore = result.healthAssessment.score >= 0 && result.healthAssessment.score <= 100;
      
      this.recordTest('Basic Recipe Analysis', hasRequiredFields && hasPerServing && hasHealthScore, result);
    } catch (error) {
      this.recordTest('Basic Recipe Analysis', false, { error: error.message });
    }
  }

  async testIngredientCalculation() {
    console.log('Test 2: Ingredient Calculation');
    
    const testIngredients = [
      { quantity: 1, unit: 'cup', name: 'flour' },
      { quantity: 0.5, unit: 'cup', name: 'sugar' },
      { quantity: 2, unit: 'tbsp', name: 'butter' }
    ];

    try {
      let totalCalories = 0;
      for (const ingredient of testIngredients) {
        const nutrition = await this.agent.calculateIngredientNutrition(ingredient);
        totalCalories += nutrition.calories;
      }
      
      const isReasonable = totalCalories > 500 && totalCalories < 1000;
      this.recordTest('Ingredient Calculation', isReasonable, { totalCalories });
    } catch (error) {
      this.recordTest('Ingredient Calculation', false, { error: error.message });
    }
  }

  async testAllergenDetection() {
    console.log('Test 3: Allergen Detection');
    
    const testIngredients = [
      { quantity: 1, unit: 'cup', name: 'milk' },
      { quantity: 2, unit: 'tbsp', name: 'peanut butter' },
      { quantity: 1, unit: 'cup', name: 'wheat flour' }
    ];

    try {
      const allergens = await this.agent.identifyAllergens(testIngredients);
      const expectedAllergens = ['milk', 'peanuts', 'wheat'];
      const hasExpectedAllergens = expectedAllergens.every(allergen => allergens.includes(allergen));
      
      this.recordTest('Allergen Detection', hasExpectedAllergens, { detected: allergens });
    } catch (error) {
      this.recordTest('Allergen Detection', false, { error: error.message });
    }
  }

  async testDietaryCompliance() {
    console.log('Test 4: Dietary Compliance');
    
    const vegetarianRecipe = {
      ingredients: [
        { quantity: 1, unit: 'cup', name: 'rice' },
        { quantity: 1, unit: 'cup', name: 'beans' },
        { quantity: 1, unit: 'medium', name: 'tomato' }
      ]
    };

    const nonVegetarianRecipe = {
      ingredients: [
        { quantity: 1, unit: 'cup', name: 'chicken' },
        { quantity: 1, unit: 'cup', name: 'rice' }
      ]
    };

    try {
      const vegCompliance = await this.agent.checkDietaryCompliance(vegetarianRecipe);
      const nonVegCompliance = await this.agent.checkDietaryCompliance(nonVegetarianRecipe);
      
      const isVegCorrect = vegCompliance.vegetarian && vegCompliance.vegan;
      const isNonVegCorrect = !nonVegCompliance.vegetarian && !nonVegCompliance.vegan;
      
      this.recordTest('Dietary Compliance', isVegCorrect && isNonVegCorrect, {
        vegetarian: vegCompliance,
        nonVegetarian: nonVegCompliance
      });
    } catch (error) {
      this.recordTest('Dietary Compliance', false, { error: error.message });
    }
  }

  async testHealthAssessment() {
    console.log('Test 5: Health Assessment');
    
    const healthyRecipe = {
      servings: 4,
      ingredients: [
        { quantity: 2, unit: 'cup', name: 'broccoli' },
        { quantity: 1, unit: 'cup', name: 'quinoa' },
        { quantity: 0.5, unit: 'cup', name: 'chicken breast' }
      ]
    };

    const unhealthyRecipe = {
      servings: 4,
      ingredients: [
        { quantity: 2, unit: 'cup', name: 'sugar' },
        { quantity: 1, unit: 'cup', name: 'butter' },
        { quantity: 1, unit: 'cup', name: 'white flour' }
      ]
    };

    try {
      const healthyNutrition = await this.agent.calculateRecipeNutrition(healthyRecipe);
      const unhealthyNutrition = await this.agent.calculateRecipeNutrition(unhealthyRecipe);
      
      const healthyAssessment = await this.agent.assessHealthImpact(healthyNutrition);
      const unhealthyAssessment = await this.agent.assessHealthImpact(unhealthyNutrition);
      
      const isHealthyHigher = healthyAssessment.score > unhealthyAssessment.score;
      const scoresInRange = healthyAssessment.score >= 0 && healthyAssessment.score <= 100 &&
                           unhealthyAssessment.score >= 0 && unhealthyAssessment.score <= 100;
      
      this.recordTest('Health Assessment', isHealthyHigher && scoresInRange, {
        healthy: healthyAssessment.score,
        unhealthy: unhealthyAssessment.score
      });
    } catch (error) {
      this.recordTest('Health Assessment', false, { error: error.message });
    }
  }

  async testDataQualityHandling() {
    console.log('Test 6: Data Quality Handling');
    
    const recipeWithMissingData = {
      servings: 4,
      ingredients: [
        { quantity: 1, unit: 'cup', name: 'exotic fruit' }, // Not in database
        { quantity: 1, unit: 'cup', name: 'flour' }, // In database
        { quantity: 1, unit: 'bunch', name: 'fresh herbs' } // Estimated
      ]
    };

    try {
      const nutrition = await this.agent.calculateRecipeNutrition(recipeWithMissingData);
      
      const hasDataQuality = nutrition.dataQuality;
      const hasConfidence = nutrition.dataQuality.confidence;
      const hasEstimatedCount = nutrition.dataQuality.estimatedIngredients >= 0;
      const hasMissingCount = nutrition.dataQuality.missingIngredients >= 0;
      
      this.recordTest('Data Quality Handling', hasDataQuality && hasConfidence && hasEstimatedCount && hasMissingCount, {
        dataQuality: nutrition.dataQuality
      });
    } catch (error) {
      this.recordTest('Data Quality Handling', false, { error: error.message });
    }
  }

  recordTest(testName, passed, details) {
    this.testResults.push({
      name: testName,
      passed,
      details,
      timestamp: new Date().toISOString()
    });
  }

  printTestResults() {
    console.log('\n📊 Test Results Summary:');
    console.log('='.repeat(50));
    
    const passed = this.testResults.filter(t => t.passed).length;
    const total = this.testResults.length;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    console.log('');
    
    this.testResults.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`${status} ${test.name}`);
      if (!test.passed && test.details.error) {
        console.log(`   Error: ${test.details.error}`);
      }
    });
    
    console.log('\n' + '='.repeat(50));
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new NutritionAnalystTester();
  tester.runAllTests();
}

module.exports = NutritionAnalystTester;
```

## Exercise 2: Security Audit Agent

### Solution: Security-focused Sub-agent

**security-auditor.md:**
```markdown
# Agent: Security Auditor

## Role
You are a specialized security auditor with expertise in web application security, vulnerability assessment, and secure coding practices.

## Expertise
- OWASP Top 10 vulnerabilities
- SQL injection detection and prevention
- Cross-site scripting (XSS) protection
- Input validation and sanitization
- Authentication and authorization
- Security best practices for Node.js/Express
- Dependency security analysis
- Configuration security assessment

## Responsibilities
- Analyze code for security vulnerabilities
- Identify potential security risks
- Provide remediation recommendations
- Assess configuration security
- Validate input validation implementation
- Check authentication and authorization flows

## Tools Available
- Static code analysis tools
- Vulnerability database access
- Security pattern recognition
- Risk assessment framework
- Compliance checking utilities
- Dependency vulnerability scanner

## Guidelines
- Follow OWASP security guidelines
- Prioritize critical vulnerabilities
- Provide actionable remediation steps
- Consider context-specific risks
- Use conservative risk assessment
- Document security findings clearly

## Output Format
Structured security assessment with:
- Vulnerability categorization
- Risk severity levels
- Exploitability assessment
- Business impact analysis
- Remediation recommendations
- Security best practices

## Constraints
- Only analyze security aspects within scope
- Do not provide exploitation techniques
- Focus on defensive security measures
- Consider both technical and procedural security
- Prioritize based on risk severity
```

**security-auditor.js:**
```javascript
class SecurityAuditorAgent {
  constructor(config = {}) {
    this.config = config;
    this.vulnerabilityDatabase = this.loadVulnerabilityDatabase();
    this.securityPatterns = this.loadSecurityPatterns();
    this.riskMatrix = this.loadRiskMatrix();
  }

  loadVulnerabilityDatabase() {
    return {
      // OWASP Top 10 vulnerabilities
      'sql_injection': {
        patterns: [
          /SELECT\s+.*FROM\s+\w+/i,
          /INSERT\s+INTO\s+\w+/i,
          /UPDATE\s+\w+\s+SET/i,
          /DELETE\s+FROM\s+\w+/i,
          /\$\{.*\}/,
          /req\.query\./,
          /req\.params\./,
          /req\.body\./
        ],
        severity: 'critical',
        description: 'SQL injection vulnerability allows attackers to execute arbitrary SQL queries',
        remediation: 'Use parameterized queries or prepared statements',
        examples: [
          'db.query("SELECT * FROM users WHERE id = " + req.params.id)',
          'db.query(`SELECT * FROM users WHERE name = '${req.query.name}'`)'
        ]
      },
      
      'xss': {
        patterns: [
          /innerHTML\s*=/,
          /outerHTML\s*=/,
          /document\.write/,
          /eval\s*\(/,
          /setTimeout\s*\([^,]+,\s*[^)]*\)/,
          /setInterval\s*\([^,]+,\s*[^)]*\)/
        ],
        severity: 'high',
        description: 'Cross-site scripting allows attackers to execute malicious scripts in users\' browsers',
        remediation: 'Use proper output encoding and Content Security Policy',
        examples: [
          'element.innerHTML = userInput',
          'document.write(userProvidedData)'
        ]
      },
      
      'csrf': {
        patterns: [
          /app\.post\(/,
          /app\.put\(/,
          /app\.delete\(/,
          /req\.body/,
          /res\.redirect/
        ],
        severity: 'medium',
        description: 'Cross-site request forgery allows attackers to force users to execute unwanted actions',
        remediation: 'Implement CSRF tokens for state-changing operations',
        examples: [
          'app.post("/transfer", (req, res) => { /* no CSRF check */ })'
        ]
      },
      
      'auth_bypass': {
        patterns: [
          /if\s*\(\s*user\s*\)\s*{/,
          /if\s*\(\s*authenticated\s*\)\s*{/,
          /req\.session\.user/,
          /req\.user/
        ],
        severity: 'critical',
        description: 'Authentication bypass allows unauthorized access to protected resources',
        remediation: 'Implement proper authentication middleware and session management',
        examples: [
          'if (req.session.user) { /* no proper validation */ }'
        ]
      },
      
      'input_validation': {
        patterns: [
          /req\.query\./,
          /req\.params\./,
          /req\.body\./,
          /JSON\.parse/,
          /parseInt\s*\(/,
          /parseFloat\s*\(/
        ],
        severity: 'medium',
        description: 'Missing input validation allows attackers to inject malicious data',
        remediation: 'Validate and sanitize all user inputs',
        examples: [
          'const id = req.params.id; // no validation'
        ]
      },
      
      'file_upload': {
        patterns: [
          /multer/,
          /fs\.writeFile/,
          /fs\.createWriteStream/,
          /path\.join.*__dirname/,
          /express\.static/
        ],
        severity: 'high',
        description: 'Insecure file upload allows attackers to upload malicious files',
        remediation: 'Validate file types, sanitize filenames, and store files outside web root',
        examples: [
          'app.post("/upload", upload.single("file"), (req, res) => { /* no validation */ })'
        ]
      },
      
      'information_disclosure': {
        patterns: [
          /console\.log/,
          /console\.error/,
          /res\.status\(500\)/,
          /res\.send\(err\)/,
          /process\.env/,
          /__dirname/
        ],
        severity: 'low',
        description: 'Information disclosure can leak sensitive data to attackers',
        remediation: 'Remove debug code and implement proper error handling',
        examples: [
          'console.log(user.password)',
          'res.send(err.stack)'
        ]
      }
    };
  }

  loadSecurityPatterns() {
    return {
      secureAuth: [
        /passport\.authenticate/,
        /jsonwebtoken/,
        /bcrypt\.hash/,
        /bcrypt\.compare/,
        /express-session/,
        /cookie-parser/
      ],
      
      secureValidation: [
        /joi\.validate/,
        /express-validator/,
        /validator\.is/,
        /zod\.parse/,
        /typeof\s+\w+\s*!==\s*['"]undefined['"]/
      ],
      
      secureDatabase: [
        /sequelize/,
        /mongoose/,
        /pg\.Client/,
        /mysql\.createPool/,
        /knex/,
        /\$\w+/ // Parameterized queries
      ],
      
      secureHeaders: [
        /helmet\(\)/,
        /cors\(\)/,
        /csp/,
        /X-Content-Type-Options/,
        /X-Frame-Options/,
        /X-XSS-Protection/
      ]
    };
  }

  loadRiskMatrix() {
    return {
      critical: {
        impact: 'High',
        likelihood: 'High',
        priority: 'Immediate',
        timeframe: '24 hours'
      },
      high: {
        impact: 'High',
        likelihood: 'Medium',
        priority: 'High',
        timeframe: '72 hours'
      },
      medium: {
        impact: 'Medium',
        likelihood: 'Medium',
        priority: 'Medium',
        timeframe: '1 week'
      },
      low: {
        impact: 'Low',
        likelihood: 'Low',
        priority: 'Low',
        timeframe: '1 month'
      }
    };
  }

  async auditCode(code, context = {}) {
    console.log('🔒 Starting security audit...');
    
    const audit = {
      timestamp: new Date().toISOString(),
      context,
      vulnerabilities: [],
      securityMeasures: [],
      riskAssessment: {
        overall: 'low',
        score: 85,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      },
      recommendations: [],
      compliance: {
        owaspTop10: true,
        dataProtection: true,
        authentication: true,
        authorization: true
      }
    };

    // Analyze for vulnerabilities
    audit.vulnerabilities = await this.analyzeVulnerabilities(code);
    
    // Identify security measures
    audit.securityMeasures = await this.identifySecurityMeasures(code);
    
    // Assess overall risk
    audit.riskAssessment = await this.assessRisk(audit.vulnerabilities);
    
    // Generate recommendations
    audit.recommendations = await this.generateRecommendations(audit);
    
    // Check compliance
    audit.compliance = await this.checkCompliance(audit);

    console.log('✅ Security audit complete');
    return audit;
  }

  async analyzeVulnerabilities(code) {
    const vulnerabilities = [];
    
    Object.entries(this.vulnerabilityDatabase).forEach(([type, vulnInfo]) => {
      const matches = this.findVulnerabilityMatches(code, vulnInfo.patterns);
      
      matches.forEach(match => {
        vulnerabilities.push({
          type,
          severity: vulnInfo.severity,
          description: vulnInfo.description,
          remediation: vulnInfo.remediation,
          location: match.location,
          code: match.code,
          context: match.context,
          exploitability: this.assessExploitability(type, match.code),
          impact: this.assessImpact(type, match.code)
        });
      });
    });

    return vulnerabilities.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }

  findVulnerabilityMatches(code, patterns) {
    const matches = [];
    const lines = code.split('\n');
    
    lines.forEach((line, index) => {
      patterns.forEach(pattern => {
        if (pattern.test(line)) {
          matches.push({
            location: `Line ${index + 1}`,
            code: line.trim(),
            context: this.getContext(lines, index, 2)
          });
        }
      });
    });

    return matches;
  }

  getContext(lines, index, contextLines) {
    const start = Math.max(0, index - contextLines);
    const end = Math.min(lines.length, index + contextLines + 1);
    
    return lines.slice(start, end).join('\n');
  }

  assessExploitability(type, code) {
    // Simple exploitability assessment
    const exploitabilityFactors = {
      user_input: code.includes('req.') || code.includes('request.'),
      direct_execution: code.includes('eval') || code.includes('exec'),
      database_query: code.includes('SELECT') || code.includes('INSERT') || code.includes('UPDATE'),
      file_operation: code.includes('fs.') || code.includes('writeFile'),
      network_operation: code.includes('http') || code.includes('fetch')
    };

    let score = 0;
    Object.values(exploitabilityFactors).forEach(factor => {
      if (factor) score += 20;
    });

    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    if (score >= 40) return 'low';
    return 'very low';
  }

  assessImpact(type, code) {
    const impactMap = {
      sql_injection: 'high',
      xss: 'medium',
      csrf: 'medium',
      auth_bypass: 'high',
      input_validation: 'medium',
      file_upload: 'high',
      information_disclosure: 'low'
    };

    return impactMap[type] || 'medium';
  }

  async identifySecurityMeasures(code) {
    const measures = [];
    
    Object.entries(this.securityPatterns).forEach(([category, patterns]) => {
      patterns.forEach(pattern => {
        if (pattern.test(code)) {
          measures.push({
            category,
            pattern: pattern.toString(),
            effectiveness: this.assessEffectiveness(category)
          });
        }
      });
    });

    return measures;
  }

  assessEffectiveness(category) {
    const effectivenessMap = {
      secureAuth: 'high',
      secureValidation: 'high',
      secureDatabase: 'high',
      secureHeaders: 'medium'
    };

    return effectivenessMap[category] || 'medium';
  }

  async assessRisk(vulnerabilities) {
    const riskCounts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    };

    vulnerabilities.forEach(vuln => {
      riskCounts[vuln.severity]++;
    });

    // Calculate risk score
    let score = 100;
    score -= riskCounts.critical * 25;
    score -= riskCounts.high * 15;
    score -= riskCounts.medium * 8;
    score -= riskCounts.low * 2;

    // Determine overall risk level
    let overall = 'low';
    if (riskCounts.critical > 0) overall = 'critical';
    else if (riskCounts.high > 2) overall = 'high';
    else if (riskCounts.high > 0 || riskCounts.medium > 3) overall = 'medium';

    return {
      overall,
      score: Math.max(0, score),
      ...riskCounts
    };
  }

  async generateRecommendations(audit) {
    const recommendations = [];
    
    // Critical vulnerability recommendations
    if (audit.riskAssessment.critical > 0) {
      recommendations.push({
        priority: 'critical',
        category: 'vulnerabilities',
        message: 'Address critical security vulnerabilities immediately',
        actions: ['Fix all critical vulnerabilities', 'Implement security testing', 'Review access controls']
      });
    }

    // High vulnerability recommendations
    if (audit.riskAssessment.high > 0) {
      recommendations.push({
        priority: 'high',
        category: 'vulnerabilities',
        message: 'Address high-severity security issues',
        actions: ['Fix high-severity vulnerabilities', 'Implement input validation', 'Add security headers']
      });
    }

    // Security measures recommendations
    if (audit.securityMeasures.length < 3) {
      recommendations.push({
        priority: 'medium',
        category: 'measures',
        message: 'Implement additional security measures',
        actions: ['Add authentication middleware', 'Implement input validation', 'Use security headers']
      });
    }

    // General security recommendations
    recommendations.push({
      priority: 'medium',
      category: 'general',
      message: 'Implement security best practices',
      actions: [
        'Regular security testing',
        'Dependency vulnerability scanning',
        'Security training for developers',
        'Code review processes'
      ]
    });

    return recommendations;
  }

  async checkCompliance(audit) {
    return {
      owaspTop10: audit.riskAssessment.critical === 0,
      dataProtection: !audit.vulnerabilities.some(v => v.type === 'information_disclosure'),
      authentication: audit.securityMeasures.some(m => m.category === 'secureAuth'),
      authorization: audit.vulnerabilities.filter(v => v.type === 'auth_bypass').length === 0,
      inputValidation: audit.securityMeasures.some(m => m.category === 'secureValidation')
    };
  }

  formatAuditResults(audit) {
    const output = [];
    
    // Header
    output.push('🔒 Security Audit Report');
    output.push(`Timestamp: ${audit.timestamp}`);
    output.push('');
    
    // Risk Assessment
    output.push('📊 Risk Assessment:');
    output.push(`   Overall Risk: ${audit.riskAssessment.overall.toUpperCase()}`);
    output.push(`   Security Score: ${audit.riskAssessment.score}/100`);
    output.push(`   Critical: ${audit.riskAssessment.critical}`);
    output.push(`   High: ${audit.riskAssessment.high}`);
    output.push(`   Medium: ${audit.riskAssessment.medium}`);
    output.push(`   Low: ${audit.riskAssessment.low}`);
    output.push('');
    
    // Vulnerabilities
    if (audit.vulnerabilities.length > 0) {
      output.push('🚨 Vulnerabilities Found:');
      audit.vulnerabilities.forEach(vuln => {
        output.push(`   [${vuln.severity.toUpperCase()}] ${vuln.type.replace(/_/g, ' ')}`);
        output.push(`   Location: ${vuln.location}`);
        output.push(`   Description: ${vuln.description}`);
        output.push(`   Remediation: ${vuln.remediation}`);
        output.push('');
      });
    } else {
      output.push('✅ No vulnerabilities detected');
      output.push('');
    }
    
    // Security Measures
    if (audit.securityMeasures.length > 0) {
      output.push('🛡️  Security Measures Detected:');
      const measuresByCategory = {};
      
      audit.securityMeasures.forEach(measure => {
        if (!measuresByCategory[measure.category]) {
          measuresByCategory[measure.category] = [];
        }
        measuresByCategory[measure.category].push(measure);
      });
      
      Object.entries(measuresByCategory).forEach(([category, measures]) => {
        output.push(`   ${category.replace(/_/g, ' ')}: ${measures.length} measures`);
      });
      output.push('');
    }
    
    // Compliance
    output.push('📋 Compliance Status:');
    Object.entries(audit.compliance).forEach(([standard, compliant]) => {
      output.push(`   ${standard.replace(/_/g, ' ')}: ${compliant ? '✅' : '❌'}`);
    });
    output.push('');
    
    // Recommendations
    if (audit.recommendations.length > 0) {
      output.push('💡 Recommendations:');
      audit.recommendations.forEach(rec => {
        output.push(`   [${rec.priority.toUpperCase()}] ${rec.message}`);
        rec.actions.forEach(action => {
          output.push(`     • ${action}`);
        });
        output.push('');
      });
    }

    return output.join('\n');
  }
}

module.exports = SecurityAuditorAgent;
```

## Exercise 3: Multi-Agent Coordination

### Solution: Agent Orchestration System

**agent-coordinator.js:**
```javascript
class AgentCoordinator {
  constructor(config = {}) {
    this.agents = new Map();
    this.taskQueue = [];
    this.activeTasks = new Map();
    this.results = new Map();
    this.config = {
      maxConcurrentTasks: config.maxConcurrentTasks || 3,
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3
    };
  }

  registerAgent(name, agent) {
    this.agents.set(name, agent);
    console.log(`🤖 Agent registered: ${name}`);
  }

  async coordinateTask(taskName, agents, context = {}) {
    console.log(`🎯 Starting coordinated task: ${taskName}`);
    
    const taskId = this.generateTaskId();
    const task = {
      id: taskId,
      name: taskName,
      agents,
      context,
      status: 'pending',
      startTime: Date.now(),
      results: new Map()
    };

    this.activeTasks.set(taskId, task);
    
    try {
      const results = await this.executeAgents(task);
      task.results = results;
      task.status = 'completed';
      task.endTime = Date.now();
      
      const aggregatedResult = this.aggregateResults(results);
      this.results.set(taskId, aggregatedResult);
      
      console.log(`✅ Task completed: ${taskName}`);
      return aggregatedResult;
    } catch (error) {
      task.status = 'failed';
      task.error = error.message;
      task.endTime = Date.now();
      
      console.error(`❌ Task failed: ${taskName} - ${error.message}`);
      throw error;
    } finally {
      this.activeTasks.delete(taskId);
    }
  }

  async executeAgents(task) {
    const results = new Map();
    const agentPromises = [];

    // Create execution plan
    const executionPlan = this.createExecutionPlan(task.agents, task.context);
    
    // Execute agents based on plan
    for (const phase of executionPlan.phases) {
      const phaseResults = await this.executePhase(phase, task);
      phaseResults.forEach((result, agentName) => {
        results.set(agentName, result);
      });
    }

    return results;
  }

  createExecutionPlan(agents, context) {
    const phases = [];
    
    // Group agents by type and dependencies
    const independentAgents = agents.filter(agent => !agent.dependsOn);
    const dependentAgents = agents.filter(agent => agent.dependsOn);
    
    if (independentAgents.length > 0) {
      phases.push({
        type: 'parallel',
        agents: independentAgents,
        name: 'Independent Analysis'
      });
    }

    if (dependentAgents.length > 0) {
      // Execute dependent agents in sequence
      dependentAgents.forEach(agent => {
        phases.push({
          type: 'sequential',
          agents: [agent],
          name: `${agent.name} Analysis`,
          dependsOn: agent.dependsOn
        });
      });
    }

    return { phases };
  }

  async executePhase(phase, task) {
    const results = new Map();
    
    if (phase.type === 'parallel') {
      // Execute agents in parallel
      const promises = phase.agents.map(async (agentConfig) => {
        try {
          const result = await this.executeAgent(agentConfig, task);
          return { name: agentConfig.name, result };
        } catch (error) {
          console.error(`Agent ${agentConfig.name} failed:`, error.message);
          return { name: agentConfig.name, error: error.message };
        }
      });

      const phaseResults = await Promise.all(promises);
      phaseResults.forEach(({ name, result, error }) => {
        if (error) {
          results.set(name, { error, status: 'failed' });
        } else {
          results.set(name, { result, status: 'completed' });
        }
      });
    } else if (phase.type === 'sequential') {
      // Execute agents in sequence
      for (const agentConfig of phase.agents) {
        try {
          const result = await this.executeAgent(agentConfig, task);
          results.set(agentConfig.name, { result, status: 'completed' });
        } catch (error) {
          console.error(`Agent ${agentConfig.name} failed:`, error.message);
          results.set(agentConfig.name, { error: error.message, status: 'failed' });
        }
      }
    }

    return results;
  }

  async executeAgent(agentConfig, task) {
    const agent = this.agents.get(agentConfig.name);
    if (!agent) {
      throw new Error(`Agent not found: ${agentConfig.name}`);
    }

    // Prepare context with dependencies
    const context = this.prepareContext(agentConfig, task);
    
    // Execute with timeout and retry
    return await this.executeWithRetry(() => agent.analyze(context), this.config);
  }

  prepareContext(agentConfig, task) {
    const context = { ...task.context };
    
    // Add results from dependencies
    if (agentConfig.dependsOn) {
      agentConfig.dependsOn.forEach(dependency => {
        const dependencyResult = task.results.get(dependency);
        if (dependencyResult) {
          context[dependency] = dependencyResult;
        }
      });
    }

    return context;
  }

  async executeWithRetry(executionFn, config) {
    let lastError;
    
    for (let attempt = 1; attempt <= config.retryAttempts; attempt++) {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Execution timeout')), config.timeout);
        });
        
        return await Promise.race([executionFn(), timeoutPromise]);
      } catch (error) {
        lastError = error;
        if (attempt < config.retryAttempts) {
          console.log(`Retrying execution (attempt ${attempt + 1})...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    throw lastError;
  }

  aggregateResults(results) {
    const aggregated = {
      timestamp: new Date().toISOString(),
      agents: {},
      summary: {
        total: results.size,
        completed: 0,
        failed: 0,
        successRate: 0
      },
      insights: [],
      conflicts: [],
      recommendations: []
    };

    results.forEach((result, agentName) => {
      aggregated.agents[agentName] = result;
      
      if (result.status === 'completed') {
        aggregated.summary.completed++;
      } else {
        aggregated.summary.failed++;
      }
    });

    aggregated.summary.successRate = aggregated.summary.total > 0 
      ? (aggregated.summary.completed / aggregated.summary.total) * 100 
      : 0;

    // Generate insights from agent results
    aggregated.insights = this.generateInsights(results);
    
    // Detect conflicts between agents
    aggregated.conflicts = this.detectConflicts(results);
    
    // Generate consolidated recommendations
    aggregated.recommendations = this.generateConsolidatedRecommendations(results);

    return aggregated;
  }

  generateInsights(results) {
    const insights = [];
    
    results.forEach((result, agentName) => {
      if (result.status === 'completed' && result.result) {
        // Extract insights from different agent types
        if (agentName.includes('nutrition')) {
          const nutrition = result.result.nutrition;
          if (nutrition && nutrition.perServing) {
            insights.push({
              type: 'nutrition',
              message: `Recipe has ${nutrition.perServing.calories} calories per serving`,
              agent: agentName
            });
          }
        }
        
        if (agentName.includes('security')) {
          const vulnerabilities = result.result.vulnerabilities || [];
          if (vulnerabilities.length > 0) {
            insights.push({
              type: 'security',
              message: `Found ${vulnerabilities.length} security vulnerabilities`,
              agent: agentName
            });
          }
        }
        
        if (agentName.includes('validation')) {
          const score = result.result.score;
          if (score) {
            insights.push({
              type: 'validation',
              message: `Recipe validation score: ${score}/100`,
              agent: agentName
            });
          }
        }
      }
    });

    return insights;
  }

  detectConflicts(results) {
    const conflicts = [];
    
    // Example: Nutrition vs Validation conflicts
    const nutritionResult = results.get('nutrition-analyst');
    const validationResult = results.get('recipe-validator');
    
    if (nutritionResult && validationResult && 
        nutritionResult.status === 'completed' && 
        validationResult.status === 'completed') {
      
      const nutritionScore = nutritionResult.result.healthAssessment?.score || 50;
      const validationScore = validationResult.result.score || 50;
      
      if (Math.abs(nutritionScore - validationScore) > 30) {
        conflicts.push({
          type: 'score_discrepancy',
          message: 'Significant difference between nutrition and validation scores',
          agents: ['nutrition-analyst', 'recipe-validator'],
          details: {
            nutritionScore,
            validationScore
          }
        });
      }
    }

    return conflicts;
  }

  generateConsolidatedRecommendations(results) {
    const allRecommendations = [];
    
    results.forEach((result, agentName) => {
      if (result.status === 'completed' && result.result) {
        const recommendations = result.result.recommendations || [];
        recommendations.forEach(rec => {
          allRecommendations.push({
            ...rec,
            sourceAgent: agentName
          });
        });
      }
    });

    // Group by priority and category
    const grouped = allRecommendations.reduce((acc, rec) => {
      const key = `${rec.priority}-${rec.category}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(rec);
      return acc;
    }, {});

    // Create consolidated recommendations
    const consolidated = [];
    Object.entries(grouped).forEach(([key, recommendations]) => {
      const [priority, category] = key.split('-');
      const uniqueMessages = [...new Set(recommendations.map(r => r.message))];
      
      if (uniqueMessages.length > 1) {
        consolidated.push({
          priority,
          category,
          message: `${uniqueMessages.length} ${category} recommendations from multiple agents`,
          actions: uniqueMessages,
          sourceAgents: recommendations.map(r => r.sourceAgent)
        });
      } else {
        consolidated.push(recommendations[0]);
      }
    });

    return consolidated.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  generateTaskId() {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getTaskStatus(taskId) {
    return this.activeTasks.get(taskId);
  }

  getTaskResult(taskId) {
    return this.results.get(taskId);
  }

  getAllResults() {
    return Object.fromEntries(this.results);
  }
}

module.exports = AgentCoordinator;
```

**Example Usage:**
```javascript
// .claude/agents/example-coordination.js
const AgentCoordinator = require('./agent-coordinator');
const NutritionAnalystAgent = require('./nutrition-analyst');
const SecurityAuditorAgent = require('./security-auditor');

// Create coordinator
const coordinator = new AgentCoordinator({
  maxConcurrentTasks: 3,
  timeout: 30000,
  retryAttempts: 2
});

// Register agents
coordinator.registerAgent('nutrition-analyst', new NutritionAnalystAgent());
coordinator.registerAgent('security-auditor', new SecurityAuditorAgent());

// Example recipe for analysis
const testRecipe = {
  id: 'chocolate-chip-cookies',
  title: 'Chocolate Chip Cookies',
  servings: 24,
  ingredients: [
    { quantity: 2.25, unit: 'cup', name: 'flour' },
    { quantity: 1, unit: 'cup', name: 'butter' },
    { quantity: 0.75, unit: 'cup', name: 'sugar' },
    { quantity: 0.75, unit: 'cup', name: 'brown sugar' },
    { quantity: 2, unit: 'large', name: 'eggs' },
    { quantity: 2, unit: 'cup', name: 'chocolate chips' }
  ],
  instructions: 'Mix ingredients, bake at 350°F for 10-12 minutes.',
  prep_time: 15,
  cook_time: 12
};

// Example code for security audit
const testCode = `
const express = require('express');
const app = express();

app.get('/recipes/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM recipes WHERE id = ' + id, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/recipes', (req, res) => {
  const recipe = req.body;
  db.query('INSERT INTO recipes SET ?', recipe, (err, result) => {
    if (err) throw err;
    res.send('Recipe created');
  });
});
`;

// Run coordinated analysis
async function runCoordinatedAnalysis() {
  try {
    console.log('🚀 Starting multi-agent analysis...\n');
    
    const result = await coordinator.coordinateTask('comprehensive-recipe-analysis', [
      { name: 'nutrition-analyst', data: testRecipe },
      { name: 'security-auditor', data: testCode, dependsOn: ['nutrition-analyst'] }
    ], {
      recipe: testRecipe,
      code: testCode,
      analysisType: 'comprehensive'
    });

    console.log('\n📊 Analysis Results:');
    console.log('='.repeat(50));
    console.log(`Total Agents: ${result.summary.total}`);
    console.log(`Completed: ${result.summary.completed}`);
    console.log(`Failed: ${result.summary.failed}`);
    console.log(`Success Rate: ${result.summary.successRate.toFixed(1)}%`);
    
    if (result.insights.length > 0) {
      console.log('\n💡 Insights:');
      result.insights.forEach(insight => {
        console.log(`   [${insight.type}] ${insight.message} (${insight.agent})`);
      });
    }

    if (result.conflicts.length > 0) {
      console.log('\n⚠️  Conflicts:');
      result.conflicts.forEach(conflict => {
        console.log(`   ${conflict.message}`);
      });
    }

    if (result.recommendations.length > 0) {
      console.log('\n🎯 Recommendations:');
      result.recommendations.forEach(rec => {
        console.log(`   [${rec.priority.toUpperCase()}] ${rec.message}`);
      });
    }

    console.log('\n' + '='.repeat(50));

  } catch (error) {
    console.error('Analysis failed:', error.message);
  }
}

// Run the analysis
runCoordinatedAnalysis();
```

## Key Takeaways

### 1. Agent Design Principles
- Define clear roles and responsibilities
- Use comprehensive system prompts
- Implement proper error handling
- Provide structured output formats
- Include domain-specific expertise

### 2. Multi-agent Coordination
- Use dependency management for complex workflows
- Implement parallel and sequential execution
- Handle conflicts between agent results
- Aggregate results intelligently
- Provide consolidated recommendations

### 3. Performance Considerations
- Implement timeout and retry mechanisms
- Use asynchronous execution for scalability
- Cache expensive operations
- Monitor agent performance
- Optimize communication overhead

### 4. Real-world Applications
- Nutrition analysis for recipe platforms
- Security auditing for web applications
- Recipe validation and quality assessment
- Multi-faceted analysis for complex systems
- Automated decision support systems

These solutions provide a comprehensive foundation for building specialized sub-agents and coordinating them for complex analysis tasks.