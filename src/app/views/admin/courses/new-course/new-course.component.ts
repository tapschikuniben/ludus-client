import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseArticle } from 'src/app/models/course-article.model';
import { CourseImage } from 'src/app/models/course-image.model';
import { CourseVideo } from 'src/app/models/course-video.model';
import { Course } from 'src/app/models/course.model';
import { CourseArticleService } from 'src/app/services/course-article.service';
import { CourseImageService } from 'src/app/services/course-image.service';
import { CourseVideoService } from 'src/app/services/course-video.service';
import { CourseService } from 'src/app/services/course.service';
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
    private router: Router
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
    }
  }

  saveCourse() {
    this.courseService.addCourse(this.course).subscribe(returnedCourse => {
      const url = `/courses`;
      this.router.navigate([url]);
    })

  }

}
