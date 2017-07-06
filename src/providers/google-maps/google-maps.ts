import { Injectable } from '@angular/core';
import { ConnectivityServiceProvider } from "../connectivity-service/connectivity-service";
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from "@ionic-native/geolocation";

declare var google;

@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  markers: any = [];
  locLat: number;
  locLong: number;
  apiKey: string = "AIzaSyC_h4WYbH9qThKBpptROTQ_eE6fTzutjjA";
  options: GeolocationOptions;
  position: Geoposition;

  constructor(public connectivityService: ConnectivityServiceProvider, public geolocation: Geolocation) {
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadMap();
  }

  loadMap(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
      console.log("Google maps Javascript needs to be loaded!");
      this.disableMap();

        if (this.connectivityService.isOnline()) {
          console.log("You are online! Loading map...");

          //Load the SDK
          window['mapInit'] = () => {
            this.initMap().then((map) => {
              resolve(map);
            });
            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'https://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            
          } else {
            script.src = 'https://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);
        }
    } else {
        if (this.connectivityService.isOnline()) {
          console.log("Showing map...");
          this.initMap();
          this.enableMap();
        } else {
          console.log("Disabling map...");
          this.disableMap();
        }
      }
      this.addConnectivityListeners();
    });
  }

  initMap(): Promise<any> {
    this.mapInitialised = true;

    return new Promise((resolve) => {
      this.options = {
        enableHighAccuracy: true
      };
      this.geolocation.getCurrentPosition(this.options).then((position) => {
        //let latLng = new google.maps.LatLng(this.locLat = position.coords.latitude, this.locLong = position.coords.longitude);
        let latLng = new google.maps.LatLng(-31.563910, 147.154312);
        //let latLng = new google.maps.LatLng(40.713744, -74.009056);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(this.map);
        this.addMarker();
      }, (err: PositionError) => {
        console.log("error : " + err.message);
      });
    });
  }

  disableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }

  addConnectivityListeners(): void {
    this.connectivityService.watchOnline().subscribe(() => {
      console.log("online");
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadMap();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    });
  }

  addMarker(): void {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "You are here !";
    let infoWindow = new google.maps.InfoWindow ({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })
  }

}
