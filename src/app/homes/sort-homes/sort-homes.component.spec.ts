import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortHomesComponent } from './sort-homes.component';

describe('SortHomesComponent', () => {
  let component: SortHomesComponent;
  let fixture: ComponentFixture<SortHomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortHomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
