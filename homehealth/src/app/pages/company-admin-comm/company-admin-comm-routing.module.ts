import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyAdminCommPage } from './company-admin-comm.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyAdminCommPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAdminCommPageRoutingModule {}
