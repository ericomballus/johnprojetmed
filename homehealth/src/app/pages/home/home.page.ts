import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private selected: any = moment();
  private date: any = moment().toISOString();

  categorieList = ['hopital', 'pharmacie', 'laboratoire', 'conseil santé'];
  companyList = [
    {
      name: 'hopital cité verte',
      service: ['pediatrie', 'ophtamologie', 'chirugie'],
    },
    { name: 'laboratoire etoudi', service: ['', '', ''] },
    { name: 'pharmacie essono', service: [] },
  ];
  constructor(
    private menu: MenuController,
    private router: Router,
    private geolocation: Geolocation
  ) {
    this.menu.enable(true, 'first');
    // this.loadPosition();
  }

  pickValue(ev) {
    console.log(ev);
    if (ev === 'conseil santé') {
      this.router.navigateByUrl('advices');
    }
    if (ev === 'laboratoire') {
      this.router.navigateByUrl('laboratoire');
    }

    if (ev === 'hopital') {
      this.router.navigateByUrl('hopital');
    }
    if (ev === 'pharmacie') {
      this.router.navigateByUrl('pharmacie');
    }
  }

  loadPosition() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(resp);
        alert(`latitude: ${resp.coords.latitude}
        longitude: ${resp.coords.longitude}`);
        // this.watchLocation();
        // resp.coords.latitude
        // resp.coords.longitude
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
  watchLocation() {
    console.log('watch..');

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('hello', data);

      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
}
