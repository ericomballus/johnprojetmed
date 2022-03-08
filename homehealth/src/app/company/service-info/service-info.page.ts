import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { User } from 'src/app/models/user';
import { ServiceSchema } from 'src/app/models/serviceSchema';
//import { AnalyseService } from 'src/app/services/analyse.service';
import { CompanyService } from 'src/app/services/company.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.page.html',
  styleUrls: ['./service-info.page.scss'],
})
export class ServiceInfoPage implements OnInit {
  itemsList: MedicamentSchema[] = [];
  company: Company;
  service: ServiceSchema;
  detectChanges = false;
  admin: User;
  employeeList: User[] = [];
  employe: User;
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private medic: MedicamentService,
    private notif: NotificationService,
    private companyService: CompanyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    this.service = this.randomStorage.getUserService();
    this.admin = this.randomStorage.getAdmin();
    this.getEmployeeList(this.admin.uid);
    console.log(this.company);
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
    let tab = [];
    if (index >= 0) {
      this.company.serviceList.splice(index, 1, this.service);
      this.companyService
        .updateCompany(this.company.id, this.company)
        .then(async (res) => {
          if (this.employe) {
            if (this.employe.serviceList) {
              this.employe.serviceList.push(this.service);
            } else {
              tab.push(this.service);
              this.employe.serviceList = tab;
            }
            try {
              await this.userService.updateUser(
                this.employe,
                this.employe.serviceList
              );
            } catch (error) {
              console.log(error);
            }
          }
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

  getEmployeeList(adminId) {
    this.userService.getListEmployees(adminId).subscribe((docs: User[]) => {
      this.employeeList = docs;
      console.log(docs);
    });
  }

  setSelected(ev) {
    console.log(ev.options);

    let selectedValues = Array.apply(null, ev.options) // convert to real Array
      .filter((option) => option.selected)
      .map((option) => option.value);
    let id = selectedValues[0];

    let i = this.employeeList.findIndex((elt: User) => elt.uid == id);
    if (i >= 0) {
      console.log(this.employeeList[i]);
      this.employe = this.employeeList[i];
      this.service.responsable = this.employe.displayName;
      this.service.responsableEmail = this.employe.email;
      this.service.responsableUid = this.employe.uid;
    }
  }
}
