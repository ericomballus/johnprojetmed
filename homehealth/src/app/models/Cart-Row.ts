import { Company } from './company';
import { MedicamentSchema } from './medicamentSchema';

export class CartRow {
  totalPrice: number = 0;
  prix: number = 0;
  constructor(
    public medicament: MedicamentSchema,
    public company: Company,
    public quantity: number
  ) {
    this.prix = 0;
  }
}
