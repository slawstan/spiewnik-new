import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { IPost, Post } from 'src/index-db/index-db-interfaces/post.interfaces';
import { DataService } from 'src/index-db/sevices/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppDatabase } from 'src/index-db/sevices/init.idb.service';
import { ICategory } from 'src/index-db/index-db-interfaces/category.interfaces';
import { DBSongs } from 'src/index-db/sevices/idb.song.model';
import { API_ENDPOINTS } from '../constants/endpoints';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post: IPost = {  } as Post;
  catId: string = '';
  category:string = "";
  search:string = "";

  posts: IPost[] =[] as Post[];

  allPosts: IPost[] =[]as Post[];

  categories: ICategory[] =[];

  categories2: ICategory[] =[];

constructor(private appDatabase: AppDatabase, private dataService: DataService, private postsService: PostsService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private element:ElementRef){}

/*
getCat(): void {
  console.log(this.route.snapshot.paramMap.get('categ'));
  this.category = this.route.snapshot.paramMap.get('categ')||'';
}
*/

  async ngOnInit() {


    //this.catId = this.router.parseUrl(this.router.url).queryParams['id']
/*
    this.catId = this.route.snapshot.paramMap.get('id') || '';
    this.search = this.route.snapshot.paramMap.get('search')||'';
    this.getCat();
*/

    //this.posts = (await this.dataService.getPostsByCategoryId(Number(this.catId))) as IPost[];

    const postsConst: IPost[] = [] as Post[];
/*
    this.allPosts = (await this.dataService.getListAsync(
      DBSongs.Post.TableName,
      API_ENDPOINTS.post,
    )) as IPost[];
*/
    this.allPosts = (await this.appDatabase.Post.toArray());

    //var allPostsCollection = this.appDatabase.Post.toCollection();

    //allPostsCollection.sort((a, b) => (a.propertyToSortBy < b.propertyToSortBy ? -1 : 1));
    //var sortedCollection = allPostsCollection.sortBy("acf.waznosc");
    //this.allPosts = sortedCollection;

    this.route.queryParams.subscribe(params => {
      this.category = params['categ'];
      this.catId = params['catId'];
      this.search = this.search = params['search'];

      if(this.catId != null)
      {
          const categoryId = this.catId;
          this.allPosts.forEach(function (post) {
            post.categories.forEach(function (val) {
                if(String(val) == categoryId) {
                  postsConst.push(post);
                }
                })
            });
      }
      const searchVal = this.search;
      if(this.search != null)
      {
        this.allPosts.forEach(function (post) {
          if( String(post.title.rendered).toLowerCase().includes(searchVal.toLowerCase()) || String(post.content.rendered).toLowerCase().includes(searchVal.toLowerCase()))
          {
            postsConst.push(post);
          }
        });
      }

      this.posts = postsConst.sort((a, b) => (a.acf.waznosc < b.acf.waznosc ? -1 : 1));;

    });

    //this.posts = await this.appDatabase.Post.where('title.rendered'.toLowerCase()).startsWithIgnoreCase('przyjd').toArray();



     /*
    const postTable = new DexieCrudService<IPost, number>(this.appDatabase.Post);

    const categoryId = this.catId;

    this.appDatabase.Post.mapToClass(Post);
    //this.posts = await this.appDatabase.Post.where({'title.rendered': 'przyjdz'}).toArray();
    this.allPosts = await this.appDatabase.Post.toArray();




    //console.log(this.posts);


    this.route.paramMap.subscribe((params: ParamMap) => {
        () => this.getCat();
        this.category = params.get('categ') || '';
      }
    );

    this.route.queryParams.subscribe(params => {
      this.category = params['categ'];
      let id = params['catId'];
      let searchVal = this.search = params['search'];
    });
    /*
      this.category = params['category'];
      let id = params['catId'];
      let searchVal = this.search = params['search'];
      if(searchVal != null)
      {
        this.postsService.getSearchPosts(searchVal).subscribe((posts) => {
          this.posts = posts;
        });
      }
      if(id != null)
      {


        try{
          this.postsService.getPostsForCategory(id).subscribe((posts) => {
            this.posts = posts;
          });
        }
        catch{
          this.goBack();
        }

      }
    })
    */
  }

  goBack() {
    window.history.back();
  }

}
