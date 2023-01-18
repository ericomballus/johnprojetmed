import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddServicePage } from 'src/app/modals/add-service/add-service.page';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-admin',
  templateUrl: './company-admin.page.html',
  styleUrls: ['./company-admin.page.scss'],
})
export class CompanyAdminPage implements OnInit {
  user: User;
  companie: Company;
  constructor(
    private notifi: NotificationService,
    private router: Router,
    private userService: UserService,
    private randomStorage: RandomStorageService,
    private modalController: ModalController,
    private company: CompanyService
  ) {}

  ngOnInit() {
    this.user = this.randomStorage.getAdmin();
    this.randomStorage.getCompanySubject().subscribe((c: Company) => {
      this.companie = c;
    });
  }
  displayEmploye() {
    this.router.navigateByUrl('company-users');
  }
  async displayService() {
    this.router.navigateByUrl('display-company-service');
  }
  displayMedicament() {
    this.router.navigateByUrl('medicament-list');
  }
  displayAnalyse() {
    this.router.navigateByUrl('analyse-list');
  }
  companySetting() {
    console.log(this.randomStorage.getCompany());
    this.router.navigateByUrl('company-setting');
  }
  getRendezVous() {
    if (this.companie.companyType == 'laboratoire') {
      this.router.navigateByUrl('company-analyse-comm');
    } else {
      this.router.navigateByUrl('company-admin-rdv');
    }
  }
  getCommande() {
    this.router.navigateByUrl('company-admin-comm');
  }
}
