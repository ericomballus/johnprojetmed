import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaboratoireRecherchePageRoutingModule } from './laboratoire-recherche-routing.module';

import { LaboratoireRecherchePage } from './laboratoire-recherche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaboratoireRecherchePageRoutingModule
  ],
  declarations: [LaboratoireRecherchePage]
})
export class LaboratoireRecherchePageModule {}
