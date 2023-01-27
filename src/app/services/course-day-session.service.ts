import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDaySession } from '../models/course-day-session.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CourseSessionService {

    //server host api link
    private baseurl = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) { }

    getAllCourseSessions() {
        return this.http.get<CourseDaySession[]>(this.baseurl + 'course-sessions');
    }

    getCourseSessionById(id: string) {
        return this.http.get<CourseDaySession>(this.baseurl + 'course-sessions' + '/' + id);
    }

    addCourseSession(courseSession: CourseDaySession) {
        return this.http.post(this.baseurl + 'course-sessions', courseSession, { reportProgress: true, observe: 'events' });
    }

    deleteCourseSession(id: string) {
        return this.http.delete(this.baseurl + 'course-sessions' + '/' + id);
    }

    updateCourseSession(courseSession: CourseDaySession): Observable<any> {
        return this.http.put<CourseDaySession>(this.baseurl + 'course-sessions' + '/' + courseSession._id, courseSession, { reportProgress: true, observe: 'events' });
    }

}
