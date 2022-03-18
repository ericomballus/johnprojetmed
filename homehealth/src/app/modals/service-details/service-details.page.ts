import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { User } from 'src/app/models/user';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  service: ServiceSchema;
  constructor(
    private random: RandomStorageService,
    private modal: ModalController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.service = this.random.getData();
    if (this.service.serviceResponsable.length) {
      this.service.serviceResponsable.forEach(async (r, i) => {
        try {
          let user = await this.getUserStatus(r);
          console.log(user);
          let lastLogin = new Date(user.lastLoginAt.seconds * 1000);
          console.log(lastLogin);
          console.log(
            lastLogin.getDate(),
            lastLogin.getMonth(),
            lastLogin.getFullYear()
          );
          let t = new Date().getTime();

          console.log(t - user.lastLoginAt.seconds * 1000);
          console.log('////------------------------------/////');
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
}
