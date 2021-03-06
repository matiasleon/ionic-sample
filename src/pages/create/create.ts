import { Component, } from '@angular/core';
import { Events } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  playerForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public event: Events) {

    this.playerForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      team: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
  }

  create() {
    let player = this.playerForm.value;
    this.event.publish('create:player', player);
  }
}
