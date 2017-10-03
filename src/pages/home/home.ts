import { Component, 
    ViewChild, 
    SimpleChanges,
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy } from '@angular/core';
import { LoadingController, Loading, Events } from 'ionic-angular';
import { DatePipe } from '@angular/common';
    
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

import { AppCommunicator } from '../../providers/app-communicator';
import { RemoteServiceProvider } from '../../providers/remote-service';
import { Crop } from '@ionic-native/crop';

import { Toast } from '@ionic-native/toast';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
}) export class HomePage {
    
    @ViewChild('tab') tabButton: any;
    SORTBY: Array<string> = ["top", "latest", "popular"];

    gplusProfile: Object;
    title: string;
    source: string;
    sortBy: string;

    hideHeader: Boolean;
    news?: JSON;
    loader: Loading;
    showErrorMsg: boolean = false;
    errorMsg: string;
    newsSearchText: string;

    constructor(public navController: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public remoteServiceProvider: RemoteServiceProvider, 
                public appCommunicator: AppCommunicator,
                public crop: Crop,
                public toast: Toast,
                public events: Events) {

        this.gplusProfile = navParams.get("GooglePlusProfile");
        this.title = navParams.get("title");
        this.source = navParams.get('source');
        this.sortBy = this.SORTBY[0];

        this.getNewsData(this.source, this.sortBy, false, false);
    }

    tabChanged(index) {
        this.sortBy = this.SORTBY[index];
        this.getNewsData(this.source, this.sortBy, false, false);
    }
    
    itemTapped(event, article) {
        this.appCommunicator.publish(true);
        this.navController.push(DetailPage, {"article": article, "source": this.source, "sortBy": this.sortBy});
    }

    doRefresh(refresher) {
        this.news = null;
        this.showErrorMsg = true;
        this.getNewsData(this.source, this.sortBy, true, false);
        this.events.subscribe('news:refresh', () => {
            console.log('news loaded..');
            refresher.complete();
            this.events.unsubscribe('news:refresh');
        });
    }
    
    getNewsData(source, sortBy, isRefreshed, isSearching) {
      this.loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      this.loader.present().then(()=>{
        this.remoteServiceProvider.getNewsData(source, sortBy).subscribe(
          allnews => {
            this.showErrorMsg = false;
            this.news = allnews.json();
            this.loader.dismissAll();
            if(isRefreshed) {
                this.events.publish('news:refresh');
            }
            if(isSearching) {
                this.events.publish('news:search');
            }
          },
          error => {
            this.showErrorMsg = true;
            this.errorMsg = error.json()["message"];
            this.loader.dismissAll();
            if(isRefreshed) {
                this.events.publish('news:refresh');
            }
            if(isSearching) {
                this.events.publish('news:search');
            }
        })
      });
    }

    checkIfData() {
        return (this.news!=null && !this.showErrorMsg);
    }

    onSearch(event) {
        this.news = null;
        this.showErrorMsg = true;
        this.getNewsData(this.source, this.sortBy, false, true);
        this.events.subscribe('news:search', () => {
            console.log('news loaded..');
            var newsWithoutFilter = JSON.parse(JSON.stringify(this.news));
            if(newsWithoutFilter!=null && newsWithoutFilter.articles!=null) {
                this.news['articles'] = newsWithoutFilter.articles.filter((article) => {
                    return article.title.toLowerCase().indexOf(this.newsSearchText.toLowerCase()) > -1;
                });
                if(this.news['articles'].length==0){
                    this.news = null;        
                    this.showErrorMsg = true;
                    this.errorMsg = "No News Found !!";
                }
            }
            this.events.unsubscribe('news:search');
        });
    }

    onCancel(event) {
        console.log('oncancel: '+this.newsSearchText);
    }
}