import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-pick-employe',
  templateUrl: './pick-employe.page.html',
  styleUrls: ['./pick-employe.page.scss'],
})
export class PickEmployePage implements OnInit {
  employeList: User[] = [];
  employeSelect: User[] = [];
  constructor(
    private randomStorage: RandomStorageService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.employeList = this.randomStorage.getEmployeList();
    console.log(this.employeList);
  }
  closeModal() {
    this.modal.dismiss();
  }
  save() {
    this.randomStorage.setResponsable(this.employeSelect);
    this.modal.dismiss();
  }

  addEmploye(employe: User) {
    let index = this.employeSelect.findIndex((user) => user.uid == employe.uid);
    if (index >= 0) {
      this.employeSelect = this.employeSelect.filter(
        (u) => u.uid !== employe.uid
      );
    } else {
      this.employeSelect.push(employe);
    }
  }
}
