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
import { LocationsProvider } from "../../providers/locations/locations";

/**
 * Apps Pages
 */



/* BEGIN */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public locations: LocationsProvider) {
  }

  ionViewDidLoad() {
  }

}

/* END */
