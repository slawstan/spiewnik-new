import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

export const API_URL: string = environment.apiURL;
export const API_URL2: string = environment.apiURL2;
export const JWT_AUTH: string = environment.appJwtUrl;
export const HEADERS: HttpHeaders = environment.headers;

export const API_ENDPOINTS = {
  // Authentication
  user: API_URL + 'users?page=1',
  unit: API_URL + 'get-units',
  category: API_URL2 + 'categories?orderby=data_do_kolejnosci&order=desc&per_page=100',
  post: API_URL2 + 'posts?orderby=waznosc&big_per_page=1000&order=asc',
};
