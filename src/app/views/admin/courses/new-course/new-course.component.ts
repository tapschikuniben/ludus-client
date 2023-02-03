import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ArticleVideoSelectDialogComponent } from '../article-video-select-dialog/article-video-select-dialog.component';


@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent {

  public course!: Course;
  public selectedArticle = true;
  public loading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private courseService: CourseService,
    private router: Router,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initCourse();
  }


  initCourse() {
    this.course = {
      _id: "",
      number_of_days: null,
      course_title: "",
      course_instructor: "",
      course_description: "",
      course_daily_sessions: []
    }
  }

  saveCourse() {
    this.courseService.addCourse(this.course).subscribe((returnedCourse: any) => {
      const url = `/edit-course/${returnedCourse._id}`;
      this.router.navigate([url]);

      this.notifier.Notification("success", "Course successfully added");
    })
  }

}
