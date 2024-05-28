import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { UserService } from '../../services/user.service';
import { InfractionService } from '../../services/infraction.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        UserService,
        InfractionService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
