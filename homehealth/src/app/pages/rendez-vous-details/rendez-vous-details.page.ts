import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';
@Component({
  selector: 'app-rendez-vous-details',
  templateUrl: './rendez-vous-details.page.html',
  styleUrls: ['./rendez-vous-details.page.scss'],
})
export class RendezVousDetailsPage implements OnInit {
  rdv: any;
  user: User;
  constructor(
    private randomStorage: RandomStorageService,
    private location: Location,
    private notifi: NotificationService,
    private rendezVous: RendezvousService
  ) {}

  ngOnInit() {
    this.rdv = this.randomStorage.getData();
    this.user = this.randomStorage.getUser();
    console.log(this.user);
    console.log(this.rdv);
  }

  confirmRdv() {
    this.notifi
      .presentAlertConfirm('voulez vous confirmer ce rendez vous ?')
      .then(() => {
        this.notifi.presentLoading(15000);
        this.rdv['confirm'] = true;
        this.rendezVous
          .updateRendezVous(this.rdv.id, this.rdv)
          .then((res) => {
            console.log(res);

            // this.displayRendezVous();
            this.notifi.dismissLoading();
            this.notifi.presentToast(
              'rendez vous confirmé , le patient sera notifié',
              'success',
              3000
            );
          })
          .catch((err) => {
            console.log(err);
            this.notifi.dismissLoading();
          });
      })
      .catch((err) => {});
  }
  cancelRdv() {
    this.notifi
      .presentAlertConfirm('voulez vous annuler ce rendez vous ?')
      .then(() => {
        this.rdv['confirm'] = false;
        this.rdv['annuler'] = true;
        this.rendezVous
          .updateRendezVous(this.rdv.id, this.rdv)
          .then((res) => {
            this.notifi.dismissLoading();
            this.notifi.presentToast(
              'rendez vous annulé , le patient sera notifié',
              'success',
              3000
            );
          })
          .catch((err) => {
            console.log(err);
            this.notifi.dismissLoading();
          });
      })
      .catch((err) => {});
  }
}
