import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { Home } from 'src/app/shared/models/home.model';
import { HomesService } from 'src/app/shared/services/homes.service';
import { SharedHomesService } from 'src/app/shared/services/shared-homes.service';
import { City } from 'src/app/shared/models/city.model';

@Component({
  selector: 'app-map-homes',
  templateUrl: './map-homes.component.html',
  styleUrls: ['./map-homes.component.sass']
})
export class MapHomesComponent implements OnInit {

  city: City;

  zoom = 14
  center = { lat: 4.612638888, lng: -74.0705 };
  options: google.maps.MapOptions = {
    minZoom: 11,
  }

  polygonCity: google.maps.Polygon;

  public homes: Home[];
  public currentHome: Home;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  constructor(private homeService: HomesService, private sharedHomeService: SharedHomesService) { }

  ngOnInit() {
    this.sharedHomeService.currentCity.subscribe(
      newCity => {
        this.city = newCity;
        if(Object.keys(this.city).length){
          this.homeService.getHomesInCity(this.city).subscribe(
            (res) => {
              this.homes = res;
              if (this.homes.length) {
                this.center = { lat: +this.homes[0].lat, lng: +this.homes[0].lng };
              }
              this.makePolygon();
            },
            (err) => {
              console.log(err);
            }
          )
        }
      }
    )

  }

  makePolygon() {
    this.polygonCity = new google.maps.Polygon({
      paths: this.city.coordinates,
      strokeColor: '#5E90D9',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillColor: '#5E90D9',
      fillOpacity: 0
    })

    this.polygonCity.setMap(this.map._googleMap);
  }

  openInfo(marker: MapMarker, home) {
    this.currentHome = home;
    this.infoWindow.open(marker)
  }

}
