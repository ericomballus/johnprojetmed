import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { MedicamentService } from 'src/app/services/medicament.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-display-company',
  templateUrl: './display-company.page.html',
  styleUrls: ['./display-company.page.scss'],
})
export class DisplayCompanyPage implements OnInit {
  company: Company;
  medicamentList: MedicamentSchema[] = [];
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private medic: MedicamentService
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
    //this.notif.presentLoading(40000);
    this.medic
      .getCompanyMedicament(this.company.id)
      .then((data: MedicamentSchema[]) => {
        console.log(data);
        this.medicamentList = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
