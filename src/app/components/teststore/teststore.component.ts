import { Component, AfterViewInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-teststore',
  templateUrl: './teststore.component.html',
  styleUrls: ['./teststore.component.scss'],
})
export class TeststoreComponent implements AfterViewInit {
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
    this._showAlert = async (message: string) => {
      await Dialog.alert({
      title: 'Error Dialog',
      message: message,
      });
    };

    // Initialize the CapacitorDataStorageSQLite plugin
    await this._StoreService.init();
  }

  /*******************************
  * Component Methods           *
  *******************************/


  async runTests(): Promise<void> {
    this._cardStorage = document.querySelector('.card-storage');

    if(this._StoreService.isService) {
      // reset the Dom in case of multiple runs
      await this.resetStorageDisplay();
      try {
        await this.testFirstStore();
        document.querySelector('.store-success1').classList.remove('display');
      } catch (err) {
        document.querySelector('.store-failure1').classList.remove('display');
        await this._showAlert(err.message);
      }
    } else {
      console.log("Service is not initialized");
      document.querySelector('.store-failure1').classList.remove('display');
      await this._showAlert("Service is not initialized");
    }
  }
  async testFirstStore(): Promise<void> {
    //populate some data
    //string
    console.log('in testFirstStore ***** ')
    try {
      await this._StoreService.openStore("");
      await this._StoreService.clear();
      // store data in the first store
      await this._StoreService.setItem("session","Session Opened");
      let result: any = await this._StoreService.getItem("session");
      if (result != "Session Opened") {
        return Promise.reject(new Error("session failed"));
      }
      // json
      let data: any = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}}
      await this._StoreService.setItem("testJson",JSON.stringify(data));
      result = await this._StoreService.getItem("testJson");
      if (result != JSON.stringify(data)){
        return Promise.reject(new Error("testJson failed"));
      }
      // number
      let data1: any = 243.567
      await this._StoreService.setItem("testNumber",data1.toString());
      result = await this._StoreService.getItem("testNumber");
      console.log(`result testNumber result ${result}`)
      if (result != data1.toString()){
        return Promise.reject(new Error("testNumber failed"));
      }
      // getting a value from a non existing key
      result = await this._StoreService.getItem("foo");
      console.log(`getItem foo result.length ${result.length}`)
      if (result.length > 0) {
        return Promise.reject(new Error("test non existing key failed"));
      }
      // test isKey
      result = await this._StoreService.isKey("testNumber");
      console.log("isKey testNumber " + result)
      if(!result) {
        return Promise.reject(new Error("isKey testNumber failed"));
      }
      result = await this._StoreService.isKey("foo");
      console.log("isKey foo " + result)
      if(result) {
        return Promise.reject(new Error("isKey foo failed"));
      }
      // test getAllKeys
      result = await this._StoreService.getAllKeys();
      console.log("Get keys result: " + result);
  
      if(result.length != 3 || result[0] != "session"
          || result[1] != "testJson" || result[2] != "testNumber") {
        return Promise.reject(new Error("getAllKeys failed"));
      }
      // test getAllValues
      result = await this._StoreService.getAllValues();
      console.log("Get values : " + result);
      if(result.length != 3 || result[0] != "Session Opened"
          || result[1] != JSON.stringify(data) || result[2] != data1.toString()) {
        return Promise.reject(new Error("getAllValues failed"));
      }
      // test getAllKeysValues
      result = await this._StoreService.getAllKeysValues();
      if(result.length != 3 ||
          result[0].key != "session" || result[0].value != "Session Opened" ||
          result[1].key != "testJson" || result[1].value != JSON.stringify(data) ||
          result[2].key != "testNumber" || result[2].value != data1.toString()) {
        return Promise.reject(new Error("getAllKeysValues failed"));
      }
      // test removeItem
      await this._StoreService.removeItem("testJson");
      result = await this._StoreService.getAllKeysValues();
      if(result.length != 2 || 
          result[0].key != "session" || result[0].value != "Session Opened" ||
          result[1].key != "testNumber" || result[1].value != data1.toString()) {
        return Promise.reject(new Error("getAllKeysValues failed after removeItem"));
      }
      // test clear
      await this._StoreService.clear();
      result = await this._StoreService.getAllKeysValues();
      if(result.length != 0) {
        return Promise.reject(new Error("getAllKeysValues failed after clear"));
      }
      // close the store
      if(this.platform === "android" || this.platform === "ios") {
        await this._StoreService.closeStore("storage");
      }
      console.log('in testFirstStore end ***** ')
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
