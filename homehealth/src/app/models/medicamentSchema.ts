import { serverTimestamp } from 'firebase/firestore';

export class MedicamentSchema {
  name: string;
  madeBy: string;
  purchasingPrice: number = 0;
  sellingPrice: number = 0;
  avaible: boolean = false;
  quantity: number = 0;
  createdAt: number;
  updateAt: any;
  id: string;
  categorie: string;
  users: string[];
  isChecked: boolean;
  grammage: string;
  unity: string;
  size: number;
  typeMedicament: string; //solid, liquide, sirop, gelule
  constructor(name, madeBy, categorie, size, unity, typeMedicament) {
    this.name = name;
    this.madeBy = madeBy;
    this.createdAt = new Date().getTime();
    this.updateAt = serverTimestamp();
    this.categorie = categorie;
    this.users = [];
    this.size = size;
    this.unity = unity;
    this.typeMedicament = typeMedicament;
  }

  buildGrammage() {
    this.grammage = this.size + this.unity;
    [];
  }
}
