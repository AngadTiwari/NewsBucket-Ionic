import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NewsPage } from '../pages/news/news';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NewsPage;

  pages: Array<{title: string, tag: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'BBC News', tag: 'bbc-news', component: NewsPage },
      { title: 'Bloomberg', tag: 'bloomberg', component: NewsPage },
      { title: 'Buzzfeed', tag: 'buzzfeed', component: NewsPage },
      { title: 'CNN', tag: 'cnn', component: NewsPage },
      { title: 'ESPN', tag: 'espn', component: NewsPage },
      { title: 'Google News', tag: 'google-news', component: NewsPage },
      { title: 'The Economist', tag: 'the-economist', component: NewsPage },
      { title: 'The Times of India', tag: 'the-times-of-india', component: NewsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.openPage(this.pages[0])
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {title: page.title, tag: page.tag});
  }
}
