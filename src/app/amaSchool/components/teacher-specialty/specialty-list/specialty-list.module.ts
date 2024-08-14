import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialtyListRoutingModule } from './specialty-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { GradeListRoutingModule } from '../../grade/list/grade-list-routing.module';
import { TeacherSpecialtyListComponent } from './specialty-list.component';


@NgModule({
  declarations: [TeacherSpecialtyListComponent],
  imports: [
    CommonModule,
    SpecialtyListRoutingModule,
    FormsModule,
    GradeListRoutingModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    InputGroupModule,
    InputGroupAddonModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
    PaginatorModule,
    ToastModule
  ]
})
export class SpecialtyListModule { }
