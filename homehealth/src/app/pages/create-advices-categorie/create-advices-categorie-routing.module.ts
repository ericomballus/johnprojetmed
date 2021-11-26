import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAdvicesCategoriePage } from './create-advices-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAdvicesCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAdvicesCategoriePageRoutingModule {}
