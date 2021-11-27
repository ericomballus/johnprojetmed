import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MedicamentService } from 'src/app/services/medicament.service';

@Component({
  selector: 'app-create-medocs-categorie',
  templateUrl: './create-medocs-categorie.page.html',
  styleUrls: ['./create-medocs-categorie.page.scss'],
})
export class CreateMedocsCategoriePage implements OnInit {
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
    private modal: ModalController,
    private fb: FormBuilder,
    private medicamentService: MedicamentService
  ) {}

  ngOnInit() {
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
  closeModal() {
    this.modal.dismiss();
  }

  async save(forms: FormGroup) {
    await this.medicamentService.postCategorie(forms.value);
    this.userForm.reset();
    this.getAllCategory();
  }
  getAllCategory() {
    this.medicamentService.getAllNotRealtimeCategory().then((data: any[]) => {
      this.items = data;
      console.log(this.items);
    });
  }
  async removeCategoryName(category) {
    try {
      await this.medicamentService.removeCategory(category);
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
