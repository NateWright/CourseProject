import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  newIngredient = new Subject<void>();
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addItem(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.newIngredient.next();
  }
  
  addItems(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.newIngredient.next();
  }
  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.newIngredient.next();
  }
  removeIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.newIngredient.next();
  }
}
