import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HopitalPageRoutingModule } from './hopital-routing.module';

import { HopitalPage } from './hopital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HopitalPageRoutingModule
  ],
  declarations: [HopitalPage]
})
export class HopitalPageModule {}
