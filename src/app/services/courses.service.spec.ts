import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { data } from 'common/constants';
import { Course } from '../course';

describe('CoursesService', () => {
    let service: CoursesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CoursesService],
        }),
            (service = TestBed.get(CoursesService));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create courses property', () => {
        const dataFromService = service.getList();
        dataFromService.map((i) => {
            i.date = 0;
        });

        const newData = [];
        data.forEach((i) => {
            let course: Course;
            course = Object.assign({}, i);
            course.date = 0;
            newData.push(course);
        });

        expect(dataFromService).toEqual(newData);
    });

    it('should create new course', () => {
        expect(service.getList().length).toEqual(5);
        service.createCourse({
            id: 100,
            title: '',
            date: 10000000,
            duration: 100,
            description: '',
            topRated: false,
        });
        expect(service.getList().length).toEqual(6);
    });

    it('should return course index', () => {
        expect(service.getItemById(3)).toEqual(2);
        expect(service.getItemById(1)).toEqual(0);
        expect(service.getItemById(10)).toEqual(-1);
    });

    it('should remove course', () => {
        expect(service.getList().length).toEqual(5);
        service.removeItem(1);
        expect(service.getList().length).toEqual(4);
        service.removeItem(2);
        expect(service.getList().length).toEqual(3);
        service.removeItem(10);
        expect(service.getList().length).toEqual(3);
    });
});
