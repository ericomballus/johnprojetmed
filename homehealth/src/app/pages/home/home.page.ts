import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as moment from 'moment';
import { CampagneService } from 'src/app/services/campagne.service';
import { CampagneSchema } from 'src/app/models/campaneSchema';
import { NotificationService } from 'src/app/services/notification.service';
import { TownService } from 'src/app/services/town.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
/*
declare var require: any;

import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  @ViewChild('slides') ionSlides: IonSlides;
  private selected: any = moment();
  private date: any = moment().toISOString();
  campagneList: CampagneSchema[] = [];
  categorieList = [
    'hopital',
    'pharmacie',
    'laboratoire',
    'conseil santé',
    'mon porte monnaie',
  ];
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
    private geolocation: Geolocation,
    private campService: CampagneService,
    private notifi: NotificationService,
    private town: TownService,
    private random: RandomStorageService
  ) {
    this.menu.enable(true, 'first');
    // this.loadPosition();
  }
  ngOnInit() {
    this.getCampagneList();
    this.getVille();
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
    if (ev === 'mon porte monnaie') {
      this.notifi.presentToast(
        "cette option n'est pas encore disponible",
        'danger',
        3000
      );
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

  async getCampagneList() {
    //  this.notifi.presentLoading(40000);
    try {
      this.campagneList = await this.campService.getAllCampagne();

      console.log(this.campagneList);
      this.ionSlides.startAutoplay();

      let arr = [];
    } catch (error) {}
  }

  public downloadAsPDF() {
    /*  const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();*/
  }
  getVille() {
    this.town.getAllNotRealtimeVille().then((docs: any[]) => {
      this.random.setVilles(docs);
    });
  }
}
