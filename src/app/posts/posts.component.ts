import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from 'src/types/interfaces/Post';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post: Post = {  } as Post;

  category = "";
  search = "";

  posts: Post[] =[] as Post[];

  posts1: Post[] =[]as Post[];

constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router){}

open(path: string) {
  this.router.navigateByUrl(path);
}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
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
        this.postsService.getPostsForCategory(id).subscribe((posts) => {
          this.posts = posts;
        });
      }
    })
  }

  goBack() {
    window.history.back();
  }

}
