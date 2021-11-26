import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTownPageRoutingModule } from './create-town-routing.module';

import { CreateTownPage } from './create-town.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTownPageRoutingModule
  ],
  declarations: [CreateTownPage]
})
export class CreateTownPageModule {}
