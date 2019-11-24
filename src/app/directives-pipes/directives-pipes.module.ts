import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../search.pipe';
import { DurationPipe } from '../duration.pipe';
import { BorderColorDirective } from '../border-color.directive';



@NgModule({
  declarations: [
    SearchPipe,
    DurationPipe,
    BorderColorDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SearchPipe,
    DurationPipe,
    BorderColorDirective
  ],
  providers: [
    SearchPipe
  ]
})
export class DirectivesPipesModule { }
