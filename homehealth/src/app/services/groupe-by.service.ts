import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupeByService {
  constructor() {}

  groupResultatRecherhce(arr: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let arra = [];
      //  this.productResto2 = await data;

      let tab = arr.reduce((r, a) => {
        r[a.resultat[0].name] = [...(r[a.resultat[0].name] || []), a];
        return r;
      }, {});
      // this.arr = [];

      for (const property in tab) {
        arra.push(tab[property]);
      }
      console.log(arra);
      resolve(arra);
    });
  }
}
