import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TeacherDetailsComponent } from './teacher-details.component';
import { TeacherDetailsRoutingModule } from './teacher-details-routing.module';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TeacherDetailsRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule,
        DialogModule,
        PaginatorModule,
        TableModule,
        ToastModule,
        TabViewModule
    ],
    declarations: [TeacherDetailsComponent]
})
export class TeacherDetailsModule { }