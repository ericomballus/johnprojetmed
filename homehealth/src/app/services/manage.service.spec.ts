import { TestBed } from '@angular/core/testing';

import { CompanyServiceService } from './manage.service';

describe('CompanyServiceService', () => {
  let service: CompanyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
