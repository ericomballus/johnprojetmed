import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAnalysePageRoutingModule } from './update-analyse-routing.module';

import { UpdateAnalysePage } from './update-analyse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAnalysePageRoutingModule
  ],
  declarations: [UpdateAnalysePage]
})
export class UpdateAnalysePageModule {}
