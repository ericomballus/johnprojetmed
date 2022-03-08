import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { NotificationService } from './services/notification.service';
import { TranslateConfigService } from './translate-config.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any[] = [
    {
      title: 'MENU.home',
      url: '/home',
      icon: 'home',
      color: 'tertiary',
    },
    {
      title: 'MENU.account',
      url: '/user-home',
      icon: 'home',
      color: 'tertiary',
    },
    /* {
      title: 'MENU.signup',
      url: '/inscription',
      icon: 'home',
      color: 'tertiary',
    },*/
    {
      title: 'MENU.login',
      url: 'connexion',
      icon: 'cart',
      color: 'success',
    },

    {
      title: 'MENU.team',
      url: 'admin',
      icon: 'clipboard',
      color: 'success',
    },
  ];
  selectedLanguage: string;
  constructor(
    private translateConfigService: TranslateConfigService,
    private auth: AuthenticationService,
    private plt: Platform,
    private notif: NotificationService
  ) {
    this.listenEvent();
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    localStorage.setItem('language', this.selectedLanguage);
  }

  languageChanged(ev) {
    this.selectedLanguage = ev.detail.value;
    localStorage.setItem('language', this.selectedLanguage);
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  async disconnect() {
    try {
      await this.auth.SignOut();
      this.notif.presentToast('you are now log out!', 'success', 4000);
    } catch (error) {
      this.notif.presentToast(error, 'danger', 4000);
    }
  }

  listenEvent() {
    this.plt.ready().then(() => {
      this.auth.getUserRole().subscribe((res) => {
        if (res.length > 0) {
          this.buildMenu(res);
        }
      });
    });
  }

  buildMenu(tabRole: number[]) {
    if (tabRole.includes(1)) {
      this.navigate = [
        {
          title: 'MENU.team',
          url: 'admin',
          icon: 'clipboard',
          color: 'success',
        },
      ];
    } else if (tabRole.includes(2)) {
      this.navigate = [
        {
          title: 'MENU.signup',
          url: '/inscription',
          icon: 'home',
          color: 'tertiary',
        },
        {
          title: 'MENU.login',
          url: 'connexion',
          icon: 'cart',
          color: 'success',
        },
      ];
    }
  }
}
