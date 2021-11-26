import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DisplayAdvicesPage } from 'src/app/modals/display-advices/display-advices.page';
import { AdvicesService } from 'src/app/services/advices.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-advices',
  templateUrl: './advices.page.html',
  styleUrls: ['./advices.page.scss'],
})
export class AdvicesPage implements OnInit {
  items = [];
  advicesCategory = [];
  constructor(
    private advice: AdvicesService,
    private notifi: NotificationService,
    private random: RandomStorageService,
    private modalCrtl: ModalController
  ) {}

  ngOnInit() {
    this.getAllCategory();
    this.getAdvices();
  }

  getAdvices() {
    this.notifi.presentLoading(40000);
    this.advice
      .getAllNotRealtimeAdvice()
      .then((data: any[]) => {
        this.items = data;

        this.notifi.dismissLoading();
      })
      .catch((error) => {
        console.log(error);
        this.notifi.dismissLoading();
      });
  }

  async displayIt(advice) {
    this.random.setContent(advice);
    const modal = await this.modalCrtl.create({
      component: DisplayAdvicesPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }

  getAllCategory() {
    this.advice.getAllNotRealtimeAdviceCategory().then((data: any[]) => {
      this.advicesCategory = data;
    });
  }

  selectByCategory(ev) {
    this.notifi.presentLoading(40000);
    this.advice.getAdviceByCategorie(ev.detail.value).then((data: any[]) => {
      console.log(data);
      this.notifi.dismissLoading();
      this.items = data;
    });
  }
}
