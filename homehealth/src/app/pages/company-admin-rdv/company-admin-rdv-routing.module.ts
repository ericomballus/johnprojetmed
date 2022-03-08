import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyAdminRdvPage } from './company-admin-rdv.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyAdminRdvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAdminRdvPageRoutingModule {}
