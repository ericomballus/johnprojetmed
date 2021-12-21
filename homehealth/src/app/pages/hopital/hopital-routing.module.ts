import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HopitalPage } from './hopital.page';

const routes: Routes = [
  {
    path: '',
    component: HopitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HopitalPageRoutingModule {}
