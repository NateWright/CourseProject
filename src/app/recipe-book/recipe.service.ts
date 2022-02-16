import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<void>();
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

  constructor() { }

  getRecipe(id: number): Recipe{
    return this.recipes[id];
  }
  getRecipeId(recipe: Recipe){
    return this.recipes.indexOf(recipe);
  }
  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next();
  }
  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipeChanged.next();
  }

  removeRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next();
  }


}
