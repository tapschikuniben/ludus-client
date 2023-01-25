import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseArticle } from 'src/app/models/course-article.model';
import { CourseDaySession } from 'src/app/models/course-day-session.model';
import { CourseImage } from 'src/app/models/course-image.model';
import { CourseVideo } from 'src/app/models/course-video.model';
import { Course } from 'src/app/models/course.model';
import { CourseArticleService } from 'src/app/services/course-article.service';
import { CourseSessionService } from 'src/app/services/course-day-session.service';
import { CourseImageService } from 'src/app/services/course-image.service';
import { CourseVideoService } from 'src/app/services/course-video.service';
import { CourseService } from 'src/app/services/course.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { ArticleVideoSelectDialogComponent } from '../article-video-select-dialog/article-video-select-dialog.component';
import { SelectDayDialogComponent } from '../select-day-dialog/select-day-dialog.component';
import { ViewSessionDialogComponent } from '../view-session-dialog/view-session-dialog.component';

interface SessionCategory {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {

  public course!: Course;
  public courseSession!: CourseDaySession;
  public courseImage!: CourseImage;
  public courseArticle!: CourseArticle;
  public courseVideo!: CourseVideo;
  public selectedDay: number | any = 0;

  public selectedArticle = false;
  public selectedVideo = false;
  public selectedArticleAndVideo = true;

  public selectedValue: string = "";

  sessionCategories: SessionCategory[] = [
    { value: 'Mental', viewValue: 'Mental' },
    { value: 'Technical', viewValue: 'Technical' },
    { value: 'Physical', viewValue: 'Physical' },
  ];

  public courseSessions: any;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseSessionService: CourseSessionService,
    private dialog: MatDialog,
    private imageService: CourseImageService,
    private articleService: CourseArticleService,
    private videoService: CourseVideoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCourse();
    this.getCourseSessions();

    this.initCourseImage();
    this.initCourse();
    this.initCourseSession();
    this.initCourseArticle();
    this.initCourseVideo();

  }

  initCourseImage() {
    this.courseImage = {
      _id: "",
      image: "",
      filename: "",
      linking_id: ""
    }
  }

  initCourseArticle() {
    this.courseArticle = {
      _id: "",
      article: "",
      filename: "",
      linking_id: ""
    }
  }

  initCourseVideo() {
    this.courseVideo = {
      _id: "",
      video: "",
      filename: "",
      linking_id: ""
    }
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

  initCourseSession() {
    this.courseSession = {
      _id: "",
      course_id: "",
      category: "",
      day: "",
      is_article_or_vedio: "",
      tags: "",
      title: "",
      description: "",
      learning: "",
      preferences: [],
      points_assigned: null,
      imageUrl: "",
      vedioUrl: "",
      articleUrl: "",
    }
  }

  getCourse() {
    const courseId = this.route.snapshot.paramMap.get('id');

    this.courseService.getCourseById(courseId).subscribe(returned => {
      this.course = returned;
    })
  }

  getCourseSessions() {
    const courseId = this.route.snapshot.paramMap.get('id');

    this.courseSessionService.getAllCourseSessions().subscribe(returned => {
      this.courseSessions = returned;

      console.log(this.courseSessions);
    })
  }

  deleteCourse(course: any) {
    this.courseService.deleteCourse(course._id).subscribe();

    const url = `/courses`;
    this.router.navigate([url]);
  }

  confirmDialogProfile(course: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "Are you sure, This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('deleted')
        this.deleteCourse(course);
      } else {
      }
    });
  }

  selectDay() {
    const dialogRef = this.dialog.open(SelectDayDialogComponent, { width: '500px', data: { schedule_days: this.course.number_of_days } });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.selectedDay = result.selected_day;
      }
    });
  }

  selectArticleOrVideo() {
    const dialogRef = this.dialog.open(ArticleVideoSelectDialogComponent, { width: '500px', data: "Select Option" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.data == "Article") {
        this.selectedArticle = true;
        this.selectedVideo = false;
        this.selectedArticleAndVideo = false;

        this.courseSession.is_article_or_vedio = "Article";
      }
      if (result.data == "Video") {
        this.selectedVideo = true;
        this.selectedArticle = false;
        this.selectedArticleAndVideo = false;

        this.courseSession.is_article_or_vedio = "Video";
      }
      if (result.data == "ArticleAndVideo") {
        this.selectedArticleAndVideo = true;
        this.selectedArticle = true;
        this.selectedVideo = true;

        this.courseSession.is_article_or_vedio = "ArticleAndVideo";
      }
    });
  }

  updateCourse(course: any) {
    this.courseService.updateCourse(course).subscribe(returned => {
      console.log(returned)
    })
  }

  viewSession(session: any) {
    console.log("My session", session);
    const dialogRef = this.dialog.open(ViewSessionDialogComponent, { width: '70%', height: '80%', data: session });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  saveDay(daySession: any) {
    this.courseSession.course_id = this.route.snapshot.paramMap.get('id');
    this.courseSession.day = this.selectedDay;

    this.courseSessionService.addCourseSession(daySession).subscribe(returnedDay => {
      console.log(returnedDay);

      this.initCourseSession();
    })
  }

}
