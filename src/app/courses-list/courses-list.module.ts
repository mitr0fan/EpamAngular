import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { DirectivesPipesModule } from '../directives-pipes/directives-pipes.module';
import { CoreModule } from '../core/core.module';
import { DeleteCoursePopupComponent } from './delete-course-popup/delete-course-popup.component';

@NgModule({
    declarations: [CoursesComponent, CourseItemComponent, DeleteCoursePopupComponent],
    imports: [CommonModule, DirectivesPipesModule, CoreModule],
    exports: [],
    entryComponents: [DeleteCoursePopupComponent],
})
export class CoursesListModule {}
