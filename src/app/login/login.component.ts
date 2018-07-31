import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {I18n} from '@ngx-translate/i18n-polyfill';

import {TdLoadingService, TdDialogService} from '@covalent/core';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  username: string;
  password: string;
  error: boolean = false;

  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private i18n: I18n,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this._loadingService.register();
    this.authenticationService.login(this.username, this.password)
      .subscribe((loggedIn: boolean) => {
          if (loggedIn === true) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            const redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/';
            this._router.navigate([redirect]);
            this.authenticationService.userRole();
          }
        },
        err => {
          this.error = true;
          this.openAlert();
        });
    this._loadingService.resolve();
  }

  openAlert(): void {
    this._dialogService.openAlert({
      message: this.i18n('Wrong Username or password'),
      disableClose: false,
      title: this.i18n('Login alert'),
      closeButton: this.i18n('Close'),
      width: '400px',
    });
  }
}
