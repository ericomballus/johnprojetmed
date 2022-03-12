import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplaycartPage } from './displaycart.page';

const routes: Routes = [
  {
    path: '',
    component: DisplaycartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplaycartPageRoutingModule {}
