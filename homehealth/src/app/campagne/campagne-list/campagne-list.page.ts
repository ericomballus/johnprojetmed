import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampagneSchema } from 'src/app/models/campaneSchema';
import { CampagneService } from 'src/app/services/campagne.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-campagne-list',
  templateUrl: './campagne-list.page.html',
  styleUrls: ['./campagne-list.page.scss'],
})
export class CampagneListPage implements OnInit {
  campagneList: CampagneSchema[] = [];
  constructor(
    private router: Router,
    private campService: CampagneService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.getCam();
  }

  getCam() {
    this.notifi.presentLoading(15000);
    this.campService
      .getAllCampagne()
      .then((res) => {
        this.campagneList = res;
        this.notifi.dismissLoading();
      })
      .catch((error) => {
        this.notifi.dismissLoading();
        this.notifi.presentToast(error, 'danger', 3000);
      });

    /* try {
     

      let arr = [];
    } catch (error) {
      this.notifi.dismissLoading();
     
    }*/
  }

  AddCampagne() {
    this.router.navigateByUrl('campagne-add');
  }
  async Delete(camp, j) {
    console.log(camp);

    try {
      await this.notifi.presentAlertConfirm('voulez vous supprimer ?');
      this.notifi.presentLoading(6000);
      this.campService
        .removeCamp(camp.id)
        .then((res) => {
          this.campagneList.splice(j, 1);
          this.notifi.dismissLoading();
        })
        .catch((error) => {
          this.notifi.dismissLoading();
          this.notifi.presentToast(error, 'danger', 3000);
        });
    } catch (error) {}
  }
}
