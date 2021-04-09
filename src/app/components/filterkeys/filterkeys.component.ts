import { Component, AfterViewInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-filterkeys',
  templateUrl: './filterkeys.component.html',
  styleUrls: ['./filterkeys.component.scss'],
})
export class FilterKeysComponent implements AfterViewInit {
  platform: string;
  isService: boolean = false;
  store: any = null;
  _cardStorage: HTMLIonCardElement;
  _showAlert: any;

  constructor(private _StoreService: StoreService) { }
  /*******************************
   * Component Lifecycle Methods *
   *******************************/

  async ngAfterViewInit() {
    // Initialize the CapacitorDataStorageSQLite plugin
    this._showAlert = async (message: string) => {
      await Dialog.alert({
      title: 'Error Dialog',
      message: message,
      });
    };
    await this._StoreService.init();
  }

  /*******************************
  * Component Methods           *
  *******************************/


  async runTests(): Promise<void> {
    this._cardStorage = document.querySelector('.card-filter');

    if(this._StoreService.isService) {
      // reset the Dom in case of multiple runs
      await this.resetStorageDisplay();
      try {
        await this.testFilterKeys();
        document.querySelector('.filter-success1').classList.remove('display');
      } catch (err) {
        document.querySelector('.filter-failure1').classList.remove('display');
        await this._showAlert(err.message);
      }
    } else {
      console.log("Service is not initialized");
      document.querySelector('.filter-failure1')
                                    .classList.remove('display');
      await this._showAlert("Service is not initialized");
    }
  }
  async testFilterKeys(): Promise<void> {
    console.log('in testFilterKeys start ***** ')
    try {
      await this._StoreService.openStore("filterStore", "filterData");
      await this._StoreService.clear();
      // store data in the filter store
      await this._StoreService
                  .setItem("session","Session Lowercase Opened");
      let json: any = 
                {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}};
      await this._StoreService.setItem("testJson",JSON.stringify(json));
      await this._StoreService
                  .setItem("Session1","Session Uppercase 1 Opened");
      await this._StoreService
                  .setItem("MySession2foo","Session Uppercase 2 Opened");
      const num: number = 243.567;
      await this._StoreService.setItem("testNumber",num.toString());
      await this._StoreService
                  .setItem("Mylsession2foo","Session Lowercase 2 Opened");
      await this._StoreService
                  .setItem("EnduSession","Session Uppercase End Opened");
      await this._StoreService
                  .setItem("Endlsession","Session Lowercase End Opened");
      await this._StoreService
                  .setItem("SessionReact","Session React Opened");
      // Get All Values
      const values: string[] = await this._StoreService.getAllValues();
      if(values.length != 9) {
        return Promise.reject(new Error("getAllValues failed"));
      } else {
        for(let i = 0; i< values.length;i++) {
          console.log(' key[' + i + "] = " + values[i] + "\n");
        }
      }
      // Get Filter Values Starting with "session"
      const stValues: string[] = await this._StoreService
                                          .getFilterValues("%session");
      if(stValues.length != 3) {
        return Promise.reject(new Error("getFilterValues Start failed"));
      } else {
        for(let i = 0; i< stValues.length;i++) {
          console.log(' key[' + i + "] = " + stValues[i] + "\n");
        }
      }
      // Get Filter Values Ending with "session"
      const endValues: string[] = await this._StoreService
                                          .getFilterValues("session%");
      if(endValues.length != 3) {
        return Promise.reject(new Error("getFilterValues End failed"));
      } else {
        for(let i = 0; i< endValues.length;i++) {
          console.log(' key[' + i + "] = " + endValues[i] + "\n");
        }
      }
      // Get Filter Values Containing "session"
      const contValues: string[] = await this._StoreService
                                            .getFilterValues("session");
      if(contValues.length != 7) {
        return Promise.reject(new Error("getFilterValues End failed"));
      } else {
        for(let i = 0; i< contValues.length;i++) {
          console.log(' key[' + i + "] = " + contValues[i] + "\n");
        }
      }
      console.log('in testFilterKeys end ***** ')
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
    
  }
  async resetStorageDisplay(): Promise<void> {
    for (let i:number=0;i< this._cardStorage.childElementCount;i++) {
      if(!this._cardStorage.children[i].classList.contains('display')) this._cardStorage.children[i].classList.add('display');
    }
  }
}
