import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// Environment
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { ShareModule } from './share.module';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
let firebaseConfig = {
  apiKey: 'AIzaSyBqSR-VHVk3SEzSneh0eZ2Xu3D3eoBgz4U',
  authDomain: 'home-health-d9bbd.firebaseapp.com',
  projectId: 'home-health-d9bbd',
  storageBucket: 'home-health-d9bbd.appspot.com',
  messagingSenderId: '841244183624',
  appId: '1:841244183624:web:f1c3c170fcedc578aa1c7d',
  measurementId: 'G-9M1VVBG17K',
};
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LanguageLoader,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    //  Geolocation,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
