import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { DirectivesPipesModule } from '../directives-pipes/directives-pipes.module';
import { CoreModule } from '../core/core.module';
import { DeleteCoursePopupComponent } from './delete-course-popup/delete-course-popup.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { MatInputModule } from '@angular/material/input';
import { DurationPipe } from '../directives-pipes/duration.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomInputDateComponent } from './custom-input-date/custom-input-date.component';
import { CustomInputDurationComponent } from './custom-input-duration/custom-input-duration.component';
import { CustomInputAuthorsComponent } from './custom-input-authors/custom-input-authors.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    declarations: [
        CoursesComponent,
        CourseItemComponent,
        DeleteCoursePopupComponent,
        EditCourseComponent,
        CustomInputDateComponent,
        CustomInputDurationComponent,
        CustomInputAuthorsComponent,
    ],
    imports: [
        CommonModule,
        DirectivesPipesModule,
        CoreModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
    ],
    exports: [CoursesComponent, CourseItemComponent, DeleteCoursePopupComponent],
    entryComponents: [DeleteCoursePopupComponent, EditCourseComponent],
    providers: [DurationPipe, DatePipe],
})
export class CoursesListModule {}
