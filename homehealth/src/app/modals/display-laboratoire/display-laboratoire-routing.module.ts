import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayLaboratoirePage } from './display-laboratoire.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayLaboratoirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayLaboratoirePageRoutingModule {}
