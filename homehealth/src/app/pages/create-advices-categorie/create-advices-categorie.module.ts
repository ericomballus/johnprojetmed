import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAdvicesCategoriePageRoutingModule } from './create-advices-categorie-routing.module';

import { CreateAdvicesCategoriePage } from './create-advices-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAdvicesCategoriePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateAdvicesCategoriePage],
})
export class CreateAdvicesCategoriePageModule {}
