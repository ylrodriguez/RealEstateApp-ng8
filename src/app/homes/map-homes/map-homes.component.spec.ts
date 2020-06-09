import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHomesComponent } from './map-homes.component';

describe('MapHomesComponent', () => {
  let component: MapHomesComponent;
  let fixture: ComponentFixture<MapHomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapHomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
