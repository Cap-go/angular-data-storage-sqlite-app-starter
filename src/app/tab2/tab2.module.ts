import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { TeststoreComponentModule } from '../components/teststore/teststore.module';
import { FilterKeysComponentModule } from '../components/filterkeys/filterkeys.module';
import { MultitablesstoreComponentModule } from '../components/multitablesstore/multitablesstore.module';
import { EncryptaStoreComponentModule } from '../components/encryptastore/encryptastore.module';
import { NewEncryptedStoreComponentModule } from '../components/newencryptedstore/newencryptedstore.module';
import { TestjsonComponentModule } from '../components/testjson/testjson.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TeststoreComponentModule,
    FilterKeysComponentModule,
    MultitablesstoreComponentModule,
    EncryptaStoreComponentModule,
    NewEncryptedStoreComponentModule,
    TestjsonComponentModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
