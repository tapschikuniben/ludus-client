import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseImage } from '../models/course-image.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CourseImageService {

    //server host api link
    private baseurl = 'http://18.134.140.238:3000/api/';

    constructor(private http: HttpClient) { }

    getAllCourseImages() {
        return this.http.get<CourseImage[]>(this.baseurl + 'course-images');
    }

    getCourseImageById(id: string) {
        return this.http.get<CourseImage>(this.baseurl + 'course-images' + '/' + id);
    }

    addCourseImage(courseImage: CourseImage) {
        return this.http.post(this.baseurl + 'course-images', courseImage, { reportProgress: true, observe: 'events' });
    }

    deleteCourseImage(id: string) {
        return this.http.delete(this.baseurl + 'course-images' + '/' + id);
    }

    updateCourseImage(courseImage: CourseImage): Observable<any> {
        return this.http.put<CourseImage>(this.baseurl + 'course-images' + '/' + courseImage._id, courseImage, { reportProgress: true, observe: 'events' });
    }

}
