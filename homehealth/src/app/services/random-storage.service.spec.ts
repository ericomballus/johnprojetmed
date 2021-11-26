import { TestBed } from '@angular/core/testing';

import { RandomStorageService } from './random-storage.service';

describe('RandomStorageService', () => {
  let service: RandomStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
