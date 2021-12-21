import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentListPageRoutingModule } from './medicament-list-routing.module';

import { MedicamentListPage } from './medicament-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentListPageRoutingModule
  ],
  declarations: [MedicamentListPage]
})
export class MedicamentListPageModule {}
