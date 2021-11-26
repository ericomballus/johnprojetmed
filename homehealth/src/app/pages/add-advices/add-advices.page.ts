import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdvicesService } from 'src/app/services/advices.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-advices',
  templateUrl: './add-advices.page.html',
  styleUrls: ['./add-advices.page.scss'],
})
export class AddAdvicesPage implements OnInit {
  @ViewChild('btn') fileButton: ElementRef<HTMLInputElement>;
  items = [];
  advicesCategory = [];
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';

  error_msg = {
    titre: [
      {
        type: 'required',
        message: 'Provide title.',
      },
      {
        type: 'pattern',
        message: 'title is not valid.',
      },
    ],
    texte: [
      {
        type: 'required',
        message: 'Provide texte.',
      },
      {
        type: 'pattern',
        message: 'Texte is not valid.',
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
    private router: Router,
    private fb: FormBuilder,
    private advice: AdvicesService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      titre: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          // Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
      texte: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(5000),
          // Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
      category: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
    });
    this.getAllCategory();
    this.advice.getAllAdvices();
  }
  ionViewDidEnter() {
    this.getAdvices();
  }
  async poster(userForm: FormGroup) {
    this.notifi.presentLoading(40000);
    try {
      await this.advice.postAdvice(userForm.value);
      this.notifi.dismissLoading();
      this.userForm.reset();
      this.fire();
      this.notifi.presentToast(
        'new advices have been add succesfuly',
        'success',
        2000
      );
    } catch (error) {
      this.notifi.dismissLoading();
      this.notifi.presentToast('encounted some issue...', 'danger', 10000);
    }
  }

  getAdvices() {
    this.advice.getData().subscribe((data) => {
      data.forEach((elt) => {});
      this.items = data;
      if (this.items.length) {
        //  setTimeout(() => {
        this.fire();
        // }, 500);
      }
    });
  }

  async removeAdvices(advice) {
    await this.advice.removeOneAdvices(advice);
  }

  fire() {
    this.fileButton.nativeElement.click();
  }
  fire2() {}
  getAllCategory() {
    this.advice.getAllNotRealtimeAdviceCategory().then((data: any[]) => {
      this.advicesCategory = data;
    });
  }
}
