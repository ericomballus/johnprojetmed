import { User } from '../models/user';
import { ServiceSchema } from './serviceSchema';
import { MedicamentSchema } from './medicamentSchema';
import { RendezVous } from './rendez-vous';
export class Docteur {
  uid: string = '';
  updateAt: any;
  createdAt: any;
  serviceList: ServiceSchema[] = [];
  companyList: string[] = [];
  adminIdList: string[] = [];
  rendezVousList: RendezVous[] = [];

  constructor() {}

  addService(data: ServiceSchema) {
    this.serviceList.push(data);
  }
  addRendezVous(data: RendezVous) {
    this.rendezVousList.push(data);
  }

  addCompany(data: string) {
    this.companyList.push(data);
  }
  addAdminId(data: string) {
    this.adminIdList.push(data);
  }

  removeService(name: string) {
    this.serviceList = this.serviceList.filter(
      (serviceName) => serviceName.name != name
    );
  }
}
