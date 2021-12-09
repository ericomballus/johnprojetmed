import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddServicesAnalysePageRoutingModule } from './add-services-analyse-routing.module';

import { AddServicesAnalysePage } from './add-services-analyse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddServicesAnalysePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddServicesAnalysePage],
})
export class AddServicesAnalysePageModule {}
