import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboratoireRecherchePage } from './laboratoire-recherche.page';

const routes: Routes = [
  {
    path: '',
    component: LaboratoireRecherchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoireRecherchePageRoutingModule {}
