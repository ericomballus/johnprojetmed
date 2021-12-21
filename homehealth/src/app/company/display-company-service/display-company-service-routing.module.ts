import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayCompanyServicePage } from './display-company-service.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayCompanyServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayCompanyServicePageRoutingModule {}
