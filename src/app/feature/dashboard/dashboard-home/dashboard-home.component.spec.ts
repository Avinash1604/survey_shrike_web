import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeComponent } from './dashboard-home.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      declarations: [DashboardHomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should nav list has Create Survey and My Surveys and Log Out', () => {
    const listTitle = fixture.debugElement.query(By.css('.navListTitle')).nativeElement;
    expect(listTitle.textContent).toEqual('Create Survey');
  });
});
