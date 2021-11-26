import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChoiceComponent } from './components/choice/choice.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ChoiceComponent, CardComponent],
  exports: [ChoiceComponent, CardComponent],
})
export class ShareModule {}
