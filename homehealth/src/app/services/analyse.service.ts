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
  startAfter,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Analyse } from '../models/analyseSchema';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root',
})
export class AnalyseService {
  analyseArr$ = new BehaviorSubject([]);
  serviceAnalyseArr$ = new BehaviorSubject([]);
  analyseArr2$ = new BehaviorSubject([]);
  lastVisible: any;
  constructor(private notifi: NotificationService) {}

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
    // this.notifi.presentLoading(15000);
    const db = getFirestore();

    const colRef = collection(db, 'analyses');
    const q = query(colRef);
    return new Promise((resolve, reject) => {
      if (this.lastVisible) {
        const first = query(
          collection(db, 'analyses'),
          orderBy('name'),
          startAfter(this.lastVisible),
          limit(25)
        );
        getDocs(first).then((snapshot) => {
          let tab = [];

          this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab);
          //  this.analyseArr$.next(tab);
        });
      } else {
        const first = query(
          collection(db, 'analyses'),
          orderBy('name'),
          limit(25)
        );
        getDocs(first).then((snapshot) => {
          let tab = [];

          this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab);
          // this.analyseArr$.next(tab);
        });
      }
    });

    //  return this.analyseArr$;
  }

  selectAllAnalyse(analyseList) {
    this.notifi.presentLoading(40000);
    const db = getFirestore();
    const colRef = collection(db, 'analyses');

    getDocs(colRef).then((snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      tab.forEach((elt) => {
        analyseList.forEach((analyse) => {
          if (elt.id === analyse['id']) {
            elt['isChecked'] = true;
          }
        });
      });
      this.notifi.dismissLoading();
      this.analyseArr2$.next(tab);
    });
    return this.analyseArr2$;
  }
  selectAllAnalyse2(analyseList) {
    const db = getFirestore();
    const colRef = collection(db, 'analyses');
    return new Promise((resolve, reject) => {
      getDocs(colRef).then((snapshot) => {
        let tab = [];
        snapshot.docs.forEach((doc) => {
          tab.push({ ...doc.data(), id: doc.id });
        });
        tab.forEach((elt) => {
          analyseList.forEach((analyse) => {
            if (elt.id === analyse['id']) {
              elt['isChecked'] = true;
            }
          });
        });

        resolve(tab);
      });
    });
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

  async updateAnalyses(id, data, update?) {
    if (update) {
      data['updateAt'] = update;
    }
    const db = getFirestore();
    const colRef = doc(db, 'analyses', id);
    data['updateAt'] = serverTimestamp();
    return new Promise(async (resolve, reject) => {
      try {
        await updateDoc(colRef, data);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }
}
