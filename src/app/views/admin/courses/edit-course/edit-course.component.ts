import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseDaySession } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AddMediaDialogComponent } from '../add-media-dialog/add-media-dialog.component';
import { ArticleVideoSelectDialogComponent } from '../article-video-select-dialog/article-video-select-dialog.component';
import { PreferencesDialogComponent } from '../preferences-dialog/preferences-dialog.component';
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

  selectedImageFiles?: FileList | any;
  selectedVideoFiles?: FileList | any;
  selectedArticleFiles?: FileList | any;
  currentFile?: File | any;
  currentVideoFile?: File | any;
  currentArticleFile?: File | any;
  imageprogress = 0;
  videoprogress = 0;
  articleprogress = 0;
  message = '';
  public imagename: any;
  public videoname: any;
  public articlename: any;
  public sendData = {};

  public selectedDayErr = '';
  public imageProcessComplete: boolean = false;
  public videoProcessComplete: boolean = false;
  public articleProcessComplete: boolean = false;
  public loading: boolean = false;

  public imageInfo: any = [];
  public returnedImageData: any = [];

  public videoInfo: any = [];
  public returnedVideoData: any = [];

  public articleInfo: any = [];
  public returnedArticleData: any = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getCourse();

    this.initCourse();
    this.initCourseSession();

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

  initCourseSession() {
    this.courseSession = {
      category: "",
      day: 0,
      is_article_or_video: "",
      tags: "",
      title: "",
      description: "",
      learning: "",
      accessories: {},
      points_assigned: null,
      imageUrl: "",
      imageInfo: [],
      videoInfo: [],
      articleInfo: [],
      videoUrl: "",
      articleUrl: "",
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

        const day = this.course.course_daily_sessions.find(element => {
          if (element.day === result.selected_day) {
            return true;
          }
          return false;
        });

        if (day) {
          this.selectedDayErr = 'Select a day that has not been selected';
          this.courseSession.day = 0;
        } else {
          this.courseSession.day = result.selected_day;
          this.selectedDayErr = '';
        }

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

        this.courseSession.is_article_or_video = "Article";
      }
      if (result.data == "Video") {
        this.selectedVideo = true;
        this.selectedArticle = false;
        this.selectedArticleAndVideo = false;

        this.courseSession.is_article_or_video = "Video";
      }
      if (result.data == "ArticleAndVideo") {
        this.selectedArticleAndVideo = true;
        this.selectedArticle = true;
        this.selectedVideo = true;

        this.courseSession.is_article_or_video = "ArticleAndVideo";
      }
    });
  }

  updateCourse(course: any) {
    this.courseService.updateCourse(course).subscribe(returned => {
      console.log(returned)
    })
  }

  viewSession(session: any, session_index: any) {
    const dialogRef = this.dialog.open(ViewSessionDialogComponent, { width: '90%', height: '85%', data: { dailySession: session, sessionIndex: session_index, course_id: this.route.snapshot.paramMap.get('id') } });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourse()
    });
  }


  saveDay(daySession: any) {
    this.loading = true;

    if (this.courseSession.day == 0) {
      this.selectedDayErr = "Select day for your course";
      this.loading = false;
    }

    if (this.courseSession.day > 0) {

      this.course.course_daily_sessions.push(daySession);

      this.courseService.updateCourse(this.course).subscribe(() => {

        this.uploadImages().then(returned => {
          if (returned) {
            this.imageProcessComplete = true;
          }

          if (this.imageProcessComplete && this.videoProcessComplete && this.articleProcessComplete) {
            this.loading = false;
            this.notifier.Notification("success", "Session added successfully");
            this.getCourse();
            this.clearForm();

            this.imageInfo = [];
            this.returnedImageData = [];

            this.videoInfo = [];
            this.returnedVideoData = [];

            this.articleInfo = [];
            this.returnedArticleData = [];

            this.imageProcessComplete = false;
            this.videoProcessComplete = false;
            this.articleProcessComplete = false;
          }

        }),

          this.uploadVideos().then(returned => {

            if (returned) {
              this.videoProcessComplete = true;
            }

            if (this.imageProcessComplete && this.videoProcessComplete && this.articleProcessComplete) {
              this.loading = false;
              this.notifier.Notification("success", "Session added successfully");
              this.getCourse();
              this.clearForm();

              this.imageInfo = [];
              this.returnedImageData = [];

              this.videoInfo = [];
              this.returnedVideoData = [];

              this.articleInfo = [];
              this.returnedArticleData = [];

              this.imageProcessComplete = false;
              this.videoProcessComplete = false;
              this.articleProcessComplete = false;
            }
          }),

          this.uploadArticles().then(returned => {

            if (returned) {
              this.articleProcessComplete = true;
            }

            if (this.imageProcessComplete && this.videoProcessComplete && this.articleProcessComplete) {
              this.loading = false;
              this.notifier.Notification("success", "Session added successfully");
              this.getCourse();
              this.clearForm();

              this.imageInfo = [];
              this.returnedImageData = [];

              this.videoInfo = [];
              this.returnedVideoData = [];

              this.articleInfo = [];
              this.returnedArticleData = [];

              this.imageProcessComplete = false;
              this.videoProcessComplete = false;
              this.articleProcessComplete = false;
            }
          })
      })
    } else {
      this.notifier.Notification("warning", "Failed to update");
    }


  }


  uploadImages() {
    var promise = new Promise((resolve, reject) => {

      if (this.returnedImageData.length > 0) {

        this.returnedImageData.forEach((item: any, index: number) => {

          const file: File | null = this.returnedImageData[index].image[0];

          const image_data = {
            caption: this.returnedImageData[index].caption,
            title: this.returnedImageData[index].title,
            accessories: this.returnedImageData[index].accessories,
          }

          if (file) {
            this.currentFile = file;
            this.courseService.uploadCourseImage(this.course, this.currentFile, image_data).subscribe((event: any) => {

              if (event.body) {
                resolve(event.body)
              }
            })
            this.selectedImageFiles = undefined;
          }
        })
      } else {
        resolve("empty");
      }
    });
    return promise;

  }

  uploadVideos() {
    var promise = new Promise((resolve, reject) => {

      if (this.returnedVideoData.length > 0) {

        this.returnedVideoData.forEach((item: any, index: number) => {

          const file: File | null = this.returnedVideoData[index].video[0];

          const video_data = {
            caption: this.returnedVideoData[index].caption,
            title: this.returnedVideoData[index].title,
            accessories: this.returnedVideoData[index].accessories,
          }

          if (file) {
            this.currentFile = file;
            this.courseService.uploadCourseVideo(this.course, this.currentFile, video_data).subscribe((event: any) => {

              if (event.body) {
                resolve(event.body)
              }
            })
            this.selectedVideoFiles = undefined;
          }
        })
      } else {
        resolve("empty");
      }
    });
    return promise;

  }


  uploadArticles() {
    var promise = new Promise((resolve, reject) => {

      if (this.returnedArticleData.length > 0) {

        this.returnedArticleData.forEach((item: any, index: number) => {

          const file: File | null = this.returnedArticleData[index].article[0];

          const article_data = {
            caption: this.returnedArticleData[index].caption,
            title: this.returnedArticleData[index].title,
            accessories: this.returnedArticleData[index].accessories,
          }

          if (file) {
            this.currentFile = file;
            this.courseService.uploadCourseArticle(this.course, this.currentFile, article_data).subscribe((event: any) => {

              if (event.body) {
                resolve(event.body)
              }
            })
            this.selectedArticleFiles = undefined;
          }
        })
      } else {
        resolve("empty");
      }
    });
    return promise;

  }


  selectImage(event: any): void {
    this.selectedImageFiles = event.target.files;

    this.imagename = event.target.files[0].name
  }


  selectVideo(event: any): void {
    this.selectedVideoFiles = event.target.files;

    this.videoname = event.target.files[0].name
  }

  selectArticle(event: any): void {
    this.selectedArticleFiles = event.target.files;

    this.articlename = event.target.files[0].name
  }


  // preferences
  selectPreference(option: any) {

    const courseId = this.route.snapshot.paramMap.get('id');

    if (option == 'field') {

      this.sendData = {
        message: "Select Field",
        selecttype: "field",
        courseId: courseId
      }

    }

    if (option == 'cone') {

      this.sendData = {
        message: "How many cones needed?",
        selecttype: "cone"
      }

    }

    if (option == 'ball') {

      this.sendData = {
        message: "How many balls needed?",
        selecttype: "ball"
      }

    }

    if (option == 'living room') {

      this.sendData = {
        message: "Is the living room needed?",
        selecttype: "living room"
      }

    }



    const dialogRef = this.dialog.open(PreferencesDialogComponent, { width: '500px', data: this.sendData });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        if (result.data.type == 'field') {
          this.courseSession.accessories.field = result.data.field;
        }

        if (result.data.type == 'cone') {
          this.courseSession.accessories.coneNumber = result.data.coneNumber;
        }

        if (result.data.type == 'ball') {
          this.courseSession.accessories.ballNumber = result.data.ballNumber;
        }

        if (result.data.type == 'living room') {
          this.courseSession.accessories.isLivingRoom = result.data.isLivingRoom;
        }

      }

    })
  }

  deleteDay(index: any) {
    // this.data.sessionIndex
    this.course.course_daily_sessions.splice(index, 1);

    this.courseService.updateCourse(this.course).subscribe(returned => {
      this.notifier.Notification("success", "Course Daily Session successfully deleted");
    })

  }


  uploadVideosBtn(media: any) {
    const dialogRef = this.dialog.open(AddMediaDialogComponent, { width: '40%', height: '65%', data: { mediaType: media } });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const video_data = {
          video: result.data.video[0].name,
          caption: result.data.caption
        }

        this.videoInfo.push(video_data);
        this.returnedVideoData.push(result.data)
      }

    });
  }

  uploadImagesBtn(media: any) {
    const dialogRef = this.dialog.open(AddMediaDialogComponent, { width: '40%', height: '65%', data: { mediaType: media } });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const image_data = {
          image: result.data.image[0].name,
          caption: result.data.caption
        }

        this.imageInfo.push(image_data);
        this.returnedImageData.push(result.data)
      }

    });
  }

  uploadArticlesBtn(media: any) {
    const dialogRef = this.dialog.open(AddMediaDialogComponent, { width: '40%', height: '65%', data: { mediaType: media } });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const article_data = {
          article: result.data.article[0].name,
          caption: result.data.caption
        }

        this.articleInfo.push(article_data);
        this.returnedArticleData.push(result.data)
      }
    });
  }



  deleteImage(index: any) {
    this.imageInfo.splice(index, 1);
  }

  deleteVideo(index: any) {
    this.videoInfo.splice(index, 1);
  }

  deleteArticle(index: any) {
    this.articleInfo.splice(index, 1);
  }

  clearForm() {
    this.courseSession.day = 0;
    this.initCourseSession();

    this.selectedImageFiles = undefined;
    this.selectedArticleFiles = undefined;
    this.selectedVideoFiles = undefined;

    this.imagename = '';
    this.articlename = '';
    this.videoname = '';
  }
}