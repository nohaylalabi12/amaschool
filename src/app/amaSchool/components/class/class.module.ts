import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { ClassRoutingModule } from "./class-routing.module";

@NgModule({
    imports: [
       
        CommonModule,
        ClassRoutingModule,
        MultiSelectModule,
    ],
    declarations: [],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ClassModule { }
