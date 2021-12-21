import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayCompanyServicePageRoutingModule } from './display-company-service-routing.module';

import { DisplayCompanyServicePage } from './display-company-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayCompanyServicePageRoutingModule
  ],
  declarations: [DisplayCompanyServicePage]
})
export class DisplayCompanyServicePageModule {}
