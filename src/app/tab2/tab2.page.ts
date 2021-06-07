import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  native: boolean = false;

  constructor() {
  }
  async ionViewWillEnter() {
    const platform = Capacitor.getPlatform();
    if (platform === "ios" || platform === "android") {
      this.native = true;
    }
  }

}
