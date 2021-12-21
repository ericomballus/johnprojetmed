import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyUsersPageRoutingModule } from './company-users-routing.module';

import { CompanyUsersPage } from './company-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyUsersPageRoutingModule
  ],
  declarations: [CompanyUsersPage]
})
export class CompanyUsersPageModule {}
