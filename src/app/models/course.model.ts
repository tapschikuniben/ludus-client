
export interface CourseDaySession {
    category: string;
    day: number;
    is_article_or_video: string;
    tags: string;
    title: string;
    description: string;
    learning: string;
    accessories: [] | any;
    points_assigned: number | null;
    imageUrl: string;
    videoUrl: string;
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