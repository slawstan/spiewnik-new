import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable, catchError, throwError} from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //this.loadingService.startLoader();
      const authToken = this.authService.getToken();
      const clonedRequest = req.clone({ setHeaders: {
        Authorization: "Bearer " + authToken
      } });
      return next.handle(clonedRequest).pipe()
    }
  }
