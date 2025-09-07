# Module 6: Hooks - Exercise Solutions

## Exercise 1: Basic Hook Setup

### Solution 1: Hook Configuration File

**File Structure:**
```
.claude/
├── hooks.json
├── hooks/
│   ├── pre-commit.js
│   ├── post-write.js
│   └── utils.js
└── hook-examples/
    ├── recipe-validation-hooks.json
    └── development-hooks.json
```

**hooks.json (Main Configuration):**
```json
{
  "version": "1.0",
  "hooks": {
    "pre-write": {
      "match": "**/*.{js,json,md}",
      "run": [
        "node .claude/hooks/pre-commit.js lint",
        "node .claude/hooks/pre-commit.js validate"
      ],
      "condition": "file_changed && file_size < 1000000",
      "timeout": 10000,
      "parallel": false,
      "on_error": "warn"
    },
    "post-write": {
      "match": "**/*.{js,ts}",
      "run": [
        "npm run test",
        "node .claude/hooks/post-write.js analyze"
      ],
      "condition": "file_changed && !file_name.includes('test')",
      "timeout": 30000,
      "parallel": true,
      "on_error": "fail"
    },
    "pre-bash": {
      "match": "npm *",
      "run": "node .claude/hooks/utils.js check-deps",
      "condition": "command.includes('npm')",
      "timeout": 5000,
      "on_error": "warn"
    }
  },
  "environments": {
    "development": {
      "NODE_ENV": "development",
      "HOOK_DEBUG": "true"
    },
    "production": {
      "NODE_ENV": "production",
      "HOOK_DEBUG": "false"
    }
  },
  "settings": {
    "max_concurrent_hooks": 3,
    "default_timeout": 15000,
    "log_level": "info",
    "enable_metrics": true
  }
}
```

**pre-commit.js:**
```javascript
const fs = require('fs');
const path = require('path');

class PreCommitHooks {
  constructor(config = {}) {
    this.config = config;
    this.results = [];
  }

  async lint(filePath) {
    console.log(`🔍 Linting: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const issues = this.detectLintIssues(content, filePath);
      
      this.results.push({
        type: 'lint',
        file: filePath,
        issues: issues.length,
        passed: issues.length === 0,
        details: issues
      });

      if (issues.length > 0) {
        console.log(`❌ Found ${issues.length} linting issues in ${filePath}`);
        issues.forEach(issue => {
          console.log(`   Line ${issue.line}: ${issue.message}`);
        });
      } else {
        console.log(`✅ No linting issues found in ${filePath}`);
      }

      return issues.length === 0;
    } catch (error) {
      console.error(`❌ Linting failed for ${filePath}:`, error.message);
      return false;
    }
  }

  async validate(filePath) {
    console.log(`✅ Validating: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const validation = this.validateFile(content, filePath);
      
      this.results.push({
        type: 'validation',
        file: filePath,
        passed: validation.valid,
        details: validation.issues
      });

      if (validation.valid) {
        console.log(`✅ Validation passed for ${filePath}`);
      } else {
        console.log(`❌ Validation failed for ${filePath}`);
        validation.issues.forEach(issue => {
          console.log(`   ${issue.message}`);
        });
      }

      return validation.valid;
    } catch (error) {
      console.error(`❌ Validation failed for ${filePath}:`, error.message);
      return false;
    }
  }

  detectLintIssues(content, filePath) {
    const issues = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check for console.log statements
      if (line.includes('console.log') && !filePath.includes('test')) {
        issues.push({
          line: lineNumber,
          message: 'Remove console.log statements',
          severity: 'warning'
        });
      }

      // Check for trailing whitespace
      if (line !== line.trimEnd() && line.length > 0) {
        issues.push({
          line: lineNumber,
          message: 'Remove trailing whitespace',
          severity: 'warning'
        });
      }

      // Check for proper semicolon usage (basic check)
      if (line.trim().endsWith(',') && !line.trim().endsWith('},')) {
        issues.push({
          line: lineNumber,
          message: 'Use semicolons consistently',
          severity: 'warning'
        });
      }

      // Check for proper quote usage
      const singleQuotes = (line.match(/'/g) || []).length;
      const doubleQuotes = (line.match(/"/g) || []).length;
      
      if (singleQuotes > 0 && doubleQuotes > 0 && !line.includes('mixed quotes allowed')) {
        issues.push({
          line: lineNumber,
          message: 'Use consistent quote style',
          severity: 'warning'
        });
      }
    });

    return issues;
  }

  validateFile(content, filePath) {
    const validation = {
      valid: true,
      issues: []
    };

    // File size validation
    if (content.length > 100000) {
      validation.valid = false;
      validation.issues.push({
        message: 'File size exceeds 100KB limit',
        severity: 'error'
      });
    }

    // JavaScript-specific validation
    if (filePath.endsWith('.js')) {
      const jsValidation = this.validateJavaScript(content);
      validation.valid = validation.valid && jsValidation.valid;
      validation.issues.push(...jsValidation.issues);
    }

    // JSON-specific validation
    if (filePath.endsWith('.json')) {
      const jsonValidation = this.validateJSON(content);
      validation.valid = validation.valid && jsonValidation.valid;
      validation.issues.push(...jsonValidation.issues);
    }

    // Markdown-specific validation
    if (filePath.endsWith('.md')) {
      const mdValidation = this.validateMarkdown(content);
      validation.valid = validation.valid && mdValidation.valid;
      validation.issues.push(...mdValidation.issues);
    }

    return validation;
  }

  validateJavaScript(content) {
    const validation = {
      valid: true,
      issues: []
    };

    try {
      // Basic syntax check
      new Function(content);
      
      // Check for potential issues
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        const lineNumber = index + 1;

        // Check for eval usage
        if (line.includes('eval(')) {
          validation.valid = false;
          validation.issues.push({
            message: `Line ${lineNumber}: Avoid using eval()`,
            severity: 'error'
          });
        }

        // Check for proper error handling
        if (line.includes('.then(') && !line.includes('.catch(') && !line.includes('try')) {
          validation.issues.push({
            message: `Line ${lineNumber}: Promise should have error handling`,
            severity: 'warning'
          });
        }

        // Check for strict mode
        if (lineNumber === 1 && !line.includes('use strict')) {
          validation.issues.push({
            message: 'Consider using "use strict" directive',
            severity: 'info'
          });
        }
      });
    } catch (error) {
      validation.valid = false;
      validation.issues.push({
        message: `JavaScript syntax error: ${error.message}`,
        severity: 'error'
      });
    }

    return validation;
  }

  validateJSON(content) {
    const validation = {
      valid: true,
      issues: []
    };

    try {
      JSON.parse(content);
    } catch (error) {
      validation.valid = false;
      validation.issues.push({
        message: `JSON syntax error: ${error.message}`,
        severity: 'error'
      });
    }

    return validation;
  }

  validateMarkdown(content) {
    const validation = {
      valid: true,
      issues: []
    };

    // Check for proper heading structure
    const lines = content.split('\n');
    let hasHeading = false;

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check for proper heading levels
      if (line.startsWith('#')) {
        hasHeading = true;
        const level = line.match(/^#+/)[0].length;
        if (level > 6) {
          validation.issues.push({
            message: `Line ${lineNumber}: Heading level ${level} is too deep`,
            severity: 'warning'
          });
        }
      }

      // Check for proper list formatting
      if (line.match(/^\s*[\*\+\-]\s/) && !line.match(/^\s*[\*\+\-]\s+\S/)) {
        validation.issues.push({
          message: `Line ${lineNumber}: List item should have content after marker`,
          severity: 'warning'
        });
      }
    });

    if (!hasHeading) {
      validation.issues.push({
        message: 'Markdown file should have at least one heading',
        severity: 'info'
      });
    }

    return validation;
  }

  getResults() {
    return this.results;
  }

  getSummary() {
    const total = this.results.length;
    const passed = this.results.filter(r => r.passed).length;
    const failed = total - passed;

    return {
      total,
      passed,
      failed,
      successRate: total > 0 ? (passed / total) * 100 : 0
    };
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const filePath = args[1];

  if (!command || !filePath) {
    console.log('Usage: node pre-commit.js <command> <file>');
    console.log('Commands: lint, validate');
    process.exit(1);
  }

  const hook = new PreCommitHooks();

  if (command === 'lint') {
    hook.lint(filePath).then(success => {
      process.exit(success ? 0 : 1);
    });
  } else if (command === 'validate') {
    hook.validate(filePath).then(success => {
      process.exit(success ? 0 : 1);
    });
  } else {
    console.log('Unknown command:', command);
    process.exit(1);
  }
}

module.exports = PreCommitHooks;
```

**post-write.js:**
```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PostWriteHooks {
  constructor(config = {}) {
    this.config = config;
    this.results = [];
  }

  async analyze(filePath) {
    console.log(`📊 Analyzing: ${filePath}`);
    
    try {
      const analysis = await this.performAnalysis(filePath);
      
      this.results.push({
        type: 'analysis',
        file: filePath,
        analysis: analysis
      });

      console.log(`✅ Analysis complete for ${filePath}`);
      this.printAnalysis(analysis);

      return true;
    } catch (error) {
      console.error(`❌ Analysis failed for ${filePath}:`, error.message);
      return false;
    }
  }

  async performAnalysis(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const stats = fs.statSync(filePath);
    
    const analysis = {
      file: filePath,
      size: stats.size,
      lines: content.split('\n').length,
      characters: content.length,
      complexity: this.calculateComplexity(content),
      dependencies: this.findDependencies(content),
      potentialIssues: this.findPotentialIssues(content),
      suggestions: this.generateSuggestions(content, filePath)
    };

    return analysis;
  }

  calculateComplexity(content) {
    let complexity = 1; // Base complexity
    const lines = content.split('\n');

    lines.forEach(line => {
      // Increase complexity for control structures
      if (line.match(/\b(if|else|for|while|switch|case)\b/)) {
        complexity += 1;
      }
      
      // Increase complexity for nested structures
      if (line.match(/\b(function|=>)\b/)) {
        complexity += 2;
      }
      
      // Increase complexity for try-catch
      if (line.match(/\b(try|catch)\b/)) {
        complexity += 1;
      }
    });

    return complexity;
  }

  findDependencies(content) {
    const dependencies = [];
    const lines = content.split('\n');

    lines.forEach(line => {
      // Find require statements
      const requireMatch = line.match(/require\(['"`]([^'"`]+)['"`]\)/);
      if (requireMatch) {
        dependencies.push({
          type: 'require',
          module: requireMatch[1],
          line: line.trim()
        });
      }

      // Find import statements
      const importMatch = line.match(/import\s+.*\s+from\s+['"`]([^'"`]+)['"`]/);
      if (importMatch) {
        dependencies.push({
          type: 'import',
          module: importMatch[1],
          line: line.trim()
        });
      }
    });

    return dependencies;
  }

  findPotentialIssues(content) {
    const issues = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check for long lines
      if (line.length > 120) {
        issues.push({
          type: 'long_line',
          line: lineNumber,
          message: 'Line exceeds 120 characters',
          severity: 'warning'
        });
      }

      // Check for deeply nested code
      const indentLevel = line.length - line.trimLeft().length;
      if (indentLevel > 16) {
        issues.push({
          type: 'deep_nesting',
          line: lineNumber,
          message: 'Code is deeply nested (consider refactoring)',
          severity: 'warning'
        });
      }

      // Check for magic numbers
      const magicNumberMatch = line.match(/\b\d{4,}\b/);
      if (magicNumberMatch && !line.includes('port') && !line.includes('timeout')) {
        issues.push({
          type: 'magic_number',
          line: lineNumber,
          message: 'Consider using named constants for magic numbers',
          severity: 'info'
        });
      }

      // Check for TODO comments
      if (line.toLowerCase().includes('todo')) {
        issues.push({
          type: 'todo',
          line: lineNumber,
          message: 'TODO comment found',
          severity: 'info'
        });
      }
    });

    return issues;
  }

  generateSuggestions(content, filePath) {
    const suggestions = [];

    // Suggest testing if no test file exists
    const testName = filePath.replace('.js', '.test.js');
    if (!fs.existsSync(testName) && !filePath.includes('test')) {
      suggestions.push({
        type: 'testing',
        message: 'Consider adding unit tests for this file',
        priority: 'medium'
      });
    }

    // Suggest documentation if no comments
    const commentLines = content.split('\n').filter(line => line.trim().startsWith('//')).length;
    if (commentLines === 0 && content.length > 100) {
      suggestions.push({
        type: 'documentation',
        message: 'Consider adding comments to document the code',
        priority: 'low'
      });
    }

    // Suggest error handling
    const hasTryCatch = content.includes('try') && content.includes('catch');
    const hasAsync = content.includes('async') || content.includes('await');
    if (hasAsync && !hasTryCatch) {
      suggestions.push({
        type: 'error_handling',
        message: 'Consider adding error handling for async operations',
        priority: 'high'
      });
    }

    return suggestions;
  }

  printAnalysis(analysis) {
    console.log('   File Analysis Results:');
    console.log(`   Size: ${analysis.size} bytes`);
    console.log(`   Lines: ${analysis.lines}`);
    console.log(`   Complexity: ${analysis.complexity}`);
    
    if (analysis.dependencies.length > 0) {
      console.log('   Dependencies:');
      analysis.dependencies.forEach(dep => {
        console.log(`     ${dep.type}: ${dep.module}`);
      });
    }

    if (analysis.potentialIssues.length > 0) {
      console.log('   Potential Issues:');
      analysis.potentialIssues.forEach(issue => {
        const icon = issue.severity === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`     ${icon} Line ${issue.line}: ${issue.message}`);
      });
    }

    if (analysis.suggestions.length > 0) {
      console.log('   Suggestions:');
      analysis.suggestions.forEach(suggestion => {
        const icon = suggestion.priority === 'high' ? '🔴' : 
                    suggestion.priority === 'medium' ? '🟡' : '🟢';
        console.log(`     ${icon} ${suggestion.message}`);
      });
    }
  }

  getResults() {
    return this.results;
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const filePath = args[1];

  if (!command || !filePath) {
    console.log('Usage: node post-write.js <command> <file>');
    console.log('Commands: analyze');
    process.exit(1);
  }

  const hook = new PostWriteHooks();

  if (command === 'analyze') {
    hook.analyze(filePath).then(success => {
      process.exit(success ? 0 : 1);
    });
  } else {
    console.log('Unknown command:', command);
    process.exit(1);
  }
}

module.exports = PostWriteHooks;
```

**utils.js:**
```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class HookUtils {
  constructor(config = {}) {
    this.config = config;
  }

  async checkDeps() {
    console.log('🔍 Checking dependencies...');
    
    try {
      const packageJson = this.loadPackageJson();
      const issues = [];
      
      // Check for outdated dependencies
      const outdated = this.checkOutdatedDependencies(packageJson);
      if (outdated.length > 0) {
        issues.push({
          type: 'outdated_deps',
          message: `${outdated.length} outdated dependencies found`,
          details: outdated
        });
      }

      // Check for security vulnerabilities
      const vulnerabilities = this.checkSecurityVulnerabilities();
      if (vulnerabilities.length > 0) {
        issues.push({
          type: 'security',
          message: `${vulnerabilities.length} security vulnerabilities found`,
          details: vulnerabilities
        });
      }

      // Check for unused dependencies
      const unused = this.checkUnusedDependencies(packageJson);
      if (unused.length > 0) {
        issues.push({
          type: 'unused_deps',
          message: `${unused.length} potentially unused dependencies found`,
          details: unused
        });
      }

      if (issues.length > 0) {
        console.log('⚠️  Dependency issues found:');
        issues.forEach(issue => {
          console.log(`   ${issue.message}`);
          if (issue.details && issue.details.length > 0) {
            issue.details.forEach(detail => {
              console.log(`     - ${detail}`);
            });
          }
        });
      } else {
        console.log('✅ No dependency issues found');
      }

      return issues.length === 0;
    } catch (error) {
      console.error('❌ Dependency check failed:', error.message);
      return false;
    }
  }

  loadPackageJson() {
    const packagePath = path.join(process.cwd(), 'package.json');
    
    if (!fs.existsSync(packagePath)) {
      throw new Error('package.json not found');
    }

    const content = fs.readFileSync(packagePath, 'utf8');
    return JSON.parse(content);
  }

  checkOutdatedDependencies(packageJson) {
    const outdated = [];
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };

    Object.entries(dependencies).forEach(([name, version]) => {
      // Simple heuristic for potentially outdated packages
      if (version.startsWith('^0.') || version.startsWith('~0.')) {
        outdated.push(`${name}@${version} (major version 0)`);
      }
      
      // Check for old major versions
      const majorVersion = parseInt(version.replace(/^[\^~]/, ''));
      if (majorVersion > 0 && majorVersion < 2) {
        outdated.push(`${name}@${version} (old major version)`);
      }
    });

    return outdated;
  }

  checkSecurityVulnerabilities() {
    try {
      // Try to run npm audit
      const auditResult = execSync('npm audit --json', { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const audit = JSON.parse(auditResult);
      const vulnerabilities = audit.vulnerabilities || {};
      
      return Object.keys(vulnerabilities).map(name => {
        const vuln = vulnerabilities[name];
        return `${name} (${vuln.severity}): ${vuln.title}`;
      });
    } catch (error) {
      // npm audit failed, return empty array
      return [];
    }
  }

  checkUnusedDependencies(packageJson) {
    const dependencies = Object.keys({
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    });

    const unused = [];
    
    dependencies.forEach(dep => {
      if (!this.isDependencyUsed(dep)) {
        unused.push(dep);
      }
    });

    return unused;
  }

  isDependencyUsed(dependency) {
    // Simple check to see if dependency is used in code
    const jsFiles = this.findJavaScriptFiles();
    
    for (const file of jsFiles) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for require or import
      if (content.includes(`require('${dependency}')`) || 
          content.includes(`require("${dependency}")`) ||
          content.includes(`from '${dependency}'`) ||
          content.includes(`from "${dependency}"`)) {
        return true;
      }
    }
    
    return false;
  }

  findJavaScriptFiles() {
    const files = [];
    
    function searchDirectory(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      items.forEach(item => {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          searchDirectory(fullPath);
        } else if (item.isFile() && item.name.endsWith('.js')) {
          files.push(fullPath);
        }
      });
    }
    
    searchDirectory(process.cwd());
    return files;
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log('Usage: node utils.js <command>');
    console.log('Commands: check-deps');
    process.exit(1);
  }

  const utils = new HookUtils();

  if (command === 'check-deps') {
    utils.checkDeps().then(success => {
      process.exit(success ? 0 : 1);
    });
  } else {
    console.log('Unknown command:', command);
    process.exit(1);
  }
}

module.exports = HookUtils;
```

### Solution 2: Recipe-Specific Hooks

**recipe-validation-hooks.json:**
```json
{
  "version": "1.0",
  "hooks": {
    "pre-save": {
      "match": "**/recipes/*.json",
      "run": [
        "node .claude/hooks/recipe-hooks.js validate-structure",
        "node .claude/hooks/recipe-hooks.js calculate-nutrition",
        "node .claude/hooks/recipe-hooks.js check-allergens"
      ],
      "condition": "file_changed && file_name.endsWith('.json')",
      "timeout": 15000,
      "parallel": true,
      "on_error": "fail"
    },
    "post-save": {
      "match": "**/recipes/*.json",
      "run": [
        "node .claude/hooks/recipe-hooks.js generate-search-index",
        "node .claude/hooks/recipe-hooks.js update-stats"
      ],
      "condition": "file_changed && file_name.endsWith('.json')",
      "timeout": 10000,
      "parallel": false,
      "on_error": "warn"
    },
    "pre-commit": {
      "match": "**/recipes/*.json",
      "run": [
        "node .claude/hooks/recipe-hooks.js validate-nutrition",
        "node .claude/hooks/recipe-hooks.js check-images",
        "node .claude/hooks/recipe-hooks.js test-cooking-time"
      ],
      "condition": "staged_files.includes('recipes/')",
      "timeout": 20000,
      "parallel": true,
      "on_error": "fail"
    }
  },
  "recipe_settings": {
    "max_ingredients": 50,
    "max_cooking_time": 1440,
    "max_calories_per_serving": 2000,
    "required_fields": ["title", "ingredients", "instructions", "servings"],
    "supported_categories": [
      "appetizer", "main-course", "dessert", "beverage", "snack", "salad", "soup"
    ]
  }
}
```

**recipe-hooks.js:**
```javascript
const fs = require('fs');
const path = require('path');

class RecipeHooks {
  constructor(config = {}) {
    this.config = {
      ...config,
      recipeSettings: this.loadRecipeSettings()
    };
    this.results = [];
  }

  loadRecipeSettings() {
    try {
      const settingsPath = path.join(process.cwd(), '.claude', 'recipe-validation-hooks.json');
      const content = fs.readFileSync(settingsPath, 'utf8');
      const config = JSON.parse(content);
      return config.recipe_settings || {};
    } catch (error) {
      console.warn('Warning: Could not load recipe settings, using defaults');
      return {
        max_ingredients: 50,
        max_cooking_time: 1440,
        max_calories_per_serving: 2000,
        required_fields: ["title", "ingredients", "instructions", "servings"]
      };
    }
  }

  async validateStructure(filePath) {
    console.log(`📋 Validating recipe structure: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(content);
      const validation = this.validateRecipeStructure(recipe);
      
      this.results.push({
        type: 'structure_validation',
        file: filePath,
        valid: validation.valid,
        issues: validation.issues
      });

      if (validation.valid) {
        console.log(`✅ Recipe structure is valid: ${filePath}`);
      } else {
        console.log(`❌ Recipe structure has issues: ${filePath}`);
        validation.issues.forEach(issue => {
          console.log(`   ${issue.message}`);
        });
      }

      return validation.valid;
    } catch (error) {
      console.error(`❌ Structure validation failed for ${filePath}:`, error.message);
      return false;
    }
  }

  validateRecipeStructure(recipe) {
    const validation = {
      valid: true,
      issues: []
    };

    // Check required fields
    this.config.recipeSettings.required_fields.forEach(field => {
      if (!recipe[field]) {
        validation.valid = false;
        validation.issues.push({
          field,
          message: `Missing required field: ${field}`,
          severity: 'error'
        });
      }
    });

    // Validate ingredients
    if (recipe.ingredients) {
      if (!Array.isArray(recipe.ingredients)) {
        validation.valid = false;
        validation.issues.push({
          field: 'ingredients',
          message: 'Ingredients must be an array',
          severity: 'error'
        });
      } else {
        recipe.ingredients.forEach((ingredient, index) => {
          const ingredientIssues = this.validateIngredient(ingredient, index);
          validation.issues.push(...ingredientIssues);
        });

        if (recipe.ingredients.length > this.config.recipeSettings.max_ingredients) {
          validation.issues.push({
            field: 'ingredients',
            message: `Too many ingredients (${recipe.ingredients.length} > ${this.config.recipeSettings.max_ingredients})`,
            severity: 'warning'
          });
        }
      }
    }

    // Validate cooking times
    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
    if (totalTime > this.config.recipeSettings.max_cooking_time) {
      validation.issues.push({
        field: 'cooking_time',
        message: `Total cooking time too long (${totalTime} minutes)`,
        severity: 'warning'
      });
    }

    // Validate servings
    if (recipe.servings && (recipe.servings < 1 || recipe.servings > 50)) {
      validation.issues.push({
        field: 'servings',
        message: 'Servings must be between 1 and 50',
        severity: 'error'
      });
    }

    // Validate category
    if (recipe.category && this.config.recipeSettings.supported_categories) {
      if (!this.config.recipeSettings.supported_categories.includes(recipe.category)) {
        validation.issues.push({
          field: 'category',
          message: `Unsupported category: ${recipe.category}`,
          severity: 'warning'
        });
      }
    }

    validation.valid = validation.issues.filter(issue => issue.severity === 'error').length === 0;
    return validation;
  }

  validateIngredient(ingredient, index) {
    const issues = [];
    const position = index + 1;

    if (!ingredient.name || ingredient.name.trim() === '') {
      issues.push({
        field: `ingredients[${index}].name`,
        message: `Ingredient ${position}: Missing name`,
        severity: 'error'
      });
    }

    if (!ingredient.quantity || ingredient.quantity <= 0) {
      issues.push({
        field: `ingredients[${index}].quantity`,
        message: `Ingredient ${position}: Invalid quantity`,
        severity: 'error'
      });
    }

    if (!ingredient.unit || ingredient.unit.trim() === '') {
      issues.push({
        field: `ingredients[${index}].unit`,
        message: `Ingredient ${position}: Missing unit`,
        severity: 'warning'
      });
    }

    return issues;
  }

  async calculateNutrition(filePath) {
    console.log(`🥗 Calculating nutrition: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(content);
      const nutrition = this.calculateRecipeNutrition(recipe);
      
      // Add nutrition to recipe
      recipe.nutrition = nutrition;
      
      // Save updated recipe
      fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2));
      
      this.results.push({
        type: 'nutrition_calculation',
        file: filePath,
        nutrition: nutrition
      });

      console.log(`✅ Nutrition calculated: ${filePath}`);
      console.log(`   Calories per serving: ${nutrition.calories}`);
      console.log(`   Protein: ${nutrition.protein}g`);
      console.log(`   Carbs: ${nutrition.carbs}g`);
      console.log(`   Fat: ${nutrition.fat}g`);

      return true;
    } catch (error) {
      console.error(`❌ Nutrition calculation failed for ${filePath}:`, error.message);
      return false;
    }
  }

  calculateRecipeNutrition(recipe) {
    const ingredients = recipe.ingredients || [];
    const servings = recipe.servings || 4;
    
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    ingredients.forEach(ingredient => {
      const nutrition = this.getIngredientNutrition(ingredient);
      totalCalories += nutrition.calories;
      totalProtein += nutrition.protein;
      totalCarbs += nutrition.carbs;
      totalFat += nutrition.fat;
    });

    return {
      calories: Math.round(totalCalories / servings),
      protein: Math.round(totalProtein / servings * 10) / 10,
      carbs: Math.round(totalCarbs / servings * 10) / 10,
      fat: Math.round(totalFat / servings * 10) / 10,
      estimated: true
    };
  }

  getIngredientNutrition(ingredient) {
    // Simple nutrition database
    const nutritionDB = {
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
      'tomato': { calories: 18, protein: 1, carbs: 4, fat: 0 }
    };

    const name = ingredient.name.toLowerCase();
    const base = nutritionDB[name] || { calories: 100, protein: 2, carbs: 20, fat: 1 };
    const quantity = ingredient.quantity || 1;

    return {
      calories: base.calories * quantity,
      protein: base.protein * quantity,
      carbs: base.carbs * quantity,
      fat: base.fat * quantity
    };
  }

  async checkAllergens(filePath) {
    console.log(`🚨 Checking allergens: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(content);
      const allergens = this.identifyAllergens(recipe);
      
      // Add allergens to recipe
      recipe.allergens = allergens;
      
      // Save updated recipe
      fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2));
      
      this.results.push({
        type: 'allergen_check',
        file: filePath,
        allergens: allergens
      });

      if (allergens.length > 0) {
        console.log(`⚠️  Allergens found in ${filePath}:`);
        allergens.forEach(allergen => {
          console.log(`   - ${allergen}`);
        });
      } else {
        console.log(`✅ No common allergens found in ${filePath}`);
      }

      return true;
    } catch (error) {
      console.error(`❌ Allergen check failed for ${filePath}:`, error.message);
      return false;
    }
  }

  identifyAllergens(recipe) {
    const commonAllergens = [
      'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts',
      'wheat', 'soybeans', 'sesame', 'mustard', 'celery'
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

    return Array.from(foundAllergens);
  }

  async generateSearchIndex(filePath) {
    console.log(`🔍 Generating search index: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(content);
      
      // Generate search terms
      const searchTerms = this.generateSearchTerms(recipe);
      
      // Save search index
      const indexData = {
        id: recipe.id,
        title: recipe.title,
        category: recipe.category,
        search_terms: searchTerms,
        ingredients: recipe.ingredients.map(i => i.name),
        tags: recipe.tags || []
      };

      const indexDir = path.join(process.cwd(), '.claude', 'search-index');
      if (!fs.existsSync(indexDir)) {
        fs.mkdirSync(indexDir, { recursive: true });
      }

      const indexPath = path.join(indexDir, `${recipe.id}.json`);
      fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

      this.results.push({
        type: 'search_index',
        file: filePath,
        indexFile: indexPath,
        terms: searchTerms.length
      });

      console.log(`✅ Search index generated: ${indexPath}`);
      return true;
    } catch (error) {
      console.error(`❌ Search index generation failed for ${filePath}:`, error.message);
      return false;
    }
  }

  generateSearchTerms(recipe) {
    const terms = new Set();
    
    // Add title words
    if (recipe.title) {
      recipe.title.toLowerCase().split(/\s+/).forEach(word => {
        if (word.length > 2) {
          terms.add(word);
        }
      });
    }

    // Add category
    if (recipe.category) {
      terms.add(recipe.category.toLowerCase());
    }

    // Add ingredient names
    if (recipe.ingredients) {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.name) {
          terms.add(ingredient.name.toLowerCase());
        }
      });
    }

    // Add tags
    if (recipe.tags) {
      recipe.tags.forEach(tag => {
        terms.add(tag.toLowerCase());
      });
    }

    return Array.from(terms);
  }

  async updateStats(filePath) {
    console.log(`📊 Updating stats: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(content);
      
      // Update recipe statistics
      const stats = {
        last_updated: new Date().toISOString(),
        version: (recipe.version || 0) + 1,
        analysis_count: (recipe.analysis_count || 0) + 1
      };

      // Add stats to recipe
      recipe.stats = stats;
      
      // Save updated recipe
      fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2));

      // Update global stats
      this.updateGlobalStats();

      this.results.push({
        type: 'stats_update',
        file: filePath,
        stats: stats
      });

      console.log(`✅ Stats updated: ${filePath}`);
      return true;
    } catch (error) {
      console.error(`❌ Stats update failed for ${filePath}:`, error.message);
      return false;
    }
  }

  updateGlobalStats() {
    const statsPath = path.join(process.cwd(), '.claude', 'recipe-stats.json');
    let stats = { total_recipes: 0, last_updated: null };

    try {
      if (fs.existsSync(statsPath)) {
        const content = fs.readFileSync(statsPath, 'utf8');
        stats = JSON.parse(content);
      }

      stats.total_recipes += 1;
      stats.last_updated = new Date().toISOString();

      fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
    } catch (error) {
      console.warn('Warning: Could not update global stats:', error.message);
    }
  }

  async validateNutrition(filePath) {
    console.log(`🔬 Validating nutrition: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(content);
      
      if (!recipe.nutrition) {
        console.log(`❌ No nutrition data found in ${filePath}`);
        return false;
      }

      const issues = this.validateNutritionData(recipe.nutrition, recipe);
      
      if (issues.length === 0) {
        console.log(`✅ Nutrition data is valid: ${filePath}`);
        return true;
      } else {
        console.log(`❌ Nutrition data has issues in ${filePath}:`);
        issues.forEach(issue => {
          console.log(`   ${issue.message}`);
        });
        return false;
      }
    } catch (error) {
      console.error(`❌ Nutrition validation failed for ${filePath}:`, error.message);
      return false;
    }
  }

  validateNutritionData(nutrition, recipe) {
    const issues = [];
    const servings = recipe.servings || 1;

    // Check for required fields
    const requiredFields = ['calories', 'protein', 'carbs', 'fat'];
    requiredFields.forEach(field => {
      if (typeof nutrition[field] !== 'number' || nutrition[field] < 0) {
        issues.push({
          message: `Invalid ${field} value: must be non-negative number`
        });
      }
    });

    // Check calorie reasonableness
    if (nutrition.calories > this.config.recipeSettings.max_calories_per_serving) {
      issues.push({
        message: `Calories per serving too high: ${nutrition.calories}`
      });
    }

    // Check macronutrient balance
    const totalCalories = nutrition.calories;
    if (totalCalories > 0) {
      const proteinCalories = nutrition.protein * 4;
      const carbCalories = nutrition.carbs * 4;
      const fatCalories = nutrition.fat * 9;
      const totalMacroCalories = proteinCalories + carbCalories + fatCalories;

      if (Math.abs(totalMacroCalories - totalCalories) > totalCalories * 0.2) {
        issues.push({
          message: 'Macronutrient calories don\'t match total calories'
        });
      }
    }

    return issues;
  }

  async checkImages(filePath) {
    console.log(`🖼️  Checking images: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(content);
      
      if (!recipe.images || recipe.images.length === 0) {
        console.log(`ℹ️  No images found in ${filePath}`);
        return true;
      }

      const imageIssues = [];
      recipe.images.forEach((image, index) => {
        const issues = this.validateImage(image, index);
        imageIssues.push(...issues);
      });

      if (imageIssues.length === 0) {
        console.log(`✅ All images are valid: ${filePath}`);
        return true;
      } else {
        console.log(`❌ Image issues found in ${filePath}:`);
        imageIssues.forEach(issue => {
          console.log(`   ${issue.message}`);
        });
        return false;
      }
    } catch (error) {
      console.error(`❌ Image check failed for ${filePath}:`, error.message);
      return false;
    }
  }

  validateImage(image, index) {
    const issues = [];
    const position = index + 1;

    if (!image.url) {
      issues.push({
        message: `Image ${position}: Missing URL`
      });
    }

    if (image.url && !this.isValidImageUrl(image.url)) {
      issues.push({
        message: `Image ${position}: Invalid URL format`
      });
    }

    if (image.alt && image.alt.length > 100) {
      issues.push({
        message: `Image ${position}: Alt text too long`
      });
    }

    return issues;
  }

  isValidImageUrl(url) {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    } catch {
      return false;
    }
  }

  async testCookingTime(filePath) {
    console.log(`⏱️  Testing cooking time: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(content);
      
      const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
      const estimatedTime = this.estimateCookingTime(recipe);
      
      const difference = Math.abs(totalTime - estimatedTime);
      const tolerance = Math.max(totalTime * 0.3, 30); // 30% tolerance or 30 minutes

      if (difference > tolerance) {
        console.log(`⚠️  Cooking time seems unreasonable in ${filePath}:`);
        console.log(`   Specified: ${totalTime} minutes`);
        console.log(`   Estimated: ${estimatedTime} minutes`);
        return false;
      } else {
        console.log(`✅ Cooking time is reasonable: ${filePath}`);
        return true;
      }
    } catch (error) {
      console.error(`❌ Cooking time test failed for ${filePath}:`, error.message);
      return false;
    }
  }

  estimateCookingTime(recipe) {
    const ingredients = recipe.ingredients || [];
    let baseTime = 30; // Base cooking time

    // Add time based on ingredient count
    baseTime += Math.max(0, (ingredients.length - 5) * 2);

    // Add time for complex ingredients
    const complexIngredients = ingredients.filter(ing => 
      ing.name.toLowerCase().includes('meat') ||
      ing.name.toLowerCase().includes('bean') ||
      ing.name.toLowerCase().includes('rice')
    );

    baseTime += complexIngredients.length * 15;

    // Add prep time
    baseTime += recipe.prep_time || 0;

    return baseTime;
  }

  getResults() {
    return this.results;
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const filePath = args[1];

  if (!command || !filePath) {
    console.log('Usage: node recipe-hooks.js <command> <file>');
    console.log('Commands: validate-structure, calculate-nutrition, check-allergens, generate-search-index, update-stats, validate-nutrition, check-images, test-cooking-time');
    process.exit(1);
  }

  const hook = new RecipeHooks();

  const commandMap = {
    'validate-structure': 'validateStructure',
    'calculate-nutrition': 'calculateNutrition',
    'check-allergens': 'checkAllergens',
    'generate-search-index': 'generateSearchIndex',
    'update-stats': 'updateStats',
    'validate-nutrition': 'validateNutrition',
    'check-images': 'checkImages',
    'test-cooking-time': 'testCookingTime'
  };

  const methodName = commandMap[command];
  if (methodName && hook[methodName]) {
    hook[methodName](filePath).then(success => {
      process.exit(success ? 0 : 1);
    });
  } else {
    console.log('Unknown command:', command);
    process.exit(1);
  }
}

module.exports = RecipeHooks;
```

## Exercise 2: Advanced Hook Chaining

### Solution: Build Automation Chain

**development-hooks.json:**
```json
{
  "version": "1.0",
  "hooks": {
    "pre-commit": {
      "match": "**/*.{js,ts,json}",
      "run": [
        "node .claude/hooks/build-chain.js lint",
        "node .claude/hooks/build-chain.js test",
        "node .claude/hooks/build-chain.js build",
        "node .claude/hooks/build-chain.js security-scan"
      ],
      "condition": "staged_files.length > 0",
      "timeout": 60000,
      "parallel": false,
      "continue_on_error": false,
      "environment": {
        "NODE_ENV": "test"
      }
    },
    "post-merge": {
      "match": "**/*",
      "run": [
        "node .claude/hooks/build-chain.js install-deps",
        "node .claude/hooks/build-chain.js build",
        "node .claude/hooks/build-chain.js run-all-tests"
      ],
      "condition": "branch_changed",
      "timeout": 120000,
      "parallel": false,
      "continue_on_error": false
    },
    "pre-push": {
      "match": "**/*",
      "run": [
        "node .claude/hooks/build-chain.js full-test-suite",
        "node .claude/hooks/build-chain.js performance-check",
        "node .claude/hooks/build-chain.js documentation-check"
      ],
      "condition": "has_commits",
      "timeout": 180000,
      "parallel": true,
      "continue_on_error": false
    }
  },
  "build_settings": {
    "test_timeout": 30000,
    "build_timeout": 60000,
    "security_scan_timeout": 45000,
    "performance_threshold": 1000,
    "test_coverage_threshold": 80,
    "allowed_warnings": 5
  }
}
```

**build-chain.js:**
```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BuildChainHooks {
  constructor(config = {}) {
    this.config = {
      ...config,
      buildSettings: this.loadBuildSettings()
    };
    this.results = [];
    this.startTime = Date.now();
  }

  loadBuildSettings() {
    try {
      const settingsPath = path.join(process.cwd(), '.claude', 'development-hooks.json');
      const content = fs.readFileSync(settingsPath, 'utf8');
      const config = JSON.parse(content);
      return config.build_settings || {};
    } catch (error) {
      console.warn('Warning: Could not load build settings, using defaults');
      return {
        test_timeout: 30000,
        build_timeout: 60000,
        performance_threshold: 1000,
        test_coverage_threshold: 80,
        allowed_warnings: 5
      };
    }
  }

  async lint(filePath) {
    console.log('🔍 Running lint checks...');
    
    try {
      const startTime = Date.now();
      
      // Run ESLint
      const eslintResult = this.runESLint(filePath);
      
      // Run additional lint checks
      const additionalChecks = this.runAdditionalLintChecks(filePath);
      
      const duration = Date.now() - startTime;
      const allIssues = [...eslintResult.issues, ...additionalChecks.issues];
      
      const result = {
        type: 'lint',
        passed: eslintResult.passed && additionalChecks.passed,
        duration,
        issues: allIssues,
        summary: {
          totalIssues: allIssues.length,
          errors: allIssues.filter(i => i.severity === 'error').length,
          warnings: allIssues.filter(i => i.severity === 'warning').length
        }
      };

      this.results.push(result);

      if (result.passed) {
        console.log(`✅ Lint checks passed (${duration}ms)`);
      } else {
        console.log(`❌ Lint checks failed (${duration}ms):`);
        console.log(`   Errors: ${result.summary.errors}`);
        console.log(`   Warnings: ${result.summary.warnings}`);
        
        if (result.summary.errors > 0) {
          result.issues.filter(i => i.severity === 'error').forEach(issue => {
            console.log(`   ${issue.file}:${issue.line} - ${issue.message}`);
          });
        }
      }

      return result.passed;
    } catch (error) {
      console.error('❌ Lint checks failed:', error.message);
      return false;
    }
  }

  runESLint(filePath) {
    try {
      const output = execSync(`npx eslint ${filePath} --format json`, {
        encoding: 'utf8',
        timeout: this.config.buildSettings.test_timeout,
        stdio: 'pipe'
      });

      const results = JSON.parse(output);
      const issues = [];

      results.forEach(file => {
        file.messages.forEach(message => {
          issues.push({
            file: file.filePath,
            line: message.line,
            column: message.column,
            message: message.message,
            severity: message.severity === 2 ? 'error' : 'warning',
            rule: message.ruleId
          });
        });
      });

      return {
        passed: issues.filter(i => i.severity === 'error').length === 0,
        issues
      };
    } catch (error) {
      return {
        passed: false,
        issues: [{
          file: filePath,
          message: `ESLint failed: ${error.message}`,
          severity: 'error'
        }]
      };
    }
  }

  runAdditionalLintChecks(filePath) {
    const issues = [];
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        const lineNumber = index + 1;

        // Check for console.log statements
        if (line.includes('console.log') && !filePath.includes('test')) {
          issues.push({
            file: filePath,
            line: lineNumber,
            message: 'Remove console.log statements',
            severity: 'warning'
          });
        }

        // Check for TODO comments
        if (line.toLowerCase().includes('todo')) {
          issues.push({
            file: filePath,
            line: lineNumber,
            message: 'TODO comment found',
            severity: 'info'
          });
        }

        // Check for long lines
        if (line.length > 120) {
          issues.push({
            file: filePath,
            line: lineNumber,
            message: 'Line exceeds 120 characters',
            severity: 'warning'
          });
        }
      });

      return {
        passed: issues.filter(i => i.severity === 'error').length === 0,
        issues
      };
    } catch (error) {
      return {
        passed: false,
        issues: [{
          file: filePath,
          message: `Additional lint checks failed: ${error.message}`,
          severity: 'error'
        }]
      };
    }
  }

  async test(filePath) {
    console.log('🧪 Running tests...');
    
    try {
      const startTime = Date.now();
      
      // Run unit tests
      const unitTestResult = this.runUnitTests(filePath);
      
      // Run integration tests if applicable
      const integrationTestResult = this.runIntegrationTests(filePath);
      
      // Check test coverage
      const coverageResult = this.checkTestCoverage(filePath);
      
      const duration = Date.now() - startTime;
      
      const result = {
        type: 'test',
        passed: unitTestResult.passed && integrationTestResult.passed,
        duration,
        unitTests: unitTestResult,
        integrationTests: integrationTestResult,
        coverage: coverageResult,
        summary: {
          totalTests: unitTestResult.total + integrationTestResult.total,
          passedTests: unitTestResult.passed + integrationTestResult.passed,
          failedTests: unitTestResult.failed + integrationTestResult.failed,
          coverage: coverageResult.percentage
        }
      };

      this.results.push(result);

      if (result.passed) {
        console.log(`✅ Tests passed (${duration}ms)`);
        console.log(`   Unit tests: ${unitTestResult.passed}/${unitTestResult.total}`);
        console.log(`   Integration tests: ${integrationTestResult.passed}/${integrationTestResult.total}`);
        console.log(`   Coverage: ${coverageResult.percentage}%`);
      } else {
        console.log(`❌ Tests failed (${duration}ms):`);
        console.log(`   Failed tests: ${result.summary.failedTests}`);
        console.log(`   Coverage: ${coverageResult.percentage}% (threshold: ${this.config.buildSettings.test_coverage_threshold}%)`);
      }

      return result.passed;
    } catch (error) {
      console.error('❌ Tests failed:', error.message);
      return false;
    }
  }

  runUnitTests(filePath) {
    try {
      const testFile = filePath.replace('.js', '.test.js');
      if (!fs.existsSync(testFile)) {
        return {
          passed: true,
          total: 0,
          passed: 0,
          failed: 0,
          message: 'No unit tests found'
        };
      }

      const output = execSync(`npx jest ${testFile} --json`, {
        encoding: 'utf8',
        timeout: this.config.buildSettings.test_timeout,
        stdio: 'pipe'
      });

      const results = JSON.parse(output);
      
      return {
        passed: results.numFailedTests === 0,
        total: results.numTotalTests,
        passed: results.numPassedTests,
        failed: results.numFailedTests,
        testResults: results.testResults
      };
    } catch (error) {
      return {
        passed: false,
        total: 0,
        passed: 0,
        failed: 1,
        message: error.message
      };
    }
  }

  runIntegrationTests(filePath) {
    try {
      // Check if there are integration tests for this file
      const integrationTestDir = path.join(process.cwd(), 'tests', 'integration');
      if (!fs.existsSync(integrationTestDir)) {
        return {
          passed: true,
          total: 0,
          passed: 0,
          failed: 0,
          message: 'No integration tests found'
        };
      }

      const output = execSync(`npx jest ${integrationTestDir} --json`, {
        encoding: 'utf8',
        timeout: this.config.buildSettings.test_timeout,
        stdio: 'pipe'
      });

      const results = JSON.parse(output);
      
      return {
        passed: results.numFailedTests === 0,
        total: results.numTotalTests,
        passed: results.numPassedTests,
        failed: results.numFailedTests
      };
    } catch (error) {
      return {
        passed: false,
        total: 0,
        passed: 0,
        failed: 1,
        message: error.message
      };
    }
  }

  checkTestCoverage(filePath) {
    try {
      const output = execSync(`npx jest ${filePath} --coverage --json`, {
        encoding: 'utf8',
        timeout: this.config.buildSettings.test_timeout,
        stdio: 'pipe'
      });

      const results = JSON.parse(output);
      const coverage = results.coverage;
      
      // Calculate overall coverage percentage
      let totalLines = 0;
      let coveredLines = 0;
      
      Object.values(coverage).forEach(fileCoverage => {
        totalLines += fileCoverage.totalLines;
        coveredLines += fileCoverage.coveredLines;
      });

      const percentage = totalLines > 0 ? Math.round((coveredLines / totalLines) * 100) : 0;
      
      return {
        percentage,
        passed: percentage >= this.config.buildSettings.test_coverage_threshold,
        threshold: this.config.buildSettings.test_coverage_threshold,
        totalLines,
        coveredLines
      };
    } catch (error) {
      return {
        percentage: 0,
        passed: false,
        threshold: this.config.buildSettings.test_coverage_threshold,
        message: error.message
      };
    }
  }

  async build(filePath) {
    console.log('🔨 Building application...');
    
    try {
      const startTime = Date.now();
      
      // Clean previous build
      this.cleanBuild();
      
      // Run build process
      const buildResult = this.runBuild(filePath);
      
      // Validate build output
      const validation = this.validateBuild(buildResult);
      
      const duration = Date.now() - startTime;
      
      const result = {
        type: 'build',
        passed: buildResult.success && validation.valid,
        duration,
        buildResult,
        validation,
        summary: {
          buildTime: duration,
          outputFiles: buildResult.files.length,
          warnings: buildResult.warnings.length,
          errors: buildResult.errors.length
        }
      };

      this.results.push(result);

      if (result.passed) {
        console.log(`✅ Build successful (${duration}ms)`);
        console.log(`   Output files: ${result.summary.outputFiles}`);
        console.log(`   Warnings: ${result.summary.warnings}`);
      } else {
        console.log(`❌ Build failed (${duration}ms):`);
        console.log(`   Errors: ${result.summary.errors}`);
        if (buildResult.errors.length > 0) {
          buildResult.errors.forEach(error => {
            console.log(`   ${error}`);
          });
        }
      }

      return result.passed;
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      return false;
    }
  }

  cleanBuild() {
    const buildDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true, force: true });
    }
  }

  runBuild(filePath) {
    try {
      const output = execSync('npm run build', {
        encoding: 'utf8',
        timeout: this.config.buildSettings.build_timeout,
        stdio: 'pipe'
      });

      const buildDir = path.join(process.cwd(), 'dist');
      const files = this.getBuildFiles(buildDir);
      
      return {
        success: true,
        files,
        warnings: this.extractBuildWarnings(output),
        errors: this.extractBuildErrors(output),
        output
      };
    } catch (error) {
      return {
        success: false,
        files: [],
        warnings: [],
        errors: [error.message],
        output: error.stdout || error.stderr
      };
    }
  }

  getBuildFiles(buildDir) {
    const files = [];
    
    function scanDirectory(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      items.forEach(item => {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          scanDirectory(fullPath);
        } else {
          files.push({
            path: fullPath,
            size: fs.statSync(fullPath).size,
            relative: path.relative(process.cwd(), fullPath)
          });
        }
      });
    }

    if (fs.existsSync(buildDir)) {
      scanDirectory(buildDir);
    }

    return files;
  }

  extractBuildWarnings(output) {
    const warnings = [];
    const lines = output.split('\n');
    
    lines.forEach(line => {
      if (line.toLowerCase().includes('warning')) {
        warnings.push(line.trim());
      }
    });

    return warnings;
  }

  extractBuildErrors(output) {
    const errors = [];
    const lines = output.split('\n');
    
    lines.forEach(line => {
      if (line.toLowerCase().includes('error') && !line.toLowerCase().includes('warning')) {
        errors.push(line.trim());
      }
    });

    return errors;
  }

  validateBuild(buildResult) {
    const validation = {
      valid: true,
      issues: []
    };

    // Check if build produced any files
    if (buildResult.files.length === 0) {
      validation.valid = false;
      validation.issues.push({
        type: 'no_output',
        message: 'Build produced no output files'
      });
    }

    // Check for critical build errors
    if (buildResult.errors.length > 0) {
      validation.valid = false;
      validation.issues.push({
        type: 'build_errors',
        message: 'Build contains errors',
        errors: buildResult.errors
      });
    }

    // Check for too many warnings
    if (buildResult.warnings.length > this.config.buildSettings.allowed_warnings) {
      validation.issues.push({
        type: 'too_many_warnings',
        message: `Too many warnings: ${buildResult.warnings.length} > ${this.config.buildSettings.allowed_warnings}`
      });
    }

    return validation;
  }

  async securityScan(filePath) {
    console.log('🔒 Running security scan...');
    
    try {
      const startTime = Date.now();
      
      // Run npm audit
      const auditResult = this.runNpmAudit();
      
      // Run security linting
      const lintResult = this.runSecurityLinting(filePath);
      
      // Check for secrets
      const secretsResult = this.checkForSecrets(filePath);
      
      const duration = Date.now() - startTime;
      
      const result = {
        type: 'security',
        passed: auditResult.passed && lintResult.passed && secretsResult.passed,
        duration,
        audit: auditResult,
        lint: lintResult,
        secrets: secretsResult,
        summary: {
          vulnerabilities: auditResult.vulnerabilities,
          securityIssues: lintResult.issues.length,
          secretsFound: secretsResult.secrets.length
        }
      };

      this.results.push(result);

      if (result.passed) {
        console.log(`✅ Security scan passed (${duration}ms)`);
      } else {
        console.log(`❌ Security scan failed (${duration}ms):`);
        console.log(`   Vulnerabilities: ${result.summary.vulnerabilities}`);
        console.log(`   Security issues: ${result.summary.securityIssues}`);
        console.log(`   Secrets found: ${result.summary.secretsFound}`);
      }

      return result.passed;
    } catch (error) {
      console.error('❌ Security scan failed:', error.message);
      return false;
    }
  }

  runNpmAudit() {
    try {
      const output = execSync('npm audit --json', {
        encoding: 'utf8',
        timeout: this.config.buildSettings.security_scan_timeout,
        stdio: 'pipe'
      });

      const audit = JSON.parse(output);
      const vulnerabilities = audit.vulnerabilities || {};
      
      return {
        passed: Object.keys(vulnerabilities).length === 0,
        vulnerabilities: Object.keys(vulnerabilities).length,
        details: vulnerabilities
      };
    } catch (error) {
      return {
        passed: false,
        vulnerabilities: -1,
        message: error.message
      };
    }
  }

  runSecurityLinting(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const issues = [];

      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        const lineNumber = index + 1;

        // Check for eval usage
        if (line.includes('eval(')) {
          issues.push({
            file: filePath,
            line: lineNumber,
            message: 'Avoid using eval()',
            severity: 'error'
          });
        }

        // Check for hardcoded passwords
        if (line.match(/password\s*=\s*['"][^'"]{8,}['"]/)) {
          issues.push({
            file: filePath,
            line: lineNumber,
            message: 'Hardcoded password detected',
            severity: 'error'
          });
        }

        // Check for SQL injection patterns
        if (line.match(/\+\s*['"].*\$\w+/)) {
          issues.push({
            file: filePath,
            line: lineNumber,
            message: 'Potential SQL injection vulnerability',
            severity: 'warning'
          });
        }
      });

      return {
        passed: issues.filter(i => i.severity === 'error').length === 0,
        issues
      };
    } catch (error) {
      return {
        passed: false,
        issues: [{
          file: filePath,
          message: `Security linting failed: ${error.message}`,
          severity: 'error'
        }]
      };
    }
  }

  checkForSecrets(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const secrets = [];

      // Common secret patterns
      const secretPatterns = [
        /api[_-]?key\s*[:=]\s*['"][^'"]{20,}['"]/i,
        /secret\s*[:=]\s*['"][^'"]{20,}['"]/i,
        /token\s*[:=]\s*['"][^'"]{20,}['"]/i,
        /password\s*[:=]\s*['"][^'"]{8,}['"]/i,
        /private[_-]?key\s*[:=]\s*['"][^'"]{20,}['"]/i
      ];

      secretPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          secrets.push(...matches);
        }
      });

      return {
        passed: secrets.length === 0,
        secrets
      };
    } catch (error) {
      return {
        passed: false,
        secrets: [],
        message: error.message
      };
    }
  }

  async installDeps() {
    console.log('📦 Installing dependencies...');
    
    try {
      const startTime = Date.now();
      
      const output = execSync('npm ci', {
        encoding: 'utf8',
        timeout: 120000,
        stdio: 'pipe'
      });

      const duration = Date.now() - startTime;
      
      console.log(`✅ Dependencies installed (${duration}ms)`);
      return true;
    } catch (error) {
      console.error('❌ Dependency installation failed:', error.message);
      return false;
    }
  }

  async runAllTests() {
    console.log('🧪 Running all tests...');
    
    try {
      const startTime = Date.now();
      
      const output = execSync('npm test', {
        encoding: 'utf8',
        timeout: 120000,
        stdio: 'pipe'
      });

      const duration = Date.now() - startTime;
      
      console.log(`✅ All tests passed (${duration}ms)`);
      return true;
    } catch (error) {
      console.error('❌ Tests failed:', error.message);
      return false;
    }
  }

  async fullTestSuite() {
    console.log('🧪 Running full test suite...');
    
    try {
      const startTime = Date.now();
      
      // Run unit tests
      const unitResult = this.runUnitTests('.');
      
      // Run integration tests
      const integrationResult = this.runIntegrationTests('.');
      
      // Run e2e tests
      const e2eResult = this.runE2ETests();
      
      // Check coverage
      const coverageResult = this.checkTestCoverage('.');
      
      const duration = Date.now() - startTime;
      
      const result = {
        type: 'full_test_suite',
        passed: unitResult.passed && integrationResult.passed && e2eResult.passed,
        duration,
        unitTests: unitResult,
        integrationTests: integrationResult,
        e2eTests: e2eResult,
        coverage: coverageResult
      };

      if (result.passed) {
        console.log(`✅ Full test suite passed (${duration}ms)`);
      } else {
        console.log(`❌ Full test suite failed (${duration}ms)`);
      }

      return result.passed;
    } catch (error) {
      console.error('❌ Full test suite failed:', error.message);
      return false;
    }
  }

  runE2ETests() {
    try {
      const output = execSync('npx playwright test', {
        encoding: 'utf8',
        timeout: 180000,
        stdio: 'pipe'
      });

      return {
        passed: true,
        message: 'E2E tests passed'
      };
    } catch (error) {
      return {
        passed: false,
        message: error.message
      };
    }
  }

  async performanceCheck() {
    console.log('⚡ Running performance check...');
    
    try {
      const startTime = Date.now();
      
      // Run performance tests
      const perfResult = this.runPerformanceTests();
      
      // Check bundle size
      const bundleResult = this.checkBundleSize();
      
      const duration = Date.now() - startTime;
      
      const result = {
        type: 'performance',
        passed: perfResult.passed && bundleResult.passed,
        duration,
        performance: perfResult,
        bundle: bundleResult
      };

      if (result.passed) {
        console.log(`✅ Performance check passed (${duration}ms)`);
      } else {
        console.log(`❌ Performance check failed (${duration}ms)`);
      }

      return result.passed;
    } catch (error) {
      console.error('❌ Performance check failed:', error.message);
      return false;
    }
  }

  runPerformanceTests() {
    try {
      const threshold = this.config.buildSettings.performance_threshold;
      
      // Simple performance test - measure startup time
      const start = Date.now();
      execSync('node -e "console.log(\'test\')"', { stdio: 'pipe' });
      const startupTime = Date.now() - start;

      return {
        passed: startupTime < threshold,
        startupTime,
        threshold,
        message: `Startup time: ${startupTime}ms (threshold: ${threshold}ms)`
      };
    } catch (error) {
      return {
        passed: false,
        message: error.message
      };
    }
  }

  checkBundleSize() {
    try {
      const buildDir = path.join(process.cwd(), 'dist');
      const files = this.getBuildFiles(buildDir);
      
      let totalSize = 0;
      files.forEach(file => {
        totalSize += file.size;
      });

      // Convert to MB
      const totalSizeMB = totalSize / (1024 * 1024);
      
      return {
        passed: totalSizeMB < 10, // 10MB limit
        totalSize,
        totalSizeMB,
        message: `Bundle size: ${totalSizeMB.toFixed(2)}MB`
      };
    } catch (error) {
      return {
        passed: false,
        message: error.message
      };
    }
  }

  async documentationCheck() {
    console.log('📚 Checking documentation...');
    
    try {
      const startTime = Date.now();
      
      // Check for README
      const readmeExists = fs.existsSync(path.join(process.cwd(), 'README.md'));
      
      // Check for JSDoc comments
      const jsdocResult = this.checkJSDocComments();
      
      // Check for outdated documentation
      const outdatedResult = this.checkOutdatedDocumentation();
      
      const duration = Date.now() - startTime;
      
      const result = {
        type: 'documentation',
        passed: readmeExists && jsdocResult.passed,
        duration,
        readme: readmeExists,
        jsdoc: jsdocResult,
        outdated: outdatedResult
      };

      if (result.passed) {
        console.log(`✅ Documentation check passed (${duration}ms)`);
      } else {
        console.log(`❌ Documentation check failed (${duration}ms)`);
      }

      return result.passed;
    } catch (error) {
      console.error('❌ Documentation check failed:', error.message);
      return false;
    }
  }

  checkJSDocComments() {
    try {
      const jsFiles = this.findJavaScriptFiles();
      let documentedFunctions = 0;
      let totalFunctions = 0;

      jsFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          // Check for function declarations
          if (line.match(/function\s+\w+\s*\(/) || line.match(/const\s+\w+\s*=\s*\(/)) {
            totalFunctions++;
            
            // Check if function has JSDoc comment
            if (index > 0 && lines[index - 1].trim().startsWith('/**')) {
              documentedFunctions++;
            }
          }
        });
      });

      const coverage = totalFunctions > 0 ? (documentedFunctions / totalFunctions) * 100 : 0;

      return {
        passed: coverage >= 70, // 70% documentation coverage
        coverage,
        documentedFunctions,
        totalFunctions,
        message: `JSDoc coverage: ${coverage.toFixed(1)}%`
      };
    } catch (error) {
      return {
        passed: false,
        message: error.message
      };
    }
  }

  checkOutdatedDocumentation() {
    try {
      const outdated = [];
      
      // Check if package.json version matches documentation
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const readmeContent = fs.readFileSync('README.md', 'utf8');
      
      if (!readmeContent.includes(packageJson.version)) {
        outdated.push('README.md version outdated');
      }

      return {
        passed: outdated.length === 0,
        outdated
      };
    } catch (error) {
      return {
        passed: false,
        message: error.message
      };
    }
  }

  findJavaScriptFiles() {
    const files = [];
    
    function searchDirectory(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      items.forEach(item => {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          searchDirectory(fullPath);
        } else if (item.isFile() && item.name.endsWith('.js')) {
          files.push(fullPath);
        }
      });
    }
    
    searchDirectory(process.cwd());
    return files;
  }

  getResults() {
    return this.results;
  }

  getSummary() {
    const totalDuration = Date.now() - this.startTime;
    const totalResults = this.results.length;
    const passedResults = this.results.filter(r => r.passed).length;

    return {
      totalDuration,
      totalResults,
      passedResults,
      successRate: totalResults > 0 ? (passedResults / totalResults) * 100 : 0,
      results: this.results
    };
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const filePath = args[1];

  if (!command) {
    console.log('Usage: node build-chain.js <command> [file]');
    console.log('Commands: lint, test, build, security-scan, install-deps, run-all-tests, full-test-suite, performance-check, documentation-check');
    process.exit(1);
  }

  const hook = new BuildChainHooks();

  const commandMap = {
    'lint': 'lint',
    'test': 'test',
    'build': 'build',
    'security-scan': 'securityScan',
    'install-deps': 'installDeps',
    'run-all-tests': 'runAllTests',
    'full-test-suite': 'fullTestSuite',
    'performance-check': 'performanceCheck',
    'documentation-check': 'documentationCheck'
  };

  const methodName = commandMap[command];
  if (methodName && hook[methodName]) {
    hook[methodName](filePath).then(success => {
      process.exit(success ? 0 : 1);
    });
  } else {
    console.log('Unknown command:', command);
    process.exit(1);
  }
}

module.exports = BuildChainHooks;
```

## Key Takeaways

### 1. Hook Architecture
- Use modular hook design with clear responsibilities
- Implement proper error handling and recovery
- Support configuration-driven behavior
- Provide detailed logging and feedback

### 2. Build Chain Patterns
- Implement sequential and parallel execution
- Use dependency management for complex workflows
- Support conditional execution and timeouts
- Provide comprehensive result reporting

### 3. Recipe-Specific Hooks
- Validate recipe structure and data integrity
- Calculate nutrition and identify allergens
- Generate search indexes and statistics
- Provide specialized validation for recipe data

### 4. Performance Considerations
- Use timeouts to prevent hanging operations
- Implement parallel execution for independent tasks
- Cache expensive operations where possible
- Monitor and optimize hook execution time

### 5. Real-world Applications
- Automated code quality checks
- Comprehensive build automation
- Recipe validation and processing
- Security scanning and vulnerability detection
- Documentation generation and validation

These solutions provide a comprehensive foundation for building sophisticated hook systems that automate development workflows and ensure code quality.