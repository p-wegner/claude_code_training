const express = require('express');
const router = express.Router();

// Get all recipes
router.get('/', (req, res) => {
  const db = req.db;
  
  const query = `
    SELECT r.*, 
           json_group_array(
             json_object('id', i.id, 'name', i.name, 'quantity', i.quantity, 'unit', i.unit)
           ) as ingredients
    FROM recipes r
    LEFT JOIN ingredients i ON r.id = i.recipe_id
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching recipes:', err);
      return res.status(500).json({ error: 'Failed to fetch recipes' });
    }

    // Parse JSON ingredients
    const recipes = rows.map(row => ({
      ...row,
      ingredients: row.ingredients ? JSON.parse(row.ingredients) : []
    }));

    res.json(recipes);
  });
});

// Get recipe by ID
router.get('/:id', (req, res) => {
  const db = req.db;
  const recipeId = req.params.id;

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

  db.get(query, [recipeId], (err, row) => {
    if (err) {
      console.error('Error fetching recipe:', err);
      return res.status(500).json({ error: 'Failed to fetch recipe' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const recipe = {
      ...row,
      ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
      nutrition: row.nutrition ? JSON.parse(row.nutrition)[0] : null
    };

    res.json(recipe);
  });
});

// Create new recipe
router.post('/', (req, res) => {
  const db = req.db;
  const { title, description, instructions, prep_time, cook_time, servings, category, ingredients } = req.body;

  // Validation
  if (!title || !instructions) {
    return res.status(400).json({ error: 'Title and instructions are required' });
  }

  // Start transaction
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Insert recipe
    const insertRecipe = `
      INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, category)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(insertRecipe, [title, description, instructions, prep_time, cook_time, servings, category], function(err) {
      if (err) {
        console.error('Error creating recipe:', err);
        db.run('ROLLBACK');
        return res.status(500).json({ error: 'Failed to create recipe' });
      }

      const recipeId = this.lastID;

      // Insert ingredients if provided
      if (ingredients && ingredients.length > 0) {
        const insertIngredient = 'INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES (?, ?, ?, ?)';
        
        ingredients.forEach(ingredient => {
          db.run(insertIngredient, [recipeId, ingredient.name, ingredient.quantity, ingredient.unit], (err) => {
            if (err) {
              console.error('Error creating ingredient:', err);
              db.run('ROLLBACK');
            }
          });
        });
      }

      db.run('COMMIT');
      res.status(201).json({ 
        id: recipeId, 
        message: 'Recipe created successfully',
        recipe: { title, description, instructions, prep_time, cook_time, servings, category }
      });
    });
  });
});

// Update recipe
router.put('/:id', (req, res) => {
  const db = req.db;
  const recipeId = req.params.id;
  const { title, description, instructions, prep_time, cook_time, servings, category, ingredients } = req.body;

  // Validation
  if (!title || !instructions) {
    return res.status(400).json({ error: 'Title and instructions are required' });
  }

  // Start transaction
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Update recipe
    const updateRecipe = `
      UPDATE recipes 
      SET title = ?, description = ?, instructions = ?, prep_time = ?, cook_time = ?, servings = ?, category = ?
      WHERE id = ?
    `;

    db.run(updateRecipe, [title, description, instructions, prep_time, cook_time, servings, category, recipeId], function(err) {
      if (err) {
        console.error('Error updating recipe:', err);
        db.run('ROLLBACK');
        return res.status(500).json({ error: 'Failed to update recipe' });
      }

      if (this.changes === 0) {
        db.run('ROLLBACK');
        return res.status(404).json({ error: 'Recipe not found' });
      }

      // Delete existing ingredients
      db.run('DELETE FROM ingredients WHERE recipe_id = ?', [recipeId], (err) => {
        if (err) {
          console.error('Error deleting ingredients:', err);
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Failed to update ingredients' });
        }

        // Insert new ingredients if provided
        if (ingredients && ingredients.length > 0) {
          const insertIngredient = 'INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES (?, ?, ?, ?)';
          
          ingredients.forEach(ingredient => {
            db.run(insertIngredient, [recipeId, ingredient.name, ingredient.quantity, ingredient.unit], (err) => {
              if (err) {
                console.error('Error creating ingredient:', err);
                db.run('ROLLBACK');
              }
            });
          });
        }

        db.run('COMMIT');
        res.json({ 
          id: recipeId, 
          message: 'Recipe updated successfully',
          recipe: { title, description, instructions, prep_time, cook_time, servings, category }
        });
      });
    });
  });
});

// Delete recipe
router.delete('/:id', (req, res) => {
  const db = req.db;
  const recipeId = req.params.id;

  db.run('DELETE FROM recipes WHERE id = ?', [recipeId], function(err) {
    if (err) {
      console.error('Error deleting recipe:', err);
      return res.status(500).json({ error: 'Failed to delete recipe' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully' });
  });
});

// Search recipes by ingredient
router.get('/search/by-ingredient', (req, res) => {
  const db = req.db;
  const ingredientName = req.query.ingredient;

  if (!ingredientName) {
    return res.status(400).json({ error: 'Ingredient name is required' });
  }

  const query = `
    SELECT DISTINCT r.*
    FROM recipes r
    JOIN ingredients i ON r.id = i.recipe_id
    WHERE i.name LIKE ?
    ORDER BY r.created_at DESC
  `;

  db.all(query, [`%${ingredientName}%`], (err, rows) => {
    if (err) {
      console.error('Error searching recipes:', err);
      return res.status(500).json({ error: 'Failed to search recipes' });
    }

    res.json(rows);
  });
});

module.exports = router;