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
  startAfter,
} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root',
})
export class ManageService {
  serviceList$ = new BehaviorSubject([]);
  serviceList1$ = new BehaviorSubject([]);
  lastVisible: any;
  constructor(private notifi: NotificationService) {}

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
    getDocs(colRef).then((snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      this.serviceList$.next(tab);
      this.getAllRealTimeService();
    });
    return this.serviceList$;
  }

  getAll() {
    const db = getFirestore();
    const colRef = collection(db, 'services');
    return new Promise((resolve, reject) => {
      getDocs(colRef).then((snapshot) => {
        let tab = [];
        snapshot.docs.forEach((doc) => {
          tab.push({ ...doc.data(), id: doc.id });
        });
        resolve(tab);
      });
    });
  }

  getService() {
    // this.notifi.presentLoading(15000);
    const db = getFirestore();
    const colRef = collection(db, 'services');
    const q = query(colRef);
    return new Promise((resolve, reject) => {
      if (this.lastVisible) {
        const first = query(
          collection(db, 'services'),
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
          collection(db, 'services'),
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

  selectAllServices(serviceList) {
    this.notifi.presentLoading(15000);
    const db = getFirestore();
    const colRef = collection(db, 'services');

    getDocs(colRef).then((snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      tab.forEach((elt) => {
        serviceList.forEach((serv) => {
          if (elt.id === serv['id']) {
            elt['isChecked'] = true;
            console.log('hello', elt);
          }
        });
      });
      this.notifi.dismissLoading();
      this.serviceList1$.next(tab);
    });
    return this.serviceList1$;
  }

  getAllRealTimeService() {
    const db = getFirestore();
    const colRef = collection(db, 'services');
    onSnapshot(colRef, (snapshot) => {
      let tab = [];
      snapshot.docs.forEach((doc) => {
        tab.push({ ...doc.data(), id: doc.id });
      });
      this.serviceList$.next(tab);
    });
    return this.serviceList$;
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

  async removeOneServices(service) {
    const db = getFirestore();
    const colRef = collection(db, 'services');
    await deleteDoc(doc(db, 'services', service.id));
  }
}
