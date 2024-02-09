import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateResponsiblePage } from './update-responsible.page';

describe('UpdateResponsiblePage', () => {
  let component: UpdateResponsiblePage;
  let fixture: ComponentFixture<UpdateResponsiblePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateResponsiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
