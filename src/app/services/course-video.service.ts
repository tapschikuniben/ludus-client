import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseVideo } from '../models/course-video.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CourseVideoService {

    //server host api link
    private baseurl = 'http://18.134.140.238:3000/api/';

    constructor(private http: HttpClient) { }

    getAllCourseVideos() {
        return this.http.get<CourseVideo[]>(this.baseurl + 'course-videos');
    }

    getCourseVideoById(id: string) {
        return this.http.get<CourseVideo>(this.baseurl + 'course-videos' + '/' + id);
    }

    addCourseVideo(courseVideo: CourseVideo) {
        return this.http.post(this.baseurl + 'course-videos', courseVideo, { reportProgress: true, observe: 'events' });
    }

    deleteCourseVideo(id: string) {
        return this.http.delete(this.baseurl + 'course-videos' + '/' + id);
    }

    updateCourseVideo(courseVideo: CourseVideo): Observable<any> {
        return this.http.put<CourseVideo>(this.baseurl + 'course-videos' + '/' + courseVideo._id, courseVideo, { reportProgress: true, observe: 'events' });
    }

}
