import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {
    article: any;
    source: string;
    sortBy: string;

    constructor(public navController: NavController,
                public menuCtrl: MenuController,
                public navParams: NavParams){
        this.article = this.navParams.get("article");
        this.source = this.navParams.get("source");
        this.sortBy = this.navParams.get("sortBy");
        console.log(this.article);
    }

    ngOnInit() {
        
    }

    openImage() {
        //this.navController.push(ImageZoom, {"imageUrl": this.article.urlToImage})
    }
}
