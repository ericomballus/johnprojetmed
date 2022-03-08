import { Injectable, NgZone } from '@angular/core';
import { Auth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { User } from '../models/user';
import { Data, Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
//import * as firebase from 'firebase/app';

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
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  analyseArr$ = new BehaviorSubject([]);
  serviceAnalyseArr$ = new BehaviorSubject([]);
  users$ = new BehaviorSubject([]);
  employesList: User[] = [];
  constructor() {}

  getUser(uid: string): Promise<User> {
    const db = getFirestore();
    const colRef = collection(db, 'users');
    const q = query(colRef, where('uid', '==', uid));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab = [];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  updateUser(user: any, service) {
    const db = getFirestore();
    const colRef = doc(db, 'users', user.uid);
    console.log('to update ', service);

    return new Promise(async (resolve, reject) => {
      try {
        let res = await updateDoc(colRef, {
          photoURL: user.displayName,
          serviceList: service,
        });
        console.log('update res', res);

        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  getListEmployees(adminId: string) {
    const db = getFirestore();
    const colRef = collection(db, 'users');
    const q = query(
      colRef,
      where('adminId', '==', adminId),
      where('roles', 'array-contains', 3)
    );
    //this.getEmployees(adminId);
    // return new Promise((resolve, reject) => {
    getDocs(q).then((snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      this.users$.next(tab);
    });
    return this.users$;
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
