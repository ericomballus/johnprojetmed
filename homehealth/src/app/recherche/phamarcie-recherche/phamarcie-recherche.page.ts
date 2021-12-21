import { Component, OnInit } from '@angular/core';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-phamarcie-recherche',
  templateUrl: './phamarcie-recherche.page.html',
  styleUrls: ['./phamarcie-recherche.page.scss'],
})
export class PhamarcieRecherchePage implements OnInit {
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
