import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalyseInfoPageRoutingModule } from './analyse-info-routing.module';

import { AnalyseInfoPage } from './analyse-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalyseInfoPageRoutingModule
  ],
  declarations: [AnalyseInfoPage]
})
export class AnalyseInfoPageModule {}
