import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';


@NgModule({
    declarations: [AppComponent, ],
    imports: [AppRoutingModule, AppLayoutModule, MultiSelectModule,BrowserModule],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
