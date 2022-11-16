import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampagneListPageRoutingModule } from './campagne-list-routing.module';

import { CampagneListPage } from './campagne-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampagneListPageRoutingModule
  ],
  declarations: [CampagneListPage]
})
export class CampagneListPageModule {}
