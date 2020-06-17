import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';
import { Home } from 'src/app/shared/models/home.model';
import { SharedHomesService } from 'src/app/shared/services/shared-homes.service';
import { City } from 'src/app/shared/models/city.model';

@Component({
  selector: 'app-details-home',
  templateUrl: './details-home.component.html',
  styleUrls: ['./details-home.component.sass']
})
export class DetailsHomeComponent implements OnInit {

  public modalReferenceHomeDetails: any;
  public currentHome: Home;
  public currentCity: City;
  @ViewChild('modalHomeDetails', { static: false }) modalHomeDetails: TemplateRef<any>;
  @Output() closeHomeDetailsModal = new EventEmitter();

  constructor( 
    private modalService: NgbModal, 
    private location: PlatformLocation,
    private sharedHomeService: SharedHomesService
    ) { }

  ngOnInit() {
    // Subscribes to currentHome variable stored at sharedHomeService
    this.sharedHomeService.currentHome.subscribe(
      (newHome) => {
        this.currentHome = newHome
        this.currentCity = this.sharedHomeService.currentCity.value
      }
    );
  }

  open() {
    this.modalReferenceHomeDetails = this.modalService.open(this.modalHomeDetails, { size: 'xl' });
    // Closes modal when back button is clicked
    this.location.onPopState(() => this.modalReferenceHomeDetails.close());
    this.modalReferenceHomeDetails.result.then(
      () => { 
        //console.log('When user closes');
        this.emitCloseHomeDetailsModal()
      }, 
      () => { 
        //console.log('Backdrop click')
        this.emitCloseHomeDetailsModal()
      })
  }

  emitCloseHomeDetailsModal(){
    this.closeHomeDetailsModal.emit()
  }

}
