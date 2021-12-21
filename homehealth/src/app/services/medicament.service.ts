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
import { Company } from '../models/company';
import { MedicamentSchema } from '../models/medicamentSchema';

@Injectable({
  providedIn: 'root',
})
export class MedicamentService {
  medicamentList$ = new BehaviorSubject([]);
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

  getAllNotRealtimeMedoc(companyId?: string): Promise<MedicamentSchema[]> {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
    const q = query(colRef, orderBy('updateAt', 'desc'), limit(100));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab = [];
          snapshot.docs.forEach((doc) => {
            let isChecked = false;
            if (companyId) {
              let obj = doc.data();

              if (obj['users'].includes(companyId)) {
                // console.log('je suis la');

                isChecked = true;
              } else {
                // console.log('impossible');
                isChecked = false;
              }
            }

            tab.push({ ...doc.data(), id: doc.id, isChecked: isChecked });
          });
          resolve(tab);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getCompanyMedicament(companyId: string): Promise<MedicamentSchema[]> {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
    const q = query(
      colRef,
      where('users', 'array-contains', companyId),
      limit(1000)
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
  async updateMedicament(id, data) {
    console.log(data);

    const db = getFirestore();
    const colRef = doc(db, 'medicament', id);
    data['updateAt'] = serverTimestamp();
    return new Promise(async (resolve, reject) => {
      try {
        await updateDoc(colRef, 'users', data);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  async removeOneMedoc(medoc) {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
    await deleteDoc(doc(db, 'medicament', medoc.id));
  }

  // categorie

  postCategorie(categorie) {
    const db = getFirestore();
    const colRef = collection(db, 'medicament-categorie');
    categorie['createdAt'] = new Date().getTime();
    categorie['updateAt'] = serverTimestamp();
    return new Promise(async (resolve, reject) => {
      try {
        await addDoc(colRef, categorie);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllNotRealtimeCategory(): Promise<any[]> {
    const db = getFirestore();
    const colRef = collection(db, 'medicament-categorie');
    const q = query(colRef, orderBy('updateAt', 'desc'));
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

  getAllNotRealtimeMedicament() {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
    const q = query(colRef, orderBy('updateAt', 'desc'));
    getDocs(q).then((snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      this.medicamentList$.next(tab);
    });

    return this.medicamentList$;
  }

  async removeCategory(categorie) {
    const db = getFirestore();
    // const colRef = collection(db, 'medicament-categorie');
    await deleteDoc(doc(db, 'medicament-categorie', categorie.id));
  }
}
