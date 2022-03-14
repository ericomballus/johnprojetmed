import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DisplayLaboCartPage } from 'src/app/modals/display-labo-cart/display-labo-cart.page';
import { Analyse } from 'src/app/models/analyseSchema';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { CartLaboService } from 'src/app/services/cart-labo.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
interface Doc {
  name: string;
  company: Company;
  medicament: Analyse[];
}
@Component({
  selector: 'app-laboratoire-recherche',
  templateUrl: './laboratoire-recherche.page.html',
  styleUrls: ['./laboratoire-recherche.page.scss'],
})
export class LaboratoireRecherchePage implements OnInit {
  resultat: any[];
  company: Company;
  customer: User;
  totalArticles = 0;
  constructor(
    private random: RandomStorageService,
    public alertController: AlertController,
    public notifi: NotificationService,
    public location: Location,
    public cart: CartLaboService,
    public modalCrtl: ModalController
  ) {}

  ngOnInit() {
    this.resultat = this.random.getContent();
    console.log(this.resultat);

    this.customer = this.random.getUser();
    if (!this.customer) {
      this.notifi.presentAlertConfirm(
        'veillez crée un compte ou authentifier vous'
      );
      this.location.back();
    }
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

  addToCart(doc: Doc, analyse: Analyse) {
    console.log(doc);
    if (!parseInt(analyse.price)) {
      analyse.price = '0';
    }
    this.cart.add(analyse, doc.company);
    this.totalArticles = this.cart.total();
  }

  async displayCart() {
    const modal = await this.modalCrtl.create({
      component: DisplayLaboCartPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.totalArticles = this.cart.total();
      if (data.data && data.data.result) {
        this.location.back();
      }
    });
    return await modal.present();
  }
}
