import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionCompanyPageRoutingModule } from './inscription-company-routing.module';

import { InscriptionCompanyPage } from './inscription-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InscriptionCompanyPageRoutingModule,
  ],
  declarations: [InscriptionCompanyPage],
})
export class InscriptionCompanyPageModule {}
