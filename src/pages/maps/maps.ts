/**
 * Apps Core
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Native Component
 */

/**
 * Providers
 */
import { LocationsProvider } from "../../providers/locations/locations";
import { GoogleMapsProvider } from "../../providers/google-maps/google-maps";
import { GoogleMapsClusterProvider } from "../../providers/google-maps-cluster/google-maps-cluster";

/**
 * Apps Pages
 */
import { ListPage } from "../list/list";



/* BEGIN */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public maps: GoogleMapsProvider, public platform: Platform, public locations: LocationsProvider, public mapCluster: GoogleMapsClusterProvider) {
  }

  ionViewDidLoad(): void {
    this.platform.ready().then(() => {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        this.mapCluster.addCluster(map);
      });
      let locationsLoaded = this.locations.load();

      Promise.all([
        mapLoaded,
        locationsLoaded
      ]).then((result) => {
        let locations = result[1];
        console.log(result);
        for(let location of locations) {
          this.maps.addMarker();
        }
      });
    });
  }

  showList() {
    this.navCtrl.push(ListPage);
  }

}

/* END */