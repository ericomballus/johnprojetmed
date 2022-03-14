import { CartLabo } from './Labo-Cart';

export interface PanierLaboGroup {
  name: string;
  analyses: CartLabo[];
  totalPrice: number;
  rendezVous?: { jour: '00/00/0000'; heure: '00' };
}
