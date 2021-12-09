import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAnalysePageRoutingModule } from './add-analyse-routing.module';

import { AddAnalysePage } from './add-analyse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAnalysePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddAnalysePage],
})
export class AddAnalysePageModule {}
