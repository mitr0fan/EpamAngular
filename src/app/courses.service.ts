import { Injectable } from '@angular/core';
import { Course } from './course';
import { HttpClient } from '@angular/common/http';
import { DATA } from 'common/constants';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private coursesUrl = DATA.COURSES_SERVER;

    constructor(private http: HttpClient) {}

    getList(amountCourses?: number, page?: number) {
        if (amountCourses && page) {
            const addedUrl = `?_limit=${amountCourses}&_page=${page}`;
            return this.http.get<Course[]>(this.coursesUrl + addedUrl);
        } else {
            return this.http.get<Course[]>(this.coursesUrl);
        }
    }

    createCourse(course: Course) {
        if (!!course.id) {
            this.removeItem(course.id).subscribe((error) =>
                console.log('This course was not deleted because it does not exist')
            );
        }
        delete course.id;

        return this.http.post(this.coursesUrl, course);
    }

    getItemById(id: number) {
        const addedUrl = `?id=${id}`;
        return this.http.get<Course[]>(this.coursesUrl + addedUrl);
    }

    updateItem() {
        console.log('Update Item');
    }

    removeItem(id: number) {
        const deleteUrl = `${this.coursesUrl}/${id}`;
        return this.http.delete(deleteUrl);
    }
}
