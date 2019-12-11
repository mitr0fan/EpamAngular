import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchComponent],
            imports: [FormsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        component.inputValue = '';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit searchEvent', () => {
        const spy = spyOn(component.searchEvent, 'emit');
        component.search();
        expect(spy).toHaveBeenCalled();
    });

    it('should emit createCourseEvent', () => {
        const spy = spyOn(component.createCourseEvent, 'emit');
        component.addCourse();
        expect(spy).toHaveBeenCalled();
    });
});
