import { Component, AfterViewInit } from '@angular/core';
import { StoreService } from '../services/store.service';

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

  constructor(private _StoreService: StoreService) { }
  /*******************************
   * Component Lifecycle Methods *
   *******************************/

  async ngAfterViewInit() {
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

      const retFirst: boolean = await this.testFirstStore();
      console.log("retFirst : ",retFirst)
      if( retFirst) {
        document.querySelector('.success1').classList.remove('display');
      } else {
        document.querySelector('.failure1').classList.remove('display');
      }
    } else {
      console.log("Service is not initialized");
      document.querySelector('.failure1').classList.remove('display');
    }
  }
  async testFirstStore(): Promise<boolean> {
    //populate some data
    //string
    let retTest1: boolean = false;
    let retpopulate: boolean = false;
    let retiskey = false;
    let retkeys = false;
    let retvalues = false;
    let retkeysvalues = false;
    let retremove = false;
    let retclear = false;
    console.log('in testFirstStore ***** ')
    let result:any = await this._StoreService.openStore();
    console.log('storage retCreate result',result)
    if (result) {
      await this._StoreService.clear();
      // store data in the first store
      await this._StoreService.setItem("session","Session Opened");
      result = await this._StoreService.getItem("session");
      console.log('result ',result)
      let ret1: boolean = false;
      if (result === "Session Opened") ret1 = true;
      console.log("Session Opened ret1 ",ret1)
      // json
      let data: any = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}}
      await this._StoreService.setItem("testJson",JSON.stringify(data));
      result = await this._StoreService.getItem("testJson");
      console.log("Get Data : " + result);
      let ret2: boolean = false;
      if (result === JSON.stringify(data)) ret2 = true;
      console.log("JSON Object ret2 ",ret2)

      // number
      let data1: any = 243.567
      await this._StoreService.setItem("testNumber",data1.toString());
      result = await this._StoreService.getItem("testNumber");
      console.log("Get Data : " + result);
      let ret3: boolean = false;
      if (result === data1.toString()) ret3 = true;
      // getting a vlue of a non existing key
      result = await this._StoreService.getItem("foo");
      console.log("Get Data : " + result);
      let ret4: boolean = false;
      if (result === null) ret4 = true;

      if (ret1 && ret2 && ret3 && ret4) retpopulate = true;
//      if (retpopulate) document.querySelector('.populate').classList.remove('display');
      console.log(" before isKey testNumber ") 
      result = await this._StoreService.isKey("testNumber");
      console.log("isKey testNumber " + result)
      ret1 = result;
      result = await this._StoreService.isKey("foo");
      console.log("isKey foo " + result)
      ret2 = result
      if (ret1 && !ret2) retiskey = true
//      if (retiskey) document.querySelector('.iskey').classList.remove('display');
      
      result = await this._StoreService.getAllKeys();
      console.log("Get keys result: " + result);
      console.log("Keys length " + result.length);
  
      if(result.length === 3 && result[0] === "session"
          && result[1] === "testJson" && result[2] === "testNumber") {
        retkeys = true;
//        document.querySelector('.keys').classList.remove('display');
      }
      console.log("Get values retkeys : " + retkeys);

      result = await this._StoreService.getAllValues();
      console.log("Get values : " + result);
      console.log("Values length " + result.length)
      if(result.length === 3 && result[0] === "Session Opened"
          && result[1] === JSON.stringify(data) && result[2] === data1.toString()) {
        retvalues = true;
//        document.querySelector('.values').classList.remove('display');
      }
      console.log("Get values retvalues : " + retvalues);
  
      result = await this._StoreService.getAllKeysValues();
      result.forEach(element => {
        console.log(element)
      });
      console.log("KeysValues length " + result.length)
      if(result.length === 3 &&
          result[0].key === "session" && result[0].value === "Session Opened" &&
          result[1].key === "testJson" && result[1].value === JSON.stringify(data) &&
          result[2].key === "testNumber" && result[2].value === data1.toString()) {
        retkeysvalues = true;
//        document.querySelector('.keysvalues').classList.remove('display');
      }
      console.log("Get values retkeysvalues : " + retkeysvalues);

      result = await this._StoreService.removeItem("testJson");
      if(result) {
        let res: any = await this._StoreService.getAllKeysValues();
        if(res.length === 2 && 
          res[0].key === "session" && res[0].value === "Session Opened" &&
          res[1].key === "testNumber" && res[1].value === data1.toString()) {
          retremove = true;
//          document.querySelector('.remove').classList.remove('display');
        }
      }
      console.log("Remove retremove : " + retremove);
      result = await this._StoreService.clear();
      console.log("Clear result : " + result);
      
      if(result) {
        let res: any = await this._StoreService.getAllKeysValues();
        console.log("after clear res.keysvalues.length " + res.length)
        if(res.length === 0) {
          retclear = true;
//          document.querySelector('.clear').classList.remove('display');
          if(retpopulate && retiskey && retkeys && retvalues && retkeysvalues && retremove && retclear) {
            retTest1 = true;
//            document.querySelector('.success1').classList.remove('display');
          } else {
//            document.querySelector('.failure1').classList.remove('display');
          }
        }
        console.log("Clear retclear : " + retclear);
      } else {
//          document.querySelector('.failure1').classList.remove('display');
      }

    }
    console.log('in testFirstStore end ***** ')

    return retTest1;
  }
  async resetStorageDisplay(): Promise<void> {
    for (let i:number=0;i< this._cardStorage.childElementCount;i++) {
      if(!this._cardStorage.children[i].classList.contains('display')) this._cardStorage.children[i].classList.add('display');
    }
  }
}
