import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayAdvicesPage } from './display-advices.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayAdvicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayAdvicesPageRoutingModule {}
