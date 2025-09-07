const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor(dbPath = './recipes.db') {
        this.dbPath = dbPath;
        this.db = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err.message);
                    reject(err);
                } else {
                    console.log('Connected to SQLite database');
                    resolve();
                }
            });
        });
    }

    initialize() {
        return new Promise((resolve, reject) => {
            const createRecipesTable = `
                CREATE TABLE IF NOT EXISTS recipes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    instructions TEXT,
                    prep_time INTEGER,
                    cook_time INTEGER,
                    servings INTEGER,
                    category TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `;

            const createIngredientsTable = `
                CREATE TABLE IF NOT EXISTS ingredients (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    recipe_id INTEGER,
                    name TEXT NOT NULL,
                    quantity REAL,
                    unit TEXT,
                    FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE
                )
            `;

            const createNutritionTable = `
                CREATE TABLE IF NOT EXISTS nutrition (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    recipe_id INTEGER,
                    calories INTEGER,
                    protein REAL,
                    carbs REAL,
                    fat REAL,
                    fiber REAL,
                    sugar REAL,
                    sodium INTEGER,
                    FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE
                )
            `;

            this.db.serialize(() => {
                this.db.run(createRecipesTable, (err) => {
                    if (err) {
                        console.error('Error creating recipes table:', err);
                        reject(err);
                        return;
                    }
                });

                this.db.run(createIngredientsTable, (err) => {
                    if (err) {
                        console.error('Error creating ingredients table:', err);
                        reject(err);
                        return;
                    }
                });

                this.db.run(createNutritionTable, (err) => {
                    if (err) {
                        console.error('Error creating nutrition table:', err);
                        reject(err);
                        return;
                    }
                });

                console.log('Database tables initialized');
                resolve();
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) {
                        console.error('Error closing database:', err.message);
                        reject(err);
                    } else {
                        console.log('Database connection closed');
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

// Create and export a single database instance
const db = new Database();

// Export the database instance and connect/initialize
module.exports = db;

// Auto-connect and initialize if this file is run directly
if (require.main === module) {
    db.connect()
        .then(() => db.initialize())
        .then(() => {
            console.log('Database setup complete');
            process.exit(0);
        })
        .catch(err => {
            console.error('Database setup failed:', err);
            process.exit(1);
        });
}