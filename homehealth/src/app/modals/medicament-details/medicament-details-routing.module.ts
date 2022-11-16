import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentDetailsPage } from './medicament-details.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentDetailsPageRoutingModule {}
