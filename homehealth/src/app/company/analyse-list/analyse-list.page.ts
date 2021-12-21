import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { PickAnalysePage } from 'src/app/modals/pick-analyse/pick-analyse.page';
import { Analyse } from 'src/app/models/analyseSchema';
import { Company } from 'src/app/models/company';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { AnalyseInfoPage } from '../analyse-info/analyse-info.page';
@Component({
  selector: 'app-analyse-list',
  templateUrl: './analyse-list.page.html',
  styleUrls: ['./analyse-list.page.scss'],
})
export class AnalyseListPage implements OnInit {
  admin: User;
  company: Company;
  analyseList: Analyse[];
  constructor(
    private randomStorage: RandomStorageService,
    private modalController: ModalController,
    public actionSheet: ActionSheetController,
    private companyService: CompanyService,
    private notifi: NotificationService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    if (this.company.analyseList) {
      this.analyseList = this.company.analyseList;
    } else {
      this.analyseList = [];
    }
  }

  async addAnalyse() {
    const modal = await this.modalController.create({
      component: PickAnalysePage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      console.log('hello');

      this.company = this.randomStorage.getCompany();
      this.analyseList = this.company.analyseList;
    });
    return await modal.present();
  }
  async displayInfo(analyse) {
    this.randomStorage.setUserAnalyse(analyse);
    const modal = await this.modalController.create({
      component: AnalyseInfoPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.company = this.randomStorage.getCompany();
      this.analyseList = this.company.analyseList;
      this.randomStorage.setUserAnalyse(null);
    });
    return await modal.present();
  }

  async presentActionSheet(analyse) {
    const actionSheet = await this.actionSheet.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Supprimer',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentAlertConfirm(analyse);
          },
        },
        {
          text: 'Afficher',
          icon: 'share',
          handler: () => {
            this.displayInfo(analyse);
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

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  removeAnalyse(analyse: Analyse) {
    this.notifi.presentLoading(20000);
    let companyAnalyseList = this.company.analyseList;
    this.company.analyseList = companyAnalyseList.filter(
      (ana) => ana['id'] !== analyse.id
    );
    this.companyService
      .updateCompany(this.company.id, this.company)
      .then((res) => {
        this.analyseList = this.company.analyseList;
        this.notifi.dismissLoading();
        this.randomStorage.setCompany(this.company);
      });
  }

  async presentAlertConfirm(analyse: Analyse) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: `Voulez vous supprimer ${analyse.name} ?`,
      buttons: [
        {
          text: 'NON',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'OUI',
          handler: () => {
            this.removeAnalyse(analyse);
          },
        },
      ],
    });

    await alert.present();
  }
}
