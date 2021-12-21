import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ManageService } from 'src/app/services/manage.service';
@Component({
  selector: 'app-create-company-service',
  templateUrl: './create-company-service.page.html',
  styleUrls: ['./create-company-service.page.scss'],
})
export class CreateCompanyServicePage implements OnInit {
  @ViewChild('btn') fileButton;
  items = [];
  public items$: any;
  // public analyseList$: Observable<any[]>;
  products$: Observable<any>;
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  error_msg = {
    name: [
      {
        type: 'required',
        message: 'Provide service name.',
      },
      {
        type: 'pattern',
        message: 'Name is not valid.',
      },
    ],
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private manageService: ManageService
  ) {
    // this.manageService.getAllServices();
  }

  ngOnInit() {
    this.getServiceList();

    this.userForm = this.fb.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
      companyType: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
    });
  }
  selectCompanyType(ev) {
    // this.companyType = ev.detail['value'];
  }

  async save(forms: FormGroup) {
    console.log(forms.value);
    await this.manageService.createServices(forms.value);
    this.userForm.reset();
  }
  getServiceList() {
    this.items$ = this.manageService.getAllServices();
  }
  async removeServiceName(service) {
    try {
      await this.manageService.removeOneServices(service);
    } catch (error) {
      console.log(error);
    }
  }
  fire() {
    this.fileButton.nativeElement.click();
  }
  fire2() {
    console.log('click me hre');
  }
}
