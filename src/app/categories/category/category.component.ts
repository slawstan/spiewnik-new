import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/types/interfaces/Category';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categ: Category = {} as Category;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

}
