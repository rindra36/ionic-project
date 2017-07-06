/**
 * Apps Core
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Native Component
 */

/**
 * Providers
 */
import { SettingsProvider } from "./../../providers/settings/settings";

/**
 * Apps Pages
 */
import { MapsPage } from "../maps/maps";
import { ListPage } from "../list/list";


/* BEGIN */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedTheme: String;

  constructor(public navCtrl: NavController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  toogleAppTheme() {
    if (this.selectedTheme == 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

  showMaps() {
    this.navCtrl.push(MapsPage);
  }

}

/* END */