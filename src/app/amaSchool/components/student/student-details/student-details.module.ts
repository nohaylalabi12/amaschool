import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentDetailsComponent} from "./student-details.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {TabViewModule} from "primeng/tabview";
import {StudentDetailsRoutingModule} from "./student-details-routing.module";
import {AvatarModule} from "primeng/avatar";
import {ImageModule} from "primeng/image";
import {DividerModule} from "primeng/divider";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StudentDetailsRoutingModule,
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
        TabViewModule,
        AvatarModule,
        ImageModule,
        DividerModule

    ],
    declarations: [StudentDetailsComponent]
})
export class StudentDetailsModule { }
