import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Apps Page
import { HomePage } from '../pages/home/home';
import { MapsPage } from "../pages/maps/maps";
import { ListPage } from "../pages/list/list";

// Native Components
import { Geolocation } from "@ionic-native/geolocation";
import { Network } from "@ionic-native/network";

// Providers
import { SettingsProvider } from '../providers/settings/settings';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { LocationsProvider } from '../providers/locations/locations';
import { GoogleMapsClusterProvider } from '../providers/google-maps-cluster/google-maps-cluster';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    ConnectivityServiceProvider,
    Network,
    GoogleMapsProvider,
    LocationsProvider,
    GoogleMapsClusterProvider,
  ]
})
export class AppModule {}
