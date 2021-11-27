import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
  companyList: Company[] = [];
  constructor(
    private randomStorage: RandomStorageService,
    private router: Router,
    private companyService: CompanyService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.getCompany();
  }
  AddCompany() {
    this.randomStorage.setIsAdmin(true);
    this.randomStorage.setIsNewCompany(true);
    this.router.navigateByUrl('inscription');
  }

  async getCompany() {
    this.notifi.presentLoading(40000);
    try {
      this.companyList = await this.companyService.getAllCompany();
      this.notifi.dismissLoading();
    } catch (error) {
      this.notifi.dismissLoading();
    }
  }

  displayCompany(comp: Company) {
    console.log(comp);
  }
}
