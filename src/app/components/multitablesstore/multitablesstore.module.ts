import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MultitablesstoreComponent } from './multitablesstore.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [MultitablesstoreComponent],
  exports: [MultitablesstoreComponent]
})
export class MultitablesstoreComponentModule {}
