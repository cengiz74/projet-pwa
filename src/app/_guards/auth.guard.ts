import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
