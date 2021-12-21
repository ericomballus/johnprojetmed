import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyUsersPage } from './company-users.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyUsersPageRoutingModule {}
