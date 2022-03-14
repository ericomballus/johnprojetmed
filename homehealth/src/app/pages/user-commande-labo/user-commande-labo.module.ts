import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCommandeLaboPageRoutingModule } from './user-commande-labo-routing.module';

import { UserCommandeLaboPage } from './user-commande-labo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCommandeLaboPageRoutingModule
  ],
  declarations: [UserCommandeLaboPage]
})
export class UserCommandeLaboPageModule {}
