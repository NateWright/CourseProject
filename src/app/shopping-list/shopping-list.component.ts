import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  newIngredientSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.newIngredientSub = this.shoppingListService.newIngredient.subscribe(
      () => {
        this.ingredients = this.shoppingListService.getIngredients();
      }
    );
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
      this.newIngredientSub.unsubscribe();
  }

}
