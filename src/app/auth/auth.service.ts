import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/types/interfaces/Auth';
import { RegisterForm } from 'src/types/interfaces/Register';
import { User } from 'src/types/interfaces/User';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Global } from '../global';
import { withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //isAuthenticated: boolean = false;
  isLoading: boolean = false;
  passwordMatched: boolean = true;


  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${Global.appJwtUrl}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  //https://slawek-staniec.pl/blogapp/wp-json/jwt-auth/v1/token
  // Sign-in
  signIn(user: User) {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    return this.http
      .post<any>(`${Global.appJwtUrl}/token`, formData)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('user', res.data.id);
        this.getUserProfile(res.data.id).subscribe((res) => {
          this.currentUser = res;
          //this.router.navigate(['user-profile/' + res.id]);
          this.router.navigate(['/' + res.id]);
        });
        //this.router.navigate(['']);
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeUser = localStorage.removeItem('user');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  // https://slawek-staniec.pl/blogapp/wp-json/wp/v2/posts',
  getUserProfile(id: any): Observable<any> {
    let api = `${Global.apiUrl}/users/${id}`;
    return this.http.get(api, { headers: Global.headers, context: withCache({
      version: 'v1',
      key: `users/${id}`,
      ttl: 3153600000
    }) }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  login(form: LoginForm){

    if(this.isLoading) return;

    this.isLoading = true;
  }

  register(form: RegisterForm){
    if(this.isLoading) return;

      this.isLoading = true;

      if(form.password !== form.passwordConfirm)
      {
        this.passwordMatched = false;
        return;
      }
    }

    logout(){
      this.doLogout();
    }
}











    /*
  login(form: LoginForm){

    if(this.isLoading) return;

    this.isLoading = true;


    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          this.isAuthenticated = true;
          this.router.navigate(['']);
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.isAuthenticated = false;
        })
        .finally(()=>(this.isLoading = false));

  }

  register(form: RegisterForm){
    if(this.isLoading) return;

      this.isLoading = true;

      if(form.password !== form.passwordConfirm)
      {
        this.passwordMatched = false;
        return;
      }
      /*
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, form.email, form.password)
          .then((userCredential) => {
            this.isAuthenticated = true;
            this.router.navigate(['']);
          })
          .catch((error) => {
            this.isAuthenticated = false;
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          })
          .finally(()=>(this.isLoading = false));

  }

    logout(){

      /*
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        this.isAuthenticated = false;
        this.router.navigate(['login']);
      }).catch((error) => {
        // An error happened.
      });

    }

}
    */
