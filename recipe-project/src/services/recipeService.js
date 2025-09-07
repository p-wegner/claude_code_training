const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');
const Nutrition = require('../models/Nutrition');

class RecipeService {
  constructor(db) {
    this.db = db;
  }

  // Get all recipes with full details
  async getAllRecipes() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT r.*, 
               json_group_array(
                 json_object('id', i.id, 'name', i.name, 'quantity', i.quantity, 'unit', i.unit)
               ) as ingredients,
               json_group_array(
                 json_object('id', n.id, 'calories', n.calories, 'protein', n.protein, 'carbs', n.carbs, 'fat', n.fat)
               ) as nutrition
        FROM recipes r
        LEFT JOIN ingredients i ON r.id = i.recipe_id
        LEFT JOIN nutrition n ON r.id = n.recipe_id
        GROUP BY r.id
        ORDER BY r.created_at DESC
      `;

      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        const recipes = rows.map(row => {
          const recipe = new Recipe({
            ...row,
            ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
            nutrition: row.nutrition ? JSON.parse(row.nutrition)[0] : null
          });
          return recipe.toJSON();
        });

        resolve(recipes);
      });
    });
  }

  // Get recipe by ID
  async getRecipeById(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT r.*, 
               json_group_array(
                 json_object('id', i.id, 'name', i.name, 'quantity', i.quantity, 'unit', i.unit)
               ) as ingredients,
               json_group_array(
                 json_object('id', n.id, 'calories', n.calories, 'protein', n.protein, 'carbs', n.carbs, 'fat', n.fat)
               ) as nutrition
        FROM recipes r
        LEFT JOIN ingredients i ON r.id = i.recipe_id
        LEFT JOIN nutrition n ON r.id = n.recipe_id
        WHERE r.id = ?
        GROUP BY r.id
      `;

      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (!row) {
          resolve(null);
          return;
        }

        const recipe = new Recipe({
          ...row,
          ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
          nutrition: row.nutrition ? JSON.parse(row.nutrition)[0] : null
        });

        resolve(recipe.toJSON());
      });
    });
  }

  // Create new recipe
  async createRecipe(recipeData) {
    return new Promise((resolve, reject) => {
      const recipe = new Recipe(recipeData);
      const validationErrors = recipe.validate();

      if (validationErrors.length > 0) {
        reject(new Error(validationErrors.join(', ')));
        return;
      }

      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION');

        const insertRecipe = `
          INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, category)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        this.db.run(insertRecipe, [
          recipe.title,
          recipe.description,
          recipe.instructions,
          recipe.prepTime,
          recipe.cookTime,
          recipe.servings,
          recipe.category
        ], function(err) {
          if (err) {
            this.db.run('ROLLBACK');
            reject(err);
            return;
          }

          const recipeId = this.lastID;

          // Insert ingredients if provided
          if (recipeData.ingredients && recipeData.ingredients.length > 0) {
            const insertIngredient = 'INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES (?, ?, ?, ?)';
            
            recipeData.ingredients.forEach(ingredient => {
              this.db.run(insertIngredient, [recipeId, ingredient.name, ingredient.quantity, ingredient.unit], (err) => {
                if (err) {
                  this.db.run('ROLLBACK');
                  reject(err);
                }
              });
            });
          }

          this.db.run('COMMIT');
          resolve({ id: recipeId, ...recipeData });
        });
      });
    });
  }

  // Update recipe
  async updateRecipe(id, recipeData) {
    return new Promise((resolve, reject) => {
      const recipe = new Recipe(recipeData);
      const validationErrors = recipe.validate();

      if (validationErrors.length > 0) {
        reject(new Error(validationErrors.join(', ')));
        return;
      }

      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION');

        const updateRecipe = `
          UPDATE recipes 
          SET title = ?, description = ?, instructions = ?, prep_time = ?, cook_time = ?, servings = ?, category = ?
          WHERE id = ?
        `;

        this.db.run(updateRecipe, [
          recipe.title,
          recipe.description,
          recipe.instructions,
          recipe.prepTime,
          recipe.cookTime,
          recipe.servings,
          recipe.category,
          id
        ], function(err) {
          if (err) {
            this.db.run('ROLLBACK');
            reject(err);
            return;
          }

          if (this.changes === 0) {
            this.db.run('ROLLBACK');
            resolve(null);
            return;
          }

          // Update ingredients
          this.db.run('DELETE FROM ingredients WHERE recipe_id = ?', [id], (err) => {
            if (err) {
              this.db.run('ROLLBACK');
              reject(err);
              return;
            }

            if (recipeData.ingredients && recipeData.ingredients.length > 0) {
              const insertIngredient = 'INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES (?, ?, ?, ?)';
              
              recipeData.ingredients.forEach(ingredient => {
                this.db.run(insertIngredient, [id, ingredient.name, ingredient.quantity, ingredient.unit], (err) => {
                  if (err) {
                    this.db.run('ROLLBACK');
                    reject(err);
                  }
                });
              });
            }

            this.db.run('COMMIT');
            resolve({ id, ...recipeData });
          });
        });
      });
    });
  }

  // Delete recipe
  async deleteRecipe(id) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM recipes WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
          return;
        }

        resolve(this.changes > 0);
      });
    });
  }

  // Search recipes by ingredient
  async searchByIngredient(ingredientName) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT DISTINCT r.*
        FROM recipes r
        JOIN ingredients i ON r.id = i.recipe_id
        WHERE i.name LIKE ?
        ORDER BY r.created_at DESC
      `;

      this.db.all(query, [`%${ingredientName}%`], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        const recipes = rows.map(row => new Recipe(row).toJSON());
        resolve(recipes);
      });
    });
  }
}

module.exports = RecipeService;