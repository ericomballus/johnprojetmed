import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentInfoPage } from './medicament-info.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentInfoPageRoutingModule {}
