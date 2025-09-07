// Recipe Manager Frontend JavaScript

class RecipeManager {
    constructor() {
        this.recipes = [];
        this.currentRecipe = null;
        this.apiBase = '/api';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadRecipes();
    }

    bindEvents() {
        // Form submission
        document.getElementById('recipeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveRecipe();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchRecipes(e.target.value);
        });
    }

    async loadRecipes() {
        try {
            const response = await fetch(`${this.apiBase}/recipes`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.recipes = await response.json();
            this.renderRecipes();
        } catch (error) {
            console.error('Error loading recipes:', error);
            this.showError('Failed to load recipes');
        }
    }

    async saveRecipe() {
        const formData = new FormData(document.getElementById('recipeForm'));
        const recipeData = {
            title: formData.get('title'),
            description: formData.get('description'),
            instructions: formData.get('instructions'),
            prep_time: parseInt(formData.get('prep_time')) || 0,
            cook_time: parseInt(formData.get('cook_time')) || 0,
            servings: parseInt(formData.get('servings')) || 4,
            category: formData.get('category'),
            ingredients: this.getIngredientsFromForm()
        };

        try {
            const response = await fetch(`${this.apiBase}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            this.showSuccess('Recipe saved successfully!');
            this.resetForm();
            this.loadRecipes();
        } catch (error) {
            console.error('Error saving recipe:', error);
            this.showError('Failed to save recipe');
        }
    }

    getIngredientsFromForm() {
        const ingredients = [];
        const ingredientItems = document.querySelectorAll('.ingredient-item');
        
        ingredientItems.forEach(item => {
            const name = item.querySelector('.ingredient-name').value;
            const quantity = parseFloat(item.querySelector('.ingredient-quantity').value);
            const unit = item.querySelector('.ingredient-unit').value;
            
            if (name && quantity && unit) {
                ingredients.push({ name, quantity, unit });
            }
        });
        
        return ingredients;
    }

    renderRecipes(recipesToRender = this.recipes) {
        const recipeList = document.getElementById('recipeList');
        
        if (recipesToRender.length === 0) {
            recipeList.innerHTML = `
                <div class="empty-state">
                    <h3>No recipes found</h3>
                    <p>Start by adding your first recipe!</p>
                </div>
            `;
            return;
        }

        recipeList.innerHTML = recipesToRender.map(recipe => `
            <div class="recipe-card">
                <h3>${recipe.title}</h3>
                ${recipe.category ? `<span class="category">${recipe.category}</span>` : ''}
                <div class="time">
                    ⏱️ ${this.formatTime(recipe.prep_time + recipe.cook_time)} • 
                    👥 ${recipe.servings} servings
                </div>
                ${recipe.description ? `<p class="description">${recipe.description}</p>` : ''}
                
                ${recipe.ingredients && recipe.ingredients.length > 0 ? `
                    <div class="ingredients">
                        <h4>Ingredients:</h4>
                        <ul>
                            ${recipe.ingredients.map(ing => `
                                <li>${ing.quantity} ${ing.unit} ${ing.name}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${recipe.nutrition ? `
                    <div class="nutrition-info">
                        <h4>Nutrition (per serving):</h4>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">
                                <span>Calories:</span>
                                <span class="nutrition-value">${recipe.nutrition.calories}</span>
                            </div>
                            <div class="nutrition-item">
                                <span>Protein:</span>
                                <span class="nutrition-value">${recipe.nutrition.protein}g</span>
                            </div>
                            <div class="nutrition-item">
                                <span>Carbs:</span>
                                <span class="nutrition-value">${recipe.nutrition.carbs}g</span>
                            </div>
                            <div class="nutrition-item">
                                <span>Fat:</span>
                                <span class="nutrition-value">${recipe.nutrition.fat}g</span>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="actions">
                    <button class="btn-view" onclick="recipeManager.viewRecipe(${recipe.id})">View</button>
                    <button class="btn-edit" onclick="recipeManager.editRecipe(${recipe.id})">Edit</button>
                    <button class="btn-delete" onclick="recipeManager.deleteRecipe(${recipe.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    formatTime(minutes) {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    }

    async viewRecipe(id) {
        try {
            const response = await fetch(`${this.apiBase}/recipes/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const recipe = await response.json();
            this.currentRecipe = recipe;
            // This would open a modal or navigate to a detail page
            alert(`Viewing recipe: ${recipe.title}`);
        } catch (error) {
            console.error('Error viewing recipe:', error);
            this.showError('Failed to load recipe');
        }
    }

    async editRecipe(id) {
        try {
            const response = await fetch(`${this.apiBase}/recipes/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const recipe = await response.json();
            this.populateForm(recipe);
        } catch (error) {
            console.error('Error editing recipe:', error);
            this.showError('Failed to load recipe for editing');
        }
    }

    async deleteRecipe(id) {
        if (!confirm('Are you sure you want to delete this recipe?')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiBase}/recipes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.showSuccess('Recipe deleted successfully!');
            this.loadRecipes();
        } catch (error) {
            console.error('Error deleting recipe:', error);
            this.showError('Failed to delete recipe');
        }
    }

    populateForm(recipe) {
        document.getElementById('title').value = recipe.title || '';
        document.getElementById('description').value = recipe.description || '';
        document.getElementById('instructions').value = recipe.instructions || '';
        document.getElementById('prep_time').value = recipe.prep_time || '';
        document.getElementById('cook_time').value = recipe.cook_time || '';
        document.getElementById('servings').value = recipe.servings || 4;
        document.getElementById('category').value = recipe.category || '';

        // Clear existing ingredients
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = '';

        // Add recipe ingredients
        if (recipe.ingredients && recipe.ingredients.length > 0) {
            recipe.ingredients.forEach(ingredient => {
                this.addIngredientField(ingredient);
            });
        } else {
            this.addIngredientField();
        }
    }

    resetForm() {
        document.getElementById('recipeForm').reset();
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = '';
        this.addIngredientField();
    }

    searchRecipes(query) {
        if (!query.trim()) {
            this.renderRecipes();
            return;
        }

        const filtered = this.recipes.filter(recipe => 
            recipe.title.toLowerCase().includes(query.toLowerCase()) ||
            recipe.description.toLowerCase().includes(query.toLowerCase()) ||
            (recipe.ingredients && recipe.ingredients.some(ing => 
                ing.name.toLowerCase().includes(query.toLowerCase())
            ))
        );

        this.renderRecipes(filtered);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = type;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function addIngredient() {
    recipeManager.addIngredientField();
}

function removeIngredient(button) {
    const ingredientsList = document.getElementById('ingredientsList');
    if (ingredientsList.children.length > 1) {
        button.parentElement.remove();
    }
}

function searchRecipes() {
    const query = document.getElementById('searchInput').value;
    recipeManager.searchRecipes(query);
}

// Extend RecipeManager with ingredient field management
RecipeManager.prototype.addIngredientField = function(ingredient = null) {
    const ingredientsList = document.getElementById('ingredientsList');
    const ingredientItem = document.createElement('div');
    ingredientItem.className = 'ingredient-item';
    
    ingredientItem.innerHTML = `
        <input type="text" placeholder="Ingredient name" class="ingredient-name" value="${ingredient ? ingredient.name : ''}" required>
        <input type="number" placeholder="Quantity" class="ingredient-quantity" min="0" step="0.01" value="${ingredient ? ingredient.quantity : ''}" required>
        <input type="text" placeholder="Unit" class="ingredient-unit" value="${ingredient ? ingredient.unit : ''}" required>
        <button type="button" onclick="removeIngredient(this)">Remove</button>
    `;
    
    ingredientsList.appendChild(ingredientItem);
};

// Initialize the application
const recipeManager = new RecipeManager();

// Load initial data when page loads
document.addEventListener('DOMContentLoaded', () => {
    recipeManager.loadRecipes();
});