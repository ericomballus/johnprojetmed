import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { ManageService } from 'src/app/services/manage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { FilterPage } from '../filter/filter.page';

@Component({
  selector: 'app-hopital',
  templateUrl: './hopital.page.html',
  styleUrls: ['./hopital.page.scss'],
})
export class HopitalPage implements OnInit {
  serviceList: any[];
  public serviceList$: Observable<any[]>;
  listTab: any[] = [];
  listab2: any[];
  arr: ServiceSchema[] = [];
  constructor(
    private companyService: CompanyService,
    private notifi: NotificationService,
    private random: RandomStorageService,
    private modalCrtl: ModalController,
    private manageService: ManageService,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getServiceList();
    }, 500);
  }
  getServiceList() {
    // this.serviceList$ = this.manageService.getAllServices();
    this.notifi.presentLoading(20000);
    this.manageService.getService().then((res: any[]) => {
      this.serviceList = res;
      this.notifi.dismissLoading();
    });
    this.manageService.getAll().then((res: any[]) => {
      this.listTab = res;
    });
  }

  loadData(event) {
    // this.scrool = true;
    this.manageService
      .getService()
      .then((res: any[]) => {
        res.forEach((elt) => {
          this.serviceList.push(elt);
        });

        event.target.complete();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleInput(event) {
    const query = event.detail.value.toLowerCase();
    this.listab2 = this.listTab.filter((item) => {
      return item.name.toLowerCase().indexOf(query) > -1;
    });
  }
  addService(service: ServiceSchema) {
    let index = this.arr.findIndex((s) => s.id == service.id);
    if (index >= 0) {
      this.arr = this.arr.filter((s) => s.id !== service.id);
    }
    if (index < 0) {
      this.arr.push(service);
    }
    console.log(this.arr);
  }

  async selectVille() {
    const modal = await this.modalCrtl.create({
      component: FilterPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);

      this.findAll();
    });
    return await modal.present();
  }
  findAll() {
    let customer: User = this.random.getUser();
    if (!customer) {
      this.notifi
        .presentAlertConfirm('veillez crée un compte ou authentifier vous')
        .then((r) => {
          this.router.navigateByUrl('connexion');
        })
        .catch((err) => {
          // this.location.back();
        });
    } else {
      let objRandom = {};
      this.notifi.presentLoading(20000);
      let found: any[] = [];
      let notfound: any[] = [];
      let cmp = 0;
      let verificateur = false;
      let tabl = [];
      this.arr.forEach(async (service, index) => {
        try {
          let res: Company[] = await this.findService(service);
          cmp = cmp + 1;
          verificateur = true;
          res.forEach((company) => {
            const found = company.serviceList.find((a) => a.id == service.id);
            if (found) {
              if (!objRandom[company.name]) {
                let tab = [];
                tab.push(found);
                objRandom[company.name] = { company: company, allService: tab };
              } else {
                objRandom[company.name].allService.push(found);
              }
            }
          });
          let data = { resultat: res, queryList: this.arr[index] };

          if (cmp == this.arr.length) {
            for (const key in objRandom) {
              let resutlt = {
                name: objRandom[key]['company']['name'],
                company: objRandom[key]['company'],
                query: objRandom[key]['allService'],
              };
              tabl.push(resutlt);
            }

            this.random.setContent(tabl);
            this.router.navigateByUrl('hopital-recherche');
            this.notifi.dismissLoading();
          }
        } catch (error) {
          cmp = cmp + 1;
          if (cmp == this.arr.length) {
            if (!verificateur) {
              this.notifi.presentToast(
                'aucun resultat pour cette recherche',
                'dark',
                2500
              );
            } else {
              for (const key in objRandom) {
                let resutlt = {
                  name: objRandom[key]['company']['name'],
                  company: objRandom[key]['company'],
                  query: objRandom[key]['allService'],
                };
                tabl.push(resutlt);
              }
              this.random.setContent(tabl);
              console.log('in table', tabl);
              this.router.navigateByUrl('hopital-recherche');

              this.notifi.dismissLoading();
            }
          }
        }
      });
    }
  }

  findService(service: ServiceSchema): Promise<Company[]> {
    //this.notifi.presentLoading(15000);
    return new Promise((resolve, reject) => {
      this.companyService.getWhoMakesService(service.id).then((result) => {
        // let total = result.length;
        if (result && result.length) {
          resolve(result);
        } else {
          reject(null);
        }
      });
    });
  }
}
