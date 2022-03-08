import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrendreRendezvousPage } from './prendre-rendezvous.page';

const routes: Routes = [
  {
    path: '',
    component: PrendreRendezvousPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrendreRendezvousPageRoutingModule {}
