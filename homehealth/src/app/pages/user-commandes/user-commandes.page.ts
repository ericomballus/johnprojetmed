import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { CommandesService } from 'src/app/services/commandes.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-user-commandes',
  templateUrl: './user-commandes.page.html',
  styleUrls: ['./user-commandes.page.scss'],
})
export class UserCommandesPage implements OnInit {
  user: User;
  Docs: any[];
  constructor(
    private randomStorage: RandomStorageService,
    private notifi: NotificationService,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private commandeService: CommandesService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.user = this.randomStorage.getUser();

    this.getMyCommande();
  }

  async getMyCommande() {
    this.notifi.presentLoading(15000);
    try {
      let res = await this.commandeService.userGetCommandeList(
        this.randomStorage.getUser().uid
      );
      res.forEach((doc) => {
        doc.panier.forEach((com) => {
          if (doc['totalPrice']) {
            doc['totalPrice'] =
              doc['totalPrice'] +
              parseInt(com.medicament.sellingPrice) * com.quantity;
          } else {
            doc['totalPrice'] =
              parseInt(com.medicament.sellingPrice) * com.quantity;
          }
        });
      });
      this.Docs = res;
      this.notifi.dismissLoading();
      if (this.Docs.length == 0) {
        this.notifi.presentToast('aucune commande disponible', 'primary', 5000);
      }
    } catch (error) {
      console.log(error);
      this.notifi.dismissLoading();
    }
  }
}
