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

  login() {
    this._loadingService.register();
    // alert('log in as ' + this.model.username + this.model.password);
    this.authenticationService.login(this.username, this.password)
      .subscribe(result => {
        if (result === true) {
          // alert('Result ' + result);
          setTimeout(() => {
            this._router.navigate(['']);
            this._loadingService.resolve();
          }, 1000);
        } else {
          alert('Error ' + this.username);
          this.error = 'Username or password is incorrect';
          this._loadingService.resolve();
        }
      });
  }
}

