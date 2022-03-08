import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { CompanyService } from 'src/app/services/company.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.page.html',
  styleUrls: ['./pharmacie.page.scss'],
})
export class PharmaciePage implements OnInit {
  public medicamentList$: Observable<any[]>;
  public medicamentList: any[] = [];
  listTab: MedicamentSchema[] = [];
  listab2: any[];
  arr: MedicamentSchema[] = [];
  arrOfPromise = [];
  constructor(
    private companyService: CompanyService,
    private notifi: NotificationService,
    private random: RandomStorageService,
    private medic: MedicamentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.arrOfPromise = [];
    this.arr = [];
    this.notifi.presentLoading(40000);
    this.getMedocs();
  }
  getMedocs() {
    this.medic.getAllNotRealtimeMedoc().then((res) => {
      this.medicamentList = res;
      this.notifi.dismissLoading();
    });
    this.medic.getAllNotRealtimeMedicament().subscribe((data) => {
      this.listTab = data;
      // console.log(this.listTab);
    });
  }
  findMedicament(medicament: MedicamentSchema) {
    this.listab2 = [];
    this.notifi.presentLoading(15000);
    let recherche = [];
    this.companyService.getWhoSaleMedicament(medicament.id).then((result) => {
      console.log(result);
      result.forEach((company) => {
        company.medicamentList.forEach((medoc) => {
          if (medoc.id === medicament.id) {
            let obj = { resultat: medoc, company: company };
            recherche.push(obj);
          }
        });
      });
      this.notifi.dismissLoading();
      if (recherche.length) {
        setTimeout(() => {
          this.random.setContent(recherche);
          this.router.navigateByUrl('phamarcie-recherche');
          console.log(recherche);
        }, 500);
      } else {
        this.notifi.presentToast(
          'aucun resultat pour cette recherche',
          'dark',
          2500
        );
      }
    });
  }

  handleInput(event) {
    // console.log(event);
    const query = event.detail.value.toLowerCase();
    this.listab2 = this.listTab.filter((item) => {
      return item.name.toLowerCase().indexOf(query) > -1;
      // item.style.display = shouldShow ? 'block' : 'none';
    });
    console.log(this.listab2);
  }

  addMedicament(medicament: MedicamentSchema) {
    let index = this.arr.findIndex((medoc) => medoc.id == medicament.id);

    if (index > 0) {
      this.arr = this.arr.filter((medoc) => medoc.id !== medicament.id);
    } else {
      this.arr.push(medicament);
    }
  }
  async findAll() {
    this.notifi.presentLoading(20000);
    let tab = [];
    let recherche = [];
    this.arr.forEach(async (medoc, index) => {
      console.log(index);

      let result = await this.companyService.getWhoSaleMedicament2(medoc.id);
      let data = { resultat: result, medicament: this.arr[index] };
      this.arrOfPromise.push(data);
      console.log(this.arrOfPromise);
      if (this.arr.length == this.arrOfPromise.length) {
        this.random.setContent(this.arrOfPromise);
        this.router.navigateByUrl('phamarcie-recherche');
        this.notifi.dismissLoading();
      }
      /* .then((result) => {
       
      });*/
    });
  }

  loadData(event) {
    // this.scrool = true;
    this.medic
      .getAllNotRealtimeMedoc()
      .then((res: any[]) => {
        res.forEach((elt) => {
          this.medicamentList.push(elt);
        });

        event.target.complete();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
