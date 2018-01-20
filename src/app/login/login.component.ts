import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';

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
  error = '';

  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login(): void {
    this._loadingService.register();
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this._router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect';
          this._loadingService.resolve();
        }
      });
  }
}

