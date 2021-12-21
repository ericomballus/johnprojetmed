import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyseListPage } from './analyse-list.page';

const routes: Routes = [
  {
    path: '',
    component: AnalyseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyseListPageRoutingModule {}
