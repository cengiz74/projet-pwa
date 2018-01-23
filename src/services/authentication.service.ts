// import {Injectable} from '@angular/core';
// import {Http, Headers, RequestOptions, Response} from '@angular/http';
// import {BASE_URI} from '../config/api.config';
// import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
//
// @Injectable()
// export class AuthenticationService {
//   public token: string;
//
//   constructor(private http: Http) {
//     // set token if saved in local storage
//     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     this.token = currentUser && currentUser.token;
//   }
//
//   login(username: string, password: string): Observable<boolean> {
//     let headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});
//     let options = new RequestOptions({headers: headers});
//
//     return this.http.post(BASE_URI + '/rest-auth/login/', JSON.stringify({email: username, password: password}), options)
//       .map((response: Response) => {
//         // login successful if there's a jwt token in the response
//         let token = response.json() && response.json().token;
//         if (token) {
//           // set token property
//           this.token = token;
//
//           // store username and jwt token in local storage to keep user logged in between page refreshes
//           localStorage.setItem('id_token', token);
//
//           // return true to indicate successful login
//           return true;
//         } else {
//           // return false to indicate failed login
//           return false;
//         }
//       });
//   }
//
//   logout(): void {
//     // clear token remove user from local storage to log user out
//     this.token = null;
//     localStorage.removeItem('currentUser');
//   }
// }

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Response, Http, Headers } from '@angular/http';
import { RESTService, HttpInterceptorService } from '@covalent/http';
import { BASE_URI } from '../config/api.config';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

  login(username: string, password: string): Observable<boolean> {
    let httpOptions = {headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'})};
    return this.http.post(BASE_URI + '/rest-auth/login/', JSON.stringify({email: username, password: password}), httpOptions)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('id_token', token);

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          alert('No token');
          return false;
        }
      });
  }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}


// import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import { Response, Http, Headers } from '@angular/http';
// import { RESTService, HttpInterceptorService } from '@covalent/http';
// import { BASE_URI } from '../config/api.config';
//
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
//
// @Injectable()
// export class AuthenticationService {
//     public token: string;
//
//     constructor(private http: HttpClient) {
//         // set token if saved in local storage
//         const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         this.token = currentUser && currentUser.token;
//     }
//
//     login(username: string, password: string) {
//         let httpOptions = {headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' })};
//
//         return this.http.post(BASE_URI + '/rest-auth/login/', { email: username, password: password }, httpOptions)
//             .subscribe(data => {
//                 // login successful if there's a jwt token in the response
//                 console.log(data);
//                 return true;
//
//                 // if (token) {
//                 //     // set token property
//                 //     this.token = token;
//                 //
//                 //     // store username and jwt token in local storage to keep user logged in between page refreshes
//                 //     localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
//                 //
//                 //     // return true to indicate successful login
//                 //     return true;
//                 // } else {
//                 //     // return false to indicate failed login
//                 //     return false;
//                 // }
//             });
//     }
//
//     logout(): void {
//         // clear token remove user from local storage to log user out
//         this.token = null;
//         localStorage.removeItem('currentUser');
//     }
// }



// @Injectable()
// export class AuthenticationService extends RESTService<any> {
//   public token: string;
//
//   constructor(private _http: HttpInterceptorService) {
//     super(_http, {
//       baseUrl: BASE_URI,
//       path: '/rest-auth/login/',
//       baseHeaders: new HttpHeaders(),
//       dynamicHeaders: () => new HttpHeaders(),
//       transform: (res: Response): any => res.json(),
//     });
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     this.token = currentUser && currentUser.token;
//   }
//
//   login(username: string, password: string): Observable<boolean> {
//     let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
//     return this.create('email=${username}&password=${password}', ,{headers: headers})
//     // return this.http.post(BASE_URI + '/login/', JSON.stringify({username: username, password: password}))
//       .map((response: Response) => {
//         // login successful if there's a jwt token in the response
//         const token = response.json() && response.json().token;
//         if (token) {
//           // set token property
//           this.token = token;
//
//           // store username and jwt token in local storage to keep user logged in between page refreshes
//           localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
//
//           // return true to indicate successful login
//           return true;
//         } else {
//           // return false to indicate failed login
//           return false;
//         }
//       });
//   }
//
//   logout(): void {
//     // clear token remove user from local storage to log user out
//     this.token = null;
//     localStorage.removeItem('currentUser');
//   }
// }
