import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickAnalysePageRoutingModule } from './pick-analyse-routing.module';

import { PickAnalysePage } from './pick-analyse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickAnalysePageRoutingModule
  ],
  declarations: [PickAnalysePage]
})
export class PickAnalysePageModule {}
