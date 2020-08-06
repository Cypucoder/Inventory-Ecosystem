import { TestBed } from '@angular/core/testing';

import { AdditService } from './addit.service';

describe('AdditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdditService = TestBed.get(AdditService);
    expect(service).toBeTruthy();
  });
});
