import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
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

  displayMap(company: Company) {
    console.log(company);
    window.open(
      'https://www.google.com/maps/dir//Lab+Yaounde+(LabY),+BP+11561,+Carrefour+Ancien+B%C3%A2timents,+B%C3%A2timent+E01+Cite+Verte,+Yaound%C3%A9/@3.8755946,11.4884294,16.5z/data=!4m8!4m7!1m0!1m5!1m1!1s0x108bcf0f1142bd29:0x8d7566ef879b60e2!2m2!1d11.4921367!2d3.8755874',
      '_system'
    );
  }
}
