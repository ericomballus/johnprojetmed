import { TestBed } from '@angular/core/testing';

import { GroupeByService } from './groupe-by.service';

describe('GroupeByService', () => {
  let service: GroupeByService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeByService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
