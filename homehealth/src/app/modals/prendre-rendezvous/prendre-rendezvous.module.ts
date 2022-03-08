import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrendreRendezvousPageRoutingModule } from './prendre-rendezvous-routing.module';

import { PrendreRendezvousPage } from './prendre-rendezvous.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrendreRendezvousPageRoutingModule
  ],
  declarations: [PrendreRendezvousPage]
})
export class PrendreRendezvousPageModule {}
