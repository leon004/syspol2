import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceHomeComponent } from './police-home.component';

describe('PoliceHomeComponent', () => {
  let component: PoliceHomeComponent;
  let fixture: ComponentFixture<PoliceHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliceHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
