import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedPoliciaComponent } from './access-denied-policia.component';

describe('AccessDeniedPoliciaComponent', () => {
  let component: AccessDeniedPoliciaComponent;
  let fixture: ComponentFixture<AccessDeniedPoliciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessDeniedPoliciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessDeniedPoliciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
