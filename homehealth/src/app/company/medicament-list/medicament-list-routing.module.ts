import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentListPage } from './medicament-list.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentListPageRoutingModule {}
