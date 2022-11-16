import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampagneDisplayPageRoutingModule } from './campagne-display-routing.module';

import { CampagneDisplayPage } from './campagne-display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampagneDisplayPageRoutingModule
  ],
  declarations: [CampagneDisplayPage]
})
export class CampagneDisplayPageModule {}
