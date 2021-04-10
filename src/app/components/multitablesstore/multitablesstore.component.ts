import { Component, AfterViewInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-multitables-store',
  templateUrl: './multitablesstore.component.html',
  styleUrls: ['./multitablesstore.component.scss'],
})
export class MultitablesstoreComponent implements AfterViewInit {
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
    this._cardStorage = document.querySelector('.card-multitablesstore');

    if(this._StoreService.isService) {
      // reset the Dom in case of multiple runs
      await this.resetStorageDisplay();
      try {
        await this.testMultiTablesStore();
        document.querySelector('.multitables-store-success1').classList.remove('display');
      } catch (err) {
        document.querySelector('.multitables-store-failure1').classList.remove('display');
        await this._showAlert(err.message);
      }
    } else {
      console.log("Service is not initialized");
      document.querySelector('.multitables-store-failure1').classList.remove('display');
      await this._showAlert("Service is not initialized");
    }
  }
  async testMultiTablesStore(): Promise<void> {
    //populate some data
    //string
    console.log('in testMultiTablesStore ***** ')
    try {
      await this._StoreService.openStore("myStore", "saveData");
      await this._StoreService.clear();
      // store data in the "saveData" table
      await this._StoreService.setItem("app","App Opened");
      let result: any = await this._StoreService.getItem("app");
      if (result != "App Opened") {
        return Promise.reject(new Error("app failed"));
      }
      // json
      let data: any = {'age':40,'name':'jeep','email':'jeep@example.com'};
      await this._StoreService.setItem("user",JSON.stringify(data));
      result = await this._StoreService.getItem("user");
      if (result != JSON.stringify(data)){
        return Promise.reject(new Error("user failed"));
      }
      // set a new table "otherData"
      await this._StoreService.setTable("otherData");
      await this._StoreService.clear();
      // store data in the "saveData" table
      await this._StoreService.setItem("key1","Hello World");
      result = await this._StoreService.getItem("key1");
      if (result != "Hello World") {
        return Promise.reject(new Error("key1 failed"));
      }
      // json
      let data1: any= {'a':60,'pi':'3.141516','b':'cool'};
      await this._StoreService.setItem("key2",JSON.stringify(data1));
      result = await this._StoreService.getItem("key2");
      if (result != JSON.stringify(data1)){
        return Promise.reject(new Error("key2 failed"));
      }

      // test isTable
      result = await this._StoreService.isTable("saveData");
      console.log("isTable saveData " + result)
      if(!result) {
        return Promise.reject(new Error("isTable saveData failed"));
      }
      result = await this._StoreService.isTable("foo");
      console.log("isTable foo " + result)
      if(result) {
        return Promise.reject(new Error("isTable foo failed"));
      }
      // test getAllTables
      result = await this._StoreService.getAllTables();
      console.log("Get tables result: " + result);
  
      if(result.length != 2 || !result.includes("saveData")
          || !result.includes("otherData")) {
        return Promise.reject(new Error("getAllTables 1 failed"));
      }
      // store new data in "saveData" table
      await this._StoreService.setTable("saveData");
      await this._StoreService.setItem("message","Welcome from Jeep");
      result = await this._StoreService.getItem("message");
      if (result != "Welcome from Jeep") {
        return Promise.reject(new Error("message failed"));
      }
      // test getAllKeysValues
      result = await this._StoreService.getAllKeysValues();
      if(result.length != 3 ||
          result[0].key != "app" || result[0].value != "App Opened" ||
          result[1].key != "user" || result[1].value != JSON.stringify(data) ||
          result[2].key != "message" || result[2].value != "Welcome from Jeep") {
        return Promise.reject(new Error("getAllKeysValues failed"));
      }
      // test deleteTable
      await this._StoreService.deleteTable("otherData");
      // test getAllTables
      result = await this._StoreService.getAllTables();
      console.log("Get tables result: " + result);
  
      if(result.length != 1 || !result.includes("saveData")) {
        return Promise.reject(new Error("getAllTables 2 failed"));
      }

      console.log('in testMultiTablesStore end ***** ')
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
