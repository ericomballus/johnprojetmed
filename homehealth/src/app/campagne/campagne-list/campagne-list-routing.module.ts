import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampagneListPage } from './campagne-list.page';

const routes: Routes = [
  {
    path: '',
    component: CampagneListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampagneListPageRoutingModule {}
