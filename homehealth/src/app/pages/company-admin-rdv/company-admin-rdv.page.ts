import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  selector: 'app-company-admin-rdv',
  templateUrl: './company-admin-rdv.page.html',
  styleUrls: ['./company-admin-rdv.page.scss'],
})
export class CompanyAdminRdvPage implements OnInit {
  user: User;
  companie: Company;
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

  ngOnInit() {
    this.companie = this.randomStorage.getCompany();
    this.displayRendezVous();
  }

  displayRendezVous() {
    this.rendezVousList$ = this.rendezVous.companyGetRendezvousList(
      this.companie.id
    );
  }
  confirmRdv(rdv) {
    this.notifi.presentLoading(15000);
    rdv['confirm'] = true;
    this.rendezVous
      .updateRendezVous(rdv.id, rdv)
      .then((res) => {
        console.log(res);

        this.displayRendezVous();
        this.notifi.dismissLoading();
      })
      .catch((err) => {
        console.log(err);
        this.notifi.dismissLoading();
      });
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
          text: 'Confirmer ?',
          icon: 'share',
          handler: () => {
            this.confirmRdv(rdv);
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
}
