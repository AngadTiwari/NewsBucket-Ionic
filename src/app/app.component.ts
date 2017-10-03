import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Deeplinks } from '@ionic-native/deeplinks';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DetailPage } from '../pages/detail/detail';

@Component({
  selector: 'app',
  templateUrl: 'app.html'
}) export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;//this.storage.get("is_already_loggedin") ? LoginPage : HomePage;
  pages: Array<{title: string, source: string, component: any}>;
  selectedPage: string = 'BBC News'; 

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage:Storage, public deeplinks: Deeplinks) {
    this.initializeApp();

    // list out the pages with title, source & component
    this.pages = [
      { title: 'BBC News', source: 'bbc-news', component: HomePage },
      { title: 'Bloomberg', source: 'bloomberg', component: HomePage },
      { title: 'Buzzfeed', source: 'buzzfeed', component: HomePage },
      { title: 'CNN', source: 'cnn', component: HomePage },
      { title: 'ESPN', source: 'espn', component: HomePage },
      { title: 'Google News', source: 'google-news', component: HomePage },
      { title: 'The Economist', source: 'the-economist', component: HomePage },
      { title: 'The Times of India', source: 'the-times-of-india', component: HomePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.configDeeplinking();
    });
  }

  configDeeplinking() {
    // Convenience to route with a given nav
    this.deeplinks.routeWithNavController(this.nav, {
      '/buzzfeed-api': DetailPage, 
    }).subscribe((match) => {
      console.log('Successfully routed', match);
    }, (nomatch) => {
      console.warn('Unmatched Route', nomatch);
    });
  }

  openPage(page) {
    this.selectedPage = page.title;
    this.nav.setRoot(page.component, {title: page.title, source: page.source});
  }
}
