const express = require('express');
const router = express.Router();

// Get all ingredients
router.get('/', (req, res) => {
  const db = req.db;
  
  db.all('SELECT * FROM ingredients ORDER BY name', [], (err, rows) => {
    if (err) {
      console.error('Error fetching ingredients:', err);
      return res.status(500).json({ error: 'Failed to fetch ingredients' });
    }
    res.json(rows);
  });
});

// Get ingredient by ID
router.get('/:id', (req, res) => {
  const db = req.db;
  const ingredientId = req.params.id;

  db.get('SELECT * FROM ingredients WHERE id = ?', [ingredientId], (err, row) => {
    if (err) {
      console.error('Error fetching ingredient:', err);
      return res.status(500).json({ error: 'Failed to fetch ingredient' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    res.json(row);
  });
});

// Get ingredients by recipe ID
router.get('/recipe/:recipeId', (req, res) => {
  const db = req.db;
  const recipeId = req.params.recipeId;

  db.all('SELECT * FROM ingredients WHERE recipe_id = ? ORDER BY name', [recipeId], (err, rows) => {
    if (err) {
      console.error('Error fetching ingredients for recipe:', err);
      return res.status(500).json({ error: 'Failed to fetch ingredients' });
    }
    res.json(rows);
  });
});

// Convert units
router.get('/convert/:fromUnit/:toUnit', (req, res) => {
  const { fromUnit, toUnit } = req.params;
  const amount = parseFloat(req.query.amount);

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }

  const conversions = {
    'cups': { 'tbsp': 16, 'tsp': 48, 'ml': 236.588, 'l': 0.236588 },
    'tbsp': { 'cups': 0.0625, 'tsp': 3, 'ml': 14.787, 'l': 0.014787 },
    'tsp': { 'cups': 0.020833, 'tbsp': 0.333333, 'ml': 4.929, 'l': 0.004929 },
    'ml': { 'cups': 0.004227, 'tbsp': 0.067628, 'tsp': 0.202884, 'l': 0.001 },
    'l': { 'cups': 4.22675, 'tbsp': 67.628, 'tsp': 202.884, 'ml': 1000 },
    'oz': { 'g': 28.3495, 'lb': 0.0625 },
    'g': { 'oz': 0.035274, 'lb': 0.00220462 },
    'lb': { 'oz': 16, 'g': 453.592 }
  };

  const fromLower = fromUnit.toLowerCase();
  const toLower = toUnit.toLowerCase();

  if (!conversions[fromLower] || !conversions[fromLower][toLower]) {
    return res.status(400).json({ error: 'Unsupported unit conversion' });
  }

  const convertedAmount = amount * conversions[fromLower][toLower];
  
  res.json({
    from: { amount, unit: fromUnit },
    to: { amount: convertedAmount, unit: toUnit },
    conversion: conversions[fromLower][toLower]
  });
});

// Create new ingredient
router.post('/', (req, res) => {
  const db = req.db;
  const { recipe_id, name, quantity, unit } = req.body;

  // Validation
  if (!recipe_id || !name || quantity === undefined || !unit) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than 0' });
  }

  const query = 'INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES (?, ?, ?, ?)';
  
  db.run(query, [recipe_id, name, quantity, unit], function(err) {
    if (err) {
      console.error('Error creating ingredient:', err);
      return res.status(500).json({ error: 'Failed to create ingredient' });
    }

    res.status(201).json({ 
      id: this.lastID, 
      recipe_id, 
      name, 
      quantity, 
      unit,
      message: 'Ingredient created successfully'
    });
  });
});

// Update ingredient
router.put('/:id', (req, res) => {
  const db = req.db;
  const ingredientId = req.params.id;
  const { recipe_id, name, quantity, unit } = req.body;

  // Validation
  if (!recipe_id || !name || quantity === undefined || !unit) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than 0' });
  }

  const query = 'UPDATE ingredients SET recipe_id = ?, name = ?, quantity = ?, unit = ? WHERE id = ?';
  
  db.run(query, [recipe_id, name, quantity, unit, ingredientId], function(err) {
    if (err) {
      console.error('Error updating ingredient:', err);
      return res.status(500).json({ error: 'Failed to update ingredient' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    res.json({ 
      id: ingredientId, 
      recipe_id, 
      name, 
      quantity, 
      unit,
      message: 'Ingredient updated successfully'
    });
  });
});

// Delete ingredient
router.delete('/:id', (req, res) => {
  const db = req.db;
  const ingredientId = req.params.id;

  db.run('DELETE FROM ingredients WHERE id = ?', [ingredientId], function(err) {
    if (err) {
      console.error('Error deleting ingredient:', err);
      return res.status(500).json({ error: 'Failed to delete ingredient' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    res.json({ message: 'Ingredient deleted successfully' });
  });
});

module.exports = router;