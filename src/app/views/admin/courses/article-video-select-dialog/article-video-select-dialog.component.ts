import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-video-select-dialog',
  templateUrl: './article-video-select-dialog.component.html',
  styleUrls: ['./article-video-select-dialog.component.scss']
})
export class ArticleVideoSelectDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ArticleVideoSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: String,
  ) { }

  ngOnInit(): void {
  }

  onSelectArticle(): void {
    this.dialogRef.close({ data: "Article" });
  }

  onSelectVideo(): void {
    this.dialogRef.close({ data: "Video" });
  }

  onSelectBoth(): void {
    this.dialogRef.close({ data: "ArticleAndVideo" });
  }
}
