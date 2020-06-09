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
    return this.http.get<City>(`${this.baseURL}`, {
      params: {
        osm_id: ''+osm_id
      }
  })

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
            for (const coordinateItem of cityItem["geojson"]["coordinates"][0]) {
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
