import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import {GradeListComponent} from "./grade-list.component";
import {GradeListRoutingModule} from "./grade-list-routing.module";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
@NgModule({
    imports: [
        CommonModule,
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
    ],
    declarations: [GradeListComponent]
})
export class GradeListModule { }
