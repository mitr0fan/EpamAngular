import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { DirectivesPipesModule } from '../directives-pipes/directives-pipes.module';

@NgModule({
    declarations: [HeaderComponent, BreadcrumbsComponent, FooterComponent, SearchComponent],
    imports: [CommonModule, FormsModule, DirectivesPipesModule],
    exports: [BreadcrumbsComponent, FooterComponent, HeaderComponent, SearchComponent],
})
export class CoreModule {}
