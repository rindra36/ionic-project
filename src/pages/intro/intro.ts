/**
 * Apps Core
 */
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Native Component
 */

/**
 * Providers
 */

/**
 * Apps Pages
 */
import { HomePage } from "../home/home";

/* BEGIN */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
