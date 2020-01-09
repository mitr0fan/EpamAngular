import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../duration.pipe';
import { BorderColorDirective } from '../border-color.directive';
import { OrderByPipe } from '../order-by.pipe';

@NgModule({
    declarations: [DurationPipe, BorderColorDirective, OrderByPipe],
    imports: [CommonModule],
    exports: [DurationPipe, BorderColorDirective, OrderByPipe],
})
export class DirectivesPipesModule {}
