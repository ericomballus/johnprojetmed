import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RandomStorageService {
  isAdmin: boolean = false;
  isNewCompany: boolean = false;
  user: User;
  company: Company;
  content: any;
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
}
