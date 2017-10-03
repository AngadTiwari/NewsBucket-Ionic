import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast'
import { RemoteServiceProvider } from '../providers/remote-service';
import { AppCommunicator } from '../providers/app-communicator';
import { Crop } from '@ionic-native/crop';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { Deeplinks } from '@ionic-native/deeplinks';

import { HttpModule } from '@angular/http'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      pageTransition: 'ios-transition'
    }),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Crop,
    Toast,
    GooglePlus,
    Facebook,
    Deeplinks,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    AppCommunicator
  ]
})
export class AppModule {}
