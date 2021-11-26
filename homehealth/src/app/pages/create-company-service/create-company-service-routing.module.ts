import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCompanyServicePage } from './create-company-service.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCompanyServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCompanyServicePageRoutingModule {}
