import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayLaboratoirePageRoutingModule } from './display-laboratoire-routing.module';

import { DisplayLaboratoirePage } from './display-laboratoire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayLaboratoirePageRoutingModule
  ],
  declarations: [DisplayLaboratoirePage]
})
export class DisplayLaboratoirePageModule {}
