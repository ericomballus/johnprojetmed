import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { CommandesService } from 'src/app/services/commandes.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  user: User;
  // rendezVousList: any
  public rendezVousList$: Observable<any[]>;
  constructor(
    private randomStorage: RandomStorageService,
    private location: Location,
    private notifi: NotificationService,
    private rendezVous: RendezvousService,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private commandeService: CommandesService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.user = this.randomStorage.getUser();
    this.getMyCommande();
    if (!this.user) {
      this.location.back();
      this.notifi.presentToast(
        'veillez vous connecter a votre compte ou créer un',
        'danger',
        4000
      );
    } else {
      this.displayRendezVous();
    }
  }
  displayRendezVous() {
    /* this.rendezVous
      .userGetRendezvousList(this.user.uid)
      .then(async (data: any[]) => {
        data.forEach(async (rdv) => {
          let company = await this.rendezVous.getCompany(rdv.companyId);
          rdv['company'] = company[0];
        });
        console.log(data);
        this.rendezVousList = data;
      });*/
    this.rendezVousList$ = this.rendezVous.userGetRendezvousList(this.user.uid);
  }

  displayService() {}

  displayMedicament() {
    this.router.navigateByUrl('user-commandes');
  }

  displayAnalyse() {
    this.router.navigateByUrl('user-commande-labo');
  }

  async presentActionSheet(rdv) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Rendez Vous',
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
          text: 'Afficher sur la carte ?',
          icon: 'location',
          handler: () => {
            this.displayMap(rdv.company);
          },
        },
        {
          text: 'Afficher ?',
          icon: 'caret-forward-circle',
          handler: () => {
            this.randomStorage.setData(rdv);
            this.router.navigateByUrl('rendez-vous-details');
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

  async getMyCommande() {
    try {
      let docs = await this.commandeService.userGetCommandeList(
        this.randomStorage.getUser().uid
      );
      console.log(docs);
    } catch (error) {
      console.log(error);
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
