/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoberturaService } from './cobertura.service';

describe('Service: CoberturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoberturaService]
    });
  });

  it('should ...', inject([CoberturaService], (service: CoberturaService) => {
    expect(service).toBeTruthy();
  }));
});
