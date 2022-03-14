import { TestBed } from '@angular/core/testing';

import { AnalyseCommandesService } from './analyse-commandes.service';

describe('AnalyseCommandesService', () => {
  let service: AnalyseCommandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyseCommandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
