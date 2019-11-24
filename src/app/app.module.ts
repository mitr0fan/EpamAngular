import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesListModule } from './courses-list/courses-list.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { DirectivesPipesModule } from './directives-pipes/directives-pipes.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CoursesListModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    DirectivesPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
