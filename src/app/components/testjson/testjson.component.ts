import { Component, AfterViewInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-testjson',
  templateUrl: './testjson.component.html',
  styleUrls: ['./testjson.component.scss'],
})
export class TestjsonComponent implements AfterViewInit {
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
      this.platform = this._StoreService.platform;
      await this.resetStorageDisplay();
      try {
        await this.testJson();
        document.querySelector('.json-success1').classList.remove('display');
      } catch (err) {
        document.querySelector('.json-failure1').classList.remove('display');
        await this._showAlert(err.message);
      }
    } else {
      console.log("Service is not initialized");
      document.querySelector('.json-failure1').classList.remove('display');
      await this._showAlert("Service is not initialized");
    }
  }
  async testJson(): Promise<void> {
    const echo = await this._StoreService.echo("Hello from Jeep");
    console.log(`echo: ${echo.value}`);
    //populate some data
    //string
    console.log('in testJsonStore ***** ')
    const jsonData1 = {
      database: "testImport",
      encrypted: false,
      tables: [
        {
          name: "myStore1",
          values: [
            {key: "test1", value: "my first test"},
            {key: "test2", value: JSON.stringify({a: 10, b: 'my second test', c:{k:'hello',l: 15}})},
          ]
        },
        {
          name: "myStore2",
          values: [
            {key: "test1", value: "my first test in store2"},
            {key: "test2", value: JSON.stringify({a: 20, b: 'my second test in store2 ', d:{k:'hello',l: 15}})},
            {key: "test3", value: "100"},
          ]
        },
      ]
    }
    const jsonData2 = {
      database: "testJsonEncrypted",
      encrypted: true,
      tables: [
        {
          name: "myStore1",
          values: [
            {key: "etest1", value: "my first test"},
            {key: "etest2", value: JSON.stringify({a: 10, b: 'my second test', c:{k:'hello',l: 15}})},
          ]
        },
        {
          name: "myStore2",
          values: [
            {key: "etest1", value: "my first test in store2"},
            {key: "etest2", value: JSON.stringify({a: 20, b: 'my second test in store2 ', d:{k:'hello',l: 15}})},
            {key: "etest3", value: "100"},
          ]
        },
      ]
    }


    try {

      const bRet = await this._StoreService.isJsonValid(JSON.stringify(jsonData1));
      if(!bRet.result) {
        return Promise.reject(new Error("json object jsonData1 not valid"));
      }
      console.log(`$$$ jsonData1: ${JSON.stringify(jsonData1)}`)
      await this._StoreService.importFromJson(JSON.stringify(jsonData1));
      await this._StoreService.openStore("testImport", "myStore1");
      // test isKey
      let result = await this._StoreService.isKey("test1");
      console.log("isKey test1 " + result)
      if(!result) {
        return Promise.reject(new Error("isKey testImport test1 failed"));
      }
      result = await this._StoreService.isKey("test2");
      console.log("isKey test2 " + result)
      if(!result) {
        return Promise.reject(new Error("isKey test2 failed"));
      }
      // test getAllKeys
      let resKeys = await this._StoreService.getAllKeys();
      console.log(`Get keys result: ${resKeys}`);
  
      if(resKeys.length != 2 || resKeys[0] != "test1"
          || resKeys[1] != "test2") {
        return Promise.reject(new Error("getAllKeys failed"));
      }
      
      // test getAllValues
      let resValues = await this._StoreService.getAllValues();
      console.log("Get values : " + resValues);
      if(resValues.length != 2 || resValues[0] != "my first test"
          || resValues[1] != JSON.stringify({a: 10, b: 'my second test', c:{k:'hello',l: 15}})) {
        return Promise.reject(new Error("getAllValues failed"));
      }

      // get store 2
      await this._StoreService.setTable("myStore2");
      // test getAllKeys
      resKeys = await this._StoreService.getAllKeys();
      console.log(`Get keys result: ${resKeys}`);
  
      if(resKeys.length != 3 || resKeys[0] != "test1"
          || resKeys[1] != "test2" || resKeys[2] != "test3") {
        return Promise.reject(new Error("getAllKeys failed"));
      }
      // test getAllValues
      resValues = await this._StoreService.getAllValues();
      console.log("Get values : " + resValues);
      if(resValues.length != 3 || resValues[0] != "my first test in store2"
          || resValues[1] != JSON.stringify({a: 20, b: 'my second test in store2 ', d:{k:'hello',l: 15}})
          || resValues[2] != "100") {
        return Promise.reject(new Error("getAllValues failed"));
      }
      // close the store
      if(this.platform != "web" ) {
        await this._StoreService.closeStore("testImport");
      }
      // exportToJson
      await this._StoreService.openStore("testImport", "myStore1");
      const retJson = await this._StoreService.exportToJson();
      console.log(`retJson ${JSON.stringify(retJson.export)}`)
      if(retJson.export.tables.length != 2 
        || retJson.export.tables[0].name != "myStore1"
        || retJson.export.tables[0].values.length != 2
        || retJson.export.tables[1].name != "myStore2"
        || retJson.export.tables[1].values.length != 3
      ) {
        return Promise.reject(new Error("exportToJson failed"));
      }
      const bRetEx = await this._StoreService.isJsonValid(JSON.stringify(retJson.export));
      if(!bRetEx.result) {
        return Promise.reject(new Error("returned exported json object not valid"));
      }
      const tables: string[] = await this._StoreService.getAllTables();
      if(tables.length != 2 || tables[0] != "myStore1" || tables[1] != "myStore2") {
        return Promise.reject(new Error("getAllTables failed"));
      }
      let res: boolean = await this._StoreService.isTable("myStore1");
      if(!res) {
        return Promise.reject(new Error("isTable myStore1 failed"));
      }
      res = await this._StoreService.isTable("myFoo");
      if(res) {
        return Promise.reject(new Error("isTable myFoo failed"));
      }
      resValues = await this._StoreService.getAllValues();
      console.log("Get values : " + resValues);
      if(resValues.length != 2 || resValues[0] != "my first test"
          || resValues[1] != JSON.stringify({a: 10, b: 'my second test', c:{k:'hello',l: 15}})) {
        return Promise.reject(new Error("getAllValues failed"));
      }
      if (this.platform === "ios" || this.platform === "android") {
        // test encrypted
        const bERet = await this._StoreService.isJsonValid(JSON.stringify(jsonData2));
        if(!bERet.result) {
          return Promise.reject(new Error("json object jsonData2 not valid"));
        }
        console.log(`$$$ jsonData2: ${JSON.stringify(jsonData2)}`)
        await this._StoreService.importFromJson(JSON.stringify(jsonData2));
        await this._StoreService.openStore("testJsonEncrypted", "myStore1", true, "secret");
        // test isKey
        let resultE = await this._StoreService.isKey("etest1");
        console.log("isKey etest1 encrypted" + resultE)
        if(!resultE) {
          return Promise.reject(new Error("isKey etest1 encrypted failed"));
        }
        resultE = await this._StoreService.isKey("etest2");
        console.log("isKey etest2 encrypted" + resultE)
        if(!resultE) {
          return Promise.reject(new Error("isKey etest2 encrypted failed"));
        }
        // test getAllKeys
        let resKeysE = await this._StoreService.getAllKeys();
        console.log(`Get keys encrypted: ${resKeysE}`);
    
        if(resKeysE.length != 2 || resKeysE[0] != "etest1"
            || resKeysE[1] != "etest2") {
          return Promise.reject(new Error("getAllKeys encrypted failed"));
        }
      
        // test getAllValues
        let resValuesE = await this._StoreService.getAllValues();
        console.log("Get values encrypted: " + resValuesE);
        if(resValuesE.length != 2 || resValuesE[0] != "my first test"
            || resValuesE[1] != JSON.stringify({a: 10, b: 'my second test', c:{k:'hello',l: 15}})) {
          return Promise.reject(new Error("getAllValues failed"));
        }
        await this._StoreService.closeStore("testJsonEncrypted");
      }
      console.log('in testJsonStore end ***** ')
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
