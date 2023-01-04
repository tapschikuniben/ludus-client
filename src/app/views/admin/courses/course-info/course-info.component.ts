import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseArticleService } from 'src/app/services/course-article.service';
import { CourseImageService } from 'src/app/services/course-image.service';
import { CourseVideoService } from 'src/app/services/course-video.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {

  public courses: any;
  public courseImages: any;

  constructor(
    private courseService: CourseService,
    private imageService: CourseImageService,
    private articleService: CourseArticleService,
    private videoService: CourseVideoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCourses();
    this.getCourseImage();
    this.getCourseArticle();
    this.getCourseVideo();
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe(returned => {
      this.courses = returned;
    })
  }

  getCourseImage() {
    this.imageService.getAllCourseImages().subscribe((images: any) => {
      this.courseImages = images;
    })
  }

  getCourseArticle() {

  }

  getCourseVideo() {

  }

  addCourse() {
    const url = `/add-course`;
    this.router.navigate([url]);
  }

  editCourse(course: any) {
    const url = `/edit-course/${course._id}`;
    this.router.navigate([url]);
  }
}
