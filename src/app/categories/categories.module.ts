import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories.component';
import { CategoriesService } from './categories.service';
import { CategoryComponent } from './category/category.component';
import { SvgIconModule } from "../svg-icon/svg-icon.module";



@NgModule({
    declarations: [CategoriesComponent, CategoryComponent],
    providers: [CategoriesService],
    exports: [CategoriesComponent],
    imports: [
        CommonModule,
        FormsModule,
        SvgIconModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ],
})
export class CategoriesModule { }
