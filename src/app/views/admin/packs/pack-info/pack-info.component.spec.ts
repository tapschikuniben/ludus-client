import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackInfoComponent } from './pack-info.component';

describe('PackInfoComponent', () => {
  let component: PackInfoComponent;
  let fixture: ComponentFixture<PackInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
