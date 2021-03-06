import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AnalyseService } from 'src/app/services/analyse.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AddAnalysePage } from './add-analyse/add-analyse.page';
import { AddServicesAnalysePage } from './add-services-analyse/add-services-analyse.page';

@Component({
  selector: 'app-analyses',
  templateUrl: './analyses.page.html',
  styleUrls: ['./analyses.page.scss'],
})
export class AnalysesPage implements OnInit {
  public analyseList$: Observable<any[]>;
  public analyseList: any[] = [];
  scrool = false;
  constructor(
    private modalCrtl: ModalController,
    private analyseService: AnalyseService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.getAnalyseList();
  }
  async addAnalyse() {
    const modal = await this.modalCrtl.create({
      component: AddAnalysePage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }

  async addServiceAnalyse() {
    const modal = await this.modalCrtl.create({
      component: AddServicesAnalysePage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }
  getAnalyseList() {
    //this.analyseList$ = this.analyseService.getAnalyse();
    this.notifi.presentLoading(20000);
    this.analyseService.getAnalyse().then((res: any[]) => {
      // console.log(res);
      this.notifi.dismissLoading();
      if (!this.scrool) {
        this.analyseList = res;
      }
    });
  }

  async removeService(analyse) {
    this.notifi.presentLoading(40000);

    try {
      await this.analyseService.removeOneAnalyse(analyse);
      this.notifi.dismissLoading();
      this.notifi.presentToast('successful remove it!', 'primary', 1500);
    } catch (error) {
      this.notifi.dismissLoading();
      this.notifi.presentToast(error.message, 'danger', 4000);
    }
  }

  loadData(event) {
    this.scrool = true;
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
}
