import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { NewsPage } from '../news/news';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    title: string;
    source: string;

    tabTop: any;
    tabLatest: any;
    tabPopular: any;

    constructor(public navController: NavController,
                public navParams: NavParams){
        this.title = navParams.get("title");
        this.source = navParams.get('source');

        this.tabTop = NewsPage;
        this.tabLatest = NewsPage;
        this.tabPopular = NewsPage;
    }
}