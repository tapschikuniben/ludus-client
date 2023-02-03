import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseDaySession } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
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
      day: 1,
      is_article_or_video: "",
      tags: "",
      title: "",
      description: "",
      learning: "",
      accessories: {},
      points_assigned: null,
      imageUrl: "",
      videoUrl: "",
      articleUrl: "",
    }
  }

  getCourse() {
    const courseId = this.route.snapshot.paramMap.get('id');

    this.courseService.getCourseById(courseId).subscribe(returned => {
      this.course = returned;
      this.courseSessions = this.course.course_daily_sessions;
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
    console.log("My session", session);
    const dialogRef = this.dialog.open(ViewSessionDialogComponent, { width: '70%', height: '85%', data: { dailySession: session, sessionIndex: session_index, course_id: this.route.snapshot.paramMap.get('id') } });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourse()
    });
  }

  saveDay(daySession: any) {

    this.courseSession.day = this.selectedDay;
    this.course.course_daily_sessions.push(daySession);

    this.imageprogress = 0;

    if (this.selectedImageFiles) {
      const file: File | null = this.selectedImageFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.courseService.uploadDailyCourseSession(this.course, this.currentFile, this.currentVideoFile, this.currentArticleFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.imageprogress = Math.round((100 * event.loaded) / event.total);

              if (this.imageprogress == 100) {

                this.notifier.Notification("success", "Course Daily Session successfully added");
              }
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.imageprogress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
              this.notifier.Notification("warning", "Could not save daily session!");
            } else {
              this.message = 'Could not upload the file!';
              this.notifier.Notification("warning", "Could not save daily session!");
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedImageFiles = undefined;
    }

    if (this.selectedVideoFiles) {
      const videofile: File | null = this.selectedVideoFiles.item(0);

      if (videofile) {
        this.currentVideoFile = videofile;

        this.courseService.uploadDailyCourseSession(this.course, this.currentFile, this.currentVideoFile, this.currentArticleFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.imageprogress = Math.round((100 * event.loaded) / event.total);

              if (this.imageprogress == 100) {

                this.notifier.Notification("success", "Course Daily Session successfully added");
              }
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.imageprogress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
              this.notifier.Notification("warning", "Could not save daily session!");
            } else {
              this.message = 'Could not upload the file!';
              this.notifier.Notification("warning", "Could not save daily session!");
            }

            this.currentVideoFile = undefined;
          },
        });
      }


      this.selectedVideoFiles = undefined;
    }


    if (this.selectedArticleFiles) {

      const articlefile: File | null = this.selectedArticleFiles.item(0);

      if (articlefile) {
        this.currentArticleFile = articlefile;

        this.courseService.uploadDailyCourseSession(this.course, this.currentFile, this.currentVideoFile, this.currentArticleFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.imageprogress = Math.round((100 * event.loaded) / event.total);

              if (this.imageprogress == 100) {

                this.notifier.Notification("success", "Course Daily Session successfully added");
              }
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.imageprogress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
              this.notifier.Notification("warning", "Could not save daily session!");
            } else {
              this.message = 'Could not upload the file!';
              this.notifier.Notification("warning", "Could not save daily session!");
            }

            this.currentArticleFile = undefined;
          },
        });
      }

      this.selectedArticleFiles = undefined;
    }


  }


  saveFiles(daySession: any) {

    this.courseSession.day = this.selectedDay;
    this.course.course_daily_sessions.push(daySession);


    this.saveImageFile();
    this.saveVideoFile();
    this.saveArticleFile();


  }

  saveImageFile() {
    this.courseService.updateCourse(this.course).subscribe(returned => {
      this.uploadImage();
    })

  }

  saveVideoFile() {
    this.courseService.updateCourse(this.course).subscribe(returned => {
      this.uploadVideo();
    })
  }

  saveArticleFile() {
    this.courseService.updateCourse(this.course).subscribe(returned => {
      this.uploadArticle();
    })
  }

  uploadImage() {

    if (this.selectedImageFiles) {
      const file: File | null = this.selectedImageFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.courseService.uploadCourseImage(this.course, this.currentFile).subscribe(
          {
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.imageprogress = Math.round((100 * event.loaded) / event.total);

                if (this.imageprogress == 100) {

                  this.notifier.Notification("success", "Course Daily Session successfully added");
                }
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                // this.fileInfos = this.uploadService.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              this.imageprogress = 0;

              if (err.error && err.error.message) {
                this.message = err.error.message;
                this.notifier.Notification("warning", "Could not save daily session!");
              } else {
                this.message = 'Could not upload the file!';
                this.notifier.Notification("warning", "Could not save daily session!");
              }

              this.currentFile = undefined;
            },
          }
        )
      }
      this.selectedImageFiles = undefined;
    }

  }


  uploadVideo() {

    if (this.selectedVideoFiles) {
      const videofile: File | null = this.selectedVideoFiles.item(0);

      if (videofile) {
        this.currentVideoFile = videofile;
        this.courseService.uploadCourseVideo(this.course, this.currentVideoFile).subscribe(
          {
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.videoprogress = Math.round((100 * event.loaded) / event.total);

                if (this.videoprogress == 100) {

                  this.notifier.Notification("success", "Course Daily Session successfully added");
                }
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                // this.fileInfos = this.uploadService.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              this.videoprogress = 0;

              if (err.error && err.error.message) {
                this.message = err.error.message;
                this.notifier.Notification("warning", "Could not save daily session!");
              } else {
                this.message = 'Could not upload the file!';
                this.notifier.Notification("warning", "Could not save daily session!");
              }

              this.currentVideoFile = undefined;
            },
          }
        )
      }
      this.selectedVideoFiles = undefined;
    }

  }


  uploadArticle() {

    if (this.selectedArticleFiles) {
      const articlefile: File | null = this.selectedArticleFiles.item(0);

      if (articlefile) {
        this.currentArticleFile = articlefile;
        this.courseService.uploadCourseArticle(this.course, this.currentArticleFile).subscribe(
          {
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.articleprogress = Math.round((100 * event.loaded) / event.total);

                if (this.articleprogress == 100) {

                  this.notifier.Notification("success", "Course Daily Session successfully added");
                }
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                // this.fileInfos = this.uploadService.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              this.articleprogress = 0;

              if (err.error && err.error.message) {
                this.message = err.error.message;
                this.notifier.Notification("warning", "Could not save daily session!");
              } else {
                this.message = 'Could not upload the file!';
                this.notifier.Notification("warning", "Could not save daily session!");
              }

              this.currentArticleFile = undefined;
            },
          }
        )
      }
      this.selectedArticleFiles = undefined;
    }

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
}
