import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplaycartPageRoutingModule } from './displaycart-routing.module';

import { DisplaycartPage } from './displaycart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplaycartPageRoutingModule
  ],
  declarations: [DisplaycartPage]
})
export class DisplaycartPageModule {}
