import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddServicesAnalysePage } from './add-services-analyse.page';

const routes: Routes = [
  {
    path: '',
    component: AddServicesAnalysePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddServicesAnalysePageRoutingModule {}
