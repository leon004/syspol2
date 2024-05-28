import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HistoricalComponent } from './historical.component';
import { InfractionService } from '../../services/infraction.service';
import { LoaderService } from '../../services/loader.service';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('HistoricalComponent', () => {
  let component: HistoricalComponent;
  let fixture: ComponentFixture<HistoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatMenuModule, MatIconModule],
      declarations: [HistoricalComponent, AdminNavComponent],
      providers: [InfractionService, LoaderService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
