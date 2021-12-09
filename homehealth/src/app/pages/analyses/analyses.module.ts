import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalysesPageRoutingModule } from './analyses-routing.module';

import { AnalysesPage } from './analyses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalysesPageRoutingModule
  ],
  declarations: [AnalysesPage]
})
export class AnalysesPageModule {}
