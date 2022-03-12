import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCommandesPageRoutingModule } from './user-commandes-routing.module';

import { UserCommandesPage } from './user-commandes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCommandesPageRoutingModule
  ],
  declarations: [UserCommandesPage]
})
export class UserCommandesPageModule {}
