import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sort-homes',
  templateUrl: './sort-homes.component.html',
  styleUrls: ['./sort-homes.component.sass']
})
export class SortHomesComponent implements OnInit {

  public isOpen = false;
  public sortingOptions = [
    {
      'desc': 'Precio - de menor a mayor',
      'property': 'price',
      'sortType': ''
    },
    {
      'desc': 'Precio - de mayor a menor',
      'property': 'price',
      'sortType': '-'
    },
    {
      'desc': 'Área - de menor a mayor',
      'property': 'area',
      'sortType': ''
    },
    {
      'desc': 'Área - de mayor a menor',
      'property': 'area',
      'sortType': '-'
    },
    {
      'desc': 'Hab - de menor a mayor',
      'property': 'bedrooms',
      'sortType': ''
    },
    {
      'desc': 'Hab - de mayor a menor',
      'property': 'bedrooms',
      'sortType': '-'
    }
  ]
  public sortSelected = this.sortingOptions[0]

  @Input() defaultSort?;
  @Output() sortHomes = new EventEmitter();


  constructor() { }

  ngOnInit() {
    if (this.defaultSort) {
      // Identify proper object because input shows only
      // sortType and property
      let tempSortSelected = this.sortingOptions.find(element => 
        this.defaultSort == (element.sortType + element.property)
      )
      
      if (tempSortSelected) {
        this.changeSortSelected(tempSortSelected)
        this.sortHomes.emit(tempSortSelected);
      }
      else {
        this.changeSortSelected(this.sortingOptions[0])
        this.sortHomes.emit(this.sortingOptions[0]);
      }
    }
  }

  toogleOpenDropdown() {
    this.isOpen = !this.isOpen;
  }

  changeSortSelected(sortingOption) {
    this.sortSelected = sortingOption
  }

  emitSortHomes(sortingOption) {
    this.toogleOpenDropdown();
    this.changeSortSelected(sortingOption)
    this.sortHomes.emit(sortingOption);
  }

}
