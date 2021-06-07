<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">Ionic/Angular Data Storage SQLite App Starter</h3>
<p align="center"><strong><code>-angular-data-storage-sqlite-app-starter</code></strong></p>
<br>
<p align="center" style="font-size:50px;color:red"><strong>CAPACITOR 3</strong></p><br>
<p align="center">Ionic/Angular application demonstrating the use of the</p>
<p align="center"><strong><code>capacitor-data-storage-sqlite</code></strong></p>
<br>
<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2021?style=flat-square" />
  <a href="https://github.com/jepiqueau/angular-data-storage-sqlite-app-starter"><img src="https://img.shields.io/github/license/jepiqueau/angular-data-storage-sqlite-app-starter?style=flat-square" /></a>
  <a href="https://github.com/jepiqueau/angular-data-storage-sqlite-app-starter"><img src="https://img.shields.io/github/package-json/v/jepiqueau/angular-data-storage-sqlite-app-starter?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


## Installation

To start building your App using this Starter App, clone this repo to a new directory:

```bash
git clone https://github.com/jepiqueau/angular-data-storage-sqlite-app-starter.git 
cd angular-data-storage-sqlite-app-starter
git remote rm origin
```

 - then install it

```bash
npm install --save capacitor-data-storage-sqlite
npm install --save localforage
```

 - then go to the building process

```bash
npm run build
npx cap update
npx cap update @capacitor-community/electron@next
npm run build
npx cap copy
npx cap copy web
npx cap copy @capacitor-community/electron
```

the capacitor config parameters are:

```
"appId": "com.example.app.capacitor.datastoragesqlite"
"appName": "angular-data-storage-sqlite-app-starter"
```

### Building Web Code

```bash
npx cap serve
```


### Building Native Project

#### IOS

```bash
npx cap open ios
```
Once Xcode launches, you can build your finally app binary through the standard Xcode workflow.

#### Android

```bash
npx cap open android
```
Once Android Studio launches, you can build your app through the standard Android Studio workflow.

#### Electron

```bash
npx cap open @capacitor-community/electron
```

#### Resulting Output

```
The DataStore test was successful
```

At the end of the test, one un-encrypted store should have been created

```
storageSQLite.db
```

### Changing the 'secret' and 'new secret'

#### IOS

In Xcode, before building your app, 
 - Go to the ```Pods/Development Pods/CapacitorDataStorageSqlite``` folder, 
 - Modify the ```secret``` and ```newsecret```strings in the Global.swift file.

#### Android

In Android Studio, before building your app,
 - Go to the ```capacitor-data-storage-sqlite/java/com.jeep.plugin.capacitor/cdssUtils```folder,
 - Modify the ```secret``` and ```newsecret```strings in the Global.java file.

### Angular Service

A Angular Service has been defined as a wrapper to the ```capacitor-data-storage-sqlite``` plugin.

```ts
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
   * Echo a value
   * @param value 
   */
  async echo(value: string): Promise<any> {
    if(this.isService && this.store != null) {
        try {
            return await this.store.echo(value);
        } catch (err) {
            console.log(`Error ${err}`)
            return Promise.reject(new Error(err));
        }
    } else {
        return Promise.reject(new Error("openStore: Store not opened"));
    }
  }

  /**
   * Open a Store
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
        console.log("in openStore Service ")
        console.log(`database ${database}`)
        console.log(`table ${table}`)
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
   * Close a store
   * @param dbName 
   * @returns 
   */
  async closeStore(dbName: String): Promise<void> {
    if(this.isService && this.store != null) {
      try {
        await this.store.closeStore({database:dbName});
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }      
    } else {
      return Promise.reject(new Error("close: Store not opened"));
    }
  }
  /**
   * Check if a store is opened
   * @param dbName 
   * @returns 
   */
  async isStoreOpen(dbName: String): Promise<void> {
    if(this.isService && this.store != null) {
      try {
        const ret = await this.store.isStoreOpen({database:dbName});
        return Promise.resolve(ret);
      } catch (err) {
        return Promise.reject(err);
      }      
    } else {
      return Promise.reject(new Error("isStoreOpen: Store not opened"));
    }
  }
  /**
   * Check if a store already exists
   * @param dbName
   * @returns 
   */
  async isStoreExists(dbName: String): Promise<void> {
    if(this.isService && this.store != null) {
      try {
        const ret = await this.store.isStoreExists({database:dbName});
        return Promise.resolve(ret);
      } catch (err) {
        return Promise.reject(err);
      }      
    } else {
      return Promise.reject(new Error("isStoreExists: Store not opened"));
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

````

## Starting an App from Scratch

The process described below follows the instructions provided in the [Capacitor Documentation](https://capacitor.ionicframework.com/docs/getting-started/with-ionic/)

### New Ionic/Angular Project

```bash
ionic start myStorageApp tabs --type=angular --capacitor
cd ./myStorageApp
``` 

### Initialize Capacitor

```bash
npx cap init myStorageApp com.example.app
```

Your App information [appName] [appId] can be whathever you would like. 
Here we choose for the example [myStorageApp] [com.example.app]

### Install capacitor-data-storage-sqlite plugin

```bash
npm install --save capacitor-data-storage-sqlite
npm install --save @capacitor-community/electron@next
```

### Add an Angular Service

```bash
ng g service sqlite
```

In your favorite editor open the ```store.services.ts``` file under the ```src/app/services```folder and input the code as described above

### Access the Angular Service in your App Angular Components

#### Import in your Angular Component

```ts
import { StoreService } from '../services/store.service';
```

#### Inject the StoreService in your Angular Component Constructor

```ts
  constructor(private _StoreService: StoreService) {
  }
```

#### Initialize CapacitorDataStorageSqlite plugin

```ts
  async ngAfterViewInit() {
        // Initialize the CapacitorDataStorageSQLite plugin
        await this._StoreService.init();

    ...
  }
```

#### Usage of the CapacitorDataStorageSqlite plugin in Angular Component Methods

```ts
async fooMethod(): Promise<void> {
    ...
    if(this._StoreService.isService) {
      // open the data storage
      let result:any = await this._StoreService.openStore();
      console.log('storage retCreate result',result)
      if (result) {
        await this._StoreService.clear();
        // store data in the first store
        await this._StoreService.setItem("session","Session Opened");
        result = await this._StoreService.getItem("session");
        console.log('result ',result)
        ...
      }

    } else {
      console.log("CapacitorDataStorageSqlite Service is not initialized");
    }
    ...
}
```

When the database is open, use the other methods provided by the Angular Service to setItem, getItem, removeItem, clear, ...

### Build your App

```bash
npm run build
```

### Add Platforms

```bash
npx cap add ios
npx cap add android
npx cap add @capacitor-community/electron
```

### Building and Syncing your App with Capacitor

```bash
npm run build
npx cap copy
npx cap copy @capacitor-community/electron
```

### Open IDE to Build, Run and Deploy

#### IOS

```bash
npx cap open ios
```
Once Xcode launches, you can build your finally app binary through the standard Xcode workflow.

#### Android

```bash
npx cap open android
```

Once Android launches,

 - Edit the MainActivity.java and add the following import:

```java
import com.jeep.plugin.capacitor.CapacitorDataStorageSqlite;
```

 - Add the CapacitorDataStorageSQLite declaration in the this.init method

```java
add(CapacitorDataStorageSqlite.class);
```

 - you can then build your app through the standard Android Studio workflow.

#### Electron

In the Electron folder of your application

```bash
npm install --save sqlite3
npm install --save-dev @types/sqlite3
npm install --save-dev electron-rebuild
```

Modify the Electron package.json file by adding a script `"rebuild-deps"` if it is not existing

```json
  "scripts": {
    "rebuild-deps": "electron-rebuild"
  },
```

Execute the postinstall script

```bash
npm run rebuild-deps
```
Go back in the main folder of your application
and then build the application

```bash
 npx cap update
 npx cap update @capacitor-community/electron
 npm run build
 npx cap copy
 npx cap open @capacitor-community/electron
```

The datastores created are under **YourApplication/Electron/DataStorage**


### When capacitor-data-storage-sqlite plugin is updated

Follow this process:

```bash
npm install --save capacitor-data-storage-sqlite@latest
npx cap update
npx cap update @capacitor-community/electron
npm run build
npx cap copy
npx cap copy @capacitor-community/electron
npx cap open ios
npx cap open android
npx cap open @capacitor-community/electron
ionic serve
```

### Test Capacitor-Data-Storage-SQLite access

The ```capacitor-data-storage-sqlite``` test is accessible in the Tab2 of the Application by clicking on the Store test button.


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/angular-data-storage-sqlite-app-starter/commits?author=jepiqueau" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
