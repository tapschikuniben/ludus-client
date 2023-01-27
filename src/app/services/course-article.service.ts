import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseArticle } from '../models/course-article.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CourseArticleService {

    //server host api link
    private baseurl = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) { }

    getAllCourseArticles() {
        return this.http.get<CourseArticle[]>(this.baseurl + 'course-articles');
    }

    getCourseArticleById(id: string) {
        return this.http.get<CourseArticle>(this.baseurl + 'course-articles' + '/' + id);
    }

    addCourseArticle(courseArticle: CourseArticle) {
        return this.http.post(this.baseurl + 'course-articles', courseArticle, { reportProgress: true, observe: 'events' });
    }

    deleteCourseArticle(id: string) {
        return this.http.delete(this.baseurl + 'course-articles' + '/' + id);
    }

    updateCourseArticle(courseArticle: CourseArticle): Observable<any> {
        return this.http.put<CourseArticle>(this.baseurl + 'course-articles' + '/' + courseArticle._id, courseArticle, { reportProgress: true, observe: 'events' });
    }

}
