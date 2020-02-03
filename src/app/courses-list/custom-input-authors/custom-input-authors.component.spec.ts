import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputAuthorsComponent } from './custom-input-authors.component';

describe('CustomInputAuthorsComponent', () => {
    let component: CustomInputAuthorsComponent;
    let fixture: ComponentFixture<CustomInputAuthorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomInputAuthorsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomInputAuthorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
