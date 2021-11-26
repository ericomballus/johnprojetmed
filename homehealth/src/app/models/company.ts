import { User } from '../models/user';
import { ServiceSchema } from './serviceschema';
import { MedicamentSchema } from './medicamentSchema';
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
