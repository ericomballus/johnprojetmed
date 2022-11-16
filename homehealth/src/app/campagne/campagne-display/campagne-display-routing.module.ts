import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampagneDisplayPage } from './campagne-display.page';

const routes: Routes = [
  {
    path: '',
    component: CampagneDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampagneDisplayPageRoutingModule {}
