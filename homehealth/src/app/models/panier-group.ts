import { CartRow } from './Cart-Row';

export interface PanierGroup {
  name: string;
  medicament: CartRow[];
  totalPrice: number;
}
