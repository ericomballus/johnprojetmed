import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanySettingPageRoutingModule } from './company-setting-routing.module';

import { CompanySettingPage } from './company-setting.page';
import { ShareModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanySettingPageRoutingModule,
    ShareModule,
  ],
  declarations: [CompanySettingPage],
})
export class CompanySettingPageModule {}
