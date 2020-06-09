import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Home } from '../models/home.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomesService {

  private baseURL = environment.apiUrl + 'homes';

  constructor(private http: HttpClient) { }

  getHomesInCity(): Observable<Home[]> {
    return this.http.get<Home[]>(`${this.baseURL}`)
      .pipe(map(data => {
        return data['homes'];
      }));
  }
}
