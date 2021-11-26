import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMedicamentPageRoutingModule } from './create-medicament-routing.module';

import { CreateMedicamentPage } from './create-medicament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateMedicamentPageRoutingModule,
  ],
  declarations: [CreateMedicamentPage],
})
export class CreateMedicamentPageModule {}
