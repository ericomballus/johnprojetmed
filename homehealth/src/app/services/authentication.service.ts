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
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: firebase.User;
  utilisateur: firebase.User;
  auth: Auth = getAuth();
  user: any;
  private userRole = new BehaviorSubject([]);
  constructor(
    public router: Router,
    private ngZone: NgZone,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      onAuthStateChanged(this.auth, (user) => {
        console.log(user);

        this.user = user;
      });
    });
  }

  // Login in with email/password
  SignIn(email, password) {
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  RegisterUser(email, password) {
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email, password);
  }
  // Email verification when new user register
  SendVerificationMail(UserCredential: firebase.auth.UserCredential) {
    UserCredential.user.sendEmailVerification().then((res) => {
      console.log(res);

      this.router.navigate(['verify-email']);
    });
  }

  PasswordRecover(passwordResetEmail) {
    const auth = firebase.auth();
    return auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn() {
    // const user: firebase.User = JSON.parse(localStorage.getItem('user'));
    /*  return this.user !== null && this.user.emailVerified !== false
      ? true
      : false; */
    return this.user;
  }

  get isEmailVerified(): boolean {
    const db = firebase.firestore();
    //  db.collection("notifications").doc('hello').delete()
    // const user = JSON.parse(localStorage.getItem('user'));
    return this.user.emailVerified !== false ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    const auth = firebase.auth();
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async updateUserData(data: firebase.auth.UserCredential) {
    const db = getFirestore();
    const colRef = doc(db, 'users', data.user.uid);
    data['updateAt'] = serverTimestamp();
    let user = data;
    const userData = {
      uid: data.user.uid,
      email: data.user.email,
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
      emailVerified: data.user.emailVerified,
      lastLoginAt: serverTimestamp(),
    };
    return new Promise(async (resolve, reject) => {
      try {
        await updateDoc(colRef, userData);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  async StoreUserData(data: User) {
    const db = getFirestore();
    const colRef = doc(db, 'users', data.uid);
    let user = data;
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      createdAt: serverTimestamp(),
      roles: data.roles,
    };
    return new Promise(async (resolve, reject) => {
      try {
        await setDoc(colRef, userData);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  // Sign-out
  SignOut() {
    return new Promise((resolve, reject) => {
      signOut(this.auth)
        .then(() => {
          resolve('ok');
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  setUserRole(data: any[]) {
    this.userRole.next(data);
  }
  getUserRole() {
    return this.userRole;
  }
}
