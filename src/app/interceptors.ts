import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LOCALE_ID } from '@angular/core';
import { SpinnerInterceptor } from './interceptors/SpinnerInterceptor';
import { CustomHttpInterceptor } from './interceptors/error.interceptor';


export const interceptorProviders =
   [
    { provide: LOCALE_ID, useValue: 'pl'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
];
