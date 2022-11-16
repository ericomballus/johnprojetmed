import { Component, OnInit } from '@angular/core';
import { CampagneSchema } from 'src/app/models/campaneSchema';
import { CampagneService } from 'src/app/services/campagne.service';
import { NotificationService } from 'src/app/services/notification.service';
import firebase from 'firebase/compat/app';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-campagne-add',
  templateUrl: './campagne-add.page.html',
  styleUrls: ['./campagne-add.page.scss'],
})
export class CampagneAddPage implements OnInit {
  titre: string = 'hello ';
  texte: string = 'hello world';
  url: string;
  text: string;
  file: any;
  photoURL: string;
  campagne: any = {};
  constructor(
    private campService: CampagneService,
    private notifi: NotificationService
  ) {}

  ngOnInit() {}

  async createdCampagne() {
    let URL = '';

    if (this.photoURL) {
      this.notifi.presentLoading(20000);
      var storageRef = firebase.storage().ref('campagne' + Date.now());
      try {
        await storageRef.put(this.file);
        URL = await storageRef.getDownloadURL();
        this.campagne.url = URL;
        this.campagne['texte'] = this.texte;
        this.campagne['titre'] = this.titre;
        // this.router.navigateByUrl('admin');
        console.log(this.campagne);
        this.campService
          .createCampagne(this.campagne)
          .then((res) => {
            this.notifi.dismissLoading();
            let msg = 'campagne enregistrée!';
            this.notifi.presentToast(`${msg}`, 'primary', 3000);
            console.log(res);
          })
          .catch((err) => {});
      } catch (error) {
        console.log(error);
        this.notifi.presentToast(`${error.message}`, 'primary', 3000);
      }
    }
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
}
