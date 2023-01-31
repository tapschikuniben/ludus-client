import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable()
export class NotifierService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    openSnackBar(color: any, displaymessage: any) {
        this._snackBar.open(displaymessage, 'Close', {
            duration: 8000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: [color]
        });
    }

    constructor(private _snackBar: MatSnackBar,) { }

    Notification(messagetype: string, displaymessage: string) {

        if (messagetype == 'success') {
            this.openSnackBar('success-snackbar', displaymessage);
        }
        else if (messagetype == 'warning') {
            const color = 'warn-snackbar'
            this.openSnackBar(color, displaymessage);
        }
        else {
            const color = '';
            this.openSnackBar(color, displaymessage);
        }
    }

}
