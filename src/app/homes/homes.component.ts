import { Component, OnInit } from '@angular/core';
import { City } from '../shared/models/city.model';
import { CityService } from '../shared/services/city.service';
import { SharedHomesService } from '../shared/services/shared-homes.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.sass']
})
export class HomesComponent implements OnInit {

  city: City;

  constructor(private cityService: CityService, private sharedHomesService: SharedHomesService) { }

  ngOnInit() {
    // Subscribes to currentCity value stored at SharedHomesService Service
    this.sharedHomesService.currentCity.subscribe(
      newCity => {
        this.city = newCity
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
      }
    )
    
    
  }


}
