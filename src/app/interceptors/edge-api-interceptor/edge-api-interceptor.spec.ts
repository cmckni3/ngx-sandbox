import { TestBed, inject } from '@angular/core/testing';

import { EdgeApiInterceptor } from './edge-api-interceptor';

describe('EdgeApiInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdgeApiInterceptor]
    });
  });

  it('should be created', inject([EdgeApiInterceptor], (service: EdgeApiInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
