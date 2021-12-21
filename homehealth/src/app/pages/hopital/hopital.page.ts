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
  laboratoireList: any[];
  public serviceList$: Observable<any[]>;
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
    this.serviceList$ = this.manageService.getAllServices();
  }
  findService(service) {
    console.log(service);

    this.notifi.presentLoading(15000);
    let recherche = [];
    this.companyService.getWhoMakesService(service.id).then((result) => {
      console.log(result);
      result.forEach((company) => {
        company.serviceList.forEach((services) => {
          if (services['id'] === service.id) {
            let obj = { resultat: service, company: company };
            recherche.push(obj);
          }
        });
      });
      setTimeout(() => {
        this.notifi.dismissLoading();
        console.log(recherche);
        this.random.setContent(recherche);
        this.router.navigateByUrl('hopital-recherche');
      }, 1000);
    });
  }
}
