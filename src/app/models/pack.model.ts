
export interface PackDaySession {
    category: string;
    day: string;
    is_article_or_vedio: string;
    title: string;
    description: string;
    preferences: [] | any;
    imageUrl: string;
    vedioUrl: string;
    articleUrl: string;
}

export interface Pack {
    _id: string;
    packs_images: [];
    number_of_weeks: number | null;
    pack_title: string;
    pack_instructor: string;
    description: string;
    pack_daily_sessions: PackDaySession[];
}