import { Injectable } from '@angular/core';
import { Course } from '../course';
import { HttpClient } from '@angular/common/http';
import { DATA } from 'common/constants';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private coursesUrl = DATA.COURSES_SERVER;

    constructor(private http: HttpClient) {}

    getList(amountCourses?: number, page?: number) {
        if (amountCourses && (page || page === 0)) {
            return this.http.get<Course[]>(this.coursesUrl, {
                params: {
                    limit: String(amountCourses),
                    offset: String(page),
                },
            });
        } else {
            return this.http.get<Course[]>(this.coursesUrl);
        }
    }

    createCourse(course: Course) {
        return this.http.post(this.coursesUrl, course);
    }

    getItemById(id: number) {
        const url = `${this.coursesUrl}/${id}`;
        return this.http.get<Course>(url);
    }

    updateItem(course: Course) {
        const url = `${this.coursesUrl}/${course.id}`;
        return this.http.patch(url, course);
    }

    removeItem(id: number) {
        const deleteUrl = `${this.coursesUrl}/${id}`;
        return this.http.delete(deleteUrl);
    }

    searchCoursesByTitle(value: string) {
        return this.http.get<Course[]>(this.coursesUrl, {
            params: {
                title: value
            }
        });
    }

    searchCoursesByDescription(value: string) {
        return this.http.get<Course[]>(this.coursesUrl, {
            params: {
                description: value
            }
        });
    }

    dateFromStringToMs(dateContent: string) {
        if (dateContent === null) {
            return 0;
        }
        if (+dateContent) {
            return dateContent;
        } else {
            return new Date(`
            ${dateContent.slice(3, 5)}.
            ${dateContent.slice(0, 2)}.
            ${dateContent.slice(6)}
            `).getTime();
        }
    }
}
