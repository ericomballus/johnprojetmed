import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCommandesPage } from './user-commandes.page';

const routes: Routes = [
  {
    path: '',
    component: UserCommandesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCommandesPageRoutingModule {}
