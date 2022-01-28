import { TestBed } from '@angular/core/testing';

import { Section1Service } from './section1.service';

describe('Section1Service', () => {
  let service: Section1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Section1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
