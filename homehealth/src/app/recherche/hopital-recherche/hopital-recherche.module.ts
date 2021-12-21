import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HopitalRecherchePageRoutingModule } from './hopital-recherche-routing.module';

import { HopitalRecherchePage } from './hopital-recherche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HopitalRecherchePageRoutingModule
  ],
  declarations: [HopitalRecherchePage]
})
export class HopitalRecherchePageModule {}
