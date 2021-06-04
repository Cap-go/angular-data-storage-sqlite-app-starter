import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { DarkModeService } from './services/darkmode.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private darkMode: DarkModeService
  ) {
    // Deal with Dark Mode
    const prefersDark: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    this.darkMode.enableDarkTheme(prefersDark.matches);
    prefersDark.addEventListener('change',mediaQuery => this.darkMode.enableDarkTheme(mediaQuery.matches));

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }
}
