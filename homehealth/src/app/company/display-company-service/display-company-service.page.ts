import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PickServicesPage } from 'src/app/modals/pick-services/pick-services.page';
import { Company } from 'src/app/models/company';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { User } from 'src/app/models/user';
import { ManageService } from 'src/app/services/manage.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { ServiceInfoPage } from '../service-info/service-info.page';

@Component({
  selector: 'app-display-company-service',
  templateUrl: './display-company-service.page.html',
  styleUrls: ['./display-company-service.page.scss'],
})
export class DisplayCompanyServicePage implements OnInit {
  admin: User;
  company: Company;
  serviceList: ServiceSchema[];

  constructor(
    private randomStorage: RandomStorageService,
    private manageService: ManageService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    if (this.company.serviceList) {
      this.serviceList = this.company.serviceList;
    } else {
      this.serviceList = [];
    }
  }

  async addService() {
    const modal = await this.modalController.create({
      component: PickServicesPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      console.log('hello');

      this.company = this.randomStorage.getCompany();
      this.serviceList = this.company.serviceList;
    });
    return await modal.present();
  }
  async displayInfo(service) {
    this.randomStorage.setUserService(service);
    const modal = await this.modalController.create({
      component: ServiceInfoPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.company = this.randomStorage.getCompany();
      this.serviceList = this.company.serviceList;
      this.randomStorage.setUserService(null);
    });
    return await modal.present();
  }
}
