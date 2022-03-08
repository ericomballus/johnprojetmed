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

@Component({
  selector: 'app-company-admin-comm',
  templateUrl: './company-admin-comm.page.html',
  styleUrls: ['./company-admin-comm.page.scss'],
})
export class CompanyAdminCommPage implements OnInit {
  user: User;
  companie: Company;
  // rendezVousList: any
  public commandeList$: Observable<any[]>;
  constructor(
    private commandeService: CommandesService,
    private randomStorage: RandomStorageService,
    private location: Location,
    private notifi: NotificationService,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.companie = this.randomStorage.getCompany();
    this.displayCommandes();
  }
  displayCommandes() {
    this.commandeList$ = this.commandeService.companyGetCommandeList(
      this.companie.id
    );
  }
  confirmCommande(rdv) {
    this.notifi.presentLoading(15000);
    rdv['confirm'] = true;
    this.commandeService
      .updateCommande(rdv.id, rdv)
      .then((res) => {
        console.log(res);

        this.displayCommandes();
        this.notifi.dismissLoading();
      })
      .catch((err) => {
        console.log(err);
        this.notifi.dismissLoading();
      });
  }

  async presentActionSheet(rdv) {
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
          text: 'Confirmer ?',
          icon: 'share',
          handler: () => {
            this.confirmCommande(rdv);
          },
        },
        {
          text: 'Afficher ?',
          icon: 'caret-forward-circle',
          handler: () => {
            this.randomStorage.setData(rdv);
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
}
