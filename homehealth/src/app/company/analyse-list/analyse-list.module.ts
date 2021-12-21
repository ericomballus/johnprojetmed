import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalyseListPageRoutingModule } from './analyse-list-routing.module';

import { AnalyseListPage } from './analyse-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalyseListPageRoutingModule
  ],
  declarations: [AnalyseListPage]
})
export class AnalyseListPageModule {}
