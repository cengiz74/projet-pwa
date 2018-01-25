import { BrowserModule, Title } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, Type, TRANSLATIONS, TRANSLATIONS_FORMAT, MissingTranslationStrategy } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { I18n, MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { CovalentLayoutModule, CovalentStepsModule, CovalentDialogsModule /*, any other modules */ } from '@covalent/core';
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

declare const require; // Use the require method provided by webpack
export const translations = require(`raw-loader!../locale/messages.fr.xlf`);

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
    CovalentDialogsModule,
    CovalentStepsModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: TRANSLATIONS, useValue: translations},
    // format of translations that you use
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    // locale id that you're using (default en-US)
    {provide: LOCALE_ID, useValue: 'en'},
    // optional, defines how error will be handled
    {provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Error},
    // {provide: LOCALE_ID, useValue: 'en'},
    I18n,
    AuthGuard,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
