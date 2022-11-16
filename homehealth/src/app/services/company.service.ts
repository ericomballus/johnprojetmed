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
import { RandomStorageService } from './random-storage.service';
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  company$ = new BehaviorSubject([]);
  constructor(
    private notifi: NotificationService,
    private random: RandomStorageService
  ) {}

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
      let ville = this.random.getVilleRecherche();
      const db = getFirestore();
      const colRef = collection(db, 'companies');
      const q = query(
        colRef,
        where('allAnalyseId', 'array-contains', analyseId),
        where('ville', '==', ville)
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
      let ville = this.random.getVilleRecherche();
      const db = getFirestore();
      const colRef = collection(db, 'companies');
      const q = query(
        colRef,
        where('allServiceListId', 'array-contains', serviceId),
        where('ville', '==', ville)
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

  getWhoSaleMedicament2(medicamentId): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      let ville = this.random.getVilleRecherche();
      const db = getFirestore();
      const colRef = collection(db, 'companies');
      const q = query(
        colRef,
        where('allMedicamentListId', 'array-contains', medicamentId),
        where('ville', '==', ville)
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
  async removeCompany(company: Company) {
    const db = getFirestore();
    return new Promise(async (resolve, reject) => {
      try {
        await deleteDoc(doc(db, 'companies', company.id));
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
}
