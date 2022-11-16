import { Injectable } from '@angular/core';
import { Analyse } from '../models/analyseSchema';
import { Company } from '../models/company';
import { CartLabo } from '../models/Labo-Cart';
import { PanierGroup } from '../models/panier-group';
import { PanierLaboGroup } from '../models/panier-labo-group';

@Injectable({
  providedIn: 'root',
})
export class CartLaboService {
  constructor() {}
  rows: CartLabo[] = [];
  groupArr: any[] = [];

  add(analyse: Analyse, company: Company) {
    const found = this.rows.find(
      (row) => row.analyse.id == analyse.id && row.company.id == company.id
    );
    if (found) {
      found.quantity++;
      // found.totaPrice = found.totaPrice + parseInt(medicament.sellingPrice);
      if (parseInt(analyse.price)) {
        found.totalPrice = found.totalPrice + parseInt(analyse.price);
      }
    } else {
      // found.totaPrice = found.totaPrice + parseInt(medicament.sellingPrice);
      let f = company.analyseList.find((ana) => ana.id == analyse.id);

      this.rows.push(new CartLabo(f, company, 1));
    }
  }

  remove(row: CartLabo) {
    this.rows = this.rows.filter((r) => r !== row);
  }

  cleanCart() {
    this.rows = [];
  }

  removeOne(row: CartLabo) {
    console.log(row);

    const found = this.rows.find(
      (r) => r.analyse.id == row.analyse.id && r.company.id == row.company.id
    );
    if (found) {
      found.quantity--;
      // found.totaPrice = found.totaPrice - parseInt(row.medicament.sellingPrice);
      found.totalPrice = found.totalPrice - parseInt(row.analyse.price);
    }
    if (found && found.quantity == 0) {
      this.rows = this.rows.filter((r) => r !== row);
    }
  }
  getCartRow(): PanierLaboGroup[] {
    let objRandom = {};
    let totalPrice = 0;
    this.rows.forEach((row) => {
      console.log('row details ===>', row);

      if (!objRandom[row.company.name]) {
        let tab: CartLabo[] = [];
        tab.push(row);
        objRandom[row.company.name] = { query: tab, company: row.company };
      } else {
        objRandom[row.company.name].query.push(row);
      }
    });
    let tab: PanierLaboGroup[] = [];
    for (const key in objRandom) {
      let resutlt = {
        name: objRandom[key]['company']['name'],
        analyses: objRandom[key]['query'],
        totalPrice: 1,
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
      price = price + row.quantity * parseInt(row.analyse.price);
    });
    return price;
  }

  totalPriceByCompany(): number {
    let price = 0;
    this.rows.forEach((row) => {
      price = price + row.quantity * parseInt(row.analyse.price);
    });
    return price;
  }
}
