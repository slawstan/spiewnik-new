import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Global } from '../global';
import { AuthService } from '../auth/auth.service';
import { withCache } from '@ngneat/cashew';


@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private http: HttpClient, public router: Router, private authService: AuthService) { }

  getPostsForCategory(categoryId: number): Observable<any> {
    let api = `${Global.apiUrl}/posts?categories=${categoryId}&orderby=waznosc&per_page=100&order=asc`;
    return this.http.get(api, { headers: Global.headers, context: withCache({
      version: 'v1',
      key: `posts?cat=${categoryId}`,
      ttl: 3153600000
    }) }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.authService.handleError)
    );
  }

  getPost(postId: number): Observable<any> {
    let api = `${Global.apiUrl}/posts/${postId}`;
    return this.http.get(api, { headers: Global.headers, context: withCache({
      version: 'v1',
      key: `posts/${postId}`,
      ttl: 3153600000
    }) }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.authService.handleError)
    );
  }

  getSearchPosts(searchVal: string): Observable<any> {
    let api = `${Global.apiUrl}/posts?search=${searchVal}, "&orderby=title&per_page=100&order=asc`;
    return this.http.get(api, { headers: Global.headers, context: withCache({
      version: 'v1',
      key: `search/${searchVal}`,
      ttl: 3153600000
    }) }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.authService.handleError)
    );
  }

}
