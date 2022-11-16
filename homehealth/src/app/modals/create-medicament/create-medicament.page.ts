import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-medicament',
  templateUrl: './create-medicament.page.html',
  styleUrls: ['./create-medicament.page.scss'],
})
export class CreateMedicamentPage implements OnInit {
  // company: Company;
  medicamentForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  CategoryList: any[] = [];
  unitList: any[] = ['l', 'dl', 'cl', 'ml', 'kg', 'g', 'mg'];
  typeList: any[] = ['comprimé', 'sirop', 'gélule'];
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
    madeBy: [
      {
        type: 'required',
        message: 'Fournir le nom du fabriquant.',
      },
      {
        type: 'pattern',
        message: 'fabriquant is not valid.',
      },
    ],
    categorie: [
      {
        type: 'required',
        message: 'Fournir categorie du medicament.',
      },
      {
        type: 'pattern',
        message: 'categorie is not valid.',
      },
    ],
    size: [
      {
        type: 'required',
        message: 'fournir la taille du medicament.',
      },
      {
        type: 'pattern',
        message: 'la taille n es pas valide, maximum 10 caractéres.',
      },
    ],
  };
  constructor(
    private modal: ModalController,
    private fb: FormBuilder,
    private medic: MedicamentService,
    private notif: NotificationService
  ) {}

  ngOnInit() {
    this.getAllCategory();
    this.initFrom();
  }
  closeModal() {
    this.modal.dismiss();
  }
  initFrom() {
    this.medicamentForm = this.fb.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
          Validators.maxLength(100),
        ])
      ),
      madeBy: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
          Validators.maxLength(100),
        ])
      ),
      categorie: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
          Validators.maxLength(100),
        ])
      ),
      unity: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
          Validators.maxLength(100),
        ])
      ),
      size: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9].*[s]*$'),
          Validators.maxLength(10),
        ])
      ),
      typeMedicament: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('^[0-9].*[s]*$'),
          Validators.maxLength(10),
        ])
      ),
    });
  }
  save(forms: MedicamentSchema) {
    let medoc = new MedicamentSchema(
      forms.name,
      forms.madeBy,
      forms.categorie,
      forms.size,
      forms.unity,
      forms.typeMedicament
    );
    //
    medoc.buildGrammage();
    this.notif.presentLoading(40000);
    this.medic
      .postMedoc(medoc)
      .then(() => {
        this.notif.dismissLoading();
        this.medicamentForm.reset();
        this.notif.presentToast(
          `${medoc.name} enregistré avec succés!!!`,
          'success',
          3500
        );
      })
      .catch((err) => {});
  }

  getAllCategory() {
    this.medic.getAllNotRealtimeCategory().then((data: any[]) => {
      this.CategoryList = data;
    });
  }
}
