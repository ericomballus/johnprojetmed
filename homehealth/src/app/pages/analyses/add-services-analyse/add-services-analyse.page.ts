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
@Component({
  selector: 'app-add-services-analyse',
  templateUrl: './add-services-analyse.page.html',
  styleUrls: ['./add-services-analyse.page.scss'],
})
export class AddServicesAnalysePage implements OnInit {
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
    });
  }
  getAnalyseList() {
    this.analyseList$ = this.analyseService.getServiceAnalyse();
  }
  async save(forms) {
    this.notifi.presentLoading(40000);
    console.log(forms);
    try {
      await this.analyseService.createServices(forms);
      this.userForm.reset();
      this.notifi.dismissLoading();
      this.notifi.presentToast('successful save it!', 'success', 1500);
    } catch (error) {
      this.notifi.dismissLoading();
      this.notifi.presentToast(error.message, 'danger', 4000);
    }
  }

  async removeService(service) {
    this.notifi.presentLoading(40000);

    try {
      await this.analyseService.removeOneServices(service);
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
