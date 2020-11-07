import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FilterKeysComponent } from './filterkeys.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [FilterKeysComponent],
  exports: [FilterKeysComponent]
})
export class FilterKeysComponentModule {}
