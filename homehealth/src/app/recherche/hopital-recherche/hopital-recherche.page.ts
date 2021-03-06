import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PrendreRendezvousPage } from 'src/app/modals/prendre-rendezvous/prendre-rendezvous.page';
import { ServiceDetailsPage } from 'src/app/modals/service-details/service-details.page';
import { Company } from 'src/app/models/company';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-hopital-recherche',
  templateUrl: './hopital-recherche.page.html',
  styleUrls: ['./hopital-recherche.page.scss'],
})
export class HopitalRecherchePage implements OnInit {
  resultat: any[];

  constructor(
    private random: RandomStorageService,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.resultat = this.random.getContent();
    console.log(this.resultat);
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
    console.log(hopital);
    console.log(service);
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
