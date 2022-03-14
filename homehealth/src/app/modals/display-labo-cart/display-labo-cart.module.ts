import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayLaboCartPageRoutingModule } from './display-labo-cart-routing.module';

import { DisplayLaboCartPage } from './display-labo-cart.page';
import { ShareModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayLaboCartPageRoutingModule,
    ShareModule,
  ],
  declarations: [DisplayLaboCartPage],
})
export class DisplayLaboCartPageModule {}
