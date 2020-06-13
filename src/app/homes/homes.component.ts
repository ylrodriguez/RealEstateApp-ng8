import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from '../shared/models/city.model';
import { CityService } from '../shared/services/city.service';
import { SharedHomesService } from '../shared/services/shared-homes.service';
import { Home } from '../shared/models/home.model';
import { HomesService } from '../shared/services/homes.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  @ViewChild('modalHomeDetails', { static: false }) modalHomeDetails;

  constructor(
    private homeService: HomesService,
    private cityService: CityService,
    private sharedHomesService: SharedHomesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Gets all urlParameters
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams);

    // Subscribes to currentCity value stored at SharedHomesService Service
    this.sharedHomesService.currentCity.subscribe(
      newCity => {
        this.city = newCity
        if (Object.keys(this.city).length) {
          // Gets homes in this city area
          this.homeService.getHomesInCity(this.city).subscribe(
            (res) => {
              this.homes = res;
              this.canLoadMap = true;
              // If urlParameters has homeid (hid) shows the modal
              if (urlParameters.hid) {
                this.loadQueryParamsViewOptions(urlParameters.hid)
              }
            },
            (err) => {
              console.log(err);
              this.canLoadMap = true;
            }
          )
        }
      }
    )

    // Loads city in url query param city
    if (urlParameters.city) {
      this.cityService.getCityByOsmId(urlParameters.city).subscribe(
        (res) => {
          if (res) {
            this.sharedHomesService.updateCurrentCity(res);
          }
          else {
            this.router.navigate(['/']);
          }
        },
        (err) => {
          console.log("Error ngOnInit@HomeComponent: ");
          console.log(err);
          this.sharedHomesService.loadDefaultCurrentCity();
        }
      )
    }
    // Url bad formed, go back to main page
    else {
      this.router.navigate(['/']);
    }
  }

  loadQueryParamsViewOptions(homeId: number) {
    // Allows opening modal if home id from urlparameter exists 
    let tempHome = this.homes.find(x => x.id === homeId)
    if (tempHome) {
      this.sharedHomesService.currentHome.next(tempHome);
      this.openHomeDetailsModal();
    }
    else {
      this.closeHomeDetailsModal();
    }
  }

  changeMapViewStatus(newStatus: boolean) {
    this.isMapVisible = newStatus;
  }

  openHomeDetailsModal() {
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams);
    urlParameters.hid = this.sharedHomesService.currentHome.getValue().id;
    this.router.navigate([], { relativeTo: this.route, queryParams: urlParameters });
    this.modalHomeDetails.open()
  }

  closeHomeDetailsModal() {
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams);
    delete urlParameters.hid;
    this.router.navigate([], { relativeTo: this.route, queryParams: urlParameters });
  }

}
