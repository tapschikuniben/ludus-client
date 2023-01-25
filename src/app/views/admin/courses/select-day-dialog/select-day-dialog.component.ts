import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-day-dialog',
  templateUrl: './select-day-dialog.component.html',
  styleUrls: ['./select-day-dialog.component.scss']
})
export class SelectDayDialogComponent {

  public scheduleDays: number = 0;
  public numbers: any;
  public currentDay: number = 0;

  constructor(
    public dialogRef: MatDialogRef<SelectDayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.scheduleDays = this.data.schedule_days;

    this.numbers = Array(this.data.schedule_days).fill(0).map((x, i) =>
      console.log(i)
    );
  }

  selectedDay(day: number) {
    console.log(day)
    this.currentDay = day;
  }

  onClose(): void {
    this.dialogRef.close({ selected_day: this.currentDay });
  }
}
