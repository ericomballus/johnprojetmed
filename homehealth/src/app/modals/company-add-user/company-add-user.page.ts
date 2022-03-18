import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
@Component({
  selector: 'app-company-add-user',
  templateUrl: './company-add-user.page.html',
  styleUrls: ['./company-add-user.page.scss'],
})
export class CompanyAddUserPage implements OnInit {
  isAdmin: boolean = false;
  admin: User;
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

    telephone: [
      {
        type: 'required',
        message: 'Provide user phone number.',
      },
      {
        type: 'pattern',
        message: 'Phone is not valid. Phone must start with 237',
      },
      {
        type: 'minlength',
        message: 'le numéro de telephone doit contenir au moins 12 chiffres.',
      },
      {
        type: 'maxlength',
        message: 'le numéro de telephone doit contenir au plus 12 chiffres.',
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
    private modal: ModalController,
    private notifi: NotificationService,
    private company: CompanyService
  ) {}

  ionViewWillEnter() {
    this.isAdmin = this.randomStorage.checkIfIsAdmin();

    // this.isNewCompany = this.randomStorage.checkIfIsNewCompany();
  }
  ionViewWillLeave() {
    this.randomStorage.setIsAdmin(false);
    // this.randomStorage.setIsNewCompany(false);
  }
  closeModal() {
    this.modal.dismiss();
  }
  ngOnInit() {
    this.admin = this.randomStorage.getAdmin();
    this.getCompany();
    this.userForm = this.fb.group({
      displayName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
      /* email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),*/
      telephone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[237]+[0-9-]+$'),
          Validators.minLength(12),
          Validators.maxLength(12),
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

  ajouter(forms: User) {
    let email = `${forms.displayName}@test.com`;
    forms.email = email;
    if (this.isAdmin && this.isNewCompany) {
      this.randomStorage.setUser(forms);
      this.router.navigateByUrl('company-builder');
    } else {
      this.notifi.presentLoading(40000);
      this.authService
        .RegisterUser(forms.email, forms.password)
        .then(async (UserCredential: firebase.auth.UserCredential) => {
          UserCredential.user.sendEmailVerification().then((res) => {});
          forms.uid = UserCredential.user.uid;
          forms.emailVerified = UserCredential.user.emailVerified;
          forms.photoURL = UserCredential.user.photoURL;
          forms.roles = [3];
          forms.adminId = this.admin.uid;
          await this.authService.StoreUserData(forms);
          this.userForm.reset();
          this.notifi.dismissLoading();
          this.notifi.presentToast('well, New user created', 'success', 5000);
          this.errorMsg = '';
          this.successMsg = 'New user created.';
        })
        .catch((error) => {
          this.notifi.dismissLoading();
          window.alert(error.message);
          this.errorMsg = error.message;
          this.successMsg = '';
        });
    }
  }
  getCompany() {
    this.company
      .getAdminCompany(this.admin)
      .subscribe((data) => console.log(data));
  }
}
