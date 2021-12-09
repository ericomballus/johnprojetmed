import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAnalysePage } from './add-analyse.page';

const routes: Routes = [
  {
    path: '',
    component: AddAnalysePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAnalysePageRoutingModule {}
