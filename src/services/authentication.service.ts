import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BASE_PORT, BASE_SCHEME } from '../config/api.config';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


interface LoginResponse { token: string; }
@Injectable()
export class AuthenticationService {
    public token: string;
    redirectUrl: string;

    constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    getToken(): string {
      return this.jwtHelperService.tokenGetter();
    }

  isExpectedRole(expectedRole) {
    const token: string = this.jwtHelperService.tokenGetter();

    if (!token || this.jwtHelperService.decodeToken(token).role !== expectedRole) {
      return false;
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

    return !tokenExpired;
  }

    isLoggedIn() {
      const token: string = this.jwtHelperService.tokenGetter();

      if (!token) {
        return false;
      }

      const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

      return !tokenExpired;
    }

    login(username: string, password: string): Observable<boolean> {
        const httpOptions = {headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' })};

        return this.http.post(this.getAPIUrl() + '/auth/login/',
          {username: username, password: password}, httpOptions)
            .map((data: LoginResponse) => {this.token = data.token;
              console.log(this.jwtHelperService.decodeToken(this.token));
              localStorage.setItem('access_token', this.token);
              localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));
              console.log(data);
              if (data.token) {return true; } else {return false; };
            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    userRole() {
      let results: string[];
      const httpOptions = {headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' })};
      this.http.get(this.getAPIUrl() + '/auth/user/',
          httpOptions).subscribe(data => {results = data['results']; });
      console.log(results);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
    }

    getAPIUrl(): string {
      // return (BASE_SCHEME + window.location.hostname + ':' + BASE_PORT);
      return (BASE_SCHEME + 'metalprogettitest.inforum.io/api/cashupfr');
     }
}
