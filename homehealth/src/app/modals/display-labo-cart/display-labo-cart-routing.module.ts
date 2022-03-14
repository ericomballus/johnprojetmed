import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayLaboCartPage } from './display-labo-cart.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayLaboCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayLaboCartPageRoutingModule {}
