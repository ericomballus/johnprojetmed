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
  getDoc,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from '../models/company';
import { User } from '../models/user';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class CommandesService {
  commandeList = new BehaviorSubject([]);
  userCommandeList$ = new BehaviorSubject([]);
  constructor() {}

  postCommande(data) {
    console.log(data);
    const db = getFirestore();
    const colRef = collection(db, 'commandes');
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

  companyGetCommandeList(companyId) {
    const db = getFirestore();
    const colRef = collection(db, 'commandes');
    const q = query(colRef, where('companyId', '==', companyId));
    // return new Promise((resolve, reject) => {
    getDocs(q)
      .then((snapshot) => {
        let tab = [];
        snapshot.docs.forEach(async (doc) => {
          // tab.push({ ...doc.data(), id: doc.id });

          if (doc.data().customerId) {
            let user = await this.getUser(doc.data().customerId);
            let data = { ...doc.data(), id: doc.id };
            data['customer'] = user[0];
            tab.push(data);
          }
        });
        this.userCommandeList$.next(tab);
        // resolve(tab);
      })
      .catch((e) => {
        // reject(e);
      });
    return this.userCommandeList$;
  }

  userGetCommandeList(userId): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const db = getFirestore();
      const colRef = collection(db, 'commandes');
      const q = query(colRef, where('customerId', '==', userId));
      // return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab = [];
          snapshot.docs.forEach(async (doc) => {
            // tab.push({ ...doc.data(), id: doc.id });
            let company = await this.getCompany(doc.data().companyId);
            let data = { ...doc.data(), id: doc.id };
            data['company'] = company[0];
            tab.push(data);
            if (tab.length == snapshot.docs.length) {
              console.log(tab);

              resolve(tab);
            }
          });
          // this.userCommandeList$.next(tab);
        })
        .catch((e) => {
          reject(e);
        });
    });

    // return this.userCommandeList$;
    // });
  }

  async updateCommande(id, data) {
    console.log(data);

    const db = getFirestore();
    const colRef = doc(db, 'commandes', id);
    data['updateAt'] = serverTimestamp();
    return new Promise(async (resolve, reject) => {
      try {
        let res = await updateDoc(colRef, data);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCompany(id): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      const db = getFirestore();
      const docRef = doc(db, 'companies', id);
      //  const ref= firebase.firestore().collection("companies")
      getDoc(docRef).then((doc) => {
        let tab = [];
        /* snapshot.docs.forEach((doc) => {
          tab.push({ ...doc.data(), id: doc.id });
        });*/
        console.log(doc.data());

        tab.push({ ...doc.data(), id: doc.id });
        resolve(tab);
      });
    });
  }

  getUser(id): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const db = getFirestore();
      const docRef = doc(db, 'users', id);

      getDoc(docRef).then((doc) => {
        let tab = [];

        console.log(doc.data());

        tab.push({ ...doc.data(), id: doc.id });
        resolve(tab);
      });
    });
  }
}
