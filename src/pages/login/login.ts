import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';
import { GooglePlus } from '@ionic-native/google-plus';


import { HomePage } from '../home/home';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
}) export class LoginPage {

    constructor(public navController: NavController, navParams: NavParams, private googlePlus: GooglePlus, private toast:Toast) {

    }

    googlePlusLogin() {
        this.googlePlus.login({})
        .then(res => {
            this.navController.setRoot(HomePage, {title: 'BBC News', source: 'bbc-news', "GooglePlusProfile": res});
        })
        .catch(err => console.error(err));
    }
}