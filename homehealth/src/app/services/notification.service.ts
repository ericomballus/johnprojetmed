import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    public loading: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  async presentLoading(time: number) {
    const loading = await this.loading.create({
      duration: time,
      message: 'please wait...',
      cssClass: 'custom-class custom-loading',
      // backdropDismiss: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  async dismissLoading() {
    this.loading
      .dismiss()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  async presentToast(msg: string, color: string, time: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  presentAlertConfirm(msg) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'WARNING!',
        message: msg,
        buttons: [
          {
            text: 'NON',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              reject('no');
            },
          },
          {
            text: 'OUI',
            handler: () => {
              resolve('ok');
            },
          },
        ],
      });

      await alert.present();
    });
  }
}
