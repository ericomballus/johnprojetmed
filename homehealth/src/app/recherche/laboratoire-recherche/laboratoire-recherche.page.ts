import { Component, OnInit } from '@angular/core';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-laboratoire-recherche',
  templateUrl: './laboratoire-recherche.page.html',
  styleUrls: ['./laboratoire-recherche.page.scss'],
})
export class LaboratoireRecherchePage implements OnInit {
  resultat: any[];
  constructor(private random: RandomStorageService) {}

  ngOnInit() {
    this.resultat = this.random.getContent();
    console.log(this.resultat);
  }

  commander(result) {
    console.log(result);
  }
}
