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
import { LoadingController, Loading } from 'ionic-angular';
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
}) export class HomePage  implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    
    @ViewChild('tab') tabButton: any;
    SORTBY: Array<string> = ["top", "latest", "popular"];

    gplusProfile: Object;
    title: string;
    source: string;
    sortBy: string;

    hideHeader: Boolean;
    news: JSON;
    loader: Loading;
    showErrorMsg: boolean = false;
    errorMsg: string;

    constructor(public navController: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public remoteServiceProvider: RemoteServiceProvider, 
                public appCommunicator: AppCommunicator,
                public crop: Crop,
                public toast: Toast) {

        this.gplusProfile = navParams.get("GooglePlusProfile");
        this.title = navParams.get("title");
        this.source = navParams.get('source');
        this.sortBy = this.SORTBY[0];

        this.getNewsData(this.source, this.sortBy);
    }

    tabChanged(index) {
        this.sortBy = this.SORTBY[index];
        this.getNewsData(this.source, this.sortBy);
    }
    
    itemTapped(event, article) {
        this.appCommunicator.publish(true);
        this.navController.push(DetailPage, {"article": article, "source": this.source, "sortBy": this.sortBy});
    }
    
    ngOnChanges(changes: SimpleChanges) {
        console.log(`ngOnChanges`);
    }

    ngOnInit() {
        console.log(`ngOnInit`);
    }

    ngDoCheck() {
        console.log("ngDoCheck")
    }

    ngAfterContentInit() {
        console.log("ngAfterContentInit");
    }

    ngAfterContentChecked() {
        console.log("ngAfterContentChecked");
    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit");
    }

    ngAfterViewChecked() {
        console.log("ngAfterViewChecked");
    }

    ngOnDestroy() {
        console.log("ngOnDestroy");
    }
    
    getNewsData(source, sortBy) {
      this.loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      this.loader.present().then(()=>{
        this.remoteServiceProvider.getNewsData(source, sortBy).subscribe(
          allnews => {
            this.showErrorMsg = false;
            this.news = allnews.json();
            this.loader.dismissAll();
          },
          error => {
            this.showErrorMsg = true;
            this.errorMsg = error.json()["message"];
            this.loader.dismissAll();
        })
      });
    }
}