import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-media-dialog',
  templateUrl: './add-media-dialog.component.html',
  styleUrls: ['./add-media-dialog.component.scss']
})
export class AddMediaDialogComponent {
  public message: string = '';
  public title: string = '';

  selectedImageFiles?: FileList | any;
  selectedVideoFiles?: FileList | any;
  selectedArticleFiles?: FileList | any;

  currentFile?: File | any;
  currentVideoFile?: File | any;
  currentArticleFile?: File | any;

  imageprogress = 0;
  videoprogress = 0;
  articleprogress = 0;

  public imagename: any;
  public videoname: any;
  public articlename: any;
  public preview: string = "";

  public caption: string = "";

  public accessories = {
    fieldSize: '1/4',
    coneNumber: 0,
    ballNumber: 0,
    isLivingRoom: 'No',
  }

  public isLivingRoom: string = '';
  public ballNumber: number = 0;
  public coneNumber: number = 0;
  public fieldSize: string = ''
  public show_living_room: boolean = false;
  public show_ball: boolean = false;
  public show_cone: boolean = false;
  public show_field: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<AddMediaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    this.checkMediaType();
  }


  selectImage(event: any): void {
    this.selectedImageFiles = event.target.files;

    if (this.selectedImageFiles) {
      const file: File | null = this.selectedImageFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }


  selectVideo(event: any): void {
    this.selectedVideoFiles = event.target.files;

    if (this.selectedVideoFiles) {
      const file: File | null = this.selectedVideoFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  selectArticle(event: any): void {
    this.selectedArticleFiles = event.target.files;

    this.articlename = event.target.files[0].name
  }

  checkMediaType() {
    if (this.data.mediaType == "videos") {
      this.message = "Upload Video"
    }

    if (this.data.mediaType == "images") {
      this.message = "Upload Image"
    }

    if (this.data.mediaType == "articles") {
      this.message = "Upload Article"
    }
  }

  confirmImageUpload() {
    this.dialogRef.close({ data: { image: this.selectedImageFiles, caption: this.caption, accessories: this.accessories, title: this.title } })
  }

  confirmVideoUpload() {
    this.dialogRef.close({ data: { video: this.selectedVideoFiles, caption: this.caption, accessories: this.accessories, title: this.title } })
  }

  confirmArticleUpload() {
    this.dialogRef.close({ data: { article: this.selectedArticleFiles, caption: this.caption, accessories: this.accessories, title: this.title } })
  }

  removeImage() {
    this.selectedImageFiles = undefined;
    this.preview = '';
  }

  removeVideo() {
    this.selectedVideoFiles = undefined;
    this.preview = '';
  }

  removeArticle() {
    this.selectedArticleFiles = undefined;
    this.articlename = '';
  }

  selectAccessory(accessory: any) {

    if (accessory == 'field') {
      this.show_field = true;

      this.show_cone = false;
      this.show_living_room = false;
      this.show_ball = false;
    }

    if (accessory == 'cone') {
      this.show_cone = true;

      this.show_living_room = false;
      this.show_field = false;
      this.show_ball = false;
    }

    if (accessory == 'ball') {
      this.show_ball = true;

      this.show_living_room = false;
      this.show_field = false;
      this.show_cone = false;
    }

    if (accessory == 'living room') {
      this.show_living_room = true;

      this.show_field = false;
      this.show_cone = false;
      this.show_ball = false;

    }

  }

  onFieldSize() {
    this.accessories.fieldSize = this.fieldSize;
    this.show_field = false;
  }


  onLivingRoom() {
    this.accessories.isLivingRoom = this.isLivingRoom;
    this.show_living_room = false;
  }

  onUpdateBall() {
    this.accessories.ballNumber = this.ballNumber;
    this.show_ball = false;
  }

  onUpdateCone() {
    this.accessories.coneNumber = this.coneNumber;
    this.show_cone = false;
  }

  close() {
    this.dialogRef.close()
  }

}
