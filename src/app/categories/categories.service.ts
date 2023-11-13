import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Global } from '../global';
import { AuthService } from '../auth/auth.service';
import { Category } from '../types/interfaces/Category';
import { ResponseMessages } from 'src/environments/environment.prod';

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
      tap(res => console.log(`Przed transformacją: ${res}`)),
      map(res => res.map(x => {
       return {
         name: x.name,
         id: x.id
       }
      }
      )),
      tap(value => console.log(`Po transformacji: ${value}`)),
      catchError(this.authService.handleError),
      tap((x) => this.HandleResponse(x))
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

