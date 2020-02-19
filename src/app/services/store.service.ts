import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from '@jeepq/capacitor';
const { CapacitorDataStorageSqlite, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  store: any;
  isService: boolean = false;
  platform: string;
  constructor() {
  }
  /**
   * Plugin Initialization
   */
  async init(): Promise<void> {
    const info = await Device.getInfo();
    this.platform = info.platform;
    if (this.platform === "ios" || this.platform === "android") {
      this.store = CapacitorDataStorageSqlite;
    } else {
      this.store = PluginsLibrary.CapacitorDataStorageSqlite;
    }
    this.isService = true;
  }
  /**
   * Open a Database
   * @param _dbName string optional
   * @param _table string optional
   * @param _encrypted boolean optional 
   * @param _mode string optional
   */  
  async openStore(_dbName?:string,_table?:string,_encrypted?:boolean,_mode?:string): Promise<boolean> {
    if(this.isService) {
      const database: string = _dbName ? _dbName : "storage";
      const table: string = _table ? _table : "storage_table";
      const encrypted:boolean = _encrypted ? _encrypted : false;
      const mode: string = _mode ? _mode : "no-encryption";
      const {result} = await this.store.openStore({database,table,encrypted,mode});
      return result;
    } else {
      return Promise.resolve(false);
    }
  }
  /**
   * Create/Set a Table
   * @param table string
   */  
  async setTable(table:string): Promise<any> {
    if(this.isService) {
      const {result,message} = await this.store.setTable({table});
      return Promise.resolve([result,message]);
    } else {
      return Promise.resolve({result:false, message:"Service is not initialized"});
    }
  }
  /**
   * Set of Key
   * @param key string 
   * @param value string
   */
  async setItem(key:string,value:string): Promise<void> {
    if(this.isService && key.length > 0) {
      await this.store.set({ key, value });
    }
  }
  /**
   * Get the Value for a given Key
   * @param key string 
   */
  async getItem(key:string): Promise<string> {
    if(this.isService && key.length > 0) {
      const {value} = await this.store.get({ key });
      console.log("in getItem value ",value)
      return value;
    } else {
      return null;
    }

  }
  async isKey(key:string): Promise<boolean> {
    if(this.isService && key.length > 0) {
      const {result} = await this.store.iskey({ key });
      return result;
    } else {
      return null;
    }

  }
  async getAllKeys(): Promise<Array<string>> {
    if(this.isService ) {
      const {keys} = await this.store.keys();
      return keys;
    } else {
      return null;
    }
  }
  async getAllValues(): Promise<Array<string>> {
    if(this.isService ) {
      const {values} = await this.store.values();
      return values;
    } else {
      return null;
    }
  }
  async getAllKeysValues(): Promise<Array<any>> {
    if(this.isService ) {
      const {keysvalues} = await this.store.keysvalues();
      return keysvalues;
    } else {
      return null;
    }
  }

  async removeItem(key:string): Promise<boolean> {
    if(this.isService && key.length > 0) {
      const {result} = await this.store.remove({ key });
      return result;
    } else {
      return null;
    }
  }
  async clear(): Promise<boolean> {
    if(this.isService ) {
      const {result} = await this.store.clear();
      return result;
    } else {
      return null;
    }
  }
  async deleteStore(_dbName?:string): Promise<boolean> {
    const database: string = _dbName ? _dbName : "storage";
    await this.init();
    if(this.isService ) {
      const {result} = await this.store.deleteStore({database});
      return result;
    }
    return;
  }
}
