import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyteamsCasesComponent } from './myteams-cases.component';

describe('MyteamsCasesComponent', () => {
  let component: MyteamsCasesComponent;
  let fixture: ComponentFixture<MyteamsCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyteamsCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyteamsCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
