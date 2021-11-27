import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMedocsCategoriePage } from './create-medocs-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMedocsCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMedocsCategoriePageRoutingModule {}
