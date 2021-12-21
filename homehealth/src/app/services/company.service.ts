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
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  company$ = new BehaviorSubject([]);
  constructor(private notifi: NotificationService) {}

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
    data['updateAt'] = Date.now();
    console.log(data);

    return new Promise(async (resolve, reject) => {
      try {
        await updateDoc(colRef, data);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
  getAdminCompany(employe: User) {
    const db = getFirestore();
    const colRef = collection(db, 'companies');

    const q = query(colRef, where('adminId', '==', employe.uid));
    getDocs(q).then((snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      this.company$.next(tab);
    });
    return this.company$;
  }

  getWhoMakesAnalyse(analyseId): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      const db = getFirestore();
      const colRef = collection(db, 'companies');
      const q = query(
        colRef,
        where('allAnalyseId', 'array-contains', analyseId)
      );
      getDocs(q).then((snapshot) => {
        let tab = [];
        snapshot.docs.forEach((doc) => {
          tab.push({ ...doc.data(), id: doc.id });
        });
        resolve(tab);
      });
    });
  }

  getWhoMakesService(serviceId): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      const db = getFirestore();
      const colRef = collection(db, 'companies');
      const q = query(
        colRef,
        where('allServiceListId', 'array-contains', serviceId)
      );
      getDocs(q).then((snapshot) => {
        let tab = [];
        snapshot.docs.forEach((doc) => {
          tab.push({ ...doc.data(), id: doc.id });
        });
        resolve(tab);
      });
    });
  }

  getWhoSaleMedicament(medicamentId): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      const db = getFirestore();
      const colRef = collection(db, 'companies');
      const q = query(
        colRef,
        where('allMedicamentListId', 'array-contains', medicamentId)
      );
      getDocs(q).then((snapshot) => {
        let tab = [];
        snapshot.docs.forEach((doc) => {
          tab.push({ ...doc.data(), id: doc.id });
        });
        resolve(tab);
      });
    });
  }
}
