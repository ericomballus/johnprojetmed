import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyAdminRdvPageRoutingModule } from './company-admin-rdv-routing.module';

import { CompanyAdminRdvPage } from './company-admin-rdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyAdminRdvPageRoutingModule
  ],
  declarations: [CompanyAdminRdvPage]
})
export class CompanyAdminRdvPageModule {}
