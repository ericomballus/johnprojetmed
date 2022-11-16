import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class OpenModalService {
  constructor(private modalCrtl: ModalController) {}

  ouvreLaPage(PAGE) {
    return new Promise<any>(async (resolve, reject) => {
      const modal = await this.modalCrtl.create({
        component: PAGE,
        componentProps: {},
        cssClass: 'modal-size-big',
        backdropDismiss: false,
      });
      modal.onDidDismiss().then((data) => {
        resolve(data);
      });
      return await modal.present();
    });
  }
}
