import { Injectable } from '@angular/core';
import {
  serverTimestamp,
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
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Analyse } from '../models/analyseSchema';
@Injectable({
  providedIn: 'root',
})
export class AnalyseService {
  analyseArr$ = new BehaviorSubject([]);
  serviceAnalyseArr$ = new BehaviorSubject([]);
  constructor() {}

  getServiceAnalyse() {
    const db = getFirestore();

    const colRef = collection(db, 'serviceAnalyse');
    const q = query(colRef);
    onSnapshot(q, (snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });

      this.serviceAnalyseArr$.next(tab);
    });
    return this.serviceAnalyseArr$;
  }

  createServices(data) {
    const db = getFirestore();
    const colRef = collection(db, 'serviceAnalyse');
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
  async removeOneServices(service) {
    const db = getFirestore();
    //const colRef = collection(db, 'analyses');
    return new Promise(async (resolve, reject) => {
      try {
        await deleteDoc(doc(db, 'serviceAnalyse', service.id));
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
  createAnalyse(data) {
    const db = getFirestore();
    const colRef = collection(db, 'analyses');
    return new Promise(async (resolve, reject) => {
      try {
        await addDoc(colRef, data);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
  getAnalyse() {
    const db = getFirestore();

    const colRef = collection(db, 'analyses');
    const q = query(colRef);
    onSnapshot(q, (snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });

      this.analyseArr$.next(tab);
    });
    return this.analyseArr$;
  }

  async removeOneAnalyse(analyse) {
    const db = getFirestore();
    return new Promise(async (resolve, reject) => {
      try {
        await deleteDoc(doc(db, 'analyses', analyse.id));
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
}
