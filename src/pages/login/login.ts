import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { User } from '../../models/User';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User;
  LOGIN_URL: string = 'http://localhost:3001/sessions/create';
  contentHeaders = new Headers({ "Content-Type": "application/json" });
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public storage: Storage, public jwtHelper: JwtHelper, public toastCtrl: ToastController, public formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
  }

  authenticate() {
    //este post deberia estar encapsuado en el user service
    this.http.post(this.LOGIN_URL, JSON.stringify(this.loginForm.value), { headers: this.contentHeaders })
      .map(res => res.json())
      .subscribe(
      data => this.goToMainPage(data.id_token),
      err => this.loginFailed()
      )
  }

  private loginFailed() {
    let toast = this.toastCtrl.create({
      message: 'Verfique sus credenciales',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  private goToMainPage(token){
    this.saveToken(token);  
    this.navCtrl.setRoot(HelloIonicPage,{},{
      animate:true,
      direction:'forward'
    });
  }

  private saveToken(token: string) {
    this.storage.set('token', token);
    this.user = this.jwtHelper.decodeToken(token);
    this.storage.set('profile', this.user);
  }
}
