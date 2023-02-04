import { serverTimestamp } from 'firebase/firestore';

export class MedicamentSchema {
  name: string;
  madeBy: string;
  purchasingPrice: number = 0;
  sellingPrice: string = '0';
  commercialName: string = '';
  dosageForm: string = '';
  conditioning: string = '';
  activeIngredient: string = '';
  avaible: boolean = false;
  quantity: string = '0';
  equivalent: string[] = [];
  createdAt: number;
  updateAt: any;
  id: string;
  categorie: string;
  users: string[];
  isChecked: boolean;
  grammage: string;
  unity: string;
  size: number;
  Conditionnement: string;
  typeMedicament: string; //solid, liquide, sirop, gelule
  display: boolean = false;
  Classemedicament: string;
  FormDosage: string;
  PrincipeActif: string;
  constructor(
    name,
    madeBy,
    categorie,
    size,
    unity,
    typeMedicament,
    Conditionnement,
    Classemedicament,
    FormDosage,
    PrincipeActif
  ) {
    this.name = name;
    this.madeBy = madeBy;
    this.createdAt = new Date().getTime();
    this.updateAt = serverTimestamp();
    this.categorie = categorie;
    this.users = [];
    this.size = size;
    this.unity = unity;
    this.typeMedicament = typeMedicament;
    this.Conditionnement = Conditionnement;
    this.Classemedicament = Classemedicament;
    this.FormDosage = FormDosage;
    this.PrincipeActif = PrincipeActif;
  }

  buildGrammage() {
    this.grammage = this.size + this.unity;
    [];
  }
}
