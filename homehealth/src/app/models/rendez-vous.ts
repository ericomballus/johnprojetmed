import { User } from './user';

export interface RendezVous {
  patient: User;
  date: string;
  status: number; //if 0 en attente, if 1 rendez vous reussi, if 2 rendez vous annulé
}
