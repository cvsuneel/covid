import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToWorkComponent } from './return-to-work.component';

describe('ReturnToWorkComponent', () => {
  let component: ReturnToWorkComponent;
  let fixture: ComponentFixture<ReturnToWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnToWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
