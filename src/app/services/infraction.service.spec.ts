import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InfractionService } from './infraction.service';

describe('InfractionService', () => {
  let service: InfractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule aquí
      providers: [InfractionService]
    });
    service = TestBed.inject(InfractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
