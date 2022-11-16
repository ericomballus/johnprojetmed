import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentDetailsPageRoutingModule } from './medicament-details-routing.module';

import { MedicamentDetailsPage } from './medicament-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentDetailsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MedicamentDetailsPage],
})
export class MedicamentDetailsPageModule {}
