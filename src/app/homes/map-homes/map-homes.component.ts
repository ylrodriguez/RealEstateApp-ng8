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
  public options: google.maps.MapOptions
  public markerOptions: google.maps.MarkerOptions = {
    icon: "/assets/icon/marker.svg"
  }

  public polygonCity: google.maps.Polygon;
  public restriction: google.maps.MapRestriction;
  private BOGOTA_BOUNDS = {
    north: 4.909847,
    south: 4.376707,
    west: -74.575839,
    east: -73.515189,
  }


  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @Input() homes: Home[];
  @Input() city: City;
  public currentHome: Home;

  constructor() { }

  ngOnInit() {
    this.options = {
      minZoom: 10,
      fullscreenControl: false,
      clickableIcons: false,
      restriction: {
        latLngBounds: this.BOGOTA_BOUNDS,
        strictBounds: false,
      }
    }
  }

  ngAfterViewInit() {
    if (this.homes.length) {
      this.center = { lat: +this.homes[0].lat, lng: +this.homes[0].lng };
    }
    this.makePolygon();
  }

  // Draws city boundaries with a Polygon and set to the map
  makePolygon() {
    this.polygonCity = new google.maps.Polygon({
      paths: this.city.coordinates,
      strokeColor: '#5E90D9',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillColor: '#5E90D9',
      fillOpacity: 0,
      clickable: false
    })
    this.polygonCity.setMap(this.map._googleMap);
    //this.polygonCity.addListener('click', () => this.closeInfoWindow())
  }

  openInfo(marker: MapMarker, home: Home) {
    this.currentHome = home;
    this.infoWindow.open(marker)
  }

  closeInfoWindow(){
    this.infoWindow.close()
  }

}
