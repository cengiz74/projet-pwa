# GupMainFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Using translation

You can create translation generating a .xlf file with `ng x18n`
Then you will have to translate it. Virtaal is perfect for that :
```bash
sudo apt install virtaal
```

Import the xls file and save it in src/locale/messages.fr.xlf for fr locale

To start dev server with the file:
```commandline
ng serve --aot --disable-host-check --local fr --i18nFile=src/locale/messages.fr.xlf --i18nFormat=xlf
```

To add terms to translate when generating xlf use for instance:
```html
<span i18n="Login form title|An introducion for this login form">Login</span>
```

With i18n="meaning|description"

When inside an html tag, for instance:
```html
<input matInput #passElement #passControl="ngModel" i18n-placeholder placeholder="Password" type="password" name="password" [(ngModel)]="password" required>
```


## Authentication

This apps uses Json Web Token to authenticate to a Django REST framework backend through the rest-auth module that provides special endpoints.
The main principles are:

1. Use HttpClient instead of old http library
2. Request je JWT through a dedicated service `authentication.service` in charge of handling login, logout... and token related methods
3. Use guards to protect routes and make sure to be authenticate before routing see the _guard module and canActivate conditions in app-routing.module
4. Use the HttpInterceptor to authenticate each further requests to the API with the JWT
