import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { CompanyService } from 'src/app/services/company.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { TownService } from 'src/app/services/town.service';

@Component({
  selector: 'app-display-company',
  templateUrl: './display-company.page.html',
  styleUrls: ['./display-company.page.scss'],
})
export class DisplayCompanyPage implements OnInit {
  company: Company;
  medicamentList: MedicamentSchema[] = [];
  villeList: any[] = [];
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private medic: MedicamentService,
    private town: TownService,
    private companieService: CompanyService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    // this.getMedocs();
    this.getVille();
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

  getVille() {
    this.town.getAllNotRealtimeVille().then((docs: any[]) => {
      this.villeList = docs;
      console.log(this.villeList);
    });
  }

  getVilleName(ev) {
    console.log(ev);
    let ville = ev.detail.value;
    this.company.ville = ville;
  }
  update() {
    this.notifi.presentLoading(10000);
    this.companieService
      .updateCompany(this.company.adminId, this.company)
      .then(() => {
        this.notifi.dismissLoading();
      });
  }
}
