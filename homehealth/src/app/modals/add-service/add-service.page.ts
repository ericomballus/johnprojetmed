import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { ServiceSchema } from 'src/app/models/serviceSchema';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
})
export class AddServicePage implements OnInit {
  company: Company;
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
    responsable: [
      {
        type: 'required',
        message: 'Provide service name.',
      },
      {
        type: 'pattern',
        message: 'Name is not valid.',
      },
    ],
    responsablePhone: [
      {
        type: 'required',
        message: 'Provide owner phone.',
      },
      {
        type: 'pattern',
        message: 'Phone format is not valid.',
      },
    ],
    responsableEmail: [
      {
        type: 'required',
        message: 'Provide owner Email.',
      },
      {
        type: 'pattern',
        message: 'Email format is not valid.',
      },
    ],
    price: [
      {
        type: 'required',
        message: 'Provide service price.',
      },
    ],
  };
  constructor(
    private randomService: RandomStorageService,
    private modal: ModalController,
    private fb: FormBuilder
  ) {
    this.company = this.randomService.getCompany();
  }

  ionViewWillEnter() {}

  ngOnInit() {
    this.initFrom();
  }

  closeModal() {
    this.modal.dismiss();
  }

  initFrom() {
    this.userForm = this.fb.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
      responsable: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
      responsablePhone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[6]{1}[0-9]{8}'),
        ])
      ),
      responsableEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      price: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  save(forms: ServiceSchema) {
    this.company.serviceList.push(forms);
    this.userForm.reset();
    console.log(forms);
  }
  removeServiceName(service: ServiceSchema) {
    this.company.removeService(service.name);
  }
}
