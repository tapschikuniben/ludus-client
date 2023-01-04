import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPackComponent } from './new-pack.component';

describe('NewPackComponent', () => {
  let component: NewPackComponent;
  let fixture: ComponentFixture<NewPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
