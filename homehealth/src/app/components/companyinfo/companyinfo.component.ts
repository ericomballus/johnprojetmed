import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-companyinfo',
  templateUrl: './companyinfo.component.html',
  styleUrls: ['./companyinfo.component.scss'],
})
export class CompanyinfoComponent implements OnInit {
  @Input() public company: Company;
  constructor() {}

  ngOnInit() {}
}
