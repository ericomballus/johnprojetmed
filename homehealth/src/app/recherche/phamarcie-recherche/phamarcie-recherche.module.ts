import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhamarcieRecherchePageRoutingModule } from './phamarcie-recherche-routing.module';

import { PhamarcieRecherchePage } from './phamarcie-recherche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhamarcieRecherchePageRoutingModule
  ],
  declarations: [PhamarcieRecherchePage]
})
export class PhamarcieRecherchePageModule {}
