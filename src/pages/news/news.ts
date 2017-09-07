import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-list',
  templateUrl: 'news.html'
})
export class NewsPage {
  tag: string;
  title: string;
  news: JSON;

  constructor(public navCtrl: NavController, public navParams: NavParams, public remoteServiceProvider: RemoteServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.tag = navParams.get('tag');
    this.title = navParams.get("title")
    this.getNewsData(this.tag);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    /* this.navCtrl.push(NewsPage, {
      item: item
    }); */
  }
  
  getNewsData(tag) {
    this.remoteServiceProvider.getNewsData(tag, "top").subscribe(allnews => {
      this.news = allnews.json();
      console.log(allnews);
    })
  }
}
