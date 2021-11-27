import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMedocsCategoriePageRoutingModule } from './create-medocs-categorie-routing.module';

import { CreateMedocsCategoriePage } from './create-medocs-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMedocsCategoriePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateMedocsCategoriePage],
})
export class CreateMedocsCategoriePageModule {}
