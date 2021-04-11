import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewEncryptedStoreComponent } from './newencryptedstore.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [NewEncryptedStoreComponent],
  exports: [NewEncryptedStoreComponent]
})
export class NewEncryptedStoreComponentModule {}
