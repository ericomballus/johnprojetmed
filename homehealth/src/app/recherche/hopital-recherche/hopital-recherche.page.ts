import { Component, OnInit } from '@angular/core';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-hopital-recherche',
  templateUrl: './hopital-recherche.page.html',
  styleUrls: ['./hopital-recherche.page.scss'],
})
export class HopitalRecherchePage implements OnInit {
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
