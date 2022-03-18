import { Injectable } from '@angular/core';
import { Analyse } from '../models/analyseSchema';
import { Company } from '../models/company';
import { MedicamentSchema } from '../models/medicamentSchema';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RandomStorageService {
  isAdmin: boolean = false;
  isNewCompany: boolean = false;
  user: User;
  employeList: User[];
  serviceResponsables: User[];
  company: Company;
  content: any;
  admin: User;
  medicament: MedicamentSchema;
  userservice: any;
  userAnalyse: any;
  data: any;
  constructor() {}

  setIsAdmin(value: boolean) {
    this.isAdmin = value;
  }

  checkIfIsAdmin() {
    return this.isAdmin;
  }

  setIsNewCompany(value: boolean) {
    this.isNewCompany = value;
  }

  checkIfIsNewCompany() {
    return this.isNewCompany;
  }

  setUser(user: User) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  setCompany(company: Company) {
    this.company = company;
  }
  getCompany() {
    return this.company;
  }
  setContent(content) {
    this.content = content;
  }
  getContent() {
    return this.content;
  }
  setAdmin(user: User) {
    this.admin = user;
  }
  getAdmin() {
    if (!this.admin) {
      return null;
    }
    return this.admin;
  }

  setMedicament(medicament: MedicamentSchema) {
    this.medicament = medicament;
  }
  getMedicament() {
    if (!this.medicament) {
      return null;
    }
    return this.medicament;
  }

  setUserService(service) {
    this.userservice = service;
  }
  getUserService() {
    if (!this.userservice) {
      return null;
    }
    return this.userservice;
  }

  setUserAnalyse(analyse) {
    this.userAnalyse = analyse;
  }
  getUserAnalyse() {
    if (!this.userAnalyse) {
      return null;
    }
    return this.userAnalyse;
  }

  setData(data) {
    this.data = data;
  }
  getData() {
    if (this.data) {
      return this.data;
    } else {
      return null;
    }
  }

  setEmployeList(list: User[]) {
    this.employeList = list;
  }
  getEmployeList(): User[] {
    return this.employeList;
  }

  setResponsable(list: User[]) {
    this.employeList = list;
  }
  getResponsableList(): User[] {
    return this.employeList;
  }
}
