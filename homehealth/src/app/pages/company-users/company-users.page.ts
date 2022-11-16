import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { RandomStorageService } from 'src/app/services/random-storage.service';
import { UserService } from 'src/app/services/user.service';
import { CompanyAddUserPage } from '../../modals/company-add-user/company-add-user.page';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.page.html',
  styleUrls: ['./company-users.page.scss'],
})
export class CompanyUsersPage implements OnInit {
  @ViewChild('fileButton') fileButton: ElementRef<HTMLButtonElement>;
  // public employeList$: User[];
  public employeList$: Observable<User[]>;
  admin: User;
  constructor(
    public modalController: ModalController,
    private userService: UserService,
    private randomStorage: RandomStorageService,
    public actionSheet: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.admin = this.randomStorage.getAdmin();
    this.getEmployeeList(this.admin.uid);
  }
  async addEmploye() {
    const modal = await this.modalController.create({
      component: CompanyAddUserPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      // this.company = this.randomStorage.getCompany();
    });
    return await modal.present();
  }

  getEmployeeList(adminId) {
    this.employeList$ = this.userService.getListEmployees(adminId);
  }

  refreshPage() {
    setTimeout(() => {
      this.fileButton.nativeElement.click();
    }, 3000);
  }

  displayEmploye(employe: User) {
    console.log(employe);
    this.presentActionSheet(employe);
  }

  async presentActionSheet(employe) {
    const actionSheet = await this.actionSheet.create({
      header: 'QUE VOULEZ VOUS FAIRE ?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Afficher info ?',
          role: 'destructive',
          icon: 'person',
          handler: () => {
            // this.randomStorage.setAdmin(this.admin);
            this.randomStorage.setUser(employe);
            this.router.navigateByUrl('user-details');
          },
        },
        /* {
          text: 'Afficher les factures ?',
          icon: 'share',
          handler: () => {
            this.randomStorage.setUser(employe);
            this.router.navigateByUrl('transaction');
          },
        },*/

        {
          text: 'Supprimer ?',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
