import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomesRoutingModule } from './homes-routing.module';
import { HomesComponent } from './homes.component';
import { MapHomesComponent } from './map-homes/map-homes.component';
import { CardHomesComponent } from './card-homes/card-homes.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomesComponent, MapHomesComponent, CardHomesComponent],
  imports: [
    CommonModule,
    HomesRoutingModule,
    RouterModule,
    GoogleMapsModule,
    SharedModule
  ]
})
export class HomesModule { }
