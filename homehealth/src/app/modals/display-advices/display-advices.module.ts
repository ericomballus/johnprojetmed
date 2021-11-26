import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayAdvicesPageRoutingModule } from './display-advices-routing.module';

import { DisplayAdvicesPage } from './display-advices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayAdvicesPageRoutingModule
  ],
  declarations: [DisplayAdvicesPage]
})
export class DisplayAdvicesPageModule {}
