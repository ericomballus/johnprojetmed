import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { ManageService } from 'src/app/services/manage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

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
  constructor(
    private companyService: CompanyService,
    private notifi: NotificationService,
    private random: RandomStorageService,
    private modalCrtl: ModalController,
    private manageService: ManageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getServiceList();
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
  findService(service) {
    this.notifi.presentLoading(15000);
    let recherche = [];
    this.listab2 = [];
    this.companyService.getWhoMakesService(service.id).then((result) => {
      result.forEach((company) => {
        company.serviceList.forEach((services) => {
          if (services['id'] === service.id) {
            let obj = { resultat: service, company: company };
            recherche.push(obj);
          }
        });
      });
      this.notifi.dismissLoading();
      if (recherche.length) {
        setTimeout(() => {
          this.random.setContent(recherche);
          this.router.navigateByUrl('hopital-recherche');
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
    // console.log(event);
    const query = event.detail.value.toLowerCase();
    this.listab2 = this.listTab.filter((item) => {
      return item.name.toLowerCase().indexOf(query) > -1;
      // item.style.display = shouldShow ? 'block' : 'none';
    });
  }
}
