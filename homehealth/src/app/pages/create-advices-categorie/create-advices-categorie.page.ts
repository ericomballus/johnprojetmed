import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdvicesService } from 'src/app/services/advices.service';

@Component({
  selector: 'app-create-advices-categorie',
  templateUrl: './create-advices-categorie.page.html',
  styleUrls: ['./create-advices-categorie.page.scss'],
})
export class CreateAdvicesCategoriePage implements OnInit {
  @ViewChild('btn') fileButton;
  items = [];
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
    private adviceService: AdvicesService
  ) {
    // this.manageService.getAllServices();
  }

  ngOnInit() {
    console.log(this.fileButton);

    this.userForm = this.fb.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
    });
    this.getAllCategory();
  }
  selectCompanyType(ev) {
    // this.companyType = ev.detail['value'];
  }

  async save(forms: FormGroup) {
    console.log(forms.value);
    await this.adviceService.postAdviceCategory(forms.value);
    this.userForm.reset();
    this.getAllCategory();
  }
  getAllCategory() {
    this.adviceService.getAllNotRealtimeAdviceCategory().then((data: any[]) => {
      this.items = data;
      console.log(this.items);
    });
  }
  async removeCategoryName(category) {
    try {
      await this.adviceService.removeOneAdvicesCategory(category);
      this.getAllCategory();
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
