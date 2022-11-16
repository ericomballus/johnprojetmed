import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  villeList: any[] = [];
  listab2: any[];
  constructor(
    private random: RandomStorageService,
    private modalCrtl: ModalController,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.villeList = this.random.getVilles();
  }

  selectVille(ville) {
    console.log(ville);
    this.notifi
      .presentAlertConfirm(
        `voulez vous effectuer votre recherche dans la ville de ${ville.name}?`
      )
      .then((res) => {
        console.log(res);
        ville.isChecked = false;
        this.random.setVilleRecherche(ville.name);
        this.modalCrtl.dismiss({ ville: ville.name });
      })
      .catch((err) => {
        ville.isChecked = false;
      });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    // this.scrool = true;
    /* this.manageService
      .getService()
      .then((res: any[]) => {
        res.forEach((elt) => {
          this.serviceList.push(elt);
        });

        event.target.complete();
      })
      .catch((err) => {
        console.log(err);
      });*/
  }

  handleInput(event) {
    const query = event.detail.value.toLowerCase();
    this.listab2 = this.villeList.filter((item) => {
      return item.name.toLowerCase().indexOf(query) > -1;
    });
  }
}
