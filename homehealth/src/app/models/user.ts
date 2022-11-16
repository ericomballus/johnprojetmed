import { workDay } from './workDay';
export interface User {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  name: string;
  photoURL: string;
  emailVerified: boolean;
  lastLoginAt: any;
  createdAt: string;
  password: string;
  isCompany: boolean;
  roles: number[]; //1= homehealth; 2 =companyAdmin; 3= userCompany; 4= simple user
  adminId?: string;
  achatList?: any[]; //tableau qui contient la liste des achats effectué en pharmacie
  analyseList?: any[]; // tableau des analyses effectué
  consultationList?: any[]; // tableau des consultation
  serviceList?: any[]; // tableau des service ou il es responsable
  isChecked: boolean;
  telephone: string;
  isOnline: boolean;
  schedule?: workDay[];
  display_schedule?: boolean; //tableau qui contient la liste des achats effectué en pharmacie
}
/**/
