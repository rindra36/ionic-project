import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SettingsProvider } from "./../providers/settings/settings";

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'IntroPage';
  selectedTheme: String;
  loader: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private settings: SettingsProvider, public loadingCtrl: LoadingController, public storage: Storage) {
    this.presentLoading();

    platform.ready().then(() => {
      this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
      this.storage.get('introShown').then((result) => {
        if (result) {
          this.rootPage = 'IntroPage';
        } else {
          this.rootPage = 'IntroPage';
          this.storage.set('introShown', true);
        }
        this.loader.dismiss();
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authentificating..."
    });
    this.loader.present();
  }
}

