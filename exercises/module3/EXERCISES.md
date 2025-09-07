# Module 3: Enhanced Control - Output Formats - Exercises

## Exercise 1: Basic Output Configuration

### Objective
Set up and configure basic output formatting for the recipe project.

### Tasks

**1. Create configuration directory structure**
```
"Create the .claude directory and basic settings structure for the recipe project"
```

**Steps:**
- Create `.claude/` directory in recipe project root
- Create `settings.json` file
- Set up basic output configuration

**Expected structure:**
```
recipe-project/
├── .claude/
│   └── settings.json
└── ... (existing files)
```

**2. Configure basic output settings**
```
"Add basic output configuration with structured text format, colors, and timestamps"
```

**Configuration to implement:**
```json
{
  "output": {
    "format": "structured",
    "style": "compact",
    "colors": true,
    "timestamps": true
  }
}
```

**3. Enable and configure statusline**
```
"Enable the statusline with basic indicators for task progress and file operations"
```

**Configuration to implement:**
```json
{
  "statusline": {
    "enabled": true,
    "position": "bottom",
    "show": ["task", "progress", "files"]
  }
}
```

### Testing the Configuration
1. Start Claude Code in the recipe project
2. Verify output formatting is applied
3. Check statusline functionality
4. Experiment with different settings

## Exercise 2: Custom Recipe Output Formats

### Objective
Create custom output formats specifically for recipe data and analysis.

### Tasks

**1. Recipe analysis output format**
```
"Create a custom output format for recipe analysis that includes nutrition information, ingredient lists, and validation results"
```

**Requirements:**
- Show recipe基本信息 (title, category, cooking time)
- Display nutrition facts in a readable format
- List ingredients with quantities and units
- Show validation status and any issues
- Use color coding for different types of information

**Example output structure:**
```
🍳 Recipe Analysis: Chocolate Chip Cookies

   Basic Info:
   ┌─────────────────────────────────────┐
   │ Category: Dessert                   │
   │ Prep Time: 15 min                   │
   │ Cook Time: 10 min                   │
   │ Servings: 24                        │
   └─────────────────────────────────────┘

   Nutrition Facts (per serving):
   ┌─────────────────────────────────────┐
   │ Calories: 78 kcal                   │
   │ Protein: 0.9g                      │
   │ Carbs: 11g                         │
   │ Fat: 3.8g                          │
   └─────────────────────────────────────┘

   Ingredients:
   ┌─────────────────────────────────────┐
   │ • 2.25 cups all-purpose flour      │
   │ • 1 tsp baking soda                │
   │ • 1 cup butter                      │
   │ • 2 cups chocolate chips           │
   └─────────────────────────────────────┘

   Validation: ✅ All checks passed
```

**2. Validation results formatter**
```
"Create a formatted output for validation results that clearly categorizes errors, warnings, and suggestions"
```

**Requirements:**
- Separate sections for errors, warnings, and suggestions
- Color coding for severity levels
- Clear, actionable messages
- File and line number references
- Summary statistics

**3. Ingredient analysis output**
```
"Design an output format for ingredient analysis that shows unit conversions, allergen warnings, and cost estimates"
```

**Requirements:**
- Display ingredient information in a structured format
- Show unit conversion options
- Highlight potential allergens
- Provide cost estimates when available
- Group ingredients by category

## Exercise 3: Statusline Customization

### Objective
Customize the statusline for recipe development workflow.

### Tasks

**1. Recipe development indicators**
```
"Add custom status indicators for recipe-specific tasks and development stages"
```

**Custom indicators to implement:**
- 🍳 Recipe creation/editing
- 🔍 Ingredient analysis
- 📊 Nutrition calculation
- ✅ Validation
- ⚠️ Warnings
- ❌ Errors
- 💾 Saving
- 🚀 Deployment

**2. Progress tracking for recipe development**
```
"Configure statusline to track progress through recipe development stages"
```

**Progress stages to track:**
- Recipe basic info (title, description)
- Ingredient list completion
- Instructions writing
- Nutrition calculation
- Validation checks
- Final review

**3. Real-time error monitoring**
```
"Set up statusline error monitoring for common recipe development issues"
```

**Monitoring to implement:**
- Missing required fields
- Invalid ingredient quantities
- Nutrition calculation errors
- Validation failures
- Save/commit issues

## Exercise 4: Advanced Output Features

### Objective
Implement advanced output features for better user experience.

### Tasks

**1. Conditional formatting based on data**
```
"Create conditional formatting rules that change output based on recipe data"
```

**Conditional rules to implement:**
- Color code based on recipe health score
- Highlight allergens in red
- Show warnings for high-calorie recipes
- Format cooking time indicators (quick vs. long recipes)

**2. Interactive output elements**
```
"Add interactive elements to output for better user engagement"
```

**Interactive features:**
- Expandable sections
- Quick actions (fix, validate, export)
- Progress bars for long operations
- Toggle details visibility

**3. Export functionality**
```
"Add export capabilities for formatted output to different formats"
```

**Export formats to support:**
- JSON (structured data)
- Markdown (documentation)
- PDF (printable format)
- CSV (spreadsheet compatible)

## Exercise 5: Performance Optimization

### Objective
Optimize output formatting for performance and user experience.

### Tasks

**1. Lazy loading of complex formatting**
```
"Implement lazy loading for complex output formatting to improve performance"
```

**Optimizations to implement:**
- Delay expensive formatting operations
- Cache formatting results
- Progressive disclosure of information
- Debounce rapid updates

**2. Responsive output design**
```
"Create responsive output that adapts to different terminal sizes and display capabilities"
```

**Responsive features:**
- Adaptive layout for different screen sizes
- Fallback for colorless terminals
- Simplified output for mobile devices
- Graceful degradation

**3. Memory usage optimization**
```
"Optimize memory usage for output formatting operations"
```

**Memory optimizations:**
- Reuse formatting templates
- Clean up temporary objects
- Limit history retention
- Optimize string operations

## Exercise Solutions

After completing the exercises, compare your solutions with the provided solutions in `solutions/module3/`.

### Success Criteria
- Configuration files are properly structured
- Output formats are visually appealing and informative
- Statusline provides useful real-time feedback
- Custom formats work correctly with recipe data
- Performance is acceptable for large datasets

### Common Issues and Solutions

**Issue: Configuration not being applied**
**Solution**: Check file paths and JSON syntax

**Issue: Statusline not displaying**
**Solution**: Verify terminal compatibility and settings

**Issue: Performance problems with complex formatting**
**Solution**: Implement lazy loading and caching

**Issue: Colors not displaying correctly**
**Solution**: Check terminal color support and configuration

## Next Steps

After completing these exercises, you should be comfortable with:
- Configuring Claude Code output formats
- Creating custom output styles
- Setting up and customizing statusline
- Implementing advanced output features
- Optimizing output performance

Proceed to Module 4 to learn about slash commands and reusable patterns.