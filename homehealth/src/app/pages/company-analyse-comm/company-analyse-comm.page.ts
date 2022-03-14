import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { AnalyseCommandesService } from 'src/app/services/analyse-commandes.service';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-company-analyse-comm',
  templateUrl: './company-analyse-comm.page.html',
  styleUrls: ['./company-analyse-comm.page.scss'],
})
export class CompanyAnalyseCommPage implements OnInit {
  user: User;
  companie: Company;
  Docs: any[];
  constructor(
    private randomStorage: RandomStorageService,
    private notifi: NotificationService,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private analyseCommandeService: AnalyseCommandesService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.companie = this.randomStorage.getCompany();

    this.getMyCommande();
  }

  async getMyCommande() {
    this.notifi.presentLoading(15000);
    try {
      let res = await this.analyseCommandeService.companyGetCommandeList(
        this.companie.id
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

  async presentActionSheet(commande) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Commande',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Annuler ?',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Confirmer le Rendez vous ?',
          icon: 'share',
          handler: () => {
            this.confirmCommande(commande);
          },
        },
        {
          text: 'Afficher ?',
          icon: 'caret-forward-circle',
          handler: () => {
            this.randomStorage.setData(commande);
            // this.router.navigateByUrl('rendez-vous-details');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  confirmCommande(rdv) {
    this.notifi.presentLoading(15000);
    rdv['confirm'] = true;
    // this.updateQuantity(rdv.panier);
    rdv['paie'] = true;
    this.analyseCommandeService
      .updateCommande(rdv.id, rdv)
      .then((res) => {
        this.getMyCommande();
        this.notifi.dismissLoading();
      })
      .catch((err) => {
        console.log(err);
        this.notifi.dismissLoading();
      });
  }
}
