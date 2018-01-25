import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';

import { TdLoadingService, TdDialogService } from '@covalent/core';

import { AuthenticationService } from '../../services/authentication.service';

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
            this._router.navigate(['/']);
          }
        },
        err => {
          this.error = true;
          this.openAlert()
        });
      this._loadingService.resolve();
  }

    openAlert(): void {
    this._dialogService.openAlert({
      message: this.i18n('Wrong Username or password'),
      disableClose: false, // defaults to false
      title: 'Alert', //OPTIONAL, hides if not provided
      closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
      width: '400px', //OPTIONAL, defaults to 400px
    });
  }
}
