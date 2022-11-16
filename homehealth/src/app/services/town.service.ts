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
export class TownService {
  villeList = new BehaviorSubject([]);
  constructor() {}

  postVille(data) {
    const db = getFirestore();
    const colRef = collection(db, 'villes');
    let ville = { name: data };
    return new Promise(async (resolve, reject) => {
      try {
        await addDoc(colRef, ville);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
  getAllVilles() {
    const db = getFirestore();
    const colRef = collection(db, 'villes');
    onSnapshot(colRef, (snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      return this.villeList.next(tab);
    });
  }

  getAllNotRealtimeVille() {
    const db = getFirestore();
    const colRef = collection(db, 'villes');
    const q = query(colRef, orderBy('name', 'desc'), limit(100));
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

  getVilleByName(ville) {
    const db = getFirestore();
    const colRef = collection(db, 'villes');
    const q = query(colRef, where('name', '==', ville.name));
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

  async removeOneVille(key) {
    const db = getFirestore();
    const colRef = collection(db, 'villes');
    await deleteDoc(doc(db, 'villes', key));
  }
}
