import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCommandeLaboPage } from './user-commande-labo.page';

const routes: Routes = [
  {
    path: '',
    component: UserCommandeLaboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCommandeLaboPageRoutingModule {}
