import { TestBed } from '@angular/core/testing';

import { NgInputRangeService } from './ng-input-range.service';

describe('NgInputRangeService', () => {
  let service: NgInputRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgInputRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
