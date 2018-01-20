import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'inforum',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/inforum.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'gesticleanup',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/gesticleanup.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'gesticleanup-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/gesticleanup-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'inforum-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/inforum-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
  }

  title = 'app';
}
