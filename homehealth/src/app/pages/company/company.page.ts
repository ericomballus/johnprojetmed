import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { PickMedicamentPage } from 'src/app/modals/pick-medicament/pick-medicament.page';
import { DisplayCompanyPage } from 'src/app/modals/display-company/display-company.page';
@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
  companyList: Company[] = [];
  companyGroupList: any;
  viewType = false;
  constructor(
    private randomStorage: RandomStorageService,
    private router: Router,
    private companyService: CompanyService,
    private notifi: NotificationService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.getCompany();
  }
  AddCompany() {
    this.randomStorage.setIsAdmin(true);
    this.randomStorage.setIsNewCompany(true);
    this.router.navigateByUrl('inscription-company');
  }

  setSelected(options) {
    console.log(options);
    let selectedValues = Array.apply(null, options) // convert to real Array
      .filter((option) => option.selected)
      .map((option) => option.value);

    console.log(selectedValues);
  }

  async getCompany() {
    this.notifi.presentLoading(40000);
    try {
      this.companyList = await this.companyService.getAllCompany();
      /*  let group = this.companyList.reduce((r, a) => {
        console.log('a', a);
        console.log('r', r);
        r[a.companyType] = [...(r[a.companyType] || []), a];
        return r;
      }, {});
*/
      console.log(this.companyList);

      this.notifi.dismissLoading();
      const result = this.groupBy(this.companyList, (c) => c.companyType);

      let arr = [];
      for (const key in result) {
        arr.push(result[key]);
      }
      console.log(arr);
      this.companyGroupList = arr;
    } catch (error) {
      this.notifi.dismissLoading();
    }
  }

  displayCompany(comp: Company) {
    console.log(comp);
    if (comp.companyType == 'pharmacie') {
      this.addCompanyMedicament(comp);
    }
  }

  async addCompanyMedicament(company: Company) {
    this.randomStorage.setCompany(company);
    const modal = await this.modalController.create({
      component: PickMedicamentPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      company = this.randomStorage.getCompany();
    });
    return await modal.present();
  }

  async displaCompany(company: Company) {
    this.randomStorage.setCompany(company);
    const modal = await this.modalController.create({
      component: DisplayCompanyPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      company = this.randomStorage.getCompany();
    });
    return await modal.present();
  }
  groupBy(xs, f) {
    return xs.reduce(
      (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
      {}
    );
  }
  displayCompanyByGroup() {
    this.viewType = !this.viewType;
  }
  async presentActionSheet(company: Company) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Desactiver',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Ajouter medicament',
          icon: 'heart',
          handler: () => {
            if (company.companyType == 'pharmacie') {
              this.addCompanyMedicament(company);
            }
          },
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Dispaly',
          icon: 'caret-forward-circle',
          handler: () => {
            this.displaCompany(company);
          },
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            this.notifi
              .presentAlertConfirm(
                `voulez vous vraiment supprimer ${company.name} ?`
              )
              .then(() => {
                this.notifi.presentLoading(30000);
                this.companyService
                  .removeCompany(company)
                  .then((res) => {
                    this.companyList = this.companyList.filter(
                      (comp) => comp.id !== company.id
                    );
                    const result = this.groupBy(
                      this.companyList,
                      (c) => c.companyType
                    );
                    let arr = [];
                    for (const key in result) {
                      arr.push(result[key]);
                    }

                    this.companyGroupList = arr;
                    this.notifi.dismissLoading();
                  })
                  .catch((err) => {
                    this.notifi.dismissLoading();
                    this.notifi.presentToast(
                      'impossible de supprimer',
                      'danger',
                      1500
                    );
                  });
              })
              .catch((err) => console.log(err));
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
