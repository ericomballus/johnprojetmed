import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickMedicamentPage } from './pick-medicament.page';

const routes: Routes = [
  {
    path: '',
    component: PickMedicamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickMedicamentPageRoutingModule {}
