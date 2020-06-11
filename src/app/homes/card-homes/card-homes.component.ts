import { Component, OnInit, Input } from '@angular/core';
import { Home } from 'src/app/shared/models/home.model';

@Component({
  selector: 'app-card-homes',
  templateUrl: './card-homes.component.html',
  styleUrls: ['./card-homes.component.sass']
})
export class CardHomesComponent implements OnInit {

  @Input() home: Home;
  
  constructor() { }

  ngOnInit() {
  }

}
