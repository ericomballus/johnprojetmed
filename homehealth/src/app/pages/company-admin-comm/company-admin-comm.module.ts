import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyAdminCommPageRoutingModule } from './company-admin-comm-routing.module';

import { CompanyAdminCommPage } from './company-admin-comm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyAdminCommPageRoutingModule
  ],
  declarations: [CompanyAdminCommPage]
})
export class CompanyAdminCommPageModule {}
