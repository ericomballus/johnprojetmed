import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VillesPageRoutingModule } from './villes-routing.module';

import { VillesPage } from './villes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VillesPageRoutingModule
  ],
  declarations: [VillesPage]
})
export class VillesPageModule {}
