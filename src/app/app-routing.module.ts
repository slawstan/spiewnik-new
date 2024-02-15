import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { BooksComponent } from './books/books.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';

const routes: Routes = [
  {path:'', component:CategoriesComponent, canActivate:[AuthGuard]},
  {path:'books',component:BooksComponent},
  {path:'cart',component:CartComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user-profile/:id',component:UserProfileComponent, canActivate:[AuthGuard]},
  {path:'category', component: PostsComponent, canActivate:[AuthGuard]},
  {path:'search', component: PostsComponent, canActivate:[AuthGuard]},
  {path: 'posts/:id',   component: PostComponent,   canActivate:[AuthGuard]},
  {path: 'posts/:id/edit',   component: PostComponent,   canActivate:[AuthGuard]},
  {path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
