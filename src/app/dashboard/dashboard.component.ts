import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { TdLoadingService, TdDigitsPipe } from '@covalent/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [ ], // ItemsService, ProductsService, AlertsService ],
})

export class DashboardComponent implements OnInit {
  // Current date
  year: any = new Date().getFullYear();
  constructor(private _titleService: Title) {}
  ngOnInit(): void {
    this._titleService.setTitle('Covalent Quickstart');
  }
}
