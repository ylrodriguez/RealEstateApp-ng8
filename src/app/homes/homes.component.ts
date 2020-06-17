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
  public defaultSort;
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
              this.loadQueryParamsViewOptions(urlParameters)
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

  /**
   * Function that loads view options
   * based on query params 
   * @param urlParameters 
   */
  loadQueryParamsViewOptions(urlParameters) {
    // **** urlParameters ==> hid ****
    // Allows opening modal if home id from urlparameter exists 
    if (urlParameters.hid) {
      let tempHome = this.homes.find(x => x._id === urlParameters.hid)
      if (tempHome) {
        this.sharedHomesService.currentHome.next(tempHome);
        this.openHomeDetailsModal();
      }
      else {
        this.closeHomeDetailsModal();
      }
    }
    // **** urlParameters ==> sortType ****
    // Gets urlParameters for sort Type
    if (urlParameters.sortType) {
      this.defaultSort = urlParameters.sortType
    }
    // If doesn't have sortType add default
    else {
      this.defaultSort = 'price';
    }
  }

  /**
   * Changes whether map is visible or not
   * when mobile view
   * @param newStatus 
   */
  changeMapViewStatus(newStatus: boolean) {
    this.isMapVisible = newStatus;
  }

  /**
   * Open home details modal to show all info about home
   * add hid queryparam
   */
  openHomeDetailsModal() {
    this.addUrlParameter('hid', this.sharedHomesService.currentHome.getValue()._id);
    this.modalHomeDetails.open()
  }

  /**
   * Closes home details modal
   * removes hid queryparameter
   */
  closeHomeDetailsModal() {
    this.removeUrlParameter('hid');
  }

  /**
   * Add a new queryparam to route
   * @param newParameter 
   * @param valueParameter 
   */
  addUrlParameter(newParameter, valueParameter) {
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams);
    urlParameters[newParameter] = valueParameter;
    this.router.navigate([], { relativeTo: this.route, queryParams: urlParameters });
  }

  /**
   * Removes a parameter from route
   * @param removeParameter 
   */
  removeUrlParameter(removeParameter) {
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams);
    delete urlParameters[removeParameter];
    this.router.navigate([], { relativeTo: this.route, queryParams: urlParameters });
  }

  /**
   * Sort homes according to sorting option given
   * @param sortingOption includes sortType and property
   */
  sortHomes(sortingOption: any) {
    this.homes.sort(this.dynamicSort(`${sortingOption.sortType}${sortingOption.property}`))
    this.addUrlParameter('sortType', `${sortingOption.sortType}${sortingOption.property}`)
  }

  /**
   * Callback function for array.prototype.sort()
   * Realizes a dynamicSort based on the property given
   * and type of sorting: '-': descending, '': ascending 
   * @param property 
   */
  dynamicSort(property) {
    /*
      la función array.sort recibe un callback que implementa (a, b) para comparar los elementos
      si (a, b) retorna -1 a viene primero que b. Se posiciona en un indice menor
      si (a, b) retorna 0 son iguales y no se alteran, pero se posicionan respectivamente respecto a los demas
      si (a, b) retorna 1 b viene primero que a. Se posiciona en un indice menor
    */
    var sortOrder = 1;
    if (property[0] === "-") { // - descending order 
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

}
