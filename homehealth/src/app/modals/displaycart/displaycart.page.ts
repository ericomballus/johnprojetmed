import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartRow } from 'src/app/models/Cart-Row';
import { PanierGroup } from 'src/app/models/panier-group';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { CommandesService } from 'src/app/services/commandes.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-displaycart',
  templateUrl: './displaycart.page.html',
  styleUrls: ['./displaycart.page.scss'],
})
export class DisplaycartPage implements OnInit {
  Cart: PanierGroup[];
  totalPrice: number = 0;
  customer: User;
  constructor(
    private modalCrtl: ModalController,
    private cartService: CartService,
    private notifi: NotificationService,
    private commandeService: CommandesService,
    private randomStorage: RandomStorageService
  ) {}

  ngOnInit() {
    this.Cart = this.cartService.getCartRow();
    this.customer = this.randomStorage.getUser();
    console.log(this.Cart);
    this.Cart.forEach((grp) => {
      grp.medicament.forEach((row) => {
        if (grp.totalPrice) {
          grp.totalPrice =
            grp.totalPrice +
            row.quantity * parseInt(row.medicament.sellingPrice);
        } else {
          grp.totalPrice = row.quantity * parseInt(row.medicament.sellingPrice);
        }
      });
    });
    this.totalPrice = this.cartService.totalPrice();
    console.log(this.totalPrice);
  }
  closeModal() {
    this.modalCrtl.dismiss();
  }

  removeToCart(doc, medicament, i, j) {
    this.cartService.removeOne(medicament);
    // this.Cart[j].medicament[i].quantity =
    // this.Cart[j].medicament[i].quantity - 1;
    let qty = this.Cart[j].medicament[i].quantity;
    if (qty) {
      this.Cart[j].totalPrice =
        this.Cart[j].totalPrice -
        parseInt(this.Cart[j].medicament[i].medicament.sellingPrice);
    }

    // this.Cart = this.cartService.getCartRow();
    this.totalPrice = this.cartService.totalPrice();
  }
  async commander() {
    try {
      await this.notifi.presentAlertConfirm('acheter les médicament ?');
      this.notifi.presentLoading(10000);
      let Cart: PanierGroup[] = this.cartService.getCartRow();
      let promiseTab = [];
      Cart.forEach((panier) => {
        let tab = [];
        panier.medicament.forEach((cart) => {
          tab.push({
            medicament: cart.medicament,
            quantity: cart.quantity,
            totalPrice: cart.totalPrice,
            companyId: cart.company.id,
            companyName: cart.company.name,
          });
        });
        let data = {
          panier: tab,
          companyId: panier.medicament[0].company.id,
          customerId: this.customer.uid,
          //totalPrice: panier.totalPrice,
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
        this.cartService.cleanCart();
        this.modalCrtl.dismiss({ result: true });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
