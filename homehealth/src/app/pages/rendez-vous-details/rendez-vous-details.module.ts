import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RendezVousDetailsPageRoutingModule } from './rendez-vous-details-routing.module';

import { RendezVousDetailsPage } from './rendez-vous-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RendezVousDetailsPageRoutingModule
  ],
  declarations: [RendezVousDetailsPage]
})
export class RendezVousDetailsPageModule {}
