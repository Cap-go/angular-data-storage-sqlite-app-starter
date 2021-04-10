import { Injectable } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite,} from 'capacitor-data-storage-sqlite';

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
    this.platform = Capacitor.getPlatform();
    this.store = CapacitorDataStorageSqlite;
    this.isService = true;
    console.log('in init ',this.platform,this.isService)
  }
  /**
   * Open a Database
   * @param _dbName string optional
   * @param _table string optional
   * @param _encrypted boolean optional 
   * @param _mode string optional
   */  
  async openStore(_dbName?:string,_table?:string,_encrypted?:boolean,_mode?:string): Promise<void> {
    if(this.isService && this.store != null) {
      const database: string = _dbName ? _dbName : "storage";
      const table: string = _table ? _table : "storage_table";
      const encrypted:boolean = _encrypted ? _encrypted : false;
      const mode: string = _mode ? _mode : "no-encryption";
      try {
        await this.store.openStore({database,table,encrypted,mode});
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }      
    } else {
      return Promise.reject(new Error("openStore: Store not opened"));
    }
  }
  /**
   * Create/Set a Table
   * @param table string
   */  
  async setTable(table:string): Promise<void> {
    if(this.isService && this.store != null) {
      try {
        await this.store.setTable({table});
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }      
    } else {
      return Promise.reject(new Error("setTable: Store not opened"));
    }
  }
  /**
   * Set of Key
   * @param key string 
   * @param value string
   */
  async setItem(key:string,value:string): Promise<void> {
    if(this.isService && this.store != null) {
      if(key.length > 0) {
        try {
          await this.store.set({ key, value });
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        }      
      } else {
        return Promise.reject(new Error("setItem: Must give a key"));
      }
    } else {
      return Promise.reject(new Error("setItem: Store not opened"));
    }
  }
  /**
   * Get the Value for a given Key
   * @param key string 
   */
  async getItem(key:string): Promise<string> {
    if(this.isService && this.store != null) {
      if(key.length > 0) {
        try {
          const {value} = await this.store.get({ key });
          console.log("in getItem value ",value)
          return Promise.resolve(value);
        } catch (err) {
          console.log(`$$$$$ in getItem key: ${key} err: ${JSON.stringify(err)}`)
          return Promise.reject(err);
        }      
      } else {
        return Promise.reject(new Error("getItem: Must give a key"));
      }
    } else {
      return Promise.reject(new Error("getItem: Store not opened"));
    }

  }
  async isKey(key:string): Promise<boolean> {
    if(this.isService && this.store != null) {
      if(key.length > 0) {
        try {
          const {result} = await this.store.iskey({ key });
          return Promise.resolve(result);
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(new Error("isKey: Must give a key"));
      }
    } else {
      return Promise.reject(new Error("isKey: Store not opened"));
    }

  }

  async getAllKeys(): Promise<Array<string>> {
    if(this.isService && this.store != null) {
      try {
        const {keys} = await this.store.keys();
        return Promise.resolve(keys); 
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error("getAllKeys: Store not opened"));
    }
  }
  async getAllValues(): Promise<Array<string>> {
    if(this.isService && this.store != null) {
      try {
        const {values} = await this.store.values();
        return Promise.resolve(values);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error("getAllValues: Store not opened"));
    }
  }
  async getFilterValues(filter:string): Promise<Array<string>> {
    if(this.isService && this.store != null) {
      try {
        const {values} = await this.store.filtervalues({ filter });
        return Promise.resolve(values);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error("getFilterValues: Store not opened"));
    }
  }
  async getAllKeysValues(): Promise<Array<any>> {
    if(this.isService && this.store != null) {
      try {
        const {keysvalues} = await this.store.keysvalues();
        return Promise.resolve(keysvalues);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error("getAllKeysValues: Store not opened"));
    }
  }

  async removeItem(key:string): Promise<void> {
    if(this.isService && this.store != null) {
      if(key.length > 0) {
        try {
          await this.store.remove({ key });
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(new Error("removeItem: Must give a key"));
      }
    } else {
      return Promise.reject(new Error("removeItem: Store not opened"));
    }
  }

  async clear(): Promise<void> {
    if(this.isService && this.store != null) {
      try {
        await this.store.clear();
        return Promise.resolve();
      } catch (err) {
          return Promise.reject(err.message);
        } 
    } else {
      return Promise.reject(new Error("clear: Store not opened"));
    }
  }

  async deleteStore(_dbName?:string): Promise<void> {
    const database: string = _dbName ? _dbName : "storage";
    await this.init();
    if(this.isService && this.store != null) {
      try {
        await this.store.deleteStore({database});
        return Promise.resolve();
      } catch (err) {
          return Promise.reject(err.message);
      } 
    } else {
      return Promise.reject(new Error("deleteStore: Store not opened"));
    }
  }
  async isTable(table:string): Promise<boolean> {
    if(this.isService && this.store != null) {
      if(table.length > 0) {
        try {
          const {result} = await this.store.isTable({ table });
          return Promise.resolve(result);
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(new Error("isTable: Must give a table"));
      }
    } else {
      return Promise.reject(new Error("isTable: Store not opened"));
    }
  }
  async getAllTables(): Promise<Array<string>> {
    if(this.isService && this.store != null) {
      try {
        const {tables} = await this.store.tables();
        return Promise.resolve(tables); 
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error("getAllTables: Store not opened"));
    }
  }
  async deleteTable(table?:string): Promise<void> {
    if(this.isService && this.store != null) {
      if(table.length > 0) {
        try {
          await this.store.deleteTable({table});
          return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        } 
      } else {
        return Promise.reject(new Error("deleteTable: Must give a table"));
      }
    } else {
      return Promise.reject(new Error("deleteTable: Store not opened"));
    }
  }
}
