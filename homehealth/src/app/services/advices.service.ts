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
  orderBy,
  limit,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AdvicesService {
  advicesList = new BehaviorSubject([]);
  constructor() {}

  postAdvice(data) {
    const db = getFirestore();
    const colRef = collection(db, 'advices');
    data['createdAt'] = new Date().getTime();
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
  getAllAdvices() {
    const db = getFirestore();
    const colRef = collection(db, 'advices');
    onSnapshot(colRef, (snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      return this.advicesList.next(tab);
    });
  }

  getAllNotRealtimeAdvice() {
    const db = getFirestore();
    const colRef = collection(db, 'advices');
    const q = query(colRef, orderBy('updateAt', 'desc'), limit(100));
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

  getAdviceByCategorie(categorie) {
    const db = getFirestore();
    const colRef = collection(db, 'advices');
    const q = query(
      colRef,
      where('category', '==', categorie)
      // orderBy('updateAt', 'desc'),
      // limit(100)
    );
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
    return this.advicesList.pipe(map((i) => i));
  }

  async removeOneAdvices(advice) {
    const db = getFirestore();
    const colRef = collection(db, 'advices');
    await deleteDoc(doc(db, 'advices', advice.id));
  }

  postAdviceCategory(data) {
    const db = getFirestore();
    const colRef = collection(db, 'advices-category');
    data['createdAt'] = new Date().getTime();
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

  getAllNotRealtimeAdviceCategory(): Promise<any[]> {
    const db = getFirestore();
    const colRef = collection(db, 'advices-category');
    const q = query(colRef, orderBy('name'));
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
          console.log(e);

          reject(e);
        });
    });
  }

  async removeOneAdvicesCategory(advice) {
    const db = getFirestore();
    const colRef = collection(db, 'advices-category');
    await deleteDoc(doc(db, 'advices-category', advice.id));
  }
}
