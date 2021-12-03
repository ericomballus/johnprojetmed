import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-pick-medicament',
  templateUrl: './pick-medicament.page.html',
  styleUrls: ['./pick-medicament.page.scss'],
})
export class PickMedicamentPage implements OnInit {
  itemsList: MedicamentSchema[] = [];
  company: Company;
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private medic: MedicamentService,
    private notif: NotificationService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    this.getMedocs();
  }
  closeModal() {
    this.randomStorage.setCompany(this.company);
    this.modal.dismiss();
  }
  getMedocs() {
    this.notif.presentLoading(40000);
    this.medic
      .getAllNotRealtimeMedoc(this.company.id)
      .then((data: MedicamentSchema[]) => {
        this.notif.dismissLoading();
        console.log(data);

        this.itemsList = data;
      })
      .catch((err) => {
        this.notif.dismissLoading();
        console.log(err);
      });
  }
  addMedicament(medicament: MedicamentSchema) {
    if (this.company.medicamentList) {
      /* let arr = this.company.medicamentList;
      let index = arr.findIndex((medic) => {
        medic.id == medicament.id;
      });
     if (index >= 0) {
      } else {
        this.company.medicamentList.push(medicament);
      } */
    } else {
      // this.company['medicamentList'] = [];
      // this.company.medicamentList.push(medicament);
    }
    if (medicament.isChecked) {
    } else {
    }

    let arr = medicament.users;

    if (arr.includes(this.company.id)) {
      //il existe deja
      medicament.users = arr.filter((companyId: string) => {
        return companyId != this.company.id;
      });
    } else {
      medicament.users.push(this.company.id);
    }
    this.medic
      .updateMedicament(medicament.id, medicament.users)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
}
