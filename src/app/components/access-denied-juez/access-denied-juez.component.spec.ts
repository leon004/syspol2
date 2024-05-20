import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedJuezComponent } from './access-denied-juez.component';

describe('AccessDeniedJuezComponent', () => {
  let component: AccessDeniedJuezComponent;
  let fixture: ComponentFixture<AccessDeniedJuezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessDeniedJuezComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessDeniedJuezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
