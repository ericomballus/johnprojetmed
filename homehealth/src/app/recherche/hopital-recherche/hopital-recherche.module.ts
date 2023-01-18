import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HopitalRecherchePageRoutingModule } from './hopital-recherche-routing.module';

import { HopitalRecherchePage } from './hopital-recherche.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HopitalRecherchePageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [HopitalRecherchePage],
})
export class HopitalRecherchePageModule {}
