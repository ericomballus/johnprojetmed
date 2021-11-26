import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCompanyServicePageRoutingModule } from './create-company-service-routing.module';

import { CreateCompanyServicePage } from './create-company-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateCompanyServicePageRoutingModule,
  ],
  declarations: [CreateCompanyServicePage],
})
export class CreateCompanyServicePageModule {}
