import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIIComponent } from './form-ii.component';

describe('FormIIComponent', () => {
  let component: FormIIComponent;
  let fixture: ComponentFixture<FormIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
