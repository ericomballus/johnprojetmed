import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionCompanyPage } from './inscription-company.page';

const routes: Routes = [
  {
    path: '',
    component: InscriptionCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionCompanyPageRoutingModule {}
