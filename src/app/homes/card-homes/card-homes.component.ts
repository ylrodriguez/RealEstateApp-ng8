import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Home } from 'src/app/shared/models/home.model';
import { SharedHomesService } from 'src/app/shared/services/shared-homes.service';

@Component({
  selector: 'app-card-homes',
  templateUrl: './card-homes.component.html',
  styleUrls: ['./card-homes.component.sass']
})
export class CardHomesComponent implements OnInit {

  @Input() home: Home;
  @Input() isEmptyHome: boolean;
  @Output() openHomeDetailsModal = new EventEmitter();
  
  constructor(private sharedHomeService: SharedHomesService) { }

  ngOnInit() {
  }

  emitHomeDetailsModal(){
    // Updates to shared Home Service first.
    this.sharedHomeService.updateCurrentHome(this.home)
    // Emits event to open the modal
    this.openHomeDetailsModal.emit();
  }

}
