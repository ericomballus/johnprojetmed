import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/models/user';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-inscription-company',
  templateUrl: './inscription-company.page.html',
  styleUrls: ['./inscription-company.page.scss'],
})
export class InscriptionCompanyPage implements OnInit {
  isAdmin: boolean = false;
  isNewCompany: boolean = false;
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';

  error_msg = {
    pseudo: [
      {
        type: 'required',
        message: 'Provide Pseudo.',
      },
      {
        type: 'pattern',
        message: 'Pseudo is not valid.',
      },
    ],
    name: [
      {
        type: 'required',
        message: 'Provide name.',
      },
      {
        type: 'pattern',
        message: 'name is not valid.',
      },
      {
        type: 'minlength',
        message: 'name length should be 3 characters long.',
      },
      {
        type: 'maxlength',
        message: 'name max length should be 100 characters long.',
      },
    ],
    firstName: [
      {
        type: 'required',
        message: 'Provide first Name.',
      },
      {
        type: 'pattern',
        message: 'first Name is not valid.',
      },
      {
        type: 'minlength',
        message: 'first Name length should be 3 characters long.',
      },
      {
        type: 'maxlength',
        message: 'first Name max length should be 100 characters long.',
      },
    ],
    email: [
      {
        type: 'required',
        message: 'Provide email.',
      },
      {
        type: 'pattern',
        message: 'Email is not valid.',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.',
      },
      {
        type: 'minlength',
        message: 'Password length should be 6 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Password max length should be 200 characters long.',
      },
    ],
  };
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private randomStorage: RandomStorageService,
    private notifi: NotificationService
  ) {}
  ionViewWillEnter() {
    this.isAdmin = this.randomStorage.checkIfIsAdmin();
    this.isNewCompany = this.randomStorage.checkIfIsNewCompany();
  }
  ionViewWillLeave() {
    this.randomStorage.setIsAdmin(false);
    this.randomStorage.setIsNewCompany(false);
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
      pseudo: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(200),
          Validators.required,
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(200),
          Validators.required,
        ])
      ),
    });
  }

  signUp(forms: User) {
    // console.log(forms);
    // forms.email = `${forms.displayName}@test.com`;

    if (this.isAdmin && this.isNewCompany) {
      this.randomStorage.setUser(forms);
      this.router.navigateByUrl('company-builder');
    } else {
      console.log(forms);
    }
  }
}
