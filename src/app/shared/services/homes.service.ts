import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Home } from '../models/home.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class HomesService {

  private baseURL = environment.apiUrl + 'home';

  constructor(private http: HttpClient) { }

  getHomesInCity(city: City): Observable<Home[]> {
    return this.http.get<Home[]>(`${this.baseURL}/find/${city._id}`)
      .pipe(map(data => {
        return data;
      }));
  }
}
