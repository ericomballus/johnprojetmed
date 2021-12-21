import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyAddUserPageRoutingModule } from './company-add-user-routing.module';

import { CompanyAddUserPage } from './company-add-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyAddUserPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CompanyAddUserPage],
})
export class CompanyAddUserPageModule {}
