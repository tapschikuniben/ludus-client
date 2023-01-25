import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDayDialogComponent } from './select-day-dialog.component';

describe('SelectDayDialogComponent', () => {
  let component: SelectDayDialogComponent;
  let fixture: ComponentFixture<SelectDayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDayDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
