import { Injectable } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';
import { Company } from '../models/company';
import {
  getDocs,
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor() {}
  //first methode
  /* createCompany(company: Company) {
    const db = getFirestore();
    const colRef = collection(db, 'companies');
    return new Promise((resolve, reject) => {
      addDoc(colRef, Object.assign({}, company))
        .then(() => {
          resolve(company);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }*/
  // second methode
  createCompany(company: Company) {
    const db = getFirestore();
    const colRef = doc(db, 'companies', company.adminId);
    company.createdAt = serverTimestamp();
    company.updateAt = serverTimestamp();
    return new Promise(async (resolve, reject) => {
      try {
        await setDoc(colRef, Object.assign({}, company));
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllCompany(): Promise<Company[]> {
    const db = getFirestore();
    const colRef = collection(db, 'companies');
    const q = query(colRef, orderBy('name', 'asc'));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab = [];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  getCompanyQuery(queryName) {
    const db = getFirestore();
    const colRef = collection(db, 'companies');
    const q = query(colRef, where('companyType', '==', queryName));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab = [];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  updateCompany(adminId, data) {
    const db = getFirestore();
    const colRef = doc(db, 'companies', adminId);
    data['updateAt'] = serverTimestamp();
    return new Promise(async (resolve, reject) => {
      try {
        await updateDoc(colRef, data);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
}
