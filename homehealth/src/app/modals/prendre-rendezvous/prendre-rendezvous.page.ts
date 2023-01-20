import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  templateUrl: './prendre-rendezvous.page.html',
  styleUrls: ['./prendre-rendezvous.page.scss'],
})
export class PrendreRendezvousPage implements OnInit {
  result: any;
  heure: any;
  jour: any;
  company: Company;
  customer: User;
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private notifi: NotificationService,
    private rendezVous: RendezvousService,
    private location: Location
  ) {}

  ngOnInit() {
    this.customer = this.randomStorage.getUser();
    if (!this.customer) {
      this.notifi.presentAlertConfirm(
        'veillez crée un compte ou authentifier vous'
      );
      this.location.back();
    }
    this.result = this.randomStorage.getData();
    console.log(this.result);
    // console.log(this.randomStorage.getUser());

    this.company = this.result.company;
  }
  closeModal() {
    // this.randomStorage.setCompany(this.company);
    this.modal.dismiss();
  }

  selectHour(ev) {
    console.log(ev);
    this.heure = ev.detail.value;
    let h = new Date(this.heure).getHours();
    console.log(h);
  }
  selectDate(ev) {
    console.log(ev);
    this.jour = ev.detail.value;
  }
  valider() {
    this.notifi.presentLoading(10000);
    let rdv = {
      companyId: this.company.id,
      serviceName: this.result.resultat.name,
      serviceId: this.result.resultat.id,
      jour: this.jour,
      heure: this.heure,
      customerId: this.customer.uid,
      valider: false,
    };
    this.rendezVous.postRendezVous(rdv).then(() => {
      this.notifi.presentToast(
        'votre rendez vous a été enregistré',
        'success',
        3000
      );

      this.notifi.dismissLoading();
      this.closeModal();
    });
  }
}
