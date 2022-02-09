import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 
    'This is simply a test.', 
    'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg', 
    [
      new Ingredient("meat", 5), 
      new Ingredient("fries", 15)
    ]),
    new Recipe('A Test2', 
    'This is simply a test2.', 
    'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg', 
    [
      new Ingredient("toes", 65), 
      new Ingredient("fingers", 1)
    ])
  ];
  getRecipe(id: number): Recipe{
    return this.recipes[id];
  }
  getRecipeId(recipe: Recipe){
    return this.recipes.indexOf(recipe);
  }
  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }
}
