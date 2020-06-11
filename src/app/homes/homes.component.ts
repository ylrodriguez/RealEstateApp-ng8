import { Component, OnInit } from '@angular/core';
import { City } from '../shared/models/city.model';
import { CityService } from '../shared/services/city.service';
import { SharedHomesService } from '../shared/services/shared-homes.service';
import { Home } from '../shared/models/home.model';
import { HomesService } from '../shared/services/homes.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.sass']
})
export class HomesComponent implements OnInit {

  public city: City;
  public homes: Home[];
  public canLoadMap = false;
  public isMapVisible = true;

  constructor(private homeService: HomesService, private cityService: CityService, private sharedHomesService: SharedHomesService) { }

  ngOnInit() {
    // Subscribes to currentCity value stored at SharedHomesService Service
    this.sharedHomesService.currentCity.subscribe(
      newCity => {
        this.city = newCity
        if (Object.keys(this.city).length) {
          this.homeService.getHomesInCity(this.city).subscribe(
            (res) => {
              this.homes = res;
              this.canLoadMap = true;
            },
            (err) => {
              console.log(err);
              this.canLoadMap = true;
            }
          )
        }
      }
    )

    // TO DO: Get osm_id in url
    this.cityService.getCityByOsmId(7426387).subscribe(
      (res) => {
        this.sharedHomesService.updateCurrentCity(res);
      },
      (err) => {
        console.log("Error ngOnInit@HomeComponent: ");
        console.log(err);
        this.sharedHomesService.loadDefaultCurrentCity();
      }
    )
  }

  changeMapViewStatus(newStatus: boolean){
    this.isMapVisible = newStatus;
  }

}
