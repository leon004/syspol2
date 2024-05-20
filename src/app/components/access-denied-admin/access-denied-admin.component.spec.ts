import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedAdminComponent } from './access-denied-admin.component';

describe('AccessDeniedAdminComponent', () => {
  let component: AccessDeniedAdminComponent;
  let fixture: ComponentFixture<AccessDeniedAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessDeniedAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessDeniedAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
