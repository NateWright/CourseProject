import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard.service';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

const routes: Routes = [
  {
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeBookRoutingModule { }
