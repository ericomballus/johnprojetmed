import { RendezVous } from './rendez-vous';
import { User } from './user';

export interface ServiceSchema {
  name: string;
  price: string;
  priceHome: string;
  priceHospitalization: string;
  consultationTime: string;
  responsable: string;
  responsableEmail: string;
  responsablePhone: number;
  responsableUid: string;
  rendezVous: RendezVous;
  id: string;
  isChecked: boolean;
  serviceResponsable: User[];
}
