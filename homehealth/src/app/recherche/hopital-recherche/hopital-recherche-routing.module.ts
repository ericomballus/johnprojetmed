import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HopitalRecherchePage } from './hopital-recherche.page';

const routes: Routes = [
  {
    path: '',
    component: HopitalRecherchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HopitalRecherchePageRoutingModule {}
