import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course.model';

interface Field {
  value: string;
  viewValue: string;
  checked: boolean
}

@Component({
  selector: 'app-preferences-dialog',
  templateUrl: './preferences-dialog.component.html',
  styleUrls: ['./preferences-dialog.component.scss']
})
export class PreferencesDialogComponent {

  public course!: Course;

  constructor(
    public dialogRef: MatDialogRef<PreferencesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
  }

  public fields: Field[] = [
    { value: '1/3', viewValue: '1/3 Field', checked: false },
    { value: '1/4', viewValue: '1/4 Field', checked: false },
    { value: '1/2', viewValue: '1/2 Field', checked: false },
    { value: '3/4', viewValue: '3/4 Field', checked: false },
    { value: 'Full', viewValue: 'Full Ground', checked: false },
  ];

  public fieldList: any = [];
  public coneNumber: Number = 0;
  public ballNumber: Number = 0;
  public isLivingRoom: string = 'No';


  checkVacancyCategory(event: any, value: any) {

    if (event == true) {
      this.fieldList.push({ field_name: value });
    } else {
      this.fieldList = this.fieldList.filter((field: any) => field.field_name !== value);
    }

    // console.log(this.fieldList)
  }


  onConfirmField() {
    this.dialogRef.close({ data: { field: this.fieldList, type: 'field' } });
  }

  onUpdateCone() {
    this.dialogRef.close({ data: { coneNumber: this.coneNumber, type: 'cone' } });
  }

  onUpdateBall() {
    this.dialogRef.close({ data: { ballNumber: this.ballNumber, type: 'ball' } });
  }

  onLivingRoom() {
    this.dialogRef.close({ data: { isLivingRoom: this.isLivingRoom, type: 'living room' } });
  }

}
