import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/homes'
  },
  {
    path: 'homes',
    loadChildren: () => import('./homes/homes.module').then(m => m.HomesModule)
  },
  {
    path: '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
