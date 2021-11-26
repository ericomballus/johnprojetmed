import { Injectable } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';
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
  onSnapshot,
} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ManageService {
  serviceList = new BehaviorSubject([]);
  constructor() {
    this.getAllServices();
  }

  createServices(data) {
    console.log(data);

    const db = getFirestore();
    const colRef = collection(db, 'services');
    data['createdAt'] = serverTimestamp();
    data['updateAt'] = serverTimestamp();
    return new Promise(async (resolve, reject) => {
      try {
        await addDoc(colRef, data);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
  getAllServices() {
    const db = getFirestore();
    const colRef = collection(db, 'services');
    onSnapshot(colRef, (snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      return this.serviceList.next(tab);
    });
  }

  getServicesByCompanyType(company_type: string) {
    const db = getFirestore();
    const colRef = collection(db, 'services');
    const q = query(colRef, where('companyType', '==', company_type));
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
  getData() {
    return this.serviceList.pipe(map((i) => i));
  }

  async removeOneServices(service) {
    const db = getFirestore();
    const colRef = collection(db, 'services');
    await deleteDoc(doc(db, 'services', service.id));
  }
}
