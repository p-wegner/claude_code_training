# Module 3: Exercise Solutions

## Exercise 1: Basic Output Configuration

### Solution: Basic Settings Configuration

**File structure:**
```
recipe-project/
├── .claude/
│   └── settings.json
└── ... (existing files)
```

**settings.json:**
```json
{
  "output": {
    "format": "structured",
    "style": "compact",
    "colors": true,
    "timestamps": true,
    "progress": true,
    "sections": {
      "file_operations": {
        "show_path": true,
        "show_size": true,
        "show_modified": true
      },
      "code_analysis": {
        "show_complexity": true,
        "show_issues": true,
        "show_suggestions": true
      }
    }
  },
  "statusline": {
    "enabled": true,
    "position": "bottom",
    "show": ["task", "progress", "files", "errors"],
    "refresh_rate": 1000,
    "theme": "default",
    "indicators": {
      "working": "⚡",
      "complete": "✅",
      "error": "❌",
      "warning": "⚠️"
    }
  }
}
```

## Exercise 2: Custom Recipe Output Formats

### Solution: Recipe-Specific Configuration

**Enhanced settings.json:**
```json
{
  "output": {
    "format": "structured",
    "style": "recipe-themed",
    "colors": true,
    "timestamps": true,
    "progress": true,
    "theme": {
      "primary": "#8B4513",
      "secondary": "#D2691E",
      "success": "#4CAF50",
      "error": "#f44336",
      "warning": "#ff9800",
      "info": "#2196F3"
    },
    "sections": {
      "recipe_analysis": {
        "enabled": true,
        "show_basic_info": true,
        "show_nutrition": true,
        "show_ingredients": true,
        "show_validation": true,
        "format": "card",
        "icons": {
          "recipe": "🍳",
          "nutrition": "📊",
          "ingredients": "🥘",
          "validation": "✅"
        }
      },
      "validation_results": {
        "enabled": true,
        "show_errors": true,
        "show_warnings": true,
        "show_suggestions": true,
        "group_by_severity": true,
        "max_items_per_section": 10
      },
      "ingredient_analysis": {
        "enabled": true,
        "show_unit_conversions": true,
        "show_allergens": true,
        "show_cost_estimates": true,
        "group_by_category": true
      }
    }
  },
  "statusline": {
    "enabled": true,
    "position": "bottom",
    "show": ["task", "progress", "files", "errors", "nutrition"],
    "refresh_rate": 1000,
    "theme": "culinary",
    "custom_indicators": {
      "analyzing": "🔍",
      "cooking": "🍳",
      "validating": "✅",
      "calculating": "📊",
      "saving": "💾",
      "exporting": "📤",
      "error": "❌",
      "warning": "⚠️",
      "success": "✨"
    },
    "progress_formats": {
      "recipe_creation": ["Basic Info", "Ingredients", "Instructions", "Nutrition", "Validation"],
      "batch_processing": ["Reading", "Analyzing", "Processing", "Saving"]
    }
  }
}
```

### Solution: Custom Output Formatter Implementation

**Create a custom output formatter:**
```javascript
// .claude/output-formatters/recipe-formatter.js
class RecipeFormatter {
  constructor(config) {
    this.config = config;
    this.colors = config.theme || {};
  }

  formatRecipeAnalysis(recipe) {
    const output = [];
    
    // Header
    output.push(`🍳 Recipe Analysis: ${recipe.title}`);
    output.push('');
    
    // Basic Info
    output.push('   Basic Info:');
    output.push('   ┌─────────────────────────────────────┐');
    output.push(`   │ Category: ${recipe.category || 'Uncategorized'.padEnd(25)} │`);
    output.push(`   │ Prep Time: ${this.formatTime(recipe.prep_time).padEnd(20)} │`);
    output.push(`   │ Cook Time: ${this.formatTime(recipe.cook_time).padEnd(19)} │`);
    output.push(`   │ Servings: ${recipe.servings.toString().padEnd(23)} │`);
    output.push('   └─────────────────────────────────────┘');
    output.push('');
    
    // Nutrition Facts
    if (recipe.nutrition) {
      output.push('   Nutrition Facts (per serving):');
      output.push('   ┌─────────────────────────────────────┐');
      output.push(`   │ Calories: ${recipe.nutrition.calories.toString().padEnd(20)} kcal │`);
      output.push(`   │ Protein: ${recipe.nutrition.protein.toString().padEnd(22)}g │`);
      output.push(`   │ Carbs: ${recipe.nutrition.carbs.toString().padEnd(24)}g │`);
      output.push(`   │ Fat: ${recipe.nutrition.fat.toString().padEnd(26)}g │`);
      output.push('   └─────────────────────────────────────┘');
      output.push('');
    }
    
    // Ingredients
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      output.push('   Ingredients:');
      output.push('   ┌─────────────────────────────────────┐');
      
      recipe.ingredients.forEach(ingredient => {
        const line = `   │ • ${ingredient.quantity.toString().padEnd(5)} ${ingredient.unit.padEnd(8)} ${ingredient.name.padEnd(20)} │`;
        output.push(line.substring(0, 39) + ' │'); // Truncate to fit
      });
      
      output.push('   └─────────────────────────────────────┘');
      output.push('');
    }
    
    // Validation Status
    const validationStatus = this.getValidationStatus(recipe);
    output.push(`   Validation: ${validationStatus.icon} ${validationStatus.message}`);
    
    return output.join('\n');
  }

  formatValidationResults(validation) {
    const output = [];
    
    if (validation.errors && validation.errors.length > 0) {
      output.push('❌ Errors:');
      validation.errors.forEach(error => {
        output.push(`   • ${error.message}`);
        if (error.file) {
          output.push(`     File: ${error.file}:${error.line || '?'}`);
        }
      });
      output.push('');
    }
    
    if (validation.warnings && validation.warnings.length > 0) {
      output.push('⚠️  Warnings:');
      validation.warnings.forEach(warning => {
        output.push(`   • ${warning.message}`);
      });
      output.push('');
    }
    
    if (validation.suggestions && validation.suggestions.length > 0) {
      output.push('💡 Suggestions:');
      validation.suggestions.forEach(suggestion => {
        output.push(`   • ${suggestion.message}`);
      });
    }
    
    return output.join('\n');
  }

  formatIngredientAnalysis(ingredients) {
    const output = [];
    
    // Group by category
    const categories = this.groupIngredientsByCategory(ingredients);
    
    Object.entries(categories).forEach(([category, items]) => {
      output.push(`${this.getCategoryIcon(category)} ${category}:`);
      items.forEach(ingredient => {
        const allergenWarning = ingredient.isAllergen ? ' ⚠️' : '';
        output.push(`   • ${ingredient.quantity} ${ingredient.unit} ${ingredient.name}${allergenWarning}`);
        
        // Unit conversions
        if (ingredient.conversions && ingredient.conversions.length > 0) {
          const conversions = ingredient.conversions
            .map(conv => `${conv.quantity} ${conv.unit}`)
            .join(', ');
          output.push(`     Conversions: ${conversions}`);
        }
      });
      output.push('');
    });
    
    return output.join('\n');
  }

  // Helper methods
  formatTime(minutes) {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  getValidationStatus(recipe) {
    // Simple validation logic
    const hasRequiredFields = recipe.title && recipe.instructions;
    const hasIngredients = recipe.ingredients && recipe.ingredients.length > 0;
    
    if (hasRequiredFields && hasIngredients) {
      return { icon: '✅', message: 'All checks passed' };
    } else if (hasRequiredFields) {
      return { icon: '⚠️', message: 'Missing ingredients' };
    } else {
      return { icon: '❌', message: 'Missing required fields' };
    }
  }

  groupIngredientsByCategory(ingredients) {
    const categories = {
      'Dry Ingredients': [],
      'Liquid Ingredients': [],
      'Produce': [],
      'Dairy': [],
      'Spices': [],
      'Other': []
    };
    
    ingredients.forEach(ingredient => {
      const category = this.categorizeIngredient(ingredient.name);
      categories[category].push(ingredient);
    });
    
    return categories;
  }

  categorizeIngredient(name) {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('flour') || nameLower.includes('sugar') || nameLower.includes('salt')) {
      return 'Dry Ingredients';
    } else if (nameLower.includes('oil') || nameLower.includes('water') || nameLower.includes('milk')) {
      return 'Liquid Ingredients';
    } else if (nameLower.includes('onion') || nameLower.includes('garlic') || nameLower.includes('tomato')) {
      return 'Produce';
    } else if (nameLower.includes('cheese') || nameLower.includes('butter') || nameLower.includes('yogurt')) {
      return 'Dairy';
    } else if (nameLower.includes('spice') || nameLower.includes('herb') || nameLower.includes('pepper')) {
      return 'Spices';
    } else {
      return 'Other';
    }
  }

  getCategoryIcon(category) {
    const icons = {
      'Dry Ingredients': '🥄',
      'Liquid Ingredients': '💧',
      'Produce': '🥬',
      'Dairy': '🥛',
      'Spices': '🌶️',
      'Other': '📦'
    };
    return icons[category] || '📦';
  }
}

module.exports = RecipeFormatter;
```

## Exercise 3: Statusline Customization

### Solution: Enhanced Statusline Configuration

**Custom statusline configuration:**
```json
{
  "statusline": {
    "enabled": true,
    "position": "bottom",
    "height": 2,
    "refresh_rate": 500,
    "theme": "culinary",
    "sections": [
      {
        "type": "task",
        "format": "{icon} {name}",
        "width": 30,
        "align": "left"
      },
      {
        "type": "progress",
        "format": "[{bar}] {percentage}%",
        "width": 20,
        "align": "center"
      },
      {
        "type": "files",
        "format": "📁 {modified}/{total}",
        "width": 15,
        "align": "center"
      },
      {
        "type": "errors",
        "format": "{icon} {count}",
        "width": 10,
        "align": "center"
      },
      {
        "type": "nutrition",
        "format": "📊 {calories}kcal",
        "width": 12,
        "align": "right"
      },
      {
        "type": "time",
        "format": "{time}",
        "width": 10,
        "align": "right"
      }
    ],
    "indicators": {
      "task_types": {
        "recipe_creation": { "icon": "🍳", "color": "#8B4513" },
        "ingredient_analysis": { "icon": "🔍", "color": "#2196F3" },
        "nutrition_calculation": { "icon": "📊", "color": "#4CAF50" },
        "validation": { "icon": "✅", "color": "#FF9800" },
        "export": { "icon": "📤", "color": "#9C27B0" },
        "error": { "icon": "❌", "color": "#f44336" },
        "warning": { "icon": "⚠️", "color": "#ff9800" },
        "success": { "icon": "✨", "color": "#4CAF50" }
      },
      "progress": {
        "complete": "█",
        "incomplete": "░",
        "colors": {
          "0-25": "#f44336",
          "26-50": "#ff9800",
          "51-75": "#ffeb3b",
          "76-100": "#4CAF50"
        }
      }
    },
    "workflows": {
      "recipe_development": {
        "stages": [
          { "name": "Basic Info", "weight": 20 },
          { "name": "Ingredients", "weight": 25 },
          { "name": "Instructions", "weight": 30 },
          { "name": "Nutrition", "weight": 15 },
          { "name": "Validation", "weight": 10 }
        ],
        "status_mapping": {
          "Basic Info": "recipe_creation",
          "Ingredients": "ingredient_analysis",
          "Instructions": "recipe_creation",
          "Nutrition": "nutrition_calculation",
          "Validation": "validation"
        }
      }
    }
  }
}
```

## Exercise 4: Advanced Output Features

### Solution: Conditional Formatting and Interactive Elements

**Conditional formatting configuration:**
```json
{
  "conditional_formatting": {
    "rules": [
      {
        "name": "health_score_coloring",
        "condition": "recipe.nutrition && recipe.nutrition.health_score",
        "format": {
          "type": "color",
          "field": "title",
          "colors": {
            "0-40": "#f44336",
            "41-70": "#ff9800",
            "71-85": "#ffeb3b",
            "86-100": "#4CAF50"
          }
        }
      },
      {
        "name": "allergen_highlighting",
        "condition": "ingredient.isAllergen",
        "format": {
          "type": "background_color",
          "field": "name",
          "color": "#ffebee"
        }
      },
      {
        "name": "cooking_time_indicator",
        "condition": "recipe.prep_time + recipe.cook_time",
        "format": {
          "type": "icon",
          "field": "title",
          "icons": {
            "0-15": "⚡",
            "16-30": "⏱️",
            "31-60": "🕐",
            "61+": "🕰️"
          }
        }
      }
    ]
  },
  "interactive_elements": {
    "expandable_sections": true,
    "quick_actions": [
      {
        "name": "fix_recipe",
        "icon": "🔧",
        "action": "fix_validation_issues",
        "condition": "validation.errors.length > 0"
      },
      {
        "name": "validate",
        "icon": "✅",
        "action": "run_validation",
        "always_show": true
      },
      {
        "name": "export",
        "icon": "📤",
        "action": "export_recipe",
        "always_show": true
      }
    ],
    "progress_bars": {
      "enabled": true,
      "style": "culinary",
      "animations": true
    }
  }
}
```

## Exercise 5: Performance Optimization

### Solution: Performance Optimizations

**Optimized configuration:**
```json
{
  "performance": {
    "lazy_loading": {
      "enabled": true,
      "threshold": 1000, // ms
      "sections": [
        "nutrition_facts",
        "ingredient_analysis",
        "validation_details"
      ]
    },
    "caching": {
      "enabled": true,
      "ttl": 300000, // 5 minutes
      "strategies": {
        "recipe_analysis": "memory",
        "validation_results": "memory",
        "ingredient_data": "disk"
      }
    },
    "debouncing": {
      "enabled": true,
      "delay": 250, // ms
      "operations": [
        "format_recipe",
        "update_statusline",
        "validate_recipe"
      ]
    },
    "memory_management": {
      "max_cache_size": 100,
      "cleanup_interval": 60000, // 1 minute
      "aggressive_cleanup": false
    }
  },
  "responsive_design": {
    "breakpoints": {
      "small": 80,
      "medium": 120,
      "large": 160
    },
    "layouts": {
      "small": {
        "sections": ["task", "progress"],
        "compact": true
      },
      "medium": {
        "sections": ["task", "progress", "files"],
        "compact": false
      },
      "large": {
        "sections": ["task", "progress", "files", "errors", "nutrition"],
        "compact": false
      }
    }
  }
}
```

## Key Takeaways

### 1. Configuration Best Practices
- Use hierarchical configuration structure
- Separate concerns (output, statusline, performance)
- Provide sensible defaults
- Make configuration extensible

### 2. Custom Formatting
- Create domain-specific formatters
- Use visual elements (icons, colors, tables)
- Implement conditional formatting
- Support interactive elements

### 3. Performance Considerations
- Implement lazy loading for expensive operations
- Use caching strategically
- Debounce rapid updates
- Optimize for common use cases

### 4. User Experience
- Provide clear visual feedback
- Use consistent theming
- Support different screen sizes
- Make output actionable

### 5. Maintainability
- Document configuration options
- Provide examples and templates
- Support backward compatibility
- Make debugging easier

## Next Steps

After implementing these solutions, you should have:
- A well-configured output formatting system
- Custom formatters for recipe data
- An informative and interactive statusline
- Optimized performance for large datasets
- A foundation for further customization

Proceed to Module 4 to learn about slash commands and reusable patterns.