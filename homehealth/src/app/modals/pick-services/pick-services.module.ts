import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickServicesPageRoutingModule } from './pick-services-routing.module';

import { PickServicesPage } from './pick-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickServicesPageRoutingModule
  ],
  declarations: [PickServicesPage]
})
export class PickServicesPageModule {}
