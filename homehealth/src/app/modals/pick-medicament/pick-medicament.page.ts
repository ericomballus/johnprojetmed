import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { CompanyService } from 'src/app/services/company.service';
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
    private notif: NotificationService,
    private companyService: CompanyService
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
    if (!this.company.allMedicamentListId) {
      this.company.allMedicamentListId = [];
    }

    let arr = medicament.users;

    if (arr.includes(this.company.id)) {
      //il existe deja
      medicament.users = arr.filter((companyId: string) => {
        return companyId != this.company.id;
      });
      this.company.medicamentList = this.company.medicamentList.filter(
        (elt) => elt.id != medicament.id
      );
      this.company.allMedicamentListId =
        this.company.allMedicamentListId.filter((elt) => elt != medicament.id);
    } else {
      medicament.users.push(this.company.id);
      this.company.medicamentList.push(medicament);
      this.company.allMedicamentListId.push(medicament.id);
      console.log(this.company.allMedicamentListId);
    }
    this.medic
      .updateMedicament(medicament.id, medicament.users)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  save() {
    this.notif.presentLoading(40000);
    this.companyService
      .updateCompany(this.company.id, this.company)
      .then((res) => {
        this.notif.dismissLoading();
        this.randomStorage.setCompany(this.company);
        this.modal.dismiss();
      });
  }
}
