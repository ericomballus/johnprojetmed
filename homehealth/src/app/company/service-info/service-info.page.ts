import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { User } from 'src/app/models/user';
import { AnalyseService } from 'src/app/services/analyse.service';
import { CompanyService } from 'src/app/services/company.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.page.html',
  styleUrls: ['./service-info.page.scss'],
})
export class ServiceInfoPage implements OnInit {
  itemsList: MedicamentSchema[] = [];
  company: Company;
  service: any;
  detectChanges = false;
  admin: User;
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private medic: MedicamentService,
    private notif: NotificationService,
    private companyService: CompanyService,
    private analyses: AnalyseService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    this.service = this.randomStorage.getUserService();
  }
  closeModal() {
    this.randomStorage.setCompany(this.company);
    this.modal.dismiss();
  }

  save() {
    this.notif.presentLoading(40000);
    let index = this.company.serviceList.findIndex(
      (elt) => elt['id'] === this.service.id
    );
    if (index >= 0) {
      this.company.serviceList.splice(index, 1, this.service);
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
