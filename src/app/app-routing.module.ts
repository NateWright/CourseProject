import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard.service';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe-book/recipe-resolver.service';
import { RecipeStartComponent } from './recipe-book/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },{
    path: 'recipes',
    component: RecipeBookComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },{
        path: 'new',
        component: RecipeEditComponent
      },{
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService]
      },{
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService]
      },{
        path: '**',
        redirectTo: ''
      }
    ]
  },{
    path: 'shopping-list',
    component: ShoppingListComponent
  },{
    path: 'auth',
    component: AuthComponent
  },{
    path: '**',
    redirectTo: '/recipes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
