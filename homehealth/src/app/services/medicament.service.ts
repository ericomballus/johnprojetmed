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
import { MedicamentSchema } from '../models/medicamentSchema';

@Injectable({
  providedIn: 'root',
})
export class MedicamentService {
  constructor() {}

  postMedoc(data: MedicamentSchema) {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
    let medoc = Object.assign({}, data);
    return new Promise(async (resolve, reject) => {
      try {
        await addDoc(colRef, medoc);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllAdvices() {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
    const q = query(colRef, orderBy('updateAt', 'desc'), limit(100));
    onSnapshot(q, (snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      return tab;
    });
  }

  getAllNotRealtimeMedoc(): Promise<MedicamentSchema[]> {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
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

  async removeOneMedoc(medoc) {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
    await deleteDoc(doc(db, 'medicament', medoc.id));
  }
}
