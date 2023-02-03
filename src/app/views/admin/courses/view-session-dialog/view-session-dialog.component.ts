import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseDaySession } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { NotifierService } from 'src/app/services/notifier.service';

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

  public dailySession: any;
  public course: any = [];

  constructor(
    public dialogRef: MatDialogRef<ViewSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private courseService: CourseService,
    private notifier: NotifierService,
  ) { }


  ngOnInit(): void {
    this.dailySession = this.data.dailySession

    this.initCourseSession();
    this.getCourse()
  }


  initCourseSession() {
    this.courseSession = {
      category: this.dailySession.category,
      day: this.dailySession.day,
      is_article_or_video: this.dailySession.is_article_or_video,
      tags: this.dailySession.tags,
      title: this.dailySession.title,
      description: this.dailySession.description,
      learning: this.dailySession.learning,
      accessories: this.dailySession.accessories,
      points_assigned: this.dailySession.points_assigned,
      imageUrl: this.dailySession.imageUrl,
      videoUrl: this.dailySession.videoUrl,
      articleUrl: this.dailySession.articleUrl,
    }
  }

  getCourse() {
    this.courseService.getCourseById(this.data.course_id).subscribe((returned: any) => {
      this.course = returned;
    })
  }

  updateDay(session: any) {

    this.course.course_daily_sessions[this.data.sessionIndex] = session;

    this.courseService.updateCourse(this.course).subscribe(returned => {
      this.notifier.Notification("success", "Course Daily Session successfully updated");
    })

  }

  deleteDay(session: any) {
    // this.data.sessionIndex
    this.course.course_daily_sessions.splice(this.data.sessionIndex, 1);

    this.courseService.updateCourse(this.course).subscribe(returned => {
      this.notifier.Notification("success", "Course Daily Session successfully deleted");
      this.dialogRef.close();
    })

  }

}
