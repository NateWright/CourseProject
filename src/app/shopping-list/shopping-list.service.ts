import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  newIngredient = new EventEmitter<void>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addItem(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.newIngredient.emit()
  }
  
  addItems(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.newIngredient.emit()
  }
}
