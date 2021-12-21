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

@Component({
  selector: 'app-laboratoire',
  templateUrl: './laboratoire.page.html',
  styleUrls: ['./laboratoire.page.scss'],
})
export class LaboratoirePage implements OnInit {
  laboratoireList: any[];
  public analyseList$: Observable<any[]>;
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
    // this.notifi.presentLoading(40000);
    this.analyseList$ = this.analyseService.selectAllAnalyse([]);
  }

  findAnalyse(analys: Analyse) {
    this.notifi.presentLoading(15000);
    let recherche = [];
    this.companyService.getWhoMakesAnalyse(analys.id).then((result) => {
      console.log(result);
      let total = result.length;
      result.forEach((company) => {
        company.analyseList.forEach((analyse) => {
          if (analyse.id === analys.id) {
            let obj = { resultat: analyse, company: company };
            recherche.push(obj);
          }
        });
      });
      setTimeout(() => {
        this.notifi.dismissLoading();
        console.log(recherche);
        this.random.setContent(recherche);
        this.router.navigateByUrl('laboratoire-recherche');
      }, 1000);
    });
  }
}
