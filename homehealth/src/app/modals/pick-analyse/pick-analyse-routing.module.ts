import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickAnalysePage } from './pick-analyse.page';

const routes: Routes = [
  {
    path: '',
    component: PickAnalysePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickAnalysePageRoutingModule {}
