import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
} from '@angular/common/http';
import { Global } from '../global';
import { AuthService } from '../auth/auth.service';
import { ResponseMessages } from 'src/environments/environment.prod';
import { IGNORED_STATUSES } from '../interceptors/error.interceptor';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private options = {
    headers: Global.headers,
    context: new HttpContext().set(IGNORED_STATUSES, [504]),
  };
  constructor(private http: HttpClient, public router: Router, private authService: AuthService) { }

  getPostsForCategory(categoryId: number): Observable<any> {
    let api = `${Global.apiUrl}/posts?categories=${categoryId}&orderby=waznosc&per_page=100&order=asc`;
    return this.http.get(api, this.options).pipe(
      map((res) => {
        return res || {};
      })
    );
  }

  getPost(postId: number): Observable<any> {
    let api = `${Global.apiUrl}/posts/${postId}`;
    return this.http.get(api, this.options).pipe(
      map((res) => {
        return res || {};
      })
    );
  }

  getSearchPosts(searchVal: string): Observable<any> {
    let api = `${Global.apiUrl}/posts?search=${searchVal}, "&orderby=title&per_page=100&order=asc`;
    return this.http.get(api, this.options).pipe(
      map((res) => {
        return res || {};
      }),
    );
  }

  HandleResponse(response: any) {
    if (response.Status === 500) {
      alert(ResponseMessages.serverError);
    }
    else if (response.Status === 504) {
      alert(ResponseMessages.serverError);
    }
  }

}
