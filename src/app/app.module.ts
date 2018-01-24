import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, Type } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { CovalentLayoutModule, CovalentStepsModule /*, any other modules */ } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { JwtModule } from '@auth0/angular-jwt';
import { routedComponents, AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { AuthGuard } from './_guards/';
import { AuthenticationService } from '../services/authentication.service';

import { TokenInterceptor } from '../config/interceptors/request.interceptor';
import { BASE_URI } from '../config/api.config';

export function tokenGetter() {return localStorage.getItem('access_token');}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [BASE_URI]
      }
    }),
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
      AuthGuard,
      AuthenticationService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
