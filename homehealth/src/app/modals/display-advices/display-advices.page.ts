import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-display-advices',
  templateUrl: './display-advices.page.html',
  styleUrls: ['./display-advices.page.scss'],
})
export class DisplayAdvicesPage implements OnInit {
  content: any;
  constructor(
    private modal: ModalController,
    private random: RandomStorageService
  ) {}

  ngOnInit() {
    this.content = this.random.getContent();
  }
  closeModal() {
    this.modal.dismiss();
  }
}
