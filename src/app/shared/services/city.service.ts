import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CityService {

  private baseURL = environment.apiUrl + 'city';

  constructor(private http: HttpClient) { 

  }

  // Get city that matches with OSM_ID
  getCityByOsmId(osm_id: number): Observable<City>{
    return this.http.get<City>(`${this.baseURL}/find/osm/${osm_id}`)
    .pipe(map(data => {
      delete data.cityBounds["_id"] // Removes _id from response to avoid issues with google maps api
      return data
    }))
  }

  // Uses nominatim API to get coordinates of a city
  getCityCoordinates(city: City): Observable<City> {
    return this.http.get<City[]>(`https://nominatim.openstreetmap.org/search.php`, {
      params: {
        q: `${city.name}+${city.country}`,
        polygon_geojson: "1",
        format: "json"
      }
    })
      .pipe(map(data => {
        var cityCoordinates = [];
       
        for (const cityItem of data) {
          if (city.osm_id == cityItem["osm_id"]) {
            let cityCoordinatesArray = cityItem["geojson"]["coordinates"][0][0]
            for (const coordinateItem of cityCoordinatesArray) {
              cityCoordinates.push({
                'lng': coordinateItem[0],
                'lat': coordinateItem[1]
              })
            }
            break;
          }
        }
        city.coordinates = cityCoordinates;
        return city
      }))
  }

}
