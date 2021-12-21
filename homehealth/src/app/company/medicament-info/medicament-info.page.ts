import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { CompanyService } from 'src/app/services/company.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
@Component({
  selector: 'app-medicament-info',
  templateUrl: './medicament-info.page.html',
  styleUrls: ['./medicament-info.page.scss'],
})
export class MedicamentInfoPage implements OnInit {
  itemsList: MedicamentSchema[] = [];
  company: Company;
  medicament: MedicamentSchema;
  detectChanges = false;
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private medic: MedicamentService,
    private notif: NotificationService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    this.medicament = this.randomStorage.getMedicament();
  }
  closeModal() {
    this.randomStorage.setCompany(this.company);
    this.modal.dismiss();
  }

  save() {
    this.notif.presentLoading(40000);
    let index = this.company.medicamentList.findIndex(
      (elt) => elt.id === this.medicament.id
    );
    if (index >= 0) {
      this.company.medicamentList.splice(index, 1, this.medicament);
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
