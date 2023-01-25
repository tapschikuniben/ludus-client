export interface CourseDaySession {
    _id: string;
    course_id: any;
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
