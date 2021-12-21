import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyseInfoPage } from './analyse-info.page';

const routes: Routes = [
  {
    path: '',
    component: AnalyseInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyseInfoPageRoutingModule {}
