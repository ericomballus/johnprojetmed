import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AnalyseCommandesService } from 'src/app/services/analyse-commandes.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-user-commande-labo',
  templateUrl: './user-commande-labo.page.html',
  styleUrls: ['./user-commande-labo.page.scss'],
})
export class UserCommandeLaboPage implements OnInit {
  user: User;
  Docs: any[];
  constructor(
    private randomStorage: RandomStorageService,
    private notifi: NotificationService,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private analyseCommandeService: AnalyseCommandesService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.user = this.randomStorage.getUser();

    this.getMyCommande();
  }

  async getMyCommande() {
    this.notifi.presentLoading(15000);
    try {
      let res = await this.analyseCommandeService.userGetCommandeList(
        this.randomStorage.getUser().uid
      );
      console.log(res);

      res.forEach((doc) => {
        doc.panier.forEach((com) => {
          if (doc['totalPrice']) {
            doc['totalPrice'] = doc['totalPrice'] + com.totalPrice;
          } else {
            doc['totalPrice'] = com.totalPrice;
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
