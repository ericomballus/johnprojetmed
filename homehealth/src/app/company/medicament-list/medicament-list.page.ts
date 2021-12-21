import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PickMedicamentPage } from 'src/app/modals/pick-medicament/pick-medicament.page';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { MedicamentInfoPage } from '../medicament-info/medicament-info.page';

@Component({
  selector: 'app-medicament-list',
  templateUrl: './medicament-list.page.html',
  styleUrls: ['./medicament-list.page.scss'],
})
export class MedicamentListPage implements OnInit {
  company: Company;
  medicamentList: MedicamentSchema[];
  constructor(
    private modalCrtl: ModalController,
    private randomStorage: RandomStorageService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    console.log(this.company);
    this.medicamentList = this.company.medicamentList;
  }
  async addMedicament() {
    const modal = await this.modalCrtl.create({
      component: PickMedicamentPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.company = this.randomStorage.getCompany();
      this.medicamentList = this.company.medicamentList;
    });
    return await modal.present();
  }

  async displayInfo(medicament: MedicamentSchema) {
    this.randomStorage.setMedicament(medicament);
    const modal = await this.modalCrtl.create({
      component: MedicamentInfoPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.company = this.randomStorage.getCompany();
      this.medicamentList = this.company.medicamentList;
      this.randomStorage.setMedicament(null);
    });
    return await modal.present();
  }
}
