import { User } from '../models/user';
import { ServiceSchema } from './serviceSchema';
import { MedicamentSchema } from './medicamentSchema';
import { Analyse } from './analyseSchema';
export class Company {
  adminId: string;
  name: string = '';
  email: string = '';
  telephone: string = '';
  ville: string = '';
  pays: string = '';
  quartier: string = '';
  logoURL: string = '';
  companyType: string = '';
  id: string = '';
  updateAt: any;
  createdAt: any;
  serviceList: ServiceSchema[] = [];
  medicamentList: MedicamentSchema[] = [];
  analyseList: Analyse[] = []; // pour les laboratoires
  allAnalyseId: string[] = [];
  allServiceListId: string[] = [];
  allMedicamentListId: string[] = [];

  constructor() {}

  addService(data: ServiceSchema) {
    this.serviceList.push(data);
  }

  removeService(name: string) {
    this.serviceList = this.serviceList.filter(
      (serviceName) => serviceName.name != name
    );
  }

  addMedicament(data: MedicamentSchema) {
    this.medicamentList.push(data);
  }

  removeMedicament(name: string) {
    this.medicamentList = this.medicamentList.filter(
      (serviceName) => serviceName.name != name
    );
  }
}
