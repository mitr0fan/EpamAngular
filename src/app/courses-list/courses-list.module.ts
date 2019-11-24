import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { DirectivesPipesModule } from '../directives-pipes/directives-pipes.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesPipesModule,
    CoreModule
  ],
  exports: [
    CoursesComponent,
  ]
})
export class CoursesListModule { }
