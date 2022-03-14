import { Analyse } from './analyseSchema';
import { Company } from './company';

export class CartLabo {
  totalPrice: number = 0;
  prix: number = 0;
  constructor(
    public analyse: Analyse,
    public company: Company,
    public quantity: number
  ) {
    this.prix = this.quantity * parseInt(this.analyse.price);
    this.totalPrice = this.prix;
  }
}
