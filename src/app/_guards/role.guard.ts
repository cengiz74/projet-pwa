import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable()
export class RoleAuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    const expectedRole = route.data.expectedRole;
    return this.checkLogin(url, expectedRole);
  }

  checkLogin(url: string, expectedRole: string): boolean {
    if (this.auth.isExpectedRole(expectedRole)) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.auth.redirectUrl = url;

    this.router.navigateByUrl('/login');
    return false;
  }
}
