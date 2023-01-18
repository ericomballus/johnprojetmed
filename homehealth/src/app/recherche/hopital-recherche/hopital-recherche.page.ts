import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PrendreRendezvousPage } from 'src/app/modals/prendre-rendezvous/prendre-rendezvous.page';
import { ServiceDetailsPage } from 'src/app/modals/service-details/service-details.page';
import { Company } from 'src/app/models/company';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { TranslateConfigService } from 'src/app/translate-config.service';

@Component({
  selector: 'app-hopital-recherche',
  templateUrl: './hopital-recherche.page.html',
  styleUrls: ['./hopital-recherche.page.scss'],
})
export class HopitalRecherchePage implements OnInit {
  resultat: any[];
  customer: User;
  constructor(
    private random: RandomStorageService,
    public alertController: AlertController,
    public modalController: ModalController,
    private location: Location,
    private notifi: NotificationService,
    private translateConfigService: TranslateConfigService
  ) {}

  ngOnInit() {
    this.customer = this.random.getUser();
    if (!this.customer) {
      this.notifi.presentAlertConfirm(
        'veillez crée un compte ou authentifier vous'
      );
      this.location.back();
    }
    this.resultat = this.random.getContent();
    this.languageChanged();
  }

  languageChanged() {
    let lang = localStorage.getItem('language');
    if (lang) {
      this.translateConfigService.setLanguage(lang);
    }
  }

  commander(result) {
    console.log(result);
    this.random.setData(result);
    this.presentModal();
  }
  async presentAlertConfirm(result) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: '',
      buttons: [
        {
          text: `Prendre un Rendez vous ${result.resultat.name} ?`,
          cssClass: 'secondary',
          handler: (blah) => {
            this.commander(result);
          },
        },
        {
          text: 'Voir Details',
          handler: () => {},
        },
        {
          text: 'Annuler',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PrendreRendezvousPage,
      cssClass: 'my-custom-class',
      componentProps: {},
    });
    return await modal.present();
  }

  async displayDetails(hopital: Company, service: ServiceSchema) {
    this.random.setCompany(hopital);
    this.random.setData(service);
    const modal = await this.modalController.create({
      component: ServiceDetailsPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }

  displayMap(company: Company) {
    console.log(company);
    window.open(
      'https://www.google.com/maps/dir//Lab+Yaounde+(LabY),+BP+11561,+Carrefour+Ancien+B%C3%A2timents,+B%C3%A2timent+E01+Cite+Verte,+Yaound%C3%A9/@3.8755946,11.4884294,16.5z/data=!4m8!4m7!1m0!1m5!1m1!1s0x108bcf0f1142bd29:0x8d7566ef879b60e2!2m2!1d11.4921367!2d3.8755874',
      '_system'
    );
  }
}
