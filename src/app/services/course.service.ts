import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CourseDaySession } from '../models/course.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CourseService {

    //server host api link
    private baseurl = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) { }

    getAllCourses() {
        return this.http.get<Course[]>(this.baseurl + 'courses');
    }

    getCourseById(id: any) {
        return this.http.get<Course>(this.baseurl + 'courses' + '/' + id);
    }

    addCourse(course: Course) {
        return this.http.post(this.baseurl + 'courses', course);
    }

    deleteCourse(id: string) {
        return this.http.delete(this.baseurl + 'courses' + '/' + id);
    }

    updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(this.baseurl + 'courses' + '/' + course._id, course);
    }

    uploadCourseImage(course: Course, file: File) {

        const formData: FormData = new FormData();

        formData.append('courseimage', file);
        formData.append('course', JSON.stringify(course));

        const req = new HttpRequest('PUT', this.baseurl + 'courses-file-image' + '/' + course._id, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);

    }

    uploadCourseVideo(course: Course, file: File) {

        const formData: FormData = new FormData();

        formData.append('coursevideo', file);
        formData.append('course', JSON.stringify(course));

        const req = new HttpRequest('PUT', this.baseurl + 'courses-file-video' + '/' + course._id, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);

    }

    uploadCourseArticle(course: Course, file: File) {

        const formData: FormData = new FormData();

        formData.append('coursearticle', file);
        formData.append('course', JSON.stringify(course));

        const req = new HttpRequest('PUT', this.baseurl + 'courses-file-article' + '/' + course._id, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);

    }

}
