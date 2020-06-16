import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    redirectTo: '/homes?city=7426387'
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
