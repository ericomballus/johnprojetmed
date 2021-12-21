import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Analyse } from 'src/app/models/analyseSchema';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-analyse-info',
  templateUrl: './analyse-info.page.html',
  styleUrls: ['./analyse-info.page.scss'],
})
export class AnalyseInfoPage implements OnInit {
  analyse: Analyse;
  company: Company;
  service: any;
  detectChanges = false;
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private notif: NotificationService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    this.analyse = this.randomStorage.getUserAnalyse();
  }
  closeModal() {
    this.randomStorage.setCompany(this.company);
    this.modal.dismiss();
  }

  save() {
    this.notif.presentLoading(40000);
    let index = this.company.analyseList.findIndex(
      (elt) => elt['id'] === this.analyse.id
    );
    if (index >= 0) {
      this.company.analyseList.splice(index, 1, this.analyse);
      this.companyService
        .updateCompany(this.company.id, this.company)
        .then((res) => {
          this.notif.dismissLoading();
          this.randomStorage.setCompany(this.company);
          this.modal.dismiss();
        });
    } else {
      this.notif.dismissLoading();
      this.randomStorage.setCompany(this.company);
      this.modal.dismiss();
    }
  }
}
