import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { DirectivesPipesModule } from '../directives-pipes/directives-pipes.module';
import { CoreModule } from '../core/core.module';
import { DeleteCoursePopupComponent } from './delete-course-popup/delete-course-popup.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { MatInputModule } from '@angular/material/input';
import { DurationPipe } from '../duration.pipe';

@NgModule({
    declarations: [CoursesComponent, CourseItemComponent, DeleteCoursePopupComponent, EditCourseComponent],
    imports: [CommonModule, DirectivesPipesModule, CoreModule, MatInputModule],
    exports: [CoursesComponent, CourseItemComponent, DeleteCoursePopupComponent],
    entryComponents: [DeleteCoursePopupComponent, EditCourseComponent],
    providers: [DurationPipe]
})
export class CoursesListModule {}
