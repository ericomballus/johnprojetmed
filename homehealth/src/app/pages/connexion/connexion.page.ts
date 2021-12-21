import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import firebase from 'firebase/compat/app';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private notifi: NotificationService,
    private router: Router,
    private userService: UserService,
    private randomStorage: RandomStorageService,
    private company: CompanyService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.notifi
        .presentAlertConfirm(
          `vous etes actuellement connecté a ${this.authService.isLoggedIn.email}, voulez continuez avec ce compte ?`
        )
        .then(() => {
          //this.router.navigateByUrl('home');
          this.userService
            .getUser(this.authService.isLoggedIn.uid)
            .then((user: User) => {
              console.log(user);
              this.notifi.dismissLoading();
              if (user.roles.includes(2)) {
                this.randomStorage.setAdmin(user);
                this.getCompany(user);
              }
              //
            });
        })
        .catch(() => {});
    } else {
    }
  }
  signUp(email, password) {
    this.notifi.presentLoading(60000);
    this.authService
      .SignIn(email.value, password.value)
      .then((res: firebase.auth.UserCredential) => {
        this.userService.getUser(res.user.uid).then((user: User) => {
          console.log(user);
          this.notifi.dismissLoading();
          if (user.roles.includes(2)) {
            this.randomStorage.setAdmin(user);
            this.getCompany(user);
          }
          //
        });

        // this.authService.updateUserData(res);
      })
      .catch((error) => {
        this.notifi.dismissLoading();
        this.notifi.presentToast(
          'erreur authentification rassurer vous que vous avez entrez les identifiants corrects',
          'danger',
          6000
        );
      });
  }
  getCompany(user) {
    this.company.getAdminCompany(user).subscribe(
      (data) => {
        this.router.navigateByUrl('company-admin');
        if (data.length) {
          console.log(data);
          this.randomStorage.setCompany(data[0]);
        }
      },
      (err) => this.notifi.dismissLoading()
    );
  }
}
