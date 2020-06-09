import { Component, OnInit, ViewChild } from '@angular/core';
import { HomesService } from './shared/services/homes.service';
import { Home } from './shared/models/home.model';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  zoom = 12
  center = {lat: 4.612638888, lng: -74.0705};
  options: google.maps.MapOptions = {
    minZoom: 8,
  }

  public homes: Home[];
  public currentHome: Home;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  constructor(private homeService: HomesService){}

  ngOnInit(){
    this.homeService.getHomesInCity().subscribe(
      (res) => {
        console.log(res);
        this.homes = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  openInfo(marker: MapMarker, home) {
    this.currentHome = home;
    this.infoWindow.open(marker)  
  }
}
