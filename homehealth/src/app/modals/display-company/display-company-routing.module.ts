import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayCompanyPage } from './display-company.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayCompanyPageRoutingModule {}
