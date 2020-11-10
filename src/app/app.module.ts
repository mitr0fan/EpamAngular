import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { DirectivesPipesModule } from './directives-pipes/directives-pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageModule } from './login-page/login-page.module';
import { TestHostComponent } from './test-host/test-host.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/index';
import { EffectsModule } from '@ngrx/effects';
import { LoginUserEffects } from 'src/store/effects/login-user.effect.service';
import { CoursesEffect } from 'src/store/effects/courses.effect.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent, TestHostComponent, PageNotFoundComponent],
    imports: [
        BrowserModule,
        CoreModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        DirectivesPipesModule,
        BrowserAnimationsModule,
        LoginPageModule,
        HttpClientModule,
        MatSnackBarModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([LoginUserEffects, CoursesEffect]),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
