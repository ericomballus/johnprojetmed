import { TestBed } from '@angular/core/testing';

import { CartLaboService } from './cart-labo.service';

describe('CartLaboService', () => {
  let service: CartLaboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartLaboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
