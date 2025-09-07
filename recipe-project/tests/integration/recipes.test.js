const request = require('supertest');
const app = require('../../server');

describe('Recipe API', () => {
  let db;

  beforeAll(() => {
    // Setup test database
    db = require('../../src/database');
  });

  afterAll(() => {
    // Clean up
    if (db) {
      db.close();
    }
  });

  beforeEach(() => {
    // Clear tables before each test
    db.run('DELETE FROM ingredients');
    db.run('DELETE FROM recipes');
  });

  describe('GET /api/recipes', () => {
    it('should return empty array when no recipes exist', async () => {
      const response = await request(app)
        .get('/api/recipes')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all recipes', async () => {
      // Insert test recipe
      await db.run(`
        INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['Test Recipe', 'Test Description', 'Test Instructions', 10, 20, 4, 'test']);

      const response = await request(app)
        .get('/api/recipes')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Test Recipe');
    });
  });

  describe('POST /api/recipes', () => {
    it('should create a new recipe', async () => {
      const recipeData = {
        title: 'New Recipe',
        description: 'New Description',
        instructions: 'New Instructions',
        prep_time: 15,
        cook_time: 25,
        servings: 4,
        category: 'test',
        ingredients: [
          { name: 'test ingredient', quantity: 1, unit: 'cup' }
        ]
      };

      const response = await request(app)
        .post('/api/recipes')
        .send(recipeData)
        .expect(201);

      expect(response.body.title).toBe('New Recipe');
      expect(response.body.id).toBeDefined();
    });

    it('should return error for missing required fields', async () => {
      const recipeData = {
        title: 'Incomplete Recipe'
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/recipes')
        .send(recipeData)
        .expect(400);

      expect(response.body.error).toContain('required');
    });
  });

  describe('GET /api/recipes/:id', () => {
    it('should return recipe by ID', async () => {
      // Insert test recipe
      const result = await db.run(`
        INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['Test Recipe', 'Test Description', 'Test Instructions', 10, 20, 4, 'test']);

      const recipeId = result.lastID;

      const response = await request(app)
        .get(`/api/recipes/${recipeId}`)
        .expect(200);

      expect(response.body.title).toBe('Test Recipe');
    });

    it('should return 404 for non-existent recipe', async () => {
      const response = await request(app)
        .get('/api/recipes/99999')
        .expect(404);

      expect(response.body.error).toBe('Recipe not found');
    });
  });

  describe('PUT /api/recipes/:id', () => {
    it('should update existing recipe', async () => {
      // Insert test recipe
      const result = await db.run(`
        INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['Original Recipe', 'Original Description', 'Original Instructions', 10, 20, 4, 'test']);

      const recipeId = result.lastID;

      const updateData = {
        title: 'Updated Recipe',
        description: 'Updated Description',
        instructions: 'Updated Instructions',
        prep_time: 15,
        cook_time: 25,
        servings: 6,
        category: 'updated',
        ingredients: [
          { name: 'updated ingredient', quantity: 2, unit: 'cups' }
        ]
      };

      const response = await request(app)
        .put(`/api/recipes/${recipeId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe('Updated Recipe');
    });

    it('should return 404 for non-existent recipe', async () => {
      const updateData = {
        title: 'Updated Recipe',
        instructions: 'Updated Instructions'
      };

      const response = await request(app)
        .put('/api/recipes/99999')
        .send(updateData)
        .expect(404);

      expect(response.body.error).toBe('Recipe not found');
    });
  });

  describe('DELETE /api/recipes/:id', () => {
    it('should delete existing recipe', async () => {
      // Insert test recipe
      const result = await db.run(`
        INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['Recipe to Delete', 'Description', 'Instructions', 10, 20, 4, 'test']);

      const recipeId = result.lastID;

      const response = await request(app)
        .delete(`/api/recipes/${recipeId}`)
        .expect(200);

      expect(response.body.message).toBe('Recipe deleted successfully');

      // Verify recipe is deleted
      await request(app)
        .get(`/api/recipes/${recipeId}`)
        .expect(404);
    });

    it('should return 404 for non-existent recipe', async () => {
      const response = await request(app)
        .delete('/api/recipes/99999')
        .expect(404);

      expect(response.body.error).toBe('Recipe not found');
    });
  });

  describe('GET /api/recipes/search/by-ingredient', () => {
    it('should search recipes by ingredient', async () => {
      // Insert test recipe with ingredient
      const result = await db.run(`
        INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['Recipe with Chicken', 'Description', 'Instructions', 10, 20, 4, 'test']);

      const recipeId = result.lastID;

      // Add ingredient
      await db.run(`
        INSERT INTO ingredients (recipe_id, name, quantity, unit)
        VALUES (?, ?, ?, ?)
      `, [recipeId, 'chicken', 1, 'lb']);

      const response = await request(app)
        .get('/api/recipes/search/by-ingredient?ingredient=chicken')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Recipe with Chicken');
    });

    it('should return empty array for no matches', async () => {
      const response = await request(app)
        .get('/api/recipes/search/by-ingredient?ingredient=nonexistent')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});