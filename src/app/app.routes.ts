import { Routes } from '@angular/router';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { MyRecipeListComponent } from './recipes/my-recipe-list/my-recipe-list.component';
import { GlobalRecipeListComponent } from './recipes/global-recipe-list/global-recipe-list.component';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { authGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  { path: 'my-recipes', pathMatch: 'full', component: MyRecipeListComponent },
  {
    path: 'global-list',
    component: GlobalRecipeListComponent,
  },
  {
    path: 'new-recipe',
    canActivate: [authGuard],
    component: CreateRecipeComponent,
  },
  {
    path: 'new-recipe/:id',
    canActivate: [authGuard],
    component: CreateRecipeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'global-list' },
];
