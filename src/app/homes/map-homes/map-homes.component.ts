import { Component, OnInit, ViewChild, Input, ViewChildren, AfterViewInit } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { Home } from 'src/app/shared/models/home.model';
import { City } from 'src/app/shared/models/city.model';

@Component({
  selector: 'app-map-homes',
  templateUrl: './map-homes.component.html',
  styleUrls: ['./map-homes.component.sass']
})
export class MapHomesComponent implements OnInit, AfterViewInit {

  public zoom = 10
  public center = { lat: 4.612638888, lng: -74.0705 };
  public options: google.maps.MapOptions = {
    minZoom: 9,
  }
  public markerOptions: google.maps.MarkerOptions = {
    icon: "/assets/icon/default-marker.png"
  }

  public currentHome: Home;
  public polygonCity: google.maps.Polygon;

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @Input() homes: Home[];
  @Input() city: City;

  constructor() { }

  ngOnInit() {
    

  }

  ngAfterViewInit() {
    if (this.homes.length) {
      this.center = { lat: +this.homes[0].lat, lng: +this.homes[0].lng };
    }
    this.makePolygon();
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
