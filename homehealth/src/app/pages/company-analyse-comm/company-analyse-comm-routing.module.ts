import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyAnalyseCommPage } from './company-analyse-comm.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyAnalyseCommPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAnalyseCommPageRoutingModule {}
