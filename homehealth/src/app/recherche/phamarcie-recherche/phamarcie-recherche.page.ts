import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DisplaycartPage } from 'src/app/modals/displaycart/displaycart.page';
import { Company } from 'src/app/models/company';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { CommandesService } from 'src/app/services/commandes.service';
import { GroupeByService } from 'src/app/services/groupe-by.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
interface Doc {
  name: string;
  company: Company;
  medicament: MedicamentSchema[];
}

@Component({
  selector: 'app-phamarcie-recherche',
  templateUrl: './phamarcie-recherche.page.html',
  styleUrls: ['./phamarcie-recherche.page.scss'],
})
export class PhamarcieRecherchePage implements OnInit {
  tab: any[];
  company: Company;
  customer: User;
  result: any;
  cart: any[] = [];
  commande: any[] = [];
  totalArticles: number = 0;
  constructor(
    private random: RandomStorageService,
    public alertController: AlertController,
    private randomStorage: RandomStorageService,
    private location: Location,
    private notifi: NotificationService,
    private commandeService: CommandesService,
    private cartService: CartService,
    private modalCrtl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    let obj = {};
    this.tab = this.random.getContent();
    this.customer = this.randomStorage.getUser();
    if (!this.customer) {
      this.notifi
        .presentAlertConfirm('veillez crée un compte ou authentifier vous')
        .then((r) => {
          this.router.navigateByUrl('connexion');
        })
        .catch((err) => {
          this.location.back();
        });
    }
    // this.result = this.randomStorage.getData();
    if (this.tab && this.tab.length) {
      this.tab = this.tab.filter((c) => c.company.companyType != 'hopital');
    }
    // this.tab.forEach((elt) => {});
    /* this.groupeByService.groupResultatRecherhce(this.tab).then((res) => {
      console.log(res);
    });*/

    // console.log(this.randomStorage.getUser());

    //  this.company = this.result.company;
  }

  commander(result, medicament) {
    console.log(result);
    console.log(medicament);
    //  this.random.setData(result);
    // this.presentModal();
    this.notifi.presentLoading(10000);
    let rdv = {
      companyId: result.id,
      customerId: this.customer.uid,
      valider: false,
      produit: medicament,
    };
    this.commandeService.postCommande(rdv).then(() => {
      this.notifi.presentToast(
        'votre commande a été enregistré',
        'success',
        2000
      );
      this.notifi.dismissLoading();
    });
  }
  viewDetail(c: Doc, medicament: MedicamentSchema) {
    console.log(medicament);
    medicament.display = !medicament.display;
  }
  addToCart(doc: Doc, medicament: MedicamentSchema) {
    console.log(doc);
    this.cartService.add(medicament, doc.company);
    console.log(this.cartService.getCartRow());
    this.totalArticles = this.cartService.total();
    let nbr: any = parseInt(medicament.quantity) - 1;
    medicament.quantity = nbr;

    // this.cart.push(doc);
  }
  async presentAlertConfirm(result, medicament) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Que voulez vous ?',
      buttons: [
        {
          text: `Acheter chez ${result.name} ?`,
          cssClass: 'secondary',
          handler: (blah) => {
            this.commander(result, medicament);
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

  valider() {
    this.notifi.presentLoading(10000);
    let rdv = {
      companyId: this.company.id,
      serviceName: this.result.resultat.name,
      serviceId: this.result.resultat.id,
      customerId: this.customer.uid,
      valider: false,
    };
    this.commandeService.postCommande(rdv).then(() => {
      this.notifi.presentToast(
        'votre commande a été enregistré',
        'success',
        2000
      );
      this.notifi.dismissLoading();
    });
  }
  async displayCart() {
    const modal = await this.modalCrtl.create({
      component: DisplaycartPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.totalArticles = this.cartService.total();
      if (data.data && data.data.result) {
        // this.location.back();
        this.router.navigateByUrl('home');
      }
    });
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
