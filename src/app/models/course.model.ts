
export interface CourseDaySession {
    category: string;
    day: string;
    is_article_or_vedio: string;
    tags: string;
    title: string;
    description: string;
    learning: string;
    preferences: [] | any;
    points_assigned: number | null;
    imageUrl: string;
    vedioUrl: string;
    articleUrl: string;
}


export interface Course {
    _id: string;
    number_of_days: number | null;
    course_title: string;
    course_instructor: string;
    course_description: string;
    course_daily_sessions: CourseDaySession[];
}