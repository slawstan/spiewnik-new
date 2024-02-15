import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../constants/services/token.service';

export interface IUserLogin {
  id?: number
  name?: string
  username: string
  login?: string
  password: string
  email?:  string
  nicename?: string
  firstName?: string
  lastName?: string
  displayName?: string
  slug?: string
}


export class UserLogin implements IUserLogin {
  id = 0;
  name = '';
  username = '';
  login = '';
  password = '';
  email = '';
  nicename = '';
  firstName = '';
  lastName = '';
  displayName = '';
  slug = '';

}


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient, public router: Router) {}

  intercept(
            req: HttpRequest<any>,
            next: HttpHandler
          ): Observable<HttpEvent<any>> {

            console.log('Geting Barer');
            const authToken = this.tokenStorageService.getAccessToken();
            const clonedRequest = req.clone({ setHeaders: {
              Authorization: "Bearer " + authToken
            } });
            return next.handle(clonedRequest);
          }

}
