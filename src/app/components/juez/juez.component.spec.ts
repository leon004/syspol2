import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuezComponent } from './juez.component';

describe('JuezComponent', () => {
  let component: JuezComponent;
  let fixture: ComponentFixture<JuezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuezComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
