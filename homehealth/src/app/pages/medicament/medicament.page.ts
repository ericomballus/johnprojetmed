import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateMedicamentPage } from 'src/app/modals/create-medicament/create-medicament.page';
import { CreateMedocsCategoriePage } from 'src/app/modals/create-medocs-categorie/create-medocs-categorie.page';
import { MedicamentDetailsPage } from 'src/app/modals/medicament-details/medicament-details.page';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { CacheService } from 'src/app/services/cache.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OpenModalService } from 'src/app/services/open-modal.service';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.page.html',
  styleUrls: ['./medicament.page.scss'],
})
export class MedicamentPage implements OnInit {
  itemsList: MedicamentSchema[] = [];
  scrool = false;
  constructor(
    private modalCrtl: ModalController,
    private medic: MedicamentService,
    private notif: NotificationService,
    private modal: OpenModalService,
    private cacheService: CacheService
  ) {}

  ngOnInit() {
    this.getMedocs();
  }
  async AddMedicament() {
    const modal = await this.modalCrtl.create({
      component: CreateMedicamentPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.medic
        .getAllNotRealtimeMedoc()
        .then((data: MedicamentSchema[]) => {
          this.itemsList = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return await modal.present();
  }

  async AddCategorie() {
    const modal = await this.modalCrtl.create({
      component: CreateMedocsCategoriePage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }

  getMedocs() {
    this.notif.presentLoading(40000);
    this.medic
      .getAllNotRealtimeMedoc()
      .then((data: MedicamentSchema[]) => {
        this.notif.dismissLoading();

        this.itemsList = data;
      })
      .catch((err) => {
        this.notif.dismissLoading();
        console.log(err);
      });
  }
  removeMedoc(medoc: MedicamentSchema) {
    this.notif.presentLoading(40000);
    this.medic
      .removeOneMedoc(medoc)
      .then((data) => {
        this.notif.dismissLoading();
        this.notif.presentToast('supression reussi', 'danger', 4000);
        this.itemsList = this.itemsList.filter((med) => med.id !== medoc.id);
      })
      .catch((err) => {
        this.notif.dismissLoading();
        console.log(err);
      });
  }

  loadData(event) {
    this.scrool = true;
    this.medic
      .getAllNotRealtimeMedoc()
      .then((data: MedicamentSchema[]) => {
        console.log(data);

        data.forEach((elt) => {
          this.itemsList.push(elt);
        });
        console.log(this.itemsList);
        event.target.complete();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async showDetails(medoc: MedicamentSchema) {
    console.log(medoc);

    this.cacheService.setMedoc(medoc);
    await this.modal.ouvreLaPage(MedicamentDetailsPage);

    // console.log(this.cacheService.getMedoc());
    medoc = this.cacheService.getMedoc();
  }
}
