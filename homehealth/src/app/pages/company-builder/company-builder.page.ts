import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { AddServicePage } from 'src/app/modals/add-service/add-service.page';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import firebase from 'firebase/compat/app';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { PickMedicamentPage } from 'src/app/modals/pick-medicament/pick-medicament.page';
@Component({
  selector: 'app-company-builder',
  templateUrl: './company-builder.page.html',
  styleUrls: ['./company-builder.page.scss'],
})
export class CompanyBuilderPage implements OnInit {
  @ViewChild('myInput') my_input: IonInput;
  isAdmin: boolean = false;
  companyAdmin: User;
  company: Company;
  serviceName: boolean = false;
  text: string;
  file: any;
  photoURL: string;
  constructor(
    public authService: AuthenticationService,
    private randomStorage: RandomStorageService,
    public modalController: ModalController,
    public authentification: AuthenticationService,
    private companyService: CompanyService,
    private notifi: NotificationService,
    private router: Router
  ) {
    this.company = new Company();
    console.log(this.company);
  }

  ionViewWillEnter() {
    this.isAdmin = this.randomStorage.checkIfIsAdmin();
    this.companyAdmin = this.randomStorage.getUser();
    console.log(this.companyAdmin);
  }
  ngOnInit() {}

  removeServiceName(service) {
    this.company.removeService(service);
  }

  async addCompanyService() {
    this.randomStorage.setCompany(this.company);
    const modal = await this.modalController.create({
      component: AddServicePage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.company = this.randomStorage.getCompany();
    });
    return await modal.present();
  }

  uploadFile(event: any) {
    console.log(event.target.files);
    this.file = event.target.files.item(0);

    let theType = this.file.type.split('/');
    console.log(theType);
    if (theType[0] == 'image') {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.photoURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    if (theType[0] == 'video') {
    }
  }
  resetImage() {
    this.photoURL = null;
  }
  async createdCompany() {
    let url = '';
    this.notifi.presentLoading(50000);
    if (this.photoURL) {
      let arr = this.company.name.split(' ');
      let path = '';
      if (arr.length) {
        path = arr.join('_');
      } else {
        path = this.company.name;
      }
      this.company.logoURL = this.photoURL;
      var storageRef = firebase.storage().ref(path + 'logo');
      await storageRef.put(this.file);
      url = await storageRef.getDownloadURL();
    }

    if (url) {
      this.company.logoURL = url;
    }

    /*const sendToServer = firebase
      .functions()
      .httpsCallable('createdNewCompany');
    let resultat = await sendToServer({
      companyAdmin: this.companyAdmin,
      company: this.company,
    }); */
    try {
      this.companyAdmin.roles = [2];
      let UserCredential: firebase.auth.UserCredential =
        await this.authService.RegisterUser(
          this.companyAdmin.email,
          this.companyAdmin.password
        );
      await UserCredential.user.sendEmailVerification();
      this.company.adminId = UserCredential.user.uid;
      await this.companyService.createCompany(this.company);
      this.companyAdmin.uid = UserCredential.user.uid;
      this.companyAdmin.emailVerified = UserCredential.user.emailVerified;
      this.companyAdmin.email = UserCredential.user.email;
      this.companyAdmin.photoURL = UserCredential.user.photoURL;
      await this.authService.StoreUserData(this.companyAdmin);
      this.notifi.dismissLoading();
      this.notifi.presentToast(
        `${this.companyAdmin.displayName} created succefuly`,
        'primary',
        3000
      );
      this.router.navigateByUrl('admin');
    } catch (error) {
      this.notifi.dismissLoading();
      this.notifi.presentToast(`${error.message}`, 'primary', 3000);
      console.log(error.message);
    }
  }
  selectCompanyType(ev) {
    this.company.companyType = ev.detail['value'];
  }

  async addCompanyMedicament() {
    this.randomStorage.setCompany(this.company);
    const modal = await this.modalController.create({
      component: PickMedicamentPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      this.company = this.randomStorage.getCompany();
    });
    return await modal.present();
  }
}
