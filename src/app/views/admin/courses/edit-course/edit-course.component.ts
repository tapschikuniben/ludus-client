import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseArticle } from 'src/app/models/course-article.model';
import { CourseImage } from 'src/app/models/course-image.model';
import { CourseVideo } from 'src/app/models/course-video.model';
import { Course } from 'src/app/models/course.model';
import { CourseArticleService } from 'src/app/services/course-article.service';
import { CourseImageService } from 'src/app/services/course-image.service';
import { CourseVideoService } from 'src/app/services/course-video.service';
import { CourseService } from 'src/app/services/course.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {

  public course!: Course;
  public courseImage!: CourseImage;
  public courseArticle!: CourseArticle;
  public courseVideo!: CourseVideo;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog,
    private imageService: CourseImageService,
    private articleService: CourseArticleService,
    private videoService: CourseVideoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCourse();

    this.initCourseImage();
    this.initCourse();
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
      date: "",
      article_or_vedio: "",
      tags: "",
      title: "",
      description: "",
      learning: "",
      preferences: [],
      points_assigned: null,
      linking_id: "",
    }
  }

  getCourse() {
    const courseId = this.route.snapshot.paramMap.get('id');

    this.courseService.getCourseById(courseId).subscribe(returned => {
      this.course = returned;
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

  updateCourse(course: any) {
    this.courseService.updateCourse(course).subscribe(returned => {
      console.log(returned)
    })
  }

}
