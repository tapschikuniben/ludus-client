import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSessionDialogComponent } from './view-session-dialog.component';

describe('ViewSessionDialogComponent', () => {
  let component: ViewSessionDialogComponent;
  let fixture: ComponentFixture<ViewSessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSessionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
