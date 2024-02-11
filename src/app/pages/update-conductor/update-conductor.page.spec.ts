import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateConductorPage } from './update-conductor.page';

describe('UpdateConductorPage', () => {
  let component: UpdateConductorPage;
  let fixture: ComponentFixture<UpdateConductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
