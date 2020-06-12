import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    RouterModule.forChild([]),
    CommonModule,
    NgbModule
  ],
  exports:[
    HeaderComponent,
    NgbModule
  ]
})
export class SharedModule { }
