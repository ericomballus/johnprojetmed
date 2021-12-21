import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyAddUserPage } from './company-add-user.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyAddUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAddUserPageRoutingModule {}
