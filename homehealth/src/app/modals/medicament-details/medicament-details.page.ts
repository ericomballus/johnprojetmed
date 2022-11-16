import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';
import { CacheService } from 'src/app/services/cache.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-medicament-details',
  templateUrl: './medicament-details.page.html',
  styleUrls: ['./medicament-details.page.scss'],
})
export class MedicamentDetailsPage implements OnInit {
  medoc: MedicamentSchema;
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
    private cache: CacheService,
    private fb: FormBuilder,
    private medic: MedicamentService,
    private notif: NotificationService
  ) {}

  ngOnInit() {
    this.medoc = this.cache.getMedoc();
    console.log(this.medoc);
    this.getAllCategory();
    this.initFrom();
  }
  closeModal() {
    this.modal.dismiss();
  }

  initFrom() {
    this.medicamentForm = this.fb.group({
      name: new FormControl(
        this.medoc.name,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
          Validators.maxLength(100),
        ])
      ),
      madeBy: new FormControl(
        this.medoc.madeBy,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
          Validators.maxLength(100),
        ])
      ),
      categorie: new FormControl(
        this.medoc.categorie,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
          Validators.maxLength(100),
        ])
      ),
      unity: new FormControl(
        this.medoc.unity,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-].*[s]*$'),
          Validators.maxLength(100),
        ])
      ),
      size: new FormControl(
        this.medoc.size,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9].*[s]*$'),
          Validators.maxLength(10),
        ])
      ),
      typeMedicament: new FormControl(
        this.medoc.typeMedicament,
        Validators.compose([
          Validators.required,
          // Validators.pattern('^[0-9].*[s]*$'),
          Validators.maxLength(10),
        ])
      ),
    });
  }
  Update(forms: MedicamentSchema) {
    this.medoc.name = forms.name;
    this.medoc.madeBy = forms.madeBy;
    this.medoc.categorie = forms.categorie;
    this.medoc.size = forms.size;
    this.medoc.unity = forms.unity;
    this.medoc.typeMedicament = forms.typeMedicament;
    this.cache.setMedoc(this.medoc);

    this.notif.presentLoading(40000);
    this.medic
      .updateMedicament(this.medoc.id, this.medoc)
      .then(() => {
        this.notif.dismissLoading();
        this.medicamentForm.reset();
        this.closeModal();
        this.notif.presentToast(
          `${this.medoc.name} enregistré avec succés!!!`,
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
