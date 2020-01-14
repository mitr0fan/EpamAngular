import { Injectable } from '@angular/core';
import { Course } from './course';
import { HttpClient } from '@angular/common/http';
import { DATA } from 'common/constants';
import { AuthorizationService } from './authorization.service';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private coursesUrl = DATA.COURSES_SERVER;

    constructor(private http: HttpClient, private authService: AuthorizationService) {}

    getList(amountCourses?: number, page?: number) {
        if (amountCourses && page) {
            this.authService.getUserInfo().subscribe();
            const url = `${this.coursesUrl}?_limit=${amountCourses}&_page=${page}`;
            return this.http.get<Course[]>(url);
        } else {
            return this.http.get<Course[]>(this.coursesUrl);
        }
    }

    createCourse(course: Course) {
        return this.http.post(this.coursesUrl, course);
    }

    getItemById(id: number) {
        const url = `${this.coursesUrl}?id=${id}`;
        return this.http.get<Course[]>(url);
    }

    updateItem(course: Course) {
        const url = `${this.coursesUrl}/${course.id}`;
        return this.http.put(url, course);
    }

    removeItem(id: number) {
        const deleteUrl = `${this.coursesUrl}/${id}`;
        return this.http.delete(deleteUrl);
    }

    searchCoursesByTitle(value: string) {
        this.authService.getUserInfo().subscribe();
        const searchByTitleUrl = `${this.coursesUrl}?title_like=${value}`;

        return this.http.get<Course[]>(searchByTitleUrl);
    }

    searchCoursesByDescription(value: string) {
        this.authService.getUserInfo().subscribe();
        const searchByDescriptionUrl = `${this.coursesUrl}?description_like=${value}`;

        return this.http.get<Course[]>(searchByDescriptionUrl);
    }

    dateFromStringToMs(dateContent: string) {
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

    deleteSameCourses(arr1: Course[], arr2: Course[]) {
        let idOfarr1: number[];
        let courses: Course[];

        courses = arr1;
        idOfarr1 = arr1.map(course => {
            return course.id;
        });
        arr2.forEach(course => {
            if (!idOfarr1.includes(course.id)) {
                courses.push(course);
            }
        });

        return courses;
    }
}
