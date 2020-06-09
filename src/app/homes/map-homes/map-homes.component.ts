import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Home } from 'src/app/shared/models/home.model';
import { HomesService } from 'src/app/shared/services/homes.service';

@Component({
  selector: 'app-map-homes',
  templateUrl: './map-homes.component.html',
  styleUrls: ['./map-homes.component.sass']
})
export class MapHomesComponent implements OnInit {

  zoom = 14
  center = { lat: 4.612638888, lng: -74.0705 };
  options: google.maps.MapOptions = {
    minZoom: 12,
  }

  public homes: Home[];
  public currentHome: Home;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  constructor(private homeService: HomesService) { }

  ngOnInit() {
    this.homeService.getHomesInCity().subscribe(
      (res) => {
        console.log(res);
        this.homes = res;
        if (this.homes.length) {
          this.center = { lat: +this.homes[0].lat, lng: +this.homes[0].lng };
        }
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
