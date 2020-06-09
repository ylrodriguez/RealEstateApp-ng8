import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHomesComponent } from './card-homes.component';

describe('CardHomesComponent', () => {
  let component: CardHomesComponent;
  let fixture: ComponentFixture<CardHomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
