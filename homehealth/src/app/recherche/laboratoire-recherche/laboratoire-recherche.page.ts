import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-laboratoire-recherche',
  templateUrl: './laboratoire-recherche.page.html',
  styleUrls: ['./laboratoire-recherche.page.scss'],
})
export class LaboratoireRecherchePage implements OnInit {
  resultat: any[];
  constructor(
    private random: RandomStorageService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.resultat = this.random.getContent();
    console.log(this.resultat);
  }

  commander(result) {
    console.log(result);
  }

  async presentAlertConfirm(result) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Que voulez vous ?',
      buttons: [
        {
          text: `Faire une Analyse ${result.resultat.name} ?`,
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
}
