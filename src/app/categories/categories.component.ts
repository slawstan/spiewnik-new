import { Component, OnInit } from '@angular/core';
import { Category } from 'src/types/interfaces/Category';
import { CategoriesService } from './categories.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  implements OnInit {

  category: Category = {};

  categories: Category[] =[];
  categories2: Category[] =[];

  constructor(
    private service: CategoriesService, private router: Router){}

    open(path: string) {
      this.router.navigateByUrl(path);
    }

//constructor(private categoriesService: CategoriesService){}

  ngOnInit(): void {
    this.service.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      //console.log(this.categories);
    });
    this.service.getCategories().subscribe((categories2) => {
      this.categories2 = categories2;
    });
  }
}
