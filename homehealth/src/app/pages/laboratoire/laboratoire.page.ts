import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DisplayLaboratoirePage } from 'src/app/modals/display-laboratoire/display-laboratoire.page';
import { Analyse } from 'src/app/models/analyseSchema';
import { Company } from 'src/app/models/company';
import { AnalyseService } from 'src/app/services/analyse.service';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { FilterPage } from '../filter/filter.page';

@Component({
  selector: 'app-laboratoire',
  templateUrl: './laboratoire.page.html',
  styleUrls: ['./laboratoire.page.scss'],
})
export class LaboratoirePage implements OnInit {
  laboratoireList: any[];
  public analyseList$: Observable<any[]>;
  public analyseList: Analyse[] = [];
  listTab: any[] = [];
  listab2: any[];
  arr: Analyse[] = [];
  arrOfPromise = [];
  active = true;
  constructor(
    private companyService: CompanyService,
    private notifi: NotificationService,
    private random: RandomStorageService,
    private modalCrtl: ModalController,
    private analyseService: AnalyseService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.getLaboratoire();
    this.arrOfPromise = [];
    this.getAnalyseList();
  }

  getLaboratoire() {
    this.notifi.presentLoading(40000);
    this.companyService.getCompanyQuery('laboratoire').then((data: any[]) => {
      this.laboratoireList = data;
      console.log(this.laboratoireList);
      this.notifi.dismissLoading();
    });
  }

  getAnalyseList() {
    this.notifi.presentLoading(15000);
    this.analyseService.getAnalyse().then((res: any[]) => {
      this.analyseList = res;
      this.notifi.dismissLoading();
      this.analyseService.selectAllAnalyse2([]).then((result: any[]) => {
        this.listTab = result;
        console.log('all analyse liste here', result);
      });
    });
  }
  handleInput(event) {
    if (!event.detail.value) {
      this.active = true;
      this.listab2 = [];
      this.analyseList = this.analyseList;
      // this.active= true
    } else {
      this.active = false;
      const query = event.detail.value.toLowerCase();
      this.listab2 = this.listTab.filter((item) => {
        return item.name.toLowerCase().indexOf(query) > -1;
        // item.style.display = shouldShow ? 'block' : 'none';
      });
      console.log(this.listab2.length);
    }
  }

  loadData(event) {
    // this.scrool = true;
    this.analyseService
      .getAnalyse()
      .then((res: any[]) => {
        res.forEach((elt) => {
          this.analyseList.push(elt);
        });

        event.target.complete();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addAnalyse(analyse: Analyse) {
    let index = this.arr.findIndex((a) => a.id == analyse.id);
    console.log(index);

    if (index >= 0) {
      this.arr = this.arr.filter((a) => a.id !== analyse.id);
    }
    if (index < 0) {
      this.arr.push(analyse);
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
    let objRandom = {};
    this.notifi.presentLoading(20000);
    let found: any[] = [];
    let notfound: any[] = [];
    let cmp = 0;
    let verificateur = false;
    let tabl = [];
    this.arr.forEach(async (analyse, index) => {
      // found.push(this.findAnalyse(analyse))
      try {
        let res: Company[] = await this.findAnalyse(analyse);
        console.log('=====>', res);
        cmp = cmp + 1;
        verificateur = true;
        res.forEach((company) => {
          const found = company.analyseList.find((a) => a.id == analyse.id);
          if (found) {
            if (!objRandom[company.name]) {
              let tab = [];
              tab.push(found);
              objRandom[company.name] = { company: company, allAnalyse: tab };
            } else {
              objRandom[company.name].allAnalyse.push(found);
            }
          }
        });
        let data = { resultat: res, analyseList: this.arr[index] };

        if (cmp == this.arr.length) {
          console.log(objRandom);
          console.log(tabl);
          for (const key in objRandom) {
            let resutlt = {
              name: objRandom[key]['company']['name'],
              company: objRandom[key]['company'],
              query: objRandom[key]['allAnalyse'],
            };
            tabl.push(resutlt);
          }

          this.random.setContent(tabl);
          this.router.navigateByUrl('laboratoire-recherche');
          this.notifi.dismissLoading();
        }
      } catch (error) {
        console.log(error);
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
                query: objRandom[key]['allAnalyse'],
              };
              tabl.push(resutlt);
            }
            this.random.setContent(tabl);
            console.log('in table', tabl);
            this.router.navigateByUrl('laboratoire-recherche');

            this.notifi.dismissLoading();
          }
        }
      }
    });
  }
  findAnalyse(analys: Analyse): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      this.companyService.getWhoMakesAnalyse(analys.id).then((result) => {
        // let total = result.length;
        if (result && result.length) {
          resolve(result);
        } else {
          reject(null);
        }
      });
    });
  }
  clear() {
    this.arr.forEach((analyse) => {
      analyse.isChecked == false;
      let found = this.analyseList.findIndex((a) => {
        return a.id == analyse.id;
      });
      if (found >= 0) {
        this.analyseList[found].isChecked = false;
      }
    });
  }
}
