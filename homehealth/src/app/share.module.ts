import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChoiceComponent } from './components/choice/choice.component';
import { CardComponent } from './components/card/card.component';
import { CompanyinfoComponent } from './components/companyinfo/companyinfo.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    ChoiceComponent,
    CardComponent,
    CompanyinfoComponent,
    ProductInfoComponent,
  ],
  exports: [
    ChoiceComponent,
    CardComponent,
    CompanyinfoComponent,
    ProductInfoComponent,
  ],
})
export class ShareModule {}
