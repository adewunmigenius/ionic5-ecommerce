import { Component, OnInit } from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-products',
    template: `
        <ion-list>
            <ion-item>
                <ion-icon name="person-outline" class="dinfo"></ion-icon> <ion-label class="">Admin</ion-label>
            </ion-item>
            <ion-item lines="none" (click)="logout()">
                <ion-icon name="log-out-outline" class="dinfo"></ion-icon>
                <ion-button color="danger" class="logout">Clear Data</ion-button>
            </ion-item>
        </ion-list>`,
    styles: [`.dinfo{margin-right:10px}
        .logout{font-weight: 700}
        `],
})
export class UserComponent implements OnInit {
    constructor(public navCtrl: NavController, public popoverController: PopoverController) { }

    ngOnInit() {
    }
    logout() {
        localStorage.clear();
        this.popoverController.dismiss();
        this.navCtrl.navigateBack('/home');
    }
}
