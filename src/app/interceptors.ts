import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth/authconfig.interceptor';
import { LOCALE_ID } from '@angular/core';
import { SpinnerInterceptor } from './interceptors/SpinnerInterceptor';


export const interceptorProviders =
   [
    { provide: LOCALE_ID, useValue: 'pl'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
];
