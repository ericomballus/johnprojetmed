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

  async signUp(forms: User) {
    if (this.isAdmin && this.isNewCompany) {
      this.randomStorage.setUser(forms);
      this.router.navigateByUrl('company-builder');
    } else {
      let email = '';

      /* if (forms.displayName.split('@').length > 1) {
        this.notifi.presentToast(
          'le pseudo ne doit pas contenir le caractére @',
          'danger',
          5000
        );
        return;
      }*/

      this.notifi.presentLoading(10000);
      /* email = `${forms.displayName}@test.com`;
      forms.email = email;*/
      try {
        let UserCredential: firebase.auth.UserCredential =
          await this.authService.RegisterUser(forms.email, forms.password);
        this.notifi.dismissLoading();
        UserCredential.user.sendEmailVerification().then((res) => {});
        forms.uid = UserCredential.user.uid;
        forms.emailVerified = UserCredential.user.emailVerified;
        forms.photoURL = UserCredential.user.photoURL;
        forms.roles = [4];
        forms.consultationList = [];
        forms.analyseList = [];
        forms.achatList = [];
        this.authService.StoreUserData(forms);
        this.notifi.presentToast(
          'félicitation votre compte a été enregistré',
          'success',
          3000
        );
        this.router.navigateByUrl('home');
        this.errorMsg = '';
        this.successMsg = 'New user created.';
      } catch (error) {
        window.alert(error.message);
        this.errorMsg = error.message;
        this.successMsg = '';
      }
      /* this.authService
        .RegisterUser(forms.email, forms.password)
        .then((UserCredential: firebase.auth.UserCredential) => {
         
        })
        .catch((error) => {
          window.alert(error.message);
          this.errorMsg = error.message;
          this.successMsg = '';
        });*/
    }
  }
}
