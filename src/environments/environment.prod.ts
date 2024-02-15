import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  apiURL: 'https://reqres.in/api/',
  apiURL2: 'https://slawek-staniec.pl/blogapp/wp-json/wp/v2/',
  appJwtUrl: 'https://slawek-staniec.pl/blogapp/wp-json/jwt-auth/v1',
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
};

export const ResponseMessages = {
  serverError:
    'there is an error while getting the data. please try again later',
}
