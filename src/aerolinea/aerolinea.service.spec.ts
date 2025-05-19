/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AerolineaService } from './aerolinea.service';

describe('Service: Aerolinea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AerolineaService]
    });
  });

  it('should ...', inject([AerolineaService], (service: AerolineaService) => {
    expect(service).toBeTruthy();
  }));
});
