import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, source: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
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
      this.nav.setRoot(this.rootPage, {title: 'BBC News', source: 'bbc-news'});
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {title: page.title, source: page.source});
  }
}
