import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMedicamentPage } from './create-medicament.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMedicamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMedicamentPageRoutingModule {}
