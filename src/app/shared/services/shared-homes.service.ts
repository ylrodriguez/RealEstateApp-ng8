import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../models/city.model';
import { CityService } from './city.service';

@Injectable({
  providedIn: 'root'
})
export class SharedHomesService {

  private mockCity: City = {
    id: 2001,
    osm_id: 7426387,
    name: "Bogotá",
    country: "Colombia"
  }
  private _currentCity = new BehaviorSubject<City>(this.mockCity);

  constructor(private cityService: CityService) {}

  get currentCity(){
    return this._currentCity;
  }

  updateCurrentCity(city: City){
    this.cityService.getCityCoordinates(city).subscribe(
      (res) => {
        this._currentCity.next(res);
      },
      (err) => {
        console.log("Error updateCurrentCity@SharedHomeService: ");
        console.log(err);
      }
    )
  }
}
