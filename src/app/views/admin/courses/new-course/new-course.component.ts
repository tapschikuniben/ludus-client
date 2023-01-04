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
  public courseImage!: CourseImage;
  public courseArticle!: CourseArticle;
  public courseVideo!: CourseVideo;

  public selectedArticle = true;
  public selectedVideo = false;

  public image_file_selected: boolean = false;
  public video_file_selected: boolean = false;
  public article_file_selected: boolean = false;

  public image_show_format_message: boolean = false;
  public video_show_format_message: boolean = false;
  public article_show_format_message: boolean = false;

  public image_max_size_reached: boolean = false;
  public video_max_size_reached: boolean = false;
  public article_max_size_reached: boolean = false;

  public loading: boolean = false;

  public image_preview: any = null;
  public video_preview: any = null;
  public article_preview: any = null;

  public imageBaseData: any;
  public imageName: string = '';
  public imageType: string = '';

  public articleBaseData: any;
  public articleName: string = '';
  public articleType: string = '';

  public videoBaseData: any;
  public videoName: string = '';
  public videoType: string = '';

  public show_soccer_field = false;
  public show_cone = false;
  public show_ball = false;
  public show_living_room = false;

  public linking_id: string = "";

  constructor(
    private dialog: MatDialog,
    private courseService: CourseService,
    private imageService: CourseImageService,
    private articleService: CourseArticleService,
    private videoService: CourseVideoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initCourseImage();
    this.initCourse();
    this.initCourseArticle();
    this.initCourseVideo();
    this.uniqueIDGenerator();
  }


  uniqueIDGenerator() {
    const UniqueStringGenerator = require('unique-string-generator');
    UniqueStringGenerator.UniqueStringId();

    this.linking_id = UniqueStringGenerator.UniqueStringId();

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

  selectArticleOrVideo() {
    const dialogRef = this.dialog.open(ArticleVideoSelectDialogComponent, { width: '500px', data: "Select to upload an Article or Vedio" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.data == "Article") {
        this.selectedArticle = true;
        this.selectedVideo = false;

        this.course.article_or_vedio = "Article";
      }
      else {
        this.selectedVideo = true;
        this.selectedArticle = false;

        this.course.article_or_vedio = "Video";
      }
    });
  }

  // upload file as base 64
  handleImageFileInput(files: any) {

    const image_max_size = 20 //MB
    const me = this;
    const image_file = files.target.files[0];

    const reader = new FileReader();

    // File Preview
    const preview_reader = new FileReader();

    if (files.target.files[0]) {
      this.image_file_selected = true;
      // file size in MB
      const file_size = image_file.size / (1024 * 1024);

      if (file_size < image_max_size) {

        // File Preview
        preview_reader.onload = () => {
          this.image_preview = preview_reader.result as string;
        }
        preview_reader.readAsDataURL(image_file);

        reader.readAsDataURL(image_file);

        this.image_show_format_message = false;
        this.image_max_size_reached = false;

        reader.onload = function () {
          me.imageBaseData = reader.result;
          me.imageName = image_file.name;
          me.imageType = image_file.type;

        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
      else {
        this.image_max_size_reached = true;
      }
    } else {
      this.image_file_selected = false;
    }
  }


  handleArticleFileInput(files: any) {

    const article_max_size = 20 //MB
    const me = this;
    const article_file = files.target.files[0];

    const reader = new FileReader();

    // File Preview
    const preview_reader = new FileReader();

    if (files.target.files[0]) {
      this.article_file_selected = true;
      // file size in MB
      const file_size = article_file.size / (1024 * 1024);

      if (file_size < article_max_size) {

        // File Preview
        preview_reader.onload = () => {
          this.article_preview = preview_reader.result as string;
        }
        preview_reader.readAsDataURL(article_file);

        reader.readAsDataURL(article_file);

        this.article_show_format_message = false;
        this.article_max_size_reached = false;

        reader.onload = function () {
          me.articleBaseData = reader.result;
          me.articleName = article_file.name;
          me.articleType = article_file.type;

        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
      else {
        this.article_max_size_reached = true;
      }
    } else {
      this.article_file_selected = false;
    }
  }



  handleVideoFileInput(files: any) {

    const max_size = 20 //MB
    const me = this;
    const file = files.target.files[0];

    const reader = new FileReader();

    // File Preview
    const preview_reader = new FileReader();

    if (files.target.files[0]) {
      this.video_file_selected = true;
      // file size in MB
      const file_size = file.size / (1024 * 1024);

      if (file_size < max_size) {

        // File Preview
        preview_reader.onload = () => {
          this.video_preview = preview_reader.result as string;
        }
        preview_reader.readAsDataURL(file);

        reader.readAsDataURL(file);

        this.video_show_format_message = false;
        this.video_max_size_reached = false;

        reader.onload = function () {
          me.videoBaseData = reader.result;
          me.videoName = file.name;
          me.videoType = file.type;

        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
      else {
        this.video_max_size_reached = true;
      }
    } else {
      this.video_file_selected = false;
    }
  }


  selectSoccerField() {
    if (this.show_soccer_field) {
      this.show_soccer_field = false;

      const index = this.course.preferences.indexOf('Soccer Field');

      if (index > -1) { // only splice array when item is found
        this.course.preferences.splice(index, 1); // 2nd parameter means remove one item only
      }

    } else {
      this.show_soccer_field = true;

      this.course.preferences.push('Soccer Field');
    }
  }

  selectCone() {
    if (this.show_cone) {
      this.show_cone = false;

      const index = this.course.preferences.indexOf('Cone');

      if (index > -1) { // only splice array when item is found
        this.course.preferences.splice(index, 1); // 2nd parameter means remove one item only
      }

    } else {
      this.show_cone = true;

      this.course.preferences.push('Cone');
    }
  }

  selectBall() {
    if (this.show_ball) {
      this.show_ball = false;

      const index = this.course.preferences.indexOf('Football Ball');

      if (index > -1) { // only splice array when item is found
        this.course.preferences.splice(index, 1); // 2nd parameter means remove one item only
      }

    } else {
      this.show_ball = true;

      this.course.preferences.push('Football Ball');
    }
  }

  selectLivingRoom() {
    if (this.show_living_room) {
      this.show_living_room = false;

      const index = this.course.preferences.indexOf('Living Room');

      if (index > -1) { // only splice array when item is found
        this.course.preferences.splice(index, 1); // 2nd parameter means remove one item only
      }

    } else {
      this.show_living_room = true;

      this.course.preferences.push('Living Room');
    }
  }

  saveImage() {
    this.courseImage.image = this.imageBaseData;
    this.courseImage.filename = this.imageName;
    this.courseImage.linking_id = this.linking_id;

    this.imageService.addCourseImage(this.courseImage).subscribe(returnedImage => {
      console.log(returnedImage)
    })
  }

  saveArticle() {
    this.courseArticle.article = this.articleBaseData;
    this.courseArticle.filename = this.articleName;
    this.courseArticle.linking_id = this.linking_id;

    this.articleService.addCourseArticle(this.courseArticle).subscribe(returnedArticle => {
      console.log(returnedArticle)
    })
  }

  saveVideo() {
    this.courseVideo.video = this.videoBaseData;
    this.courseVideo.filename = this.videoName;
    this.courseArticle.linking_id = this.linking_id;

    this.videoService.addCourseVideo(this.courseVideo).subscribe(returnedVideo => {
      console.log(returnedVideo)
    })
  }

  saveCourse() {
    this.saveImage();
    this.saveArticle();
    this.saveVideo();

    this.course.linking_id = this.linking_id;

    this.courseService.addCourse(this.course).subscribe(returnedCourse => {
      const url = `/courses`;
      this.router.navigate([url]);
    })

  }

}
