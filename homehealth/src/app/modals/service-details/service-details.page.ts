import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  service: ServiceSchema;
  rendezVousTab = { jour: null, heure: null };
  hopital: Company;
  customer: User;
  constructor(
    private random: RandomStorageService,
    private modal: ModalController,
    private userService: UserService,
    private notifi: NotificationService,
    private rendezVous: RendezvousService
  ) {}

  ngOnInit() {
    this.hopital = this.random.getCompany();
    this.service = this.random.getData();
    this.customer = this.random.getUser();
    if (
      this.service.serviceResponsable &&
      this.service.serviceResponsable.length
    ) {
      this.service.serviceResponsable.forEach(async (r, i) => {
        try {
          let user = await this.getUserStatus(r);
          let t = new Date().getTime();
          console.log('user ====>', user);
          this.service.serviceResponsable[i] = user;
          let online = t - user.lastLoginAt.seconds * 1000;
          if (online <= 180000) {
            //3 minutes en millisecondes
            user.isOnline = true;
          }
          user.isOnline = true;
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
  closeModal() {
    this.modal.dismiss();
  }

  async getUserStatus(user: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await this.userService.getUser(user.uid);
        resolve(res);
      } catch (error) {
        console.log(error);
        reject(user);
      }
    });
  }

  pickDate(ev) {
    console.log(ev);
    this.rendezVousTab['jour'] = ev.jour;
    console.log(this.rendezVousTab);
  }
  pickHour(ev) {
    console.log(ev);

    this.rendezVousTab['heure'] = ev.heure;
    console.log(this.rendezVousTab);
  }

  valider() {
    this.notifi.presentLoading(10000);
    let rdv = {
      companyId: this.hopital.id,
      serviceName: this.customer.displayName,
      serviceId: this.service.id,
      jour: this.rendezVousTab.jour,
      heure: this.rendezVousTab.heure,
      customerId: this.customer.uid,
      valider: false,
    };
    this.rendezVous.postRendezVous(rdv).then(() => {
      this.notifi.presentToast(
        'votre rendez vous a été enregistré',
        'success',
        3000
      );
      this.notifi.dismissLoading();
      this.closeModal();
    });
  }

  displaySchedule(responsable: User) {
    if (responsable.display_schedule) {
      responsable.display_schedule = !responsable.display_schedule;
    } else {
      responsable.display_schedule = true;
    }
    console.log(responsable);
  }
  selectDay(jour, responsable) {
    if (jour.isChecked) {
      jour.isChecked = !jour.isChecked;
    } else {
      jour.isChecked = true;
    }
    console.log(jour);
  }
}
