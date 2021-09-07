import { Component, AfterViewInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-newencryptedstore',
  templateUrl: './newencryptedstore.component.html',
  styleUrls: ['./newencryptedstore.component.scss'],
})
export class NewEncryptedStoreComponent implements AfterViewInit {
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
    this.platform = this._StoreService.platform;
  }

  /*******************************
  * Component Methods           *
  *******************************/


  async runTests(): Promise<void> {
    this._cardStorage = document.querySelector('.card-newencryptedstore');

    if(this._StoreService.isService) {
      // reset the Dom in case of multiple runs
      await this.resetStorageDisplay();
      try {
        await this.testNewEncryptedStore();
        document.querySelector('.newencryptedstore-success1').classList.remove('display');
      } catch (err) {
        document.querySelector('.newencryptedstore-failure1').classList.remove('display');
        await this._showAlert(err.message);
      }
    } else {
      console.log("Service is not initialized");
      document.querySelector('.newencryptedstore-failure1').classList.remove('display');
      await this._showAlert("Service is not initialized");
    }
  }
  async testNewEncryptedStore(): Promise<void> {
    //populate some data
    //string
    console.log('in testNewEncryptedStore ***** ')
    try {
      // ********************************************
      // * check if the store exists and deletes it *
      // ********************************************
      let result: any = await this._StoreService.isStoreExists("encryptedStore");
      if(result) {
        await this._StoreService.deleteStore("encryptedStore");
      }
      // ****************************
      // * create a store encrypted *
      // ****************************
      await this._StoreService.openStore("encryptedStore", "testData", true, "secret");
      // store data in the "testData" table
      await this._StoreService.setItem("key1","Hello World");
      result = await this._StoreService.getItem("key1");
      if (result != "Hello World") {
        return Promise.reject(new Error("key1 failed"));
      }
      // json
      let data: any= {'a':60,'pi':'3.141516','b':'cool'};
      await this._StoreService.setItem("key2",JSON.stringify(data));
      result = await this._StoreService.getItem("key2");
      if (result != JSON.stringify(data)){
        return Promise.reject(new Error("key2 failed"));
      }
      await this._StoreService.setItem("message","Welcome from Jeep");
      result = await this._StoreService.getItem("message");
      if (result != "Welcome from Jeep") {
        return Promise.reject(new Error("message failed"));
      }
      // test getAllKeysValues
      result = await this._StoreService.getAllKeysValues();
      if(result.length != 3 ||
          result[0].key != "key1" || result[0].value != "Hello World" ||
          result[1].key != "key2" || result[1].value != JSON.stringify(data) ||
          result[2].key != "message" || result[2].value != "Welcome from Jeep") {
        return Promise.reject(new Error("getAllKeysValues failed 1"));
      }
      // close the store
      if(this.platform === "android" || this.platform === "ios") {
        await this._StoreService.closeStore("encryptedStore");
      }
      // *********************************
      // * change encrypted store secret *
      // *********************************
      await this._StoreService.openStore("encryptedStore", "testData", true, "newsecret");
      // test getAllKeysValues
      result = await this._StoreService.getAllKeysValues();
      if(result.length != 3 ||
          result[0].key != "key1" || result[0].value != "Hello World" ||
          result[1].key != "key2" || result[1].value != JSON.stringify(data) ||
          result[2].key != "message" || result[2].value != "Welcome from Jeep") {
        return Promise.reject(new Error("getAllKeysValues failed 2"));
      }
      // close the store
      if(this.platform === "android" || this.platform === "ios") {
        await this._StoreService.closeStore("encryptedStore");
      }

      console.log('in testNewEncryptedStore end ***** ')
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new Error(err.message));
    }
  }
  async resetStorageDisplay(): Promise<void> {
    for (let i:number=0;i< this._cardStorage.childElementCount;i++) {
      if(!this._cardStorage.children[i].classList.contains('display')) this._cardStorage.children[i].classList.add('display');
    }
  }
}