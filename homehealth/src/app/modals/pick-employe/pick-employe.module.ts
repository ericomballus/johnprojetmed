import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickEmployePageRoutingModule } from './pick-employe-routing.module';

import { PickEmployePage } from './pick-employe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickEmployePageRoutingModule
  ],
  declarations: [PickEmployePage]
})
export class PickEmployePageModule {}
