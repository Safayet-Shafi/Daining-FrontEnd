import { TestBed } from '@angular/core/testing';

import { MiddleWareURLSService } from './middle-ware-urls.service';

describe('MiddleWareURLSService', () => {
  let service: MiddleWareURLSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiddleWareURLSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
