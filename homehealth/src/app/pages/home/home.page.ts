import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  categorieList = ['hopital', 'pharmacie', 'laboratoire', 'conseil santé'];
  companyList = [
    {
      name: 'hopital cité verte',
      service: ['pediatrie', 'ophtamologie', 'chirugie'],
    },
    { name: 'laboratoire etoudi', service: ['', '', ''] },
    { name: 'pharmacie essono', service: [] },
  ];
  constructor(private menu: MenuController, private router: Router) {
    this.menu.enable(true, 'first');
  }

  pickValue(ev) {
    console.log(ev);
    if (ev === 'conseil santé') {
      this.router.navigateByUrl('advices');
    }
    if (ev === 'laboratoire') {
      this.router.navigateByUrl('laboratoire');
    }
  }
}
