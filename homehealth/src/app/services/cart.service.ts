import { Injectable } from '@angular/core';
import { CartRow } from '../models/Cart-Row';
import { Company } from '../models/company';
import { MedicamentSchema } from '../models/medicamentSchema';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  rows: CartRow[] = [];
  groupArr: any[] = [];
  constructor() {}

  add(medicament: MedicamentSchema, company: Company) {
    const found = this.rows.find(
      (row) =>
        row.medicament.id == medicament.id && row.company.id == company.id
    );
    if (found) {
      found.quantity++;
      // found.totaPrice = found.totaPrice + parseInt(medicament.sellingPrice);
    } else {
      // found.totaPrice = found.totaPrice + parseInt(medicament.sellingPrice);
      this.rows.push(new CartRow(medicament, company, 1));
    }
  }

  remove(row: CartRow) {
    this.rows = this.rows.filter((r) => r !== row);
  }

  cleanCart() {
    this.rows = [];
  }

  removeOne(row: CartRow) {
    const found = this.rows.find(
      (r) =>
        r.medicament.id == row.medicament.id && r.company.id == row.company.id
    );
    if (found) {
      found.quantity--;
      // found.totaPrice = found.totaPrice - parseInt(row.medicament.sellingPrice);
    }
    if (found && found.quantity == 0) {
      this.rows = this.rows.filter((r) => r !== row);
    }
  }
  getCartRow() {
    let objRandom = {};
    this.rows.forEach((row) => {
      if (!objRandom[row.company.name]) {
        let tab = [];
        tab.push(row);
        objRandom[row.company.name] = { medicament: tab, company: row.company };
      } else {
        objRandom[row.company.name].medicament.push(row);
      }
    });
    let tab = [];
    for (const key in objRandom) {
      let resutlt = {
        name: objRandom[key]['company']['name'],
        medicament: objRandom[key]['medicament'],
      };
      tab.push(resutlt);
    }
    this.groupArr = tab;
    return tab;
  }

  total(): number {
    let nbr = 0;
    this.rows.forEach((row) => {
      nbr = nbr + row.quantity;
    });
    return nbr;
  }

  totalPrice(): number {
    let price = 0;
    this.rows.forEach((row) => {
      console.log(row);
      console.log(parseInt(row.medicament.sellingPrice));

      price = price + row.quantity * parseInt(row.medicament.sellingPrice);
    });
    return price;
  }

  totalPriceByCompany(): number {
    let price = 0;
    this.rows.forEach((row) => {
      console.log(row);
      console.log(parseInt(row.medicament.sellingPrice));

      price = price + row.quantity * parseInt(row.medicament.sellingPrice);
    });
    return price;
  }
}
