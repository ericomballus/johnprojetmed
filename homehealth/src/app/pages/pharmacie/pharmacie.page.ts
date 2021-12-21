import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { CompanyService } from 'src/app/services/company.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.page.html',
  styleUrls: ['./pharmacie.page.scss'],
})
export class PharmaciePage implements OnInit {
  public medicamentList$: Observable<any[]>;
  constructor(
    private companyService: CompanyService,
    private notifi: NotificationService,
    private random: RandomStorageService,
    private medic: MedicamentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMedocs();
  }
  getMedocs() {
    // this.notifi.presentLoading(40000);
    this.medicamentList$ = this.medic.getAllNotRealtimeMedicament();
  }
  findMedicament(medicament: MedicamentSchema) {
    this.notifi.presentLoading(15000);
    let recherche = [];
    this.companyService.getWhoSaleMedicament(medicament.id).then((result) => {
      console.log(result);
      result.forEach((company) => {
        company.medicamentList.forEach((medoc) => {
          if (medoc.id === medicament.id) {
            let obj = { resultat: medoc, company: company };
            recherche.push(obj);
          }
        });
      });
      setTimeout(() => {
        this.notifi.dismissLoading();
        console.log(recherche);
        if (recherche.length) {
          this.random.setContent(recherche);
          this.router.navigateByUrl('phamarcie-recherche');
        } else {
          this.notifi.presentToast(
            'aucun resultat pour cette recherche',
            'danger',
            10000
          );
        }
      }, 1000);
    });
  }
}
