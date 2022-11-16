import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampagneAddPageRoutingModule } from './campagne-add-routing.module';

import { CampagneAddPage } from './campagne-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampagneAddPageRoutingModule
  ],
  declarations: [CampagneAddPage]
})
export class CampagneAddPageModule {}
