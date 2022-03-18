import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  user: User;
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
    public randomStorage: RandomStorageService,
    public authService: AuthenticationService,
    private fb: FormBuilder,
    private notifi: NotificationService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.user = this.randomStorage.getUser();
    console.log(this.user);
    this.userForm = this.fb.group({
      displayName: new FormControl(
        this.user.displayName,
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
        this.user.telephone ? this.user.telephone : '23',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[237]+[0-9-]+$'),
          Validators.minLength(12),
          Validators.maxLength(12),
        ])
      ),
    });
  }

  async update(forms: User) {
    console.log(forms);
    this.notifi.presentLoading(2500);
    this.user.telephone = forms.telephone;
    try {
      await this.auth.updateUserData(this.user);
      this.notifi.dismissLoading();
      this.notifi.presentToast('utilisateur mise a jour !', 'success', 1500);
    } catch (error) {
      console.log(error);

      this.notifi.dismissLoading();
      this.notifi.presentToast('mise a jour a echoué !', 'danger', 1500);
    }
  }
}
