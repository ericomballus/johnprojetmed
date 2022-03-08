import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PrendreRendezvousPage } from 'src/app/modals/prendre-rendezvous/prendre-rendezvous.page';
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
}
