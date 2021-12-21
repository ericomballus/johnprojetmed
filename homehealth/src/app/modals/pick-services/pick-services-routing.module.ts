import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickServicesPage } from './pick-services.page';

const routes: Routes = [
  {
    path: '',
    component: PickServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickServicesPageRoutingModule {}
