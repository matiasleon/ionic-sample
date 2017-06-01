import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';

import { ActionSheetController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetController: ActionSheetController, public alertController: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  showActions() {
    let actions = this.actionSheetController.create({
      title: 'actions',
      buttons: [
        {
          text: 'git',
          handler: () => {
            console.log('git');
          }
        },
        {
          text: 'go home',
          handler: () => {
            this.confirmGoToHome();
          }
        }
      ]
    });
    actions.present();
  }

  private confirmGoToHome(){
    let confirm = this.alertController.create({
      title:'Confirmacion',
      message:'Se perderan los cambios, desea continuar ?',
      buttons:[
        {
          text:'No'
        },
        {
          text:'Si',
          handler:() => {
            this.goToHome();
          }
        }
      ]
    });
    confirm.present();
  }

  private goToHome(){
    this.navCtrl.push(HelloIonicPage);
  }
}
