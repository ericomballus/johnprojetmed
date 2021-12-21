import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Analyse } from 'src/app/models/analyseSchema';
import { Company } from 'src/app/models/company';
import { AnalyseService } from 'src/app/services/analyse.service';
import { CompanyService } from 'src/app/services/company.service';
import { ManageService } from 'src/app/services/manage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
@Component({
  selector: 'app-pick-analyse',
  templateUrl: './pick-analyse.page.html',
  styleUrls: ['./pick-analyse.page.scss'],
})
export class PickAnalysePage implements OnInit {
  serviceTab: any[];
  company: Company;
  public analyseList$: Observable<any[]>;
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController,
    private companyService: CompanyService,
    private notifi: NotificationService,
    private analyseService: AnalyseService
  ) {}

  ngOnInit() {
    this.company = this.randomStorage.getCompany();
    this.getServiceList();
  }

  getServiceList() {
    this.analyseList$ = this.analyseService.selectAllAnalyse(
      this.company.analyseList
    );
  }

  closeModal() {
    this.randomStorage.setCompany(this.company);
    this.modal.dismiss();
  }
  addAnalyse(analyse: Analyse) {
    let companyAnalyseList = this.company.analyseList;
    let index = companyAnalyseList.findIndex(
      (serv) => serv['id'] === analyse.id
    );

    if (index >= 0) {
      this.company.analyseList = this.company.analyseList.filter(
        (elt) => elt['id'] !== analyse.id
      );
      this.company.allAnalyseId = this.company.allAnalyseId.filter(
        (elt) => elt['id'] !== analyse.id
      );
      analyse.users = analyse.users.filter(
        (companyId) => companyId !== this.company.id
      );
      this.analyseService
        .updateAnalyses(analyse.id, analyse)
        .then(() => {
          console.log('update');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!this.company.allAnalyseId) {
        this.company['allAnalyseId'] = [];
      }

      analyse.updateAt = '';
      analyse['conditionPrelevement'] = '';
      let obj = Object.assign({}, analyse);
      this.company.analyseList.push(obj);

      this.company.allAnalyseId.push(analyse.id);
      analyse.users.push(this.company.id);
      this.analyseService
        .updateAnalyses(analyse.id, analyse)
        .then(() => {
          // console.log('update');
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }

  save() {
    this.notifi.presentLoading(40000);
    this.companyService
      .updateCompany(this.company.id, this.company)
      .then((res) => {
        this.notifi.dismissLoading();
        this.randomStorage.setCompany(this.company);
        this.modal.dismiss();
      });
  }
}
