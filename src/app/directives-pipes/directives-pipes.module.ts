import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../search.pipe';
import { DurationPipe } from '../duration.pipe';
import { BorderColorDirective } from '../border-color.directive';
import { OrderByPipe } from '../order-by.pipe';

@NgModule({
    declarations: [SearchPipe, DurationPipe, BorderColorDirective, OrderByPipe],
    imports: [CommonModule],
    exports: [SearchPipe, DurationPipe, BorderColorDirective, OrderByPipe],
    providers: [SearchPipe],
})
export class DirectivesPipesModule {}
