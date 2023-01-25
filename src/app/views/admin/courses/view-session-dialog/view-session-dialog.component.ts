import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseDaySession } from 'src/app/models/course-day-session.model';

interface SessionCategory {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-view-session-dialog',
  templateUrl: './view-session-dialog.component.html',
  styleUrls: ['./view-session-dialog.component.scss']
})
export class ViewSessionDialogComponent {

  public courseSession!: CourseDaySession;
  public selectedArticle = false;
  public selectedVideo = false;
  public selectedArticleAndVideo = true;

  sessionCategories: SessionCategory[] = [
    { value: 'Mental', viewValue: 'Mental' },
    { value: 'Technical', viewValue: 'Technical' },
    { value: 'Physical', viewValue: 'Physical' },
  ];

  constructor(
    public dialogRef: MatDialogRef<ViewSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
    console.log("xxxxxxxxxxxx", this.data)

    this.initCourseSession();
  }


  initCourseSession() {
    this.courseSession = {
      _id: this.data._id,
      course_id: this.data.course_id,
      category: this.data.category,
      day: this.data.day,
      is_article_or_vedio: this.data.is_article_or_vedio,
      tags: this.data.tags,
      title: this.data.title,
      description: this.data.description,
      learning: this.data.learning,
      preferences: this.data.preferences,
      points_assigned: this.data.points_assigned,
      imageUrl: this.data.imageUrl,
      vedioUrl: this.data.vedioUrl,
      articleUrl: this.data.articleUrl,
    }
  }

  updateDay(session: any) {

  }

}
