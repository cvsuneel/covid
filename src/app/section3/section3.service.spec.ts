import { TestBed } from '@angular/core/testing';

import { Section3Service } from './section3.service';

describe('Section3Service', () => {
  let service: Section3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Section3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
