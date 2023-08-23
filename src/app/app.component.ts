import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import{ Global } from './global';
import { SearchForm } from './types/interfaces/SearchForm';
import { Post } from './types/interfaces/Post';
import { PostsService } from './posts/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Śpiewnik';
  form: SearchForm = {
    searchValue: '',
  };
  searchVal:string  = '';
  posts: Post[] =[] as Post[];


  constructor(private authService: AuthService, private router: Router) {}


    ngOnInit(): void {
      //initializeApp(firebaseConfig);

      let node = document.createElement('script');
      node.src = "/assets/js/myScript.js";
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';

      var el = document.getElementsByTagName('body')[0];

      el.appendChild(node);


    }

    isAuthenticated(){
      return this.authService.isLoggedIn;
    }

    logout(){
      this.authService.logout();
    }

    goBack() {
      window.history.back();
    }

    submit() {
      this.searchVal = this.form.searchValue;
      this.router.navigate(['/', 'category'], {queryParams: {search: this.searchVal}});
    }

    eventClickMethod(event:any){
      if(event.keyCode == 13){
        var link = document.getElementById('close');
        link?.click();
      }
   }

   mobileLinkClick()
   {
    var link = document.getElementById('close');
        link?.click();
   }

}
