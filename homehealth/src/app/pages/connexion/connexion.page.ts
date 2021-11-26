import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import firebase from 'firebase/compat/app';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private notifi: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.notifi
        .presentAlertConfirm(
          `vous etes actuellement connecté a ${this.authService.isLoggedIn.email}, voulez continuez avec ce compte ?`
        )
        .then(() => {
          this.router.navigateByUrl('home');
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
        this.notifi.dismissLoading();
        this.router.navigateByUrl('home');
        this.authService.updateUserData(res);
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
}
