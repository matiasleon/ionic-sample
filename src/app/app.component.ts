import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { UserService } from '../providers/user.service';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JwtHelper } from 'angular2-jwt';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userService: UserService,
    public jwtHelper: JwtHelper,
    public storage: Storage
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Ultimas Noticias', component: HelloIonicPage },
      { title: 'Jugadores', component: ListPage },
      { title: 'Perfil', component: ProfilePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.validateAuthenticationBeforeAct();
    });
  }

  openPage(page) {
    this.storage.get('token').then(token => {
      var isExpired = this.jwtHelper.isTokenExpired(token);
      if (isExpired) {
        this.logout()
      } else {
        this.setRoot(page.component);
      }
    });
  }

  logout() {
    this.userService.logout();
    this.setRoot(LoginPage);
  }

  private setRoot(component: Component) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(component);
  }

  private validateAuthenticationBeforeAct() {
    this.storage.get('token').then(token => {
      var authenticated = false;
      if (token) {
        console.log(this.jwtHelper.isTokenExpired(token));
        var authenticated = !this.jwtHelper.isTokenExpired(token);
      }
      this.redirect(authenticated);
    });
  }

  private redirect(authenticated: boolean) {
    if (!authenticated) {
      this.logout();
    } else {
      this.nav.setRoot(HelloIonicPage);
    }
  }
}
