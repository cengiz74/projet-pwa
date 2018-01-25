import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    const expectedRole = route.data.expectedRole;
    return this.checkLogin(url);
  }

  checkRole() {
    // Call to checkRol in auth service
  }

  checkLogin(url: string): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
    return false;
  }
}

