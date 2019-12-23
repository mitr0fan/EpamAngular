import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesListModule } from './courses-list/courses-list.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { DirectivesPipesModule } from './directives-pipes/directives-pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CoursesService } from './courses.service';
import { AuthorizationService } from './authorization.service';
import { LoginPageModule } from './login-page/login-page.module';
import { TestHostComponent } from './test-host/test-host.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [AppComponent, TestHostComponent, PageNotFoundComponent],
    imports: [
        BrowserModule,
        CoreModule,
        CoursesListModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        DirectivesPipesModule,
        BrowserAnimationsModule,
        MatDialogModule,
        LoginPageModule,
        MatInputModule,
    ],
    providers: [CoursesService, AuthorizationService],
    bootstrap: [AppComponent],
})
export class AppModule {}
