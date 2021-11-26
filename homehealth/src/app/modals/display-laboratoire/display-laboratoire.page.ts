import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-display-laboratoire',
  templateUrl: './display-laboratoire.page.html',
  styleUrls: ['./display-laboratoire.page.scss'],
})
export class DisplayLaboratoirePage implements OnInit {
  company: Company;
  constructor(
    private modal: ModalController,
    private random: RandomStorageService
  ) {}

  ngOnInit() {
    this.company = this.random.getCompany();
  }
  closeModal() {
    this.modal.dismiss();
  }
}
