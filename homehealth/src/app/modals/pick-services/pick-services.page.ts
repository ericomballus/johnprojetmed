import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { CompanyService } from 'src/app/services/company.service';
import { ManageService } from 'src/app/services/manage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-pick-services',
  templateUrl: './pick-services.page.html',
  styleUrls: ['./pick-services.page.scss'],
})
export class PickServicesPage implements OnInit {
  serviceTab: any[];
  itemsList: any[] = [];
  company: Company;
  public myService$: Observable<any[]>;
  constructor(
    private manageService: ManageService,
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private companyService: CompanyService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    this.getServiceList();
  }

  getServiceList() {
    console.log(this.company.serviceList);

    let myServiceList = this.company.serviceList;
    this.myService$ = this.manageService.selectAllServices(
      this.company.serviceList
    );
  }

  closeModal() {
    this.randomStorage.setCompany(this.company);
    this.modal.dismiss();
  }
  addService(service) {
    if (!this.company.allServiceListId) {
      this.company.allServiceListId = [];
    }
    let myService = this.company.serviceList;
    let index = myService.findIndex((serv) => serv['id'] === service.id);

    if (index >= 0) {
      this.company.serviceList = this.company.serviceList.filter(
        (elt) => elt['id'] !== service.id
      );
      this.company.allServiceListId = this.company.allServiceListId.filter(
        (elt) => elt !== service.id
      );
    } else {
      this.company.serviceList.push(service);
      this.company.allServiceListId.push(service.id);
    }
  }

  save() {
    if (this.company.id && this.company.id.length > 2) {
      this.notifi.presentLoading(40000);
      this.companyService
        .updateCompany(this.company.id, this.company)
        .then((res) => {
          this.notifi.dismissLoading();
          this.randomStorage.setCompany(this.company);
          this.modal.dismiss();
        });
    } else {
      // this.notifi.dismissLoading();
      this.randomStorage.setCompany(this.company);
      this.modal.dismiss();
    }
  }
}
