import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DisplayLaboratoirePage } from 'src/app/modals/display-laboratoire/display-laboratoire.page';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-laboratoire',
  templateUrl: './laboratoire.page.html',
  styleUrls: ['./laboratoire.page.scss'],
})
export class LaboratoirePage implements OnInit {
  laboratoireList: any[];
  constructor(
    private companyService: CompanyService,
    private notifi: NotificationService,
    private random: RandomStorageService,
    private modalCrtl: ModalController
  ) {}

  ngOnInit() {
    this.getLaboratoire();
  }

  getLaboratoire() {
    this.notifi.presentLoading(40000);
    this.companyService.getCompanyQuery('laboratoire').then((data: any[]) => {
      this.laboratoireList = data;
      console.log(this.laboratoireList);
      this.notifi.dismissLoading();
    });
  }
  async displayIt(advice) {
    this.random.setCompany(advice);
    const modal = await this.modalCrtl.create({
      component: DisplayLaboratoirePage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }
}
