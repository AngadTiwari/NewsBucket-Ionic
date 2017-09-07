import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'news.html'
})
export class NewsPage {
  source: string;
  sortBy: string;
  news: JSON;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public remoteServiceProvider: RemoteServiceProvider, 
              public loadingCtrl: LoadingController) {
    this.source = navParams.get('source');
    this.sortBy = navParams.get("sortBy")
    this.showLoading();
    this.getNewsData(this.source, this.sortBy);
  }

  itemTapped(event, item) {
    /* this.navCtrl.push(NewsPage, {
      item: item
    }); */
  }
  
  getNewsData(source, sortBy) {
    this.remoteServiceProvider.getNewsData(source, sortBy).subscribe(allnews => {
      this.news = allnews.json();
      console.log(allnews);
    })
  }

  showLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000,
      dismissOnPageChange: true
    }).present();
  }
}
