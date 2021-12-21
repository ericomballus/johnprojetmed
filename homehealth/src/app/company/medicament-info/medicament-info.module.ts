import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentInfoPageRoutingModule } from './medicament-info-routing.module';

import { MedicamentInfoPage } from './medicament-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentInfoPageRoutingModule
  ],
  declarations: [MedicamentInfoPage]
})
export class MedicamentInfoPageModule {}
