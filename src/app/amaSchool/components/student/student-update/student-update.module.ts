import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentCreateRoutingModule} from "../student-create/student-create-routing.module";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {StudentUpdateRoutingModule} from "./student-update-routing.module";
import {StudentUpdateComponent} from "./student-update.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StudentUpdateRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule

    ],
    declarations: [StudentUpdateComponent]
})
export class StudentUpdateModule { }
