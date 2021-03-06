import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayCompanyPageRoutingModule } from './display-company-routing.module';

import { DisplayCompanyPage } from './display-company.page';
import { ShareModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayCompanyPageRoutingModule,
    ShareModule,
  ],
  declarations: [DisplayCompanyPage],
})
export class DisplayCompanyPageModule {}
