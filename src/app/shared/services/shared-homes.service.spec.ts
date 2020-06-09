import { TestBed } from '@angular/core/testing';

import { SharedHomesService } from './shared-homes.service';

describe('SharedHomesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedHomesService = TestBed.get(SharedHomesService);
    expect(service).toBeTruthy();
  });
});
