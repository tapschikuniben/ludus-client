import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {

  public courses: any = [];
  public courseImages: any;
  public loading: boolean = false;
  public available_courses: boolean = false;

  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCourses();
    this.getCourseImage();
    this.getCourseArticle();
    this.getCourseVideo();
  }

  getCourses() {
    this.loading = true;
    this.courseService.getAllCourses().subscribe(returned => {

      if (returned.length > 0) {
        this.courses = returned;

        this.available_courses = true;

      } else {
        this.available_courses = false;
      }

      this.loading = false;
    })
  }

  getCourseImage() {

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
