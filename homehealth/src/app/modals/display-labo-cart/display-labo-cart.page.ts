import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PanierGroup } from 'src/app/models/panier-group';
import { PanierLaboGroup } from 'src/app/models/panier-labo-group';
import { User } from 'src/app/models/user';
import { AnalyseCommandesService } from 'src/app/services/analyse-commandes.service';
import { CartLaboService } from 'src/app/services/cart-labo.service';
import { CartService } from 'src/app/services/cart.service';
import { CommandesService } from 'src/app/services/commandes.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { ConfirmPage } from '../confirm/confirm.page';

@Component({
  selector: 'app-display-labo-cart',
  templateUrl: './display-labo-cart.page.html',
  styleUrls: ['./display-labo-cart.page.scss'],
})
export class DisplayLaboCartPage implements OnInit {
  Cart: PanierLaboGroup[];
  totalPrice: number = 0;
  customer: User;
  rendezVousTab = {};
  constructor(
    private modalCrtl: ModalController,
    public cart: CartLaboService,
    private notifi: NotificationService,
    private commandeService: AnalyseCommandesService,
    private randomStorage: RandomStorageService
  ) {}

  ngOnInit() {
    this.Cart = this.cart.getCartRow();
    this.customer = this.randomStorage.getUser();
    this.totalPrice = this.cart.totalPrice();
    this.Cart.forEach((cart) => {
      cart.totalPrice = 0;
      cart.analyses.forEach((a) => {
        if (parseInt(a.analyse.price)) {
          cart.totalPrice = a.totalPrice + cart.totalPrice;
        } else {
          a.analyse.price = '0';
          a.totalPrice = 0;
        }
      });
    });
  }
  closeModal() {
    this.modalCrtl.dismiss();
  }

  removeToCart(doc, row, i, j) {
    this.cart.removeOne(row);
    // this.Cart[j].medicament[i].quantity =
    // this.Cart[j].medicament[i].quantity - 1;
    let qty = this.Cart[j].analyses[i].quantity;
    if (qty) {
      this.Cart[j].totalPrice =
        this.Cart[j].totalPrice -
        parseInt(this.Cart[j].analyses[i].analyse.price);
    }

    // this.Cart = this.cartService.getCartRow();
    this.totalPrice = this.cart.totalPrice();
  }

  async commander() {
    try {
      await this.notifi.presentAlertConfirm('vous confirmez les analyses ?');
      this.notifi.presentLoading(10000);
      let Cart: PanierLaboGroup[] = this.cart.getCartRow();
      let promiseTab = [];
      Cart.forEach((panier) => {
        let tab = [];
        panier.analyses.forEach((cart) => {
          let jour = '';
          let heure = '';
          if (this.rendezVousTab[cart.company.id]) {
            jour = this.rendezVousTab[cart.company.id]['jour'];
            heure = this.rendezVousTab[cart.company.id]['heure'];
          }

          tab.push({
            analyses: cart.analyse,
            quantity: cart.quantity,
            totalPrice: cart.totalPrice,
            companyId: cart.company.id,
            companyName: cart.company.name,
            heureRendezVous: heure,
            jourRendezVous: jour,
          });
        });
        let data = {
          panier: tab,
          companyId: panier.analyses[0].company.id,
          customerId: this.customer.uid,
        };
        promiseTab.push(this.commandeService.postCommande(data));
      });
      Promise.all(promiseTab).then((res) => {
        this.notifi.dismissLoading();
        this.notifi.presentToast(
          'votre commande a été enregistré',
          'success',
          2000
        );
        this.cart.cleanCart();
        this.modalCrtl.dismiss({ result: true });
      });
    } catch (error) {
      console.log(error);
    }
  }
  pickDate(ev, index) {
    if (this.rendezVousTab[ev.companieId]) {
      this.rendezVousTab[ev.companieId]['jour'] = ev.jour;
    } else {
      this.rendezVousTab[ev.companieId] = { jour: ev.jour, heure: '0' };
    }
    this.Cart[index].enableDay = true;
    console.log(this.rendezVousTab);
  }
  pickHour(ev, index: number) {
    this.rendezVousTab[ev.companieId]['heure'] = ev.heure;
    console.log(this.rendezVousTab);

    if (this.rendezVousTab[ev.companieId]) {
      this.rendezVousTab[ev.companieId]['heure'] = ev.heure;
    } else {
      this.rendezVousTab[ev.companieId] = {
        jour: '00/00/0000',
        heure: ev.heure,
      };
    }
    this.Cart[index].enableHour = true;
  }

  async commandeLabo(doc: PanierLaboGroup, index) {
    console.log(index);
    try {
      await this.notifi.presentAlertConfirm('prendre rendez vous ?');
      this.notifi.presentLoading(6000);
      let tab = [];
      doc.analyses.forEach((cart) => {
        let jour = '';
        let heure = '';
        if (this.rendezVousTab[cart.company.id]) {
          jour = this.rendezVousTab[cart.company.id]['jour'];
          heure = this.rendezVousTab[cart.company.id]['heure'];
        }

        tab.push({
          analyses: cart.analyse,
          quantity: cart.quantity,
          totalPrice: cart.totalPrice,
          companyId: cart.company.id,
          companyName: cart.company.name,
          heureRendezVous: heure,
          jourRendezVous: jour,
        });
      });
      let data = {
        panier: tab,
        companyId: doc.analyses[0].company.id,
        customerId: this.customer.uid,
      };
      this.commandeService
        .postCommande(data)
        .then(() => {
          this.notifi.dismissLoading();
          this.notifi.presentToast(
            'votre commande a été enregistré',
            'success',
            2000
          );
          this.Cart.splice(index, 1);

          if (!this.Cart.length) {
            setTimeout(() => {
              this.cart.cleanCart();
              this.modalCrtl.dismiss({ result: true });
            }, 2500);
          }
        })
        .catch((err) => {});
    } catch (error) {}
  }
}
