import {Injectable} from '@angular/core';
import {HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export const IGNORED_STATUSES = new HttpContextToken<number[]>(() => []);
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const ignoredStatuses = req.context.get(IGNORED_STATUSES);

    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {

        // if ignored statuses are set
        // and returned status matched
        if(e.error.statusCode == 403 && e.error.code == 'incorrect_password') {
          return throwError(() => e);
        }
        if (ignoredStatuses?.includes(e.status)) {
          // rethrow error to be catched locally
          return throwError(() => e);
        }

        // process error...
        console.log('error interceptor !!', e);
        return of();
      })
    );
  }
}
