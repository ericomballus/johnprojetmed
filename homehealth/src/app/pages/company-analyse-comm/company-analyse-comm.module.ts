import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyAnalyseCommPageRoutingModule } from './company-analyse-comm-routing.module';

import { CompanyAnalyseCommPage } from './company-analyse-comm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyAnalyseCommPageRoutingModule
  ],
  declarations: [CompanyAnalyseCommPage]
})
export class CompanyAnalyseCommPageModule {}
