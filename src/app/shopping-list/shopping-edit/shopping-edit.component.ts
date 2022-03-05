import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { 
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    );
  }

  ngOnInit(): void {  }

  // addItem(){
  //   const name = this.nameInput.nativeElement.value;
  //   const amount = this.amountInput.nativeElement.value;
  //   this.shoppingListService.addItem(new Ingredient(name, amount));
  // }

  onSubmit(f: NgForm){
    const name = f.value.name;
    const amount = f.value.amount;
    const newIngredient = new Ingredient(name, amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
    } else{
      this.shoppingListService.addItem(newIngredient);
    }
    this.editMode = false;
    f.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.onClear();
    this.shoppingListService.removeIngredient(this.editItemIndex);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
