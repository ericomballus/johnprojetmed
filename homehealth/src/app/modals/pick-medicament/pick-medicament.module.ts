import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickMedicamentPageRoutingModule } from './pick-medicament-routing.module';

import { PickMedicamentPage } from './pick-medicament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickMedicamentPageRoutingModule
  ],
  declarations: [PickMedicamentPage]
})
export class PickMedicamentPageModule {}
