import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EncryptaStoreComponent } from './encryptastore.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [EncryptaStoreComponent],
  exports: [EncryptaStoreComponent]
})
export class EncryptaStoreComponentModule {}
