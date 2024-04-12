import { Routes } from '@angular/router';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { MyRecipeListComponent } from './recipes/my-recipe-list/my-recipe-list.component';
import { GlobalRecipeListComponent } from './recipes/global-recipe-list/global-recipe-list.component';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';

export const routes: Routes = [
    { path: 'my-recipe', pathMatch: 'full', component: MyRecipeListComponent },
    { path: 'global-list', component: GlobalRecipeListComponent },
    { path: 'new-recipe', component: CreateRecipeComponent },
    { path: 'new-recipe/:id', component: CreateRecipeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: 'my-recipe'}
];
