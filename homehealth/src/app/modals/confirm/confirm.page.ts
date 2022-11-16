import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PanierGroup } from 'src/app/models/panier-group';
import { User } from 'src/app/models/user';
import { CommandesService } from 'src/app/services/commandes.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  Cart: PanierGroup;
  order: PanierGroup;
  customer: User;
  paiment_type: string = 'CASH';
  delivery: boolean = false;
  public form = [
    { val: 'CASH', isChecked: true },
    { val: 'ORANGE MONEY', isChecked: false },
    { val: 'MTN MONEY', isChecked: false },
    { val: 'CARTE CREDIT', isChecked: false },
  ];
  constructor(
    private modalCrtl: ModalController,
    private commandeService: CommandesService,
    private randomStorage: RandomStorageService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.order = this.randomStorage.getData();
    this.customer = this.randomStorage.getUser();
  }

  closeModal() {
    this.modalCrtl.dismiss();
  }

  selectPaiement(entry) {
    if (entry.isChecked) {
      this.paiment_type = entry.val;
      this.form.forEach((elt) => {
        if (elt.val !== entry.val) {
          elt.isChecked = false;
        }
      });
    }
  }

  async paieAndPrint() {
    let tab = [];
    await this.notifi.presentAlertConfirm('acheter les médicament ?');
    this.notifi.presentLoading(10000);
    console.log(this.order);
    this.order.medicament.forEach((cart) => {
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
      companyId: this.order.medicament[0].company.id,
      customerId: this.customer.uid,
      paiment_type: this.paiment_type,
    };

    console.log(data);
    this.commandeService.postCommande(data).then((res) => {
      this.notifi.dismissLoading();
      this.notifi.presentToast(
        'votre commande a été enregistré',
        'success',
        2000
      );
      this.modalCrtl.dismiss({ result: true });
    });
  }
}
