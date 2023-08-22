import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, isDevMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextcomponentComponent } from './textcomponent/textcomponent.component';
//import { BooksComponent } from './books/books.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePL from '@angular/common/locales/pl';
import { BooksModule } from './books/books.module';
import { CartComponent } from './cart/cart.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {interceptorProviders} from './interceptors';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { RouterModule } from '@angular/router';
import { PostModule } from './posts/post.module';
import { SvgIconModule } from './svg-icon/svg-icon.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


registerLocaleData(localePL);

@NgModule({
  declarations: [
    AppComponent,
    TextcomponentComponent,
    CartComponent,
    UserProfileComponent,
    SplashScreenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BooksModule,
    CategoriesModule,
    PostsModule,
    PostModule,
    RouterModule,
    AuthModule,
    HttpClientModule,
    SvgIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' })
  ],
  providers: [HttpClient, interceptorProviders],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  /*
  providers: [{
    provide: HTTP_INTERCEPTORS,
    //useValue: 'pl',
    useClass: [AuthInterceptor, LoadingInterceptor],
    multi: true
  }],
  */
  bootstrap: [AppComponent]
})
export class AppModule { }

