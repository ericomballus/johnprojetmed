import { RendezVous } from './rendez-vous';

export interface ServiceSchema {
  name: string;
  price: string;
  responsable: string;
  responsableEmail: string;
  responsablePhone: number;
  rendezVous: RendezVous;
  id: string;
}
