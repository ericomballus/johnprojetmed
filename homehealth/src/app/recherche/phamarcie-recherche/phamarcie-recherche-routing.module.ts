import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhamarcieRecherchePage } from './phamarcie-recherche.page';

const routes: Routes = [
  {
    path: '',
    component: PhamarcieRecherchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhamarcieRecherchePageRoutingModule {}
