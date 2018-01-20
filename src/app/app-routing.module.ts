import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './_guards/';

const routes: Routes = [
      {
        path: 'login',
        component: LoginComponent
    },
    {
      path: '',
      component: MainComponent,
      canActivate: [AuthGuard],
      children: [
        {
                component: DashboardComponent,
                path: '',
            },
      ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ]
})

export class AppRoutingModule { }
export const routedComponents: any[] = [
  LoginComponent, MainComponent, DashboardComponent,
];
