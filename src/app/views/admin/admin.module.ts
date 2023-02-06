import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CourseComponent } from './courses/course/course.component';
import { CourseInfoComponent } from './courses/course-info/course-info.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { AdminRoutingModule } from './admin-routing.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ArticleVideoSelectDialogComponent } from './courses/article-video-select-dialog/article-video-select-dialog.component';
import { NewPackComponent } from './packs/new-pack/new-pack.component';
import { EditPackComponent } from './packs/edit-pack/edit-pack.component';
import { PackInfoComponent } from './packs/pack-info/pack-info.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { NewCardComponent } from './points/new-card/new-card.component';
import { EditCardComponent } from './points/edit-card/edit-card.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CardInfoComponent } from './points/card-info/card-info.component';
import { AdminLoginComponent } from './signin/admin-login/admin-login.component';
import { SelectDayDialogComponent } from './courses/select-day-dialog/select-day-dialog.component';
import { ViewSessionDialogComponent } from './courses/view-session-dialog/view-session-dialog.component';
import { NotifierService } from 'src/app/services/notifier.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileUploadComponent } from './courses/file-upload/file-upload.component';
import { PreferencesDialogComponent } from './courses/preferences-dialog/preferences-dialog.component';



@NgModule({
  declarations: [
    CourseComponent,
    CourseInfoComponent,
    NewCourseComponent,
    EditCourseComponent,
    ArticleVideoSelectDialogComponent,
    NewPackComponent,
    EditPackComponent,
    PackInfoComponent,
    UserInfoComponent,
    NewCardComponent,
    EditCardComponent,
    ConfirmDialogComponent,
    CardInfoComponent,
    AdminLoginComponent,
    SelectDayDialogComponent,
    ViewSessionDialogComponent,
    FileUploadComponent,
    PreferencesDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    RouterModule,
    MaterialFileInputModule,
    MatSnackBarModule,
  ],
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  providers: [NotifierService],
})
export class AdminModule { }
