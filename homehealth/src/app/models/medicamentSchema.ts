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
  constructor(name, madeBy) {
    this.name = name;
    this.madeBy = madeBy;
    this.createdAt = new Date().getTime();
    this.updateAt = serverTimestamp();
  }
}
