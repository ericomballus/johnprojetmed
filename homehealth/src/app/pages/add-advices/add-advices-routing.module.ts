import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdvicesPage } from './add-advices.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdvicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdvicesPageRoutingModule {}
