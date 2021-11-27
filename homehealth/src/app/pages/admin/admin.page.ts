import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(
    private router: Router,
    private randomStorage: RandomStorageService
  ) {}

  ngOnInit() {}

  createNewUser() {
    this.randomStorage.setIsAdmin(true);
    this.router.navigateByUrl('inscription');
  }

  createCompany() {
    //this.randomStorage.setIsAdmin(true);
    // this.randomStorage.setIsNewCompany(true);
    // this.router.navigateByUrl('inscription');
    this.router.navigateByUrl('company');
  }
  createService() {
    this.router.navigateByUrl('create-company-service');
  }
  createTown() {
    this.router.navigateByUrl('create-town');
  }

  addAdvices() {
    this.router.navigateByUrl('add-advices');
  }
  addAdvicesCategory() {
    this.router.navigateByUrl('create-advices-categorie');
  }

  createMedicament() {
    this.router.navigateByUrl('medicament');
  }
}
