import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories.component';
import { CategoriesService } from './categories.service';
import { CategoryComponent } from './category/category.component';



@NgModule({
  declarations: [CategoriesComponent, CategoryComponent],
  providers: [CategoriesService],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [CategoriesComponent]
})
export class CategoriesModule { }
