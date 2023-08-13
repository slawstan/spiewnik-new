import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiCacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();

  private endpointsToCache = new Set([

  ])

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  const cachedResponse = this.cache.get(request.url);

  if(cachedResponse){
    return of(cachedResponse);
  }

  return next.handle(request)
    .pipe(tap(response => {
        if (response instanceof HttpResponse) {
            this.cache.set(request.url, response);
        }
    }));


  return next.handle(request);

  }

}
