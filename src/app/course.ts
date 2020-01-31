import { Author } from './user';

export interface Course {
    id: number;
    title: string;
    date: number | string;
    duration: number;
    description: string;
    topRated: boolean;
    authors: Author[];
}
