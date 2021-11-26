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
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  isAdmin: boolean = false;
  isNewCompany: boolean = false;
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';

  error_msg = {
    displayName: [
      {
        type: 'required',
        message: 'Provide user name.',
      },
      {
        type: 'pattern',
        message: 'Name is not valid.',
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
    private randomStorage: RandomStorageService
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
      displayName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
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
    if (this.isAdmin && this.isNewCompany) {
      this.randomStorage.setUser(forms);
      this.router.navigateByUrl('company-builder');
    } else {
      this.authService
        .RegisterUser(forms.email, forms.password)
        .then((UserCredential: firebase.auth.UserCredential) => {
          UserCredential.user.sendEmailVerification().then((res) => {});
          forms.uid = UserCredential.user.uid;
          forms.emailVerified = UserCredential.user.emailVerified;
          forms.photoURL = UserCredential.user.photoURL;
          forms.roles = [4];
          this.authService.StoreUserData(forms);
          this.errorMsg = '';
          this.successMsg = 'New user created.';
        })
        .catch((error) => {
          window.alert(error.message);
          this.errorMsg = error.message;
          this.successMsg = '';
        });
    }
  }
}
