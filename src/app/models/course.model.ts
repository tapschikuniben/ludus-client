export interface Course {
    _id: string;
    number_of_days: number | null;
    course_title: string;
    course_instructor: string;
    course_description: string;
    date: string;
    article_or_vedio: string;
    tags: string;
    title: string;
    description: string;
    learning: string;
    preferences: [] | any;
    points_assigned: number | null;
    linking_id: string;
}