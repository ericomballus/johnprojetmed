import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { TownService } from '../services/town.service';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.page.html',
  styleUrls: ['./villes.page.scss'],
})
export class VillesPage implements OnInit {
  villeList: any[] = [];
  ville = '';
  constructor(private town: TownService, private notifi: NotificationService) {}

  ngOnInit() {
    this.getVille();
  }
  addVille() {
    this.notifi.presentLoading(10000);
    this.town
      .postVille(this.ville)
      .then((res) => {
        this.villeList.push({ name: this.ville });
        this.ville = '';
        this.notifi.dismissLoading();
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  removeVille(ville, i) {
    this.notifi.presentLoading(10000);
    if (ville.id) {
      this.town
        .removeOneVille(ville.id)
        .then(() => {
          this.villeList.splice(i, 1);
          this.notifi.dismissLoading();
        })
        .catch((err) => this.notifi.dismissLoading());
    } else {
      this.town.getVilleByName(ville).then((doc: any[]) => {
        console.log(doc);
        this.town
          .removeOneVille(doc[0].id)
          .then(() => {
            this.villeList.splice(i, 1);
            this.notifi.dismissLoading();
          })
          .catch((err) => this.notifi.dismissLoading());
      });
    }
  }

  getVille() {
    this.town.getAllNotRealtimeVille().then((docs: any[]) => {
      this.villeList = docs;
      console.log(this.villeList);
    });
  }
}
