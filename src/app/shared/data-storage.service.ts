import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipe-book/recipe.model';
import { RecipeService } from '../recipe-book/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private url = 'https://courseproject-recipebook-716ae-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(this.url + 'recipes.json', recipes);
  }

  loadRecipes() {
    return this.http
    .get(this.url + 'recipes.json')
    .pipe(map(
      (recipes: Recipe[]) => {
        return recipes.map(
          (recipe: Recipe) => {
            if(!recipe.ingredients){
              recipe.ingredients = [];
            }
            return recipe;
          }
        );
      }),
      tap(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      )
    );
  }
}
