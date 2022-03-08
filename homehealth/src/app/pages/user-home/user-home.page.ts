import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
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
    private router: Router
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.user = this.randomStorage.getUser();
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

  displayMedicament() {}

  displayAnalyse() {}

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
        /*{
          text: 'Confirmer ?',
          icon: 'share',
          handler: () => {
            this.confirmRdv(rdv);
          },
        },*/
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
}
