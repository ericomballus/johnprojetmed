import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AnalyseService } from 'src/app/services/analyse.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Analyse } from 'src/app/models/analyseSchema';

@Component({
  selector: 'app-add-analyse',
  templateUrl: './add-analyse.page.html',
  styleUrls: ['./add-analyse.page.scss'],
})
export class AddAnalysePage implements OnInit {
  public serviceList$: Observable<any[]>;
  public analyseList$: Observable<any[]>;
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
  userForm: FormGroup;
  constructor(
    private modal: ModalController,
    private fb: FormBuilder,
    private analyseService: AnalyseService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {
    this.initFrom();
    this.getAnalyseServiceList();
    this.getAnalyseList();
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
      serviceAnalyse: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
        ])
      ),
    });
  }
  getAnalyseServiceList() {
    this.serviceList$ = this.analyseService.getServiceAnalyse();
  }
  getAnalyseList() {
    // this.analyseList$ = this.analyseService.getAnalyse();
  }
  async save(forms) {
    this.notifi.presentLoading(40000);
    let obj = Object.assign({}, new Analyse(forms.name, forms.serviceAnalyse));

    console.log(obj);
    try {
      await this.analyseService.createAnalyse(obj);
      this.userForm.reset();
      this.notifi.dismissLoading();
      this.notifi.presentToast('successful save it!', 'success', 1500);
    } catch (error) {
      this.notifi.dismissLoading();
      this.notifi.presentToast(error.message, 'danger', 4000);
    }
  }

  async removeService(analyse) {
    this.notifi.presentLoading(40000);

    try {
      await this.analyseService.removeOneAnalyse(analyse);
      this.notifi.dismissLoading();
      this.notifi.presentToast('successful remove it!', 'primary', 1500);
    } catch (error) {
      this.notifi.dismissLoading();
      this.notifi.presentToast(error.message, 'danger', 4000);
    }
  }
  closeModal() {
    this.modal.dismiss();
  }
}
