import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDailyCourseSessionComponent } from './view-daily-course-session.component';

describe('ViewDailyCourseSessionComponent', () => {
  let component: ViewDailyCourseSessionComponent;
  let fixture: ComponentFixture<ViewDailyCourseSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDailyCourseSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDailyCourseSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
