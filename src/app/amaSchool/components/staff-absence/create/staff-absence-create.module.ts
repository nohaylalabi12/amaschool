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
import { StaffAbsenceCreateComponent } from './staff-absence-create.component';
import { CalendarModule } from 'primeng/calendar';
import { StaffAbsenceCreateRoutingModule } from './staff-absence-create-routing.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StaffAbsenceCreateRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule,
        InputGroupModule,
        InputGroupAddonModule,
        CalendarModule,
        ToastModule,
        ReactiveFormsModule
    ],
    declarations: [StaffAbsenceCreateComponent]
})
export class StaffAbsenceCreateModule { }
