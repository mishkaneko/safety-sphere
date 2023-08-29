import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentMapPage } from './incident-map.page';

describe('IncidentMapPage', () => {
  let component: IncidentMapPage;
  let fixture: ComponentFixture<IncidentMapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IncidentMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
