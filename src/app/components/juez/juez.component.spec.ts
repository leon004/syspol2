import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { JuezComponent } from './juez.component';
import { InfractionService } from '../../services/infraction.service';
import { LoaderService } from '../../services/loader.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('JuezComponent', () => {
  let component: JuezComponent;
  let fixture: ComponentFixture<JuezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuezComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        InfractionService,
        LoaderService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
