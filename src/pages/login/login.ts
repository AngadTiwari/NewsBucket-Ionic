import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
}) export class LoginPage {

    constructor(public navController: NavController, navParams: NavParams, private googlePlus: GooglePlus, public fb: Facebook, public storage: Storage) {
        //todo init variable
    }

    googlePlusLogin() {
        this.storage.set("is_already_loggedin", true);
        this.storage.set("login_via", "googleplus");
        //this.storage.set("login_info", res);
        this.googlePlus.login({})
        .then(res => {
            this.navController.setRoot(HomePage, {"title": 'BBC News', "source": 'bbc-news', "GooglePlusProfile": res});
        })
        .catch(err => console.error(err));
    }

    facebookLogin() {
        this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => {
            console.log('Logged into Facebook!', res);
            this.navController.setRoot(HomePage, {"title": 'BBC News', "source": 'bbc-news', "FacebookProfile": res});
        })
        .catch(e => console.log('Error logging into Facebook', e));
        this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    }
}