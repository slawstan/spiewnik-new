import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Global } from '../global';
import { AuthService } from '../auth/auth.service';
import { Category } from '../types/interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, public router: Router, private authService: AuthService) { }

  private options = {
    headers: Global.headers
  };


  getAllCategories(): Observable<any> {
    let api = `${Global.apiUrl}/categories?orderby=data_do_kolejnosci&order=desc&per_page=100`;
    return this.http.get(api, this.options).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.authService.handleError)
    );
  }

  getCategories():Observable<Category[]> {
    let api = `${Global.apiUrl}/categories?orderby=data_do_kolejnosci&order=desc`;
    return this.http.get<Category[]>(api, this.options).pipe(
      map(res => res.map(x => {
       return {
         name: x.name,
         id: x.id
       }
      }
      )),
      catchError(this.authService.handleError)
      );
    }
}

