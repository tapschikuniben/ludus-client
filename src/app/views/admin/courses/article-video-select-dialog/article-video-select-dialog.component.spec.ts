import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleVideoSelectDialogComponent } from './article-video-select-dialog.component';

describe('ArticleVideoSelectDialogComponent', () => {
  let component: ArticleVideoSelectDialogComponent;
  let fixture: ComponentFixture<ArticleVideoSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleVideoSelectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleVideoSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
