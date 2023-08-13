import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
) {}



canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //const user = this.authService.isLoggedIn;
  if (this.authService.isLoggedIn) {
      // authorised so return true
      return true;
  }

  // not logged in so redirect to login page with the return url
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
}

  //constructor(private authService: AuthService) {}
  //canActivate(){
  //  return this.authService.isLoggedIn;

  //}
}
