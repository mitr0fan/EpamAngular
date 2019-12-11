import { Injectable } from '@angular/core';
import { Course } from './course';
import { data } from '../../common/constants';
import { format } from 'date-fns';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private courses: Course[];

    constructor() {
        const changedCourses: Course[] = [];

        data.forEach((i) => {
            let newData: Course;
            newData = Object.assign({}, i);
            newData.date = format(new Date(i.date), 'dd.MM.yyyy');
            changedCourses.push(newData);
        });

        this.courses = changedCourses;
    }

    getList(): Course[] {
        return this.courses;
    }

    createCourse() {
        const newCourse: Course = Object.assign({}, this.courses[0]);
        let id = 0;
        this.courses.forEach((i) => {
            if (i.id > id) {
                id = i.id;
            }
        });
        newCourse.id = ++id;
        newCourse.title = newCourse.title.slice(0, -1) + id;

        this.courses.push(newCourse);
    }

    getItemById(id: number) {
        return this.courses.findIndex((course) => {
            if (course.id === id) {
                return true;
            } else {
                return false;
            }
        });
    }

    updateItem() {
        console.log('Update Item');
    }

    removeItem(id: number) {
        const indexOfCourse = this.getItemById(id);

        if (indexOfCourse !== -1) {
            this.courses = this.courses
                .slice(0, indexOfCourse)
                .concat(this.courses.slice(indexOfCourse + 1));
        } else { return; }
    }
}
