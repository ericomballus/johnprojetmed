import { Injectable } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';
import { CampagneSchema } from '../models/campaneSchema';
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
export class CampagneService {
  company$ = new BehaviorSubject([]);
  constructor(private notifi: NotificationService) {}

  createCampagne(camp) {
    const db = getFirestore();
    // const colRef = doc(db, 'campagne');
    const colRef = collection(db, 'campagne');
    camp.createdAt = serverTimestamp();
    camp.updateAt = serverTimestamp();
    return new Promise(async (resolve, reject) => {
      try {
        await addDoc(colRef, camp);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllCampagne(): Promise<CampagneSchema[]> {
    const db = getFirestore();
    const colRef = collection(db, 'campagne');
    const q = query(colRef);
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

  updateCampagne(key, data) {
    const db = getFirestore();
    const colRef = doc(db, 'campagne');
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

  async removeCamp(key) {
    const db = getFirestore();
    return new Promise(async (resolve, reject) => {
      try {
        await deleteDoc(doc(db, 'campagne', key));
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
}
