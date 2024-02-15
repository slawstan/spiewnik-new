import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Router } from '@angular/router';
import { DataService } from 'src/index-db/sevices/data.service';
import { API_ENDPOINTS } from '../constants/endpoints';
import { ICategory } from 'src/index-db/index-db-interfaces/category.interfaces';
import { IPost } from 'src/index-db/index-db-interfaces/post.interfaces';
import { DBSongs } from 'src/index-db/sevices/idb.song.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  implements OnInit {

  categories: ICategory[] =[];
  posts: IPost[] =[];

  categories2: ICategory[] =[];

  constructor(private dataService: DataService,
    private service: CategoriesService, private router: Router){}

    open(path: string) {
      this.router.navigateByUrl(path);
    }

//constructor(private categoriesService: CategoriesService){}

  async ngOnInit() {

    this.categories = (await this.dataService.getListAsync(
      DBSongs.Category.TableName,
      API_ENDPOINTS.category,
    )) as ICategory[];
    //console.log(this.categories);
    this.categories2 = this.categories;

    this.posts = (await this.dataService.getListAsync(
      DBSongs.Post.TableName,
      API_ENDPOINTS.post,
    )) as IPost[];
   // console.log(this.posts);

/*
    this.service.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      //console.log(this.categories);
    });
    this.service.getCategories().subscribe((categories2) => {
      this.categories2 = categories2;
    });
    */
  }
}
