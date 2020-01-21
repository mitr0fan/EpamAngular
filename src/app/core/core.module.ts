import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { DirectivesPipesModule } from '../directives-pipes/directives-pipes.module';
import { RouterModule } from '@angular/router';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        HeaderComponent,
        BreadcrumbsComponent,
        FooterComponent,
        SearchComponent,
        LoadingPageComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DirectivesPipesModule,
        RouterModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        SearchComponent,
        LoadingPageComponent,
    ],
})
export class CoreModule {}
