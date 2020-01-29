import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
    declarations: [
        CoursesComponent,
        CourseItemComponent,
        DeleteCoursePopupComponent,
        EditCourseComponent,
        CustomInputDateComponent,
    ],
    imports: [
        CommonModule,
        DirectivesPipesModule,
        CoreModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [CoursesComponent, CourseItemComponent, DeleteCoursePopupComponent],
    entryComponents: [DeleteCoursePopupComponent, EditCourseComponent],
    providers: [DurationPipe],
})
export class CoursesListModule {}
