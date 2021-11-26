import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdvicesPageRoutingModule } from './add-advices-routing.module';

import { AddAdvicesPage } from './add-advices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdvicesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddAdvicesPage],
})
export class AddAdvicesPageModule {}
