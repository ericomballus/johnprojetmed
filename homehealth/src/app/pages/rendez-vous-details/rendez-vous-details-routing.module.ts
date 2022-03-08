import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RendezVousDetailsPage } from './rendez-vous-details.page';

const routes: Routes = [
  {
    path: '',
    component: RendezVousDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendezVousDetailsPageRoutingModule {}
