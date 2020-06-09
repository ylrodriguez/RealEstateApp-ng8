import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomesComponent } from './homes.component';


const routes: Routes = [
  {
    path: '',
    component: HomesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
