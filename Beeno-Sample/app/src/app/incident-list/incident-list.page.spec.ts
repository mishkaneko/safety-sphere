import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentListPage } from './incident-list.page';

describe('IncidentListPage', () => {
  let component: IncidentListPage;
  let fixture: ComponentFixture<IncidentListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IncidentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
