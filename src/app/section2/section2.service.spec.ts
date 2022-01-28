import { TestBed } from '@angular/core/testing';

import { Section2Service } from './section2.service';

describe('Section2Service', () => {
  let service: Section2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Section2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
