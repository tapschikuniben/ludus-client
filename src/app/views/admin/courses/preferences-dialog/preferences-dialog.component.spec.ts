import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesDialogComponent } from './preferences-dialog.component';

describe('PreferencesDialogComponent', () => {
  let component: PreferencesDialogComponent;
  let fixture: ComponentFixture<PreferencesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
