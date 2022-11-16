import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDetailsPageRoutingModule } from './service-details-routing.module';

import { ServiceDetailsPage } from './service-details.page';
import { ShareModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceDetailsPageRoutingModule,
    ShareModule,
  ],
  declarations: [ServiceDetailsPage],
})
export class ServiceDetailsPageModule {}
